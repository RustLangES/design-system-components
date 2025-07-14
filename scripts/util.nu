export def guard_filter [$filter_name: string, $filter_metadata, $filter?: string] : [
  nothing -> string
  string -> string
] {
  if $in == null {
    if $filter == null {
      error make {
        msg: $"Should pass ($filter_name) or input",
        label: {
          text: $"($filter_name) should exists when there is not input",
          span: $filter_metadata.span
        },
        help: $"\"($filter_name)\" | by_id\nor\nby_id \"($filter_name)\""
      }
    }

    $filter
  } else if ($in | describe) == "string" {
    $in
  }
}

export def "as record" [key: cell-path, value: cell-path] : table -> record {
  reduce --fold {} {|i, acc|
    $acc | insert ($i | get $key) ($i | get $value)
  }
}
