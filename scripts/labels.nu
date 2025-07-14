use ./util.nu *

const $path_self = path self | path dirname

export def labels_json [] {
  open $"($path_self)/labels.json"
}

export def by_id [id?: string] : [
  nothing -> record
  string -> record
] {
  let $id = $in
    | guard_filter "id" (metadata $id) $id
  labels_json | where id == $id | get -i 0
}

export def by_name [name?: string] : [
  nothing -> record
  string -> record
] {
  let $name = $in
    | guard_filter "name" (metadata $name) $name
  labels_json | where name == $name | get -i 0
}

const RENAME_FROM_LIST = {
  Solid: SolidJS
}

export def rename_from_list [name:string] : nothing -> string {
  $RENAME_FROM_LIST | get -i $name | default $name
}

def main [] {
  labels_json
}
