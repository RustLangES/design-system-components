use super::NaiveDate;
use leptos::prelude::*;
use std::collections::BTreeSet;

#[derive(Clone)]
pub struct CalendarRange {
    pub start: Option<NaiveDate>,
    pub end: Option<NaiveDate>,
}

impl CalendarRange {
    fn select(self, date: NaiveDate) -> Self {
        match (self.start, self.end) {
            (Some(start), None) => CalendarRange {
                start: Some(start.min(date)),
                end: Some(start.max(date)),
            },
            _ => CalendarRange {
                start: Some(date),
                end: None,
            },
        }
    }
}

// I don't know how to solve this, I just fix this shit adding Copy sorry 🙏😭 god of borrow
#[derive(Clone, Copy)]
pub enum Selection {
    Single(RwSignal<Option<NaiveDate>>),
    Multiple(RwSignal<BTreeSet<NaiveDate>>),
    Range(RwSignal<CalendarRange>),
}

impl Selection {
    pub fn is_selected(&self, date: NaiveDate) -> bool {
        match self {
            Selection::Single(value) => value.get() == Some(date),
            Selection::Multiple(value) => value.with(|dates| dates.contains(&date)),
            Selection::Range(value) => match value.get() {
                CalendarRange {
                    start: Some(start),
                    end: Some(end),
                } => (start..=end).contains(&date),
                CalendarRange { start, .. } => start == Some(date),
            },
        }
    }

    pub fn select(&self, date: NaiveDate) {
        match self {
            Selection::Single(value) => value.update(|current| {
                *current = (*current != Some(date)).then_some(date);
            }),
            Selection::Multiple(value) => value.update(|dates| {
                if !dates.remove(&date) {
                    dates.insert(date);
                }
            }),
            Selection::Range(value) => value.update(|range| *range = range.clone().select(date)),
        }
    }
}
