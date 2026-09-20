use components_core::{BASE_CLASS, concat};
use leptos::{ev::MouseEvent, prelude::*};

#[derive(Default, Debug, PartialEq, Clone, Copy)]
pub enum Variant {
    #[default]
    Primary,
    Secondary,
    Text,
    Icon,
}

#[component]
pub fn Button(
    #[prop(into, optional)] variant: Variant,
    #[prop(into, optional)] class: Option<String>,
    on_click: impl FnMut(MouseEvent) + 'static,
    #[prop(into, optional)] icon: Option<AnyView>,
    #[prop(into, optional)] label: Option<String>,
) -> impl IntoView {
    let class = button_class(variant, class);

    view! {
        <button class=class on:click=on_click>
            {(variant != Variant::Icon).then_some(label)}
            {icon.into_view()}
        </button>
    }
}

pub fn button_class(variant: Variant, class: Option<String>) -> String {
    let var = format!(
        "{}{}",
        concat!(BASE_CLASS, "-button", "--"),
        format!("{variant:?}").to_lowercase()
    );

    crate::tw!("text-button", var, concat!(BASE_CLASS, "-button"), class)
}
