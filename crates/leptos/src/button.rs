use components_core::{BASE_CLASS, concat};
use leptos::prelude::*;
use tailwind_fuse::{AsTailwindClass, TwVariant};

#[derive(TwVariant, PartialEq)]
pub enum Variant {
    #[tw(default, class = "rustlanges-button--primary")]
    Primary,
    #[tw(class = "rustlanges-button--secondary")]
    Secondary,
    #[tw(class = "rustlanges-button--text")]
    Text,
    #[tw(class = "rustlanges-button--icon")]
    Icon,
}

#[component]
pub fn Button(
    #[prop(into, optional)] variant: Variant,
    #[prop(into, optional)] label: String,
    #[prop(into, optional)] class: String,
    #[prop(into)] icon: Option<Children>,
) -> impl IntoView {
    let class = crate::tw!(
        variant,
        concat!("text-button ", BASE_CLASS, "-button"),
        class
    );

    view! {
        <button class={class}>
            {(variant != Variant::Icon).then_some(label)}
            {(variant == Variant::Icon).then(|| icon.map(|icon| icon())).flatten()}
        </button>
    }
}
