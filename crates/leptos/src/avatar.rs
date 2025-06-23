use leptos::prelude::{Children, ClassAttribute};
use leptos::{IntoView, component, view};
use tailwind_fuse::{AsTailwindClass, TwVariant};

#[component]
pub fn Avatar(
    #[prop(into)] url: String,
    #[prop(into, optional)] alt: Option<String>,
    #[prop(into, optional, default = "32")] size: Option<i32>,
    #[prop] class: impl AsTailwindClass,
) -> impl IntoView {
    let class = crate::tw!(
        "grid aspect-square place-items-center overflow-hidden rounded-full border object-cover",
        class
    );

    view! {
        <div class={class}>
            <img class="aspect-square h-full w-full" src={url} alt={alt} />
        </div>
    }
}
