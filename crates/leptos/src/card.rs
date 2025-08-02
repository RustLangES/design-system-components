use components_core::{BASE_CLASS, concat};
use leptos::prelude::*;

#[component]
pub fn Card(
    children: Children,
    #[prop(into, optional)] class: String,
    #[prop(into, optional, default = false)] clickable: bool,
    #[prop(into, optional, default = false)] disabled: bool,
) -> impl IntoView {
    let class = crate::tw!(
        concat!(BASE_CLASS, "-card"),
        clickable.then_some(concat!(BASE_CLASS, "-card--clickable")),
        disabled.then_some(concat!("disabled ", BASE_CLASS, "-card--disabled")),
        class
    );

    view! {
        <div class={class}>
            {children()}
        </div>
    }
}
