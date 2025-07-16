use components_core::{BASE_CLASS, concat};
use leptos::prelude::*;
use leptos::{IntoView, component, view};
use tailwind_fuse::{AsTailwindClass, TwVariant};

use crate::icons::StarBold;

#[derive(TwVariant, PartialEq)]
pub enum Variant {
    #[tw(default, class = "text-primary-400")]
    Highlight,
    #[tw(class = "text-primary-200")]
    Numeric,
    #[tw(class = "text-secondary-400")]
    Descritive,
}

#[component]
pub fn Flap(
    #[prop(into)] label: String,
    #[prop(into, optional)] variant: Variant,
    #[prop(into, optional)] class: String,
) -> impl IntoView {
    let class = crate::tw!(concat!(BASE_CLASS, "-flap"), class);

    view! {
        <div title={label.clone()} class={class}>
            <svg
                viewBox="0 0 145 49"
                fill="none"
                preserveAspectRatio="none"
                class={crate::tw!(concat!(BASE_CLASS, "-flap__svg"), variant)}
            >
                <path
                    d="M120.962 5.00869L141.872 30.4082C147.78 37.5847 142.676 48.3997 133.38 48.3997L12.488 48.3996C3.19249 48.3996 -1.91244 37.5847 3.99561 30.4082L24.906 5.00869C26.9955 2.47056 30.1108 1.00009 33.3984 1.00009L112.47 1.0001C115.757 1.0001 118.872 2.47057 120.962 5.00869Z"
                    fill="currentColor"
                    stroke="black"
                />
            </svg>
            <span
                class={crate::tw!(
                    concat!(BASE_CLASS, "-flap__view"),
                    (variant == Variant::Highlight).then_some(concat!(BASE_CLASS, "-flap__view--icon")),
                )}
            >
                {(variant == Variant::Highlight).then_some(view! { <StarBold /> })}
                <span class={concat!("text-paragraph-2 ", BASE_CLASS, "-flap__view-text")}>
                    {label.clone()}
                </span>
            </span>
        </div>
    }
}
