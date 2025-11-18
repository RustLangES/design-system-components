use components_core::concat;
use leptos::prelude::*;
use leptos::{IntoView, component, view};

use crate::icons::Ferris;

const BASE_CLASS: &str = concat!(components_core::BASE_CLASS, "-progress-bar");

#[component]
pub fn ProgressBar(#[prop(into)] percentage: ReadSignal<usize>) -> impl IntoView {
    let percentage = percentage.get();
    let progress_in_limit = percentage == 0 || percentage == 100;
    let progress_in_min_limit = percentage < 25;

    let min_limit_class = crate::tw!(
        concat!("text-overline ", BASE_CLASS, "__percentage"),
        progress_in_min_limit.then_some(concat!(
            "text-overline ",
            BASE_CLASS,
            "__percentage--invert"
        ))
    );

    let max_limit_class = crate::tw!(
        concat!(BASE_CLASS, "__fill"),
        progress_in_limit.then_some(concat!(BASE_CLASS, "__fill--limit"))
    );

    let percentage_str = format!("{percentage}%");

    view! {
        <div class={concat!(BASE_CLASS, "__container")}>
            <div class={BASE_CLASS}>
                <span
                    class=min_limit_class
                    style:right={progress_in_min_limit.then_some("auto".to_string()).unwrap_or_else(|| format!("{}%", 100 - percentage))}
                    style:left={progress_in_min_limit.then_some(percentage_str.clone()).unwrap_or_else(|| "auto".into())}
                >
                    {percentage_str.clone()}
                    <Ferris size=15 />
                </span>
                <div
                    class=max_limit_class
                    style:width=percentage_str
                />
            </div>
        </div>
    }
}
