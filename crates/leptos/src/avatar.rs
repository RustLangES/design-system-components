use components_core::{BASE_CLASS, concat};
use leptos::prelude::*;

#[component]
pub fn Avatar(
    #[prop(into)] url: String,
    #[prop(into, optional)] alt: Option<String>,
    #[prop(into, optional, default = Some(32))] size: Option<i32>,
    #[prop(into, optional)] class: String,
) -> impl IntoView {
    let class = crate::tw!(concat!(BASE_CLASS, "-avatar"), class);

    view! {
        <div
            class={class}
            style:width={size.map(|size| format!("{size}px"))}
            style:height={size.map(|size| format!("{size}px"))}
        >
            <img class="rustlanges-avatar__img" src={url} alt={alt} />
        </div>
    }
}
