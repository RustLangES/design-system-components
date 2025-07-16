use ./util.nu *

const path_self = path self | path dirname;

export def load [] {
  open $"($path_self)/.env"
    | parse "{key}={value}"
    | as record key value
}
