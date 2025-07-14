use leptos::prelude::*;

#[component]
pub fn ArrowLeft(#[prop(into, optional, default = 24)] size: u32) -> impl IntoView {
    view! {
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M14 7L9 12L14 17"
                fill="currentColor"
            />
        </svg>
    }
}
