use components_core::{BASE_CLASS, concat};
use leptos::prelude::*;
use leptos::{IntoView, component, view};

use crate::icons::{Filter as FilterIcon, Search as SearchIcon};
use crate::tag::Tag;

#[derive(Clone, Debug)]
pub struct Filter {
    pub label: String,
    pub value: String,
}

#[component]
pub fn InputSearch(
    #[prop(into, optional)] filters: Option<Vec<Filter>>,
    #[prop(into, optional)] active_filters: Vec<Filter>,
    #[prop(into)] on_change_filter: Callback<Vec<Filter>, ()>,
) -> impl IntoView {
    let (filter_modal, set_filter_modal) = signal(false);
    let has_filter = filters.as_ref().map_or(false, |f| !f.is_empty());

    let handle_select_filter = {
        let active_filters = active_filters.clone();

        move |filter: Filter, is_selected: bool| {
            if !is_selected {
                let mut new_filters = active_filters.clone();
                new_filters.push(filter);
                on_change_filter.run(new_filters);
            } else {
                let new_filters = active_filters
                    .iter()
                    .filter(|f| f.value != filter.value)
                    .cloned()
                    .collect();
                on_change_filter.run(new_filters);
            }
        }
    };

    let handle_close_on_click_input = move || {
        if has_filter {
            set_filter_modal.set(false);
        }
    };

    view! {
        <div class=concat!(BASE_CLASS, "-input-search-container")>
            <label
                class=crate::tw!(
                    concat!(BASE_CLASS, "-input-search"),
                    has_filter.then_some(concat!(BASE_CLASS, "-input-search--filter"))
                )
            >
                <SearchIcon size=24 />
                <input
                    type="text"
                    placeholder="Buscar"
                    on:click=move |_| handle_close_on_click_input()
                    class="text-caption"
                />
            </label>
            <div class=concat!(BASE_CLASS, "-input-search__filter")>
                {has_filter.then(|| view! {
                    <button on:click=move |_| set_filter_modal.update(|v| *v = !*v) tabindex="0">
                        <FilterIcon size=24 />
                    </button>
                })}
                <div
                    class=crate::tw!(
                        concat!(BASE_CLASS, "-input-search-backdrop__content"),
                        filter_modal.get().then_some(concat!(BASE_CLASS, "-input-search-backdrop__content--open"))
                            .unwrap_or(concat!(BASE_CLASS, "-input-search-backdrop__content--closed"))
                    )
                >
                    {filter_modal.get().then(|| {
                        view! {
                        <ul class=concat!(BASE_CLASS, "-input-search-backdrop__list")>
                            {filters.map(|filters| filters.iter().map(|filter| {
                                let is_selected = active_filters.iter().any(|f| f.value == filter.value);
                                let filter = filter.clone();
                                let handle_select_filter = handle_select_filter.clone();
                                view! {
                                    <li
                                        on:click=move |_| handle_select_filter(filter.clone(), is_selected)
                                    >
                                        <Tag
                                            selected=is_selected
                                            label=filter.label.clone()
                                        />
                                    </li>
                                }
                            }).collect::<Vec<_>>()).unwrap_or_default()}
                        </ul>
                    }})}
                </div>
            </div>
        </div>
    }
}
