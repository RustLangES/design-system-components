use ./util.nu *
use ./graphql.nu

const $path_self = path self | path dirname
const TITLE_LEN = "React - " | str length
const BODY_LEN = "If you want to contribute in this component, comment to this issue asking for assignment, and send a PR as draft as soon as possible.
> [See component in figma](" | str length

export def figma_json [] {
  open $"($path_self)/figma.json"
  | update title {str substring ($TITLE_LEN)..}
  | update body {str substring ($BODY_LEN)..(($in | str length) - 2)}
  | rename --column {title:name,body:url}
}

export def "update figma_json" [] {
  graphql send query react-components-issues | to json | save -f $"($path_self)/figma.json"
}

export def by_name [name?: string] : [
  nothing -> record
  string -> record
] {
  let $name = $in
    | guard_filter "name" (metadata $name) $name
  figma_json | where name == $name | get -i 0.url
}
