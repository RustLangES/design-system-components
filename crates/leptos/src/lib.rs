pub(crate) use tailwind_fuse::tw_merge as tw;

pub mod avatar;
pub mod badge;
pub mod button;
pub mod card;
pub mod chip;
pub mod flap;
pub mod icons;
pub mod input;
pub mod level;
pub mod progress_bar;
pub mod radio;
pub mod tag;

pub mod inputs {
    pub use crate::radio::Radio;
}

pub mod prelude {
    pub use crate::avatar::Avatar;
    pub use crate::badge::{Badge, Type as BadgeType, Variant as BadgeVariant};
    pub use crate::button::{Button, Variant as ButtonVariant};
    pub use crate::card::Card;
    pub use crate::chip::{Chip, Variant as ChipVariant};
    pub use crate::flap::Flap;
    pub use crate::input::Input;
    pub use crate::level::{Level, Variant as LevelVariant};
    pub use crate::progress_bar::ProgressBar;
    pub use crate::tag::Tag;

    pub use crate::radio::Radio as InputRadio;
}
