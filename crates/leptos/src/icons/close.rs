use leptos::prelude::*;

#[component]
pub fn Close(
    #[prop(into, optional, default = 24)] size: i32,
    #[prop(into, default = "".to_string())] class: String,
) -> impl IntoView {
    view! {
        <svg
            width=size
            height=size
            viewBox="0 0 24 24"
            class=class
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M7 7L17 17M7 17L17 7" fill="currentColor" />
        </svg>
    }
}
