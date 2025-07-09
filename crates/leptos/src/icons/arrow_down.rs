use leptos::{IntoView, component, view};

#[component]
fn ArrowDown(#[prop(into, optional, default = 24)] size: u32) -> impl IntoView {
    view! {
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M7 10L12 15L17 10"
                fill="currentColor"
            />
        </svg>
    }
}
