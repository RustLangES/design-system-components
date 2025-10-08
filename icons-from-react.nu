def main [
    --rust (-r)
    outDir: path = crates/leptos/src/icons
] {
    mkdir crates/leptos/src/icons

    let files = ls -a -f js/react/lib/icons/*.tsx | get name

    let mod_content = $files | each {|file|
        let name = ($file | path basename | str replace ".tsx" "") | str snake-case

        if $rust { $"mod ($name);" } else { "" }
    } | str join "\n"

    let use_content = $files | each {|file|
        let name = ($file | path basename | str replace ".tsx" "")

        if $rust { $"pub use ($name | str snake-case)::($name | str pascal-case);" } else { "" }
    } | str join "\n"


    $"($mod_content)\n\n($use_content)\n" | save -f $"($outDir).rs"

    $files | each { |file|
        let name = ($file | path basename | str replace ".tsx" "")

        let dest_path = $"($outDir)/($name | str snake-case).rs"
        let name = $name | str pascal-case

        let content = open $file

        let svg_attrs = ($content | split row  "<svg" | get 1 | split row ">" | get 0)
        let path_data = ($content | split row 'd="' | get 1 | split row '"' | get 0)

        let rust_content = r#'use leptos::prelude::*;

#[component]
pub fn $name(
    #[prop(into, optional, default = 24)] size: i32,
    #[prop(into, default = "".to_string())] class: String,
) -> impl IntoView {
    view! {
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            class=class
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="$path_data"
                fill="currentColor"
            />
        </svg>
    }
}
'#

        if $rust {
            $rust_content | str replace "\$name" $name | str replace "\$path_data" $path_data | save -f $dest_path
            echo $"Convertido ($name).tsx a ($dest_path)"
        }
    }
}
