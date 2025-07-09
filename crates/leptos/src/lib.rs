pub(crate) use tailwind_fuse::tw_merge as tw;

pub mod avatar;
pub mod button;
pub mod icons;
pub mod radio;
pub mod tag;

pub mod inputs {
    pub use crate::radio::Radio;
}

pub mod prelude {
    pub use crate::avatar::Avatar;
    pub use crate::button::{Button, Variant as ButtonVariant};
    pub use crate::tag::Tag;

    pub use crate::radio::Radio as InputRadio;
}
