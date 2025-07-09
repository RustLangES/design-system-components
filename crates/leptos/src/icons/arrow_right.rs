use leptos::{IntoView, component, view};

#[component]
fn ArrowRight(#[prop(into, optional, default = 24)] size: u32) -> impl IntoView {
    view! {
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M10 17L15 12L10 7"
                fill="currentColor"
            />
        </svg>
    }
}
