use leptos::prelude::*;

#[component]
pub fn ArrowLeft(
    #[prop(into, optional, default = 24)] size: i32,
    #[prop(into, default = "".to_string())] class: String,
) -> impl IntoView {
    view! {
        <svg
            width=size
            height=size
            viewBox="0 0 24 24"
            fill="none"
            class=class
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M14 7L9 12L14 17"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    }
}
