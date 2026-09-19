mod alert;
mod arrow_down;
mod arrow_left;
mod arrow_right;
mod arrow_up;
mod book;
mod close;
mod discord;
mod ferris;
mod file;
mod filter;
mod github;
mod link;
mod linkedin;
mod location;
mod menu;
mod moon;
mod project;
mod roadmap;
mod search;
mod share;
mod star_bold;
mod sun_line;
mod sun_moon;
mod telegram;
mod twitter;
mod youtube;

pub use alert::Alert;
pub use arrow_down::ArrowDown;
pub use arrow_left::ArrowLeft;
pub use arrow_right::ArrowRight;
pub use arrow_up::ArrowUp;
pub use book::Book;
pub use close::Close;
pub use discord::Discord;
pub use ferris::Ferris;
pub use file::File;
pub use filter::Filter;
pub use github::Github;
pub use link::Link;
pub use linkedin::Linkedin;
pub use location::Location;
pub use menu::Menu;
pub use moon::Moon;
pub use project::Project;
pub use roadmap::Roadmap;
pub use search::Search;
pub use share::Share;
pub use star_bold::StarBold;
pub use sun_line::SunLine;
pub use sun_moon::SunMoon;
pub use telegram::Telegram;
pub use twitter::Twitter;
pub use youtube::Youtube;

use leptos::prelude::*;

pub enum IconVariant {
    Alert,
    ArrowDown,
    ArrowLeft,
    ArrowRight,
    ArrowUp,
    Book,
    Close,
    Discord,
    Ferris,
    File,
    Filter,
    Github,
    Link,
    Linkedin,
    Location,
    Menu,
    Moon,
    Project,
    Roadmap,
    Search,
    Share,
    StarBold,
    SunLine,
    SunMoon,
    Telegram,
    Twitter,
    Youtube,
}

impl IconVariant {
    pub fn to_view(&self) -> AnyView {
        match self {
            Self::Alert => view! {<Alert />}.into_any(),
            Self::ArrowDown => view! {<ArrowDown />}.into_any(),
            Self::ArrowLeft => view! {<ArrowLeft />}.into_any(),
            Self::ArrowRight => view! {<ArrowRight />}.into_any(),
            Self::ArrowUp => view! {<ArrowUp />}.into_any(),
            Self::Book => view! {<Book />}.into_any(),
            Self::Close => view! {<Close />}.into_any(),
            Self::Discord => view! {<Discord />}.into_any(),
            Self::Ferris => view! {<Ferris />}.into_any(),
            Self::File => view! {<File />}.into_any(),
            Self::Filter => view! {<Filter />}.into_any(),
            Self::Github => view! {<Github />}.into_any(),
            Self::Link => view! {<Link />}.into_any(),
            Self::Linkedin => view! {<Linkedin />}.into_any(),
            Self::Location => view! {<Location />}.into_any(),
            Self::Menu => view! {<Menu />}.into_any(),
            Self::Moon => view! {<Moon />}.into_any(),
            Self::Project => view! {<Project />}.into_any(),
            Self::Roadmap => view! {<Roadmap />}.into_any(),
            Self::Search => view! {<Search />}.into_any(),
            Self::Share => view! {<Share />}.into_any(),
            Self::StarBold => view! {<StarBold />}.into_any(),
            Self::SunLine => view! {<SunLine />}.into_any(),
            Self::SunMoon => view! {<SunMoon />}.into_any(),
            Self::Telegram => view! {<Telegram />}.into_any(),
            Self::Twitter => view! {<Twitter />}.into_any(),
            Self::Youtube => view! {<Youtube />}.into_any(),
        }
    }
}
