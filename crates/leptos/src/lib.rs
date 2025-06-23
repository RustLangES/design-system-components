pub(crate) use tailwind_fuse::tw_merge as tw;

pub mod avatar;
pub mod button;
pub mod tag;

pub mod prelude {
    pub use crate::avatar::Avatar;
    pub use crate::button::{Button, Variant as ButtonVariant};
    pub use crate::tag::Tag;
}
