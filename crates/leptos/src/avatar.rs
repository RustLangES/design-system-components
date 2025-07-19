use components_core::{BASE_CLASS, concat};
use leptos::prelude::*;

#[component]
pub fn Avatar(
    #[prop(into)] url: String,
    #[prop(into, optional)] alt: String,
    #[prop(into, optional, default = 32)] size: i32,
    #[prop(into, optional)] class: String,
) -> impl IntoView {
    let class = crate::tw!(concat!(BASE_CLASS, "-avatar"), class);

    view! {
        <div
            class={class}
            style:width={format!("{size}px")}
            style:height={format!("{size}px")}
        >
            <img class="rustlanges-avatar__img" src={url} alt={alt} />
        </div>
    }
}
