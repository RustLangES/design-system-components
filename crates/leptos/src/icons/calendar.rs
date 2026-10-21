use leptos::prelude::*;

#[component]
pub fn Calendar(
    #[prop(into, optional, default = 24)] size: i32,
    #[prop(into, default = "".to_string())] class: String,
) -> impl IntoView {
    view! {
        <svg
            width=size
            height=size
            viewBox="0 0 14 16"
            fill="none"
            class=class
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4.33333 1V3.66667M9.66667 1V3.66667M1 6.33333H13M2.33333 2.33333H11.6667C12.403 2.33333 13 2.93029 13 3.66667V13C13 13.7364 12.403 14.3333 11.6667 14.3333H2.33333C1.59695 14.3333 1 13.7364 1 13V3.66667C1 2.93029 1.59695 2.33333 2.33333 2.33333Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    }
}
