use components_core::{BASE_CLASS, concat};
use leptos::prelude::*;
use leptos::{IntoView, component, view};

#[component]
pub fn Tag(
    #[prop(into)] label: String,
    #[prop(into, optional)] selected: bool,
    #[prop(into, optional)] class: String,
) -> impl IntoView {
    let class = crate::tw!(
        selected
            .then_some(concat!(BASE_CLASS, "-tag--selected"),)
            .or_else(|| Some(concat!(BASE_CLASS, "-tag--default"),)),
        concat!(BASE_CLASS, "-tag"),
        class
    );

    view! {
        <div class={class}>
            {label}
        </div>
    }
}
