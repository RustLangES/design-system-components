use components_core::{BASE_CLASS, concat};
use leptos::prelude::*;
use leptos::{IntoView, component, view};

#[derive(Default, Debug, PartialEq)]
pub enum Variant {
    #[default]
    N1,
    N2,
    N3,
    OP,
}

impl ToString for Variant {
    fn to_string(&self) -> String {
        match self {
            Variant::N1 => "N1".into(),
            Variant::N2 => "N2".into(),
            Variant::N3 => "N3".into(),
            Variant::OP => "Op".into(),
        }
    }
}

#[component]
pub fn Level(
    #[prop(into, optional)] variant: Variant,
    #[prop(into, optional)] class: String,
) -> impl IntoView {
    let variant = variant.to_string();
    let class = crate::tw!(
        concat!(BASE_CLASS, "-level"),
        format!("{BASE_CLASS}-level--{}", variant.to_lowercase()),
        class
    );

    view! {
        <div class=class>
            {variant}
        </div>
    }
}
