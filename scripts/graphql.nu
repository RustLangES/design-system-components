const REPO_OWNER = "\"RustLangES\""
const REPO_NAME = "\"design-system-components\""
const REPO_ID = "\"R_kgDOOz1xQg\""
const PROJECT_ID = "\"PVT_kwDOBHON284A7coi\""
const MILESTONE_ID = "\"MI_kwDOOz1xQs4AyIXX\""

export def "flatten nodes" [] : [
  table -> table
  record -> record
] {
  let $input = $in
  $input
  | columns
  | reduce --fold $input {|c, acc|
    $acc
    | update $c {
      if ($in | describe) !~ "table|record" {
        $in
      } else if ($in | get -i nodes) == null {
        flatten nodes
      } else {
        flatten|flatten|flatten nodes
      }
    }
  }
}

export def "send query" [$query:string, --dry, --verbose] : nothing -> record {
  let query_s = $query | compose_query $dry

  if $verbose {
    print $"(ansi d)[GRAPHQL] send query\n($query_s)(ansi reset)"
  } else {
    print $"(ansi lg)[GRAPHQL] Send query(ansi reset)"
  }

  let res = gh api graphql -f query=($query_s) | from json

  if ($res | get -i errors) != null {
    print $"(ansi lrb)\n($res.errors | table -e)(ansi reset)"
    error make {
      msg: "Graphql error",
      label: {
        text: "Query",
        span: (metadata $query).span
      }
    }
  }

  let res = $res.data

  let rateLimit = $res.rateLimit

  print $"(ansi lgb)[GRAPHQL] request success +($rateLimit.cost) \(($rateLimit.used) / ($rateLimit.limit)\)(ansi reset)"

  $res | reject rateLimit | flatten nodes
}

export def "send mutate" [$query:string, --verbose] : nothing -> record {
  let query_s = $query | compose_mutate

  if $verbose {
    print $"(ansi d)[GRAPHQL] send query\n($query_s)(ansi reset)"
  } else {
    print $"(ansi lg)[GRAPHQL] Send query(ansi reset)"
  }

  let res = gh api graphql -f query=($query_s) | from json

  if ($res | get -i errors) != null {
    print $"(ansi lrb)\n($res.errors | table -e)(ansi reset)"
    error make {
      msg: "Graphql error",
      label: {
        text: "Query",
        span: (metadata $query).span
      }
    }
  }

  let res = $res.data

  send query "" --dry

  $res
}

export def "send mutate createIssue" [issue, --verbose] : nothing -> string {
  send mutate (mutate createIssue $issue) --verbose=$verbose | get -i createIssue.issue.id
}

export def "send mutate addIssueToProject" [issue, --verbose] : nothing -> string {
  send mutate (mutate addIssueToProject $issue) --verbose=$verbose | get -i addProjectV2ItemById.item.id
}

export def "send mutate updateProjectFieldSelect" [item fieldId valueId --verbose] : nothing -> nothing {
  send mutate (mutate updateProjectFieldSelect $item $fieldId $valueId) --verbose=$verbose

  ()
}

export def "send query issues" [--dry, --verbose] : nothing -> record {
  send query (query issues) --dry=$dry --verbose=$verbose | get -i organization.repository.issues
}

export def "send query all-new-components-issues" [--dry, --verbose] : nothing -> table {
  send query (query all-new-components-issues) --dry=$dry --verbose=$verbose
  | get -i organization.repository.issues
  | rename --column {state:isOpen}
  | update isOpen {$in == "OPEN"}
  | update labels {get name}
}

export def "send query org-project-fields" [--dry, --verbose] : nothing -> record {
  send query (query org-project-fields) --dry=$dry --verbose=$verbose | get -i organization.projectV2.fields
}

export def compose_mutate [] : string -> string {
  $in | $"
mutation {
  ($in | str trim)
}
" | str trim
}

export def compose_query [$dry:bool] : string -> string {
  $in | $"
query {
  ($in | str trim)

  rateLimit\(dryRun: ($dry)\) {
    cost
    remaining
    limit
    nodeCount
    used
  }
}
" | str trim
}

export def "query issues" [] {
$"
  organization\(login: ($REPO_OWNER)) {
    repository\(name: ($REPO_NAME)) {
      issues\(states: OPEN, first: 4, filterBy: { labels: \"New Support\" }) {
        nodes {
          id
          title
          bodyText
        }
      }
    }
  }
"
}

export def "query all-new-components-issues" [] {
$"
organization\(login: ($REPO_OWNER)) {
  repository\(name: ($REPO_NAME)) {
    id
    issues\(first: 100, labels: [\"New Support\" \"New Component\"]) {
      nodes {
        title
        state
        labels\(first: 5) {
          nodes {
            name
          }
        }
      }
    }
  }
}
"
}

export def "query org-project-fields" [] {
$"
  organization\(login: ($REPO_OWNER)) {
    projectV2\(number: 19) {
      fields\(first: 50) {
        nodes {
          __typename
          ... on ProjectV2Field {
            id
            name
            dataType
          }
          ... on ProjectV2SingleSelectField {
            id
            name
            options {
              id
              name
            }
          }
        }
      }
    }
  }
"
}

export def "mutate createIssue" [$issue:record] {
  let labels = $issue.labels | each {to json} | str join " ";

  let input = $"
title: ($issue.title|to json),
repositoryId: ($REPO_ID)
body: ($issue.content|to json),
milestoneId: ($MILESTONE_ID),
labelIds: [($labels)],
issueTypeId: ($issue.issueType|to json),
parentIssueId: ($issue.parentIssue|to json)
  " | str trim;

print $"(ansi d)[GRAPHQL] mutation createIssue\n($input)(ansi reset)"

$"
  createIssue\(input: {($input)}) {
    issue {
      id
    }
  }
"
}

export def "mutate addIssueToProject" [$issueId:string] {
  let input = $"
contentId: ($issueId|to json)
projectId: ($PROJECT_ID)
  " | str trim;

print $"(ansi d)[GRAPHQL] mutation addProjectV2ItemById\n($input)(ansi reset)"

$"
  addProjectV2ItemById\(input: {($input)}) {
    item {
      id
    }
  }
"
}

export def "mutate updateProjectFieldSelect" [$itemId:string, $fieldId:string, $valueId:string] {
  let input = $"
projectId: ($PROJECT_ID)
itemId: ($itemId|to json)
fieldId: ($fieldId|to json)
value: { singleSelectOptionId: ($valueId|to json) }
  " | str trim;

print $"(ansi d)[GRAPHQL] mutation updateProjectV2ItemFieldValue\n($input)(ansi reset)"

$"
  updateProjectV2ItemFieldValue\(input: {($input)}) {
    projectV2Item {
      id
    }
  }
"
}
