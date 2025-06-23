use leptos::prelude::{Children, ClassAttribute};
use leptos::{IntoView, component, view};
use tailwind_fuse::{AsTailwindClass, TwVariant};

#[derive(TwVariant)]
pub enum Variant {
    #[default]
    #[tw(
        default,
        class = "border rounded-2xl bg-primary-500 border-black text-black shadow-rb-black dark:bg-primary-300 hover:bg-primary-600 dark:hover:bg-primary-400 active:shadow-none disabled:bg-neutral-100 disabled:shadow-none disabled:border-neutral-400 disabled:text-neutral-400 dark:disabled:bg-neutral-950"
    )]
    Primary,
    #[tw(
        class = "border rounded-2xl bg-light text-neutral-950 border-neutral-950 shadow-rb-neutral-950 dark:bg-dark dark:text-light dark:border-light dark:shadow-rb-neutral-50 hover:shadow-rb-primary-500 hover:border-primary-500 hover:text-primary-500 disabled:bg-neutral-100 disabled:text-neutral-400 disabled:border-neutral-400! disabled:shadow-none dark:disabled:bg-neutral-950 active:shadow-none"
    )]
    Secondary,
    #[tw(
        class = "text-neutral-950 hover:text-primary-600 dark:text-light dark:hover:text-primary-300"
    )]
    Text,
    #[tw(
        class = "rounded-full border aspect-square p-2! !h-fit bg-light border-black text-black dark:bg-dark dark:border-light dark:text-light hover:text-primary-500 hover:border-primary-500"
    )]
    Icon,
}

#[component]
pub fn Button(
    #[prop(into, optional)] variant: Variant,
    #[prop(into, optional)] label: Option<String>,
    #[prop(into, optional)] disabled: bool,
    #[prop(into, optional)] icon: Children,
    #[prop(into, optional)] class: impl AsTailwindClass,
) -> impl IntoView {
    let class = crate::tw!(
        variant,
        "text-button flex h-12 w-fit cursor-pointer items-center justify-center gap-2.5 px-8 transition disabled:cursor-not-allowed",
        "[&>svg]:size-6",
        class
    );

    view! {
        <button class={class}>
            {(variant != Variant::Icon).then_some(label).flatten()}
            {(variant == Variant::Icon).then_some(icon()).flatten()}
        </button>
    }
}
