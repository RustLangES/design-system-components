use leptos::prelude::*;

#[component]
pub fn Close(#[prop(into, optional, default = 24)] size: u32) -> impl IntoView {
    view! {
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M7 7L17 17M7 17L17 7"
                fill="currentColor"
            />
        </svg>
    }
}
