use leptos::prelude::{Children, ClassAttribute};
use leptos::{IntoView, component, view};
use tailwind_fuse::{AsTailwindClass, TwVariant};

#[derive(TwVariant)]
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
    #[prop(into, optional)] variant: Variant,
    #[prop(into)] label: String,
    #[prop] class: impl AsTailwindClass,
) -> impl IntoView {
    let class = crate::tw!(
        "relative flex justify-center gap-2",
        "h-6 w-20 px-5",
        "desktop:w-[167.5px] desktop:h-[47.5px] desktop:px-8",
        class
    );

    view! {
        <div class={class}>
            <svg
              viewBox="0 0 145 49"
              fill="none"
              preserveAspectRatio="none"
              className={crate::tw!(
                "desktop:px-3 absolute left-0 top-0 z-0 h-full w-full px-1",
                variant
              )}
            >
              <path
                d="M120.962 5.00869L141.872 30.4082C147.78 37.5847 142.676 48.3997 133.38 48.3997L12.488 48.3996C3.19249 48.3996 -1.91244 37.5847 3.99561 30.4082L24.906 5.00869C26.9955 2.47056 30.1108 1.00009 33.3984 1.00009L112.47 1.0001C115.757 1.0001 118.872 2.47057 120.962 5.00869Z"
                fill="currentColor"
                stroke="black"
              />
            </svg>
            <span
              className={crate::tw!(
                "z-10 flex h-fit w-full items-center justify-center gap-2 text-center font-medium text-neutral-950",
                (variant == Variant::Highlight).then_some("desktop:*:even:block pt-[3px] *:even:hidden"),
                "desktop:pt-1",
                "[&>svg]:h-3 [&>svg]:w-3",
              )}
            >
              {(variant == Variant::Highlight).then_some(view! { <> </> })}
              <span className="text-paragraph-2 desktop:pt-0 line-clamp-1 pt-px">
                {label}
              </span>
            </span>
        </div>
    }
}
