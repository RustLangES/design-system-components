use chrono::{Datelike, Days, Months, NaiveDate, Weekday};

#[derive(Clone)]
pub struct CalendarDay {
    pub date: NaiveDate,
    pub current_month: bool,
}

pub const MONTH_NAMES: [&str; 12] = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];

pub fn month_label(date: NaiveDate) -> String {
    let month = MONTH_NAMES[date.month0() as usize];
    let year = date.year();
    format!("{month} {year}")
}

pub fn calendar_days(date: NaiveDate) -> Vec<CalendarDay> {
    let first = date.with_day(1).expect("every month has a day 1");
    let last = first + Months::new(1) - Days::new(1);
    let end = last.week(Weekday::Mon).last_day();

    first
        .week(Weekday::Mon)
        .first_day()
        .iter_days()
        .take_while(|day| *day <= end)
        .map(|day| CalendarDay {
            date: day,
            current_month: day.month() == date.month(),
        })
        .collect()
}
