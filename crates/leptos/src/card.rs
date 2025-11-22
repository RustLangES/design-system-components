use components_core::{BASE_CLASS, concat};
use leptos::prelude::*;

#[derive(Default, Debug, PartialEq)]
pub enum Variant {
    #[default]
    Normal,
    Resource,
}

#[component]
pub fn Card(
    children: Children,
    #[prop(into, optional, default = Variant::Normal)] variant: Variant,
    #[prop(into, optional)] class: String,
    #[prop(into, optional, default = false)] clickable: bool,
    #[prop(into, optional, default = false)] disabled: bool,
) -> impl IntoView {
    let mut class = crate::tw!(
        concat!(BASE_CLASS, "-card"),
        clickable.then_some(concat!(BASE_CLASS, "-card--clickable")),
        disabled.then_some(concat!("disabled ", BASE_CLASS, "-card--disabled")),
        class
    );

    if variant == Variant::Resource {
        class = format!("{}-card--resource relative", BASE_CLASS);

        return view! {
            <div class={class}>
                <svg viewBox="0 0 334 444" fill="none" xmlns="http://www.w3.org/2000/svg" class="drop-shadow-resource-card">
                    <path d="M267.221 2C275.589 2 283.519 5.74306 288.838 12.2038L325.617 56.8794C329.744 61.892 332 68.1829 332 74.6756V414C332 429.464 319.464 442 304 442H30C14.536 442 2 429.464 2 414V30C2 14.536 14.536 2 30 2H267.221Z" fill="#3D3D3D" stroke="black" stroke-width="2"/>
                </svg>
                <div class="rustlanges-card--resource-body">
                {children()}
                </div>
            </div>
        }.into_any();
    }

    view! {
        <div class={class}>
            {children()}
        </div>
    }
    .into_any()
}
