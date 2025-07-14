use components_core::{BASE_CLASS, concat};
use leptos::prelude::ClassAttribute;
use leptos::{IntoView, component, view};

#[component]
pub fn Radio(#[prop(into, optional)] class: String) -> impl IntoView {
    let class = crate::tw!(concat!(BASE_CLASS, "-radio"), class);

    view! {
        <input type="radio" class={class} />
    }
}
