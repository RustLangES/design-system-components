use components_core::{BASE_CLASS, concat};
use leptos::prelude::*;

#[derive(Default, Debug, PartialEq)]
pub enum Variant {
    #[default]
    Primary,
    Secondary,
    Text,
    Icon,
}

#[component(transparent)]
pub fn Button(
    #[prop(into, optional)] variant: Variant,
    #[prop(into, optional)] label: String,
    #[prop(into, optional)] class: String,
    attrs: Vec<(&'static str, Attribute)>,
    icon: View<impl IntoView + Send + Sync>,
) -> impl IntoView {
    let var = format!("{}{variant:?}", concat!(BASE_CLASS, "-button", "--"));
    let class = crate::tw!("text-button", var, concat!(BASE_CLASS, "-button"), class);

    view! {
        <button class={class} {..attrs}>
            {(variant != Variant::Icon).then_some(label)}
            {(variant == Variant::Icon).then(|| icon.into_view())}
        </button>
    }
}
