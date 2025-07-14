use ./util.nu *
use ./graphql.nu

const $path_self = path self | path dirname

export def project_fields_json [] {
  open $"($path_self)/project-fields.json"
  | each {
    if ($in | get -i options) == null {
      $in
    } else {
      $in | update options {as record name id} 
    }
  }
}

export def "update project_fields_json" [] {
  graphql send query org-project-fields | to json | save -f $"($path_self)/project-fields.json"
}

export def "field by_name" [name?: string] : [
  nothing -> record
  string -> record
] {
  let $name = $in
    | guard_filter "name" (metadata $name) $name
  project_fields_json | where name == $name | reject __typename | get -i 0
}
