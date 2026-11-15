use components_core::{BASE_CLASS, concat};
use leptos::{IntoView, component, prelude::*, view};

use crate::{
    icons::{Filter as FilterIcon, Search as SearchIcon},
    tag::Tag,
};

#[derive(Clone, Debug, PartialEq)]
pub struct Filter {
    pub label: String,
    pub value: String,
}

#[component]
pub fn InputSearch(
    #[prop(into, optional)] filters: Option<Vec<Filter>>,
    #[prop(into, optional)] active_filters: Signal<Vec<Filter>>,
    #[prop(into, optional)] on_change_filter: Option<Callback<(Vec<Filter>,)>>,
    #[prop(into, optional)] on_input: Option<Callback<(String,)>>,
) -> impl IntoView {
    let (filter_modal, set_filter_modal) = signal(false);
    let filters = filters.unwrap_or_default();
    let has_filter = !filters.is_empty();

    let handle_select_filter = move |filter: Filter| {
        let mut new_filters = active_filters.get();
        if let Some(i) = new_filters.iter().position(|f| f.value == filter.value) {
            new_filters.remove(i);
        } else {
            new_filters.push(filter);
        }
        if let Some(on_change_filter) = on_change_filter {
            on_change_filter.run((new_filters,));
        }
    };

    view! {
        <div class=concat!(BASE_CLASS, "-input-search-container")>
            <label class=crate::tw!(
                concat!(BASE_CLASS, "-input-search"),
                    has_filter.then_some(concat!(BASE_CLASS, "-input-search--filter"))
            )>
                <SearchIcon size=24 />
                <input
                    type="text"
                    placeholder="Buscar"
                    on:click=move |_| set_filter_modal.set(false)
                    on:input=move |ev| {
                        if let Some(on_input) = on_input {
                            on_input.run((event_target_value(&ev),));
                        }
                    }
                    class="text-caption"
                />
            </label>
            <div class=concat!(
                BASE_CLASS,
                "-input-search__filter",
            )>
                {has_filter
                    .then(|| {
                        view! {
                            <button
                                type="button"
                                aria-label="Filtrar"
                                aria-expanded=move || filter_modal.get().to_string()
                                on:click=move |_| set_filter_modal.update(|v| *v = !*v)
                            >
                                <FilterIcon size=24 />
                            </button>
                        }
                    })}
                <div class=move || {
                    crate::tw!(
                        concat!(BASE_CLASS, "-input-search-backdrop__content"),
                            if filter_modal.get() {
                                concat!(BASE_CLASS, "-input-search-backdrop__content--open")
                            } else {
                                concat!(BASE_CLASS, "-input-search-backdrop__content--closed")
                            }
                    )
                }>
                    <ul class=concat!(
                        BASE_CLASS,
                        "-input-search-backdrop__list",
                    )>
                        {filters
                            .into_iter()
                            .map(|filter| {
                                let value = filter.value.clone();
                                let is_selected = Signal::derive(move || {
                                    active_filters.read().iter().any(|f| f.value == value)
                                });
                                let label = filter.label.clone();
                                view! {
                                    <li>
                                        <button
                                            type="button"
                                            class="cursor-pointer"
                                            aria-pressed=move || is_selected.get().to_string()
                                            on:click=move |_| handle_select_filter(filter.clone())
                                        >
                                            {move || {
                                                view! {
                                                    <Tag selected=is_selected.get() label=label.clone() />
                                                }
                                            }}
                                        </button>
                                    </li>
                                }
                            })
                            .collect_view()}
                    </ul>
                </div>
            </div>
        </div>
    }
}
