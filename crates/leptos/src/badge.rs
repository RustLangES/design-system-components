use components_core::{BASE_CLASS, concat};
use leptos::prelude::*;
use leptos::{IntoView, component, view};

const LIMIT_NUMERIC: isize = 9;
const LIMIT_NUMERIC_NEGATIVE: isize = -9;

#[derive(Default, Debug, PartialEq)]
pub enum Variant {
    Completed,
    Reading,
    #[default]
    Pending,
    Unread,
}

impl Variant {
    pub fn text(&self) -> &'static str {
        match self {
            Variant::Completed => "Completo",
            Variant::Reading => "Leyendo",
            Variant::Pending => "Pendiente",
            Variant::Unread => "No leido",
        }
    }
}

#[derive(Default, Debug, PartialEq)]
pub enum Type {
    #[default]
    Default,
    Numeric,
    Text,
}

#[component]
pub fn Badge(
    #[prop(into)] count: ReadSignal<isize>,
    #[prop(into, optional)] variant: Variant,
    #[prop(into, optional)] r#type: Type,
) -> impl IntoView {
    let class = crate::tw!(
        concat!("text-paragraph-2 ", BASE_CLASS, "-badge"),
        format!("{BASE_CLASS}-badge--variant-{variant:?}"),
        format!("{BASE_CLASS}-badge--type-{type:?}"),
    );

    let display_value = move || match r#type {
        Type::Default => count.get().to_string(),
        Type::Numeric => {
            let count = count.get();
            match count {
                ..=LIMIT_NUMERIC_NEGATIVE => LIMIT_NUMERIC_NEGATIVE.to_string(),
                LIMIT_NUMERIC.. => format!("+{LIMIT_NUMERIC}"),
                _ => count.to_string(),
            }
        }
        Type::Text => variant.text().to_string(),
    };

    view! {
        <div
          class={class}
        >
          <div class={concat!(BASE_CLASS, "-badge__dot")} />
          <span>{display_value}</span>
        </div>
    }
}
