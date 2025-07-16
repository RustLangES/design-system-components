use std

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

export def "progress" [$limit:int] : int -> nothing {
  let input = $in

  let counter_len = $"($input) / ($limit)" | str length;
  let counter = $"(ansi lgb)($input) (ansi reset)/ (ansi lcb)($limit)(ansi reset)";

  let available_space = term size | get columns | $in - 4 - $counter_len

  let completed_percent = $input / $limit;
  let completed_percent = $available_space * $completed_percent | into int

  let completed_bar = "#"
  | std repeat ($completed_percent)
  | str join ""

  let available_bar = "-"
  | std repeat ($available_space - $completed_percent)
  | str join ""

  print $"|(ansi g)($completed_bar)(ansi reset)(ansi d)($available_bar)(ansi reset)| ($counter)" 
}
