use leptos::prelude::{Children, ClassAttribute};
use leptos::{IntoView, component, view};
use tailwind_fuse::{AsTailwindClass, TwVariant};

#[component]
pub fn Tag(
    #[prop(into)] label: String,
    #[prop(into, optional)] selected: bool,
    #[prop] class: impl AsTailwindClass,
) -> impl IntoView {
    let class = crate::tw!(
        selected.then_some(
            "bg-secondary-100 border-secondary-600 text-secondary-600 dark:bg-primary-950 dark:border-primary-500 dark:text-primary-500",
        ).or_else(|| Some(
            "bg-light text-black border-black dark:bg-neutral-950 dark:text-neutral-50 dark:border-neutral-50",
        )),
        "grid h-7 cursor-pointer place-items-center rounded-[20px] border px-2 text-xs font-semibold transition",
        class
    );

    view! {
        <div class={class}>
            {label}
        </div>
    }
}
