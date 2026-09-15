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
    pub use crate::{
        avatar::Avatar,
        badge::{Badge, Type as BadgeType, Variant as BadgeVariant},
        button::{Button, Variant as ButtonVariant},
        card::Card,
        chip::{Chip, Variant as ChipVariant},
        flap::Flap,
        input::{Filter as SearchFilter, Input, InputSearch},
        level::{Level, Variant as LevelVariant},
        progress_bar::ProgressBar,
        tag::Tag,
    };

    pub use crate::radio::Radio as InputRadio;
}
