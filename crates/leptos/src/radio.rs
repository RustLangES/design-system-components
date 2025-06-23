use leptos::prelude::{Children, ClassAttribute};
use leptos::{IntoView, component, view};
use tailwind_fuse::{AsTailwindClass, TwVariant};

#[component]
pub fn Radio(#[prop] class: impl AsTailwindClass) -> impl IntoView {
    let class = crate::tw!(
        "shadow-rb-black aspect-square appearance-none transition",
        "flex size-4 items-center justify-center rounded-full border border-black",
        "after:absolute after:size-2 after:rounded-full after:transition",
        "dark:bg-dark bg-white",
        "after:bg-gray dark:after:bg-neutral-500",
        "checked:after:bg-primary-500",
        class
    );

    view! {
        <input type="radio" class={class} />
    }
}
