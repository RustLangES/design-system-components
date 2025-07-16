use components_core::{BASE_CLASS, concat};
use leptos::prelude::*;
use leptos::{IntoView, component, view};

use crate::icons::{Location, StarBold};

#[derive(Default, Debug, PartialEq)]
pub enum Variant {
    #[default]
    Featured,
    Numeric,
    Description,
    Location,
    Small,
}

impl Variant {
    pub fn icon(&self) -> Option<AnyView> {
        match self {
            Variant::Featured => Some(view! { <StarBold /> }.into_any()),
            Variant::Small | Variant::Location => Some(view! { <Location /> }.into_any()),
            _ => None,
        }
    }
}

#[component]
pub fn Chip(
    #[prop(into)] label: String,
    #[prop(into, optional)] class: String,
    #[prop(into, optional)] variant: Variant,
) -> impl IntoView {
    let class = crate::tw!(
        concat!(BASE_CLASS, "-chip"),
        format!("{BASE_CLASS}-chip--{variant:?}"),
        class
    );

    view! {
        <div class=class>
            {variant.icon()}
            {(variant != Variant::Numeric).then_some(format!("#{label}")).unwrap_or(label)}
        </div>
    }
}
