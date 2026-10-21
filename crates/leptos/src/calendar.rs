use crate::{
    button::{Button, Variant as ButtonVariant},
    icons::{ArrowLeft, ArrowRight},
};
pub use chrono::NaiveDate;
use chrono::{Local, Months};
pub use date::{CalendarDay, MONTH_NAMES, calendar_days, month_label};
use leptos::prelude::*;
pub use selection::{CalendarRange, Selection};

mod date;
mod day_button;
mod selection;

use day_button::CalendarDayButton;

pub const WEEK_DAYS: [&str; 7] = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo",
];

#[component]
pub fn Calendar(
    selection: Selection,
    #[prop(optional)] default_month: Option<NaiveDate>,
    #[prop(into, optional)] class: String,
) -> impl IntoView {
    let month = RwSignal::new(default_month.unwrap_or_else(|| Local::now().date_naive()));

    let class = crate::tw!(
        "shadow-rb-black grid gap-4 rounded-[20px] px-3 pt-4 pb-10",
        "bg-light border-2 border-black text-black",
        "dark:bg-neutral-900 dark:border-neutral-950 dark:text-neutral-50",
        class
    );

    view! {
        <div class=class>
            <div class="flex items-center justify-between">
                <Button
                    class="size-7 border-2"
                    variant=ButtonVariant::Icon
                    icon=view! { <ArrowLeft size=20 /> }.into_any()
                    on_click=move |_| month.update(|m| *m = *m - Months::new(1))
                />
                <p class="flex-1 text-center text-sm font-medium">
                    {move || month_label(month.get())}
                </p>
                <Button
                    class="size-7 border-2"
                    variant=ButtonVariant::Icon
                    icon=view! { <ArrowRight size=20 /> }.into_any()
                    on_click=move |_| month.update(|m| *m = *m + Months::new(1))
                />
            </div>
            <ul class="grid grid-cols-7 gap-x-1 text-center" role="grid">
                {WEEK_DAYS
                    .iter()
                    .map(|day| view! { <li class="mb-1.5 min-w-9 text-xs">{&day[..2]}</li> })
                    .collect_view()}
                <For
                    each=move || calendar_days(month.get())
                    key=|day| day.date.to_string()
                    children=move |day| {
                        view! {
                            <li>
                                <CalendarDayButton day selection=selection />
                            </li>
                        }
                    }
                />
            </ul>
        </div>
    }
}
