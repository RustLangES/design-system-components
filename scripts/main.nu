#!/usr/bin/env nu

use ./dotenv.nu
use ./figma.nu
use ./graphql.nu
use ./labels.nu
use ./project.nu
use ./util.nu

def "query parsed issues" [] {
  graphql send query issues
  | update bodyText {lines | skip 5 | parse " {tech} - {component}"}
  | insert tech {|c| get -i bodyText.tech.0 | default ($c.title | parse "{tech} support" | get tech.0 | labels rename_from_list $in --reverse)}
  | update bodyText {get component}
  | rename --column {bodyText:components}
  | move components --after tech
}

def "ask for tech" [--dry] {
  if not $dry {
    print "Querying issues"
  }

  let issues = if $dry {
    [
      [id title tech components];
      [I_kwDOOz1xQs67eCae "React support" React ["Showcase support" "Avatar Group" Badge Button Cards Chip]]
      [I_kwDOOz1xQs67eCae "Leptos support" Leptos ["Showcase support" "Avatar Group" Badge Button Cards Chip]]
      [I_kwDOOz1xQs67eCcT "Vue support" Vue ["Showcase support" "Avatar Group" Badge Button Cards Chip]]
    ]
  } else {
    query parsed issues
  }


  let component_issues = if $dry {
    [
      [title isOpen labels];
      ["React - Showcase support" true [React "New Support"]]
      ["React - Avatar Group" false [React "New Component"]]
      ["React - Button" false [React "New Component"]]
      ["React - Badge" true [React "New Component"]]
      ["React - Falsy" false [React "New Component"]]
      ["React - Truthy" true [React "New Component"]]
    ]
  } else {
    graphql send query all-new-components-issues
  }

  let component_issues = $component_issues
  | insert parsed {get title | parse "{tech} - {component}" | get -i 0}
  | compact parsed
  | insert tech {get parsed.tech}
  | insert component {get parsed.component}
  | reject parsed title labels

  def related_issues [] : record -> list {
    let tech = $in.tech
    $component_issues | where tech == $tech
  }

  let selected_issue = $issues
  | insert related_issues {related_issues}
  | update related_issues {|i| where ($i.components | any {$in == $it.component})}
  | insert created_issues {get related_issues | length}
  | insert closed_issues {get related_issues | where isOpen == false | length}
  | insert target_components {get components | length}
  | insert stats {$"\((ansi lgb)($in.closed_issues) (ansi reset)/ (ansi lyb)($in.created_issues) (ansi reset)/ (ansi lcb)($in.target_components)(ansi reset))"}
  | insert render {$"($in.stats) ($in.tech)"}
  | input list -d render

  if $selected_issue == null {
    return
  }

  let selected_issue = $selected_issue
  | reject render stats
  | insert pending_issues {|c|
    $c.components
    | where ($c.related_issues.component | all {$in != $it})
  }
  | reject related_issues components created_issues closed_issues target_components

  if ($selected_issue.pending_issues | is-empty) {
    print $"No need to create issues"
    return null
  }

  $selected_issue
}

def main [--dry] {
  dotenv load | load-env

  let issue = ask for tech --dry=$dry

  if $issue == null {
    return
  }

  print $"Select the issue status"

  let status_field = project field by_name "Status"

  let statusId = $status_field.options
    | transpose name id
    | input list -d name
    | get -i id

  if $statusId == null {
    return
  }

  let pending_issues = $issue.pending_issues
  let total_pending_issues = $pending_issues | length

  print $"Creating ($total_pending_issues) issue\(s)"

  0 | util progress $total_pending_issues

  mut i = 0

  for pending_issue in $pending_issues {
    let $pending_issue = {
      title: $"($issue.tech) - ($pending_issue)",
      content: (figma compose issue $pending_issue),
      parentIssue: $issue.id,
      issueType: ("task" | project issueType by_name),
      labels: [
        ("New Component" | labels by_name | get id)
        (labels rename_from_list $issue.tech | labels by_name | get id)
      ],
    }

    if $dry {
       graphql mutate createIssue $pending_issue
       graphql mutate addIssueToProject "ISSUE_ID"
       graphql mutate updateProjectFieldSelect "ITEM_ID" $status_field.id $statusId
     } else {
       try {
         let issueId = graphql send mutate createIssue $pending_issue
         let itemId = graphql send mutate addIssueToProject $issueId
         graphql send mutate updateProjectFieldSelect $itemId $status_field.id $statusId
       } catch {|err|
         print $err.msg
       }
    }

    $i += 1
    $i | util progress $total_pending_issues
  }
}
