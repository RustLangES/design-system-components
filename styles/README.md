# RustLangES Design System styles

### Installation

> [!WARNING]
> Both deploys are pending and subject to change.

```bash
$ npm install @rustlanges/styles
```

or by cdn

```html
<link rel="stylesheet" href="https://styles.rustlang-es.org/bundled.css" />
```

## Usage

### Using tailwindcss

In your tailwindcss's styles file import `@rustlanges/styles`, or import just
the modules needed.


```css
/* For complete theme */
@import "@rustlanges/styles";

/* For modular theme */
@import "@rustlanges/styles/theme";
@import "@rustlanges/styles/breakpoints";
@import "@rustlanges/styles/components";
@import "@rustlanges/styles/utilities";

@import "@rustlanges/styles/components/text";
@import "@rustlanges/styles/utilities/shadow";
```

> [!NOTE]
> Importing `@rustlanges/styles` also import default theme from tailwindcss
> `tailwindcss/theme` and `tailwindcss/utilities` but don't reset styles.

### Using vite:

```js
// With tailwindcss installed
import "@rustlanges/styles";

// Without tailwindcss installed
import "@rustlanges/styles/bundled.css";
```

> [!NOTE]
> Just import component styles and some utilities classes defined in [safelist.txt](./safelist.txt).

## Project structure

```
.
├── components/
└── utilities/
```
