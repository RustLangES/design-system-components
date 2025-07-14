use components_core::{BASE_CLASS, concat};
use leptos::prelude::*;
use leptos::{IntoView, component, view};

#[component]
pub fn Input(
    #[prop(into)] has_error: ReadSignal<bool>,
    #[prop(into)] disabled: ReadSignal<bool>,
    #[prop(into, optional)] class: String,
    #[prop(into, optional)] error_message: String,
    #[prop(into)] icon: Option<Children>,
) -> impl IntoView {
    let input_class = crate::tw!(
        concat!(BASE_CLASS, "-input"),
        has_error
            .get()
            .then_some(concat!(BASE_CLASS, "-input--error")),
        class
    );

    view! {
        <div class={concat!(BASE_CLASS, "-input__container")}>
            <div class=input_class>
                {icon.map(|icon| view! { <span class={concat!(BASE_CLASS, "-input__icon")}>{icon()}</span> })}
                <input
                    class={concat!(BASE_CLASS, "-input__inner")}
                    disabled=disabled
                />
            </div>
            {has_error.get().then_some(
                view! { <span class={concat!(BASE_CLASS, "-input__error")}>{error_message}</span> }
            )}
        </div>
    }
}
