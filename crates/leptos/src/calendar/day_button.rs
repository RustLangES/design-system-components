use chrono::Datelike;
use leptos::prelude::*;

use super::{CalendarDay, Selection};

const DAY_SELECTED: &str = "bg-primary-500 text-light dark:text-neutral-950";
const DAY_DISABLED: &str = "opacity-50 cursor-not-allowed";

#[component]
pub fn CalendarDayButton(day: CalendarDay, selection: Selection) -> impl IntoView {
    let CalendarDay {
        date,
        current_month,
    } = day;
    let disabled = !current_month;
    let selected = move || selection.is_selected(date);

    let class = move || {
        crate::tw!(
            "mb-1 flex w-full min-h-9 min-w-9 cursor-pointer appearance-none items-center justify-center rounded-sm border-2 text-sm font-medium transition",
            "border-black",
            "dark:border-neutral-50",
            disabled.then_some(DAY_DISABLED),
            selected().then_some(DAY_SELECTED)
        )
    };

    view! {
        <button
            type="button"
            class=class
            aria-selected=move || selected().to_string()
            data-date=date.to_string()
            on:click=move |_| {
                if !disabled {
                    selection.select(date);
                }
            }
        >
            {date.day()}
        </button>
    }
}
