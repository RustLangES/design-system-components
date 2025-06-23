pub(crate) use tailwind_fuse::tw_merge as tw;

pub mod button;

pub mod prelude {
    pub use crate::button::{Button, Variant as ButtonVariant};
}
