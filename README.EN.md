<div align="right">
    <a href="./README.ES.md"> :es: ES </a>
</div>

<img src="./.github/banner.png" width="100%" alt="RustLangES Design System">

## :rocket: Introduction

The RustLangES Design System serves as the single source of truth for UI components across Spanish Rust community projects. It provides accessible, consistent, and high-quality components for multiple technologies.

## :package: Installation

```bash
# For React projects
pnpm add @rustlanges/react

# For Leptos projects (Rust)
cargo add rustlanges-leptos
```

## :sparkles: Key Features

- **Multi-framework**: Support for React, Leptos, and more
- **Light/dark mode**: Automatic system theme compatibility
- **Accessibility**: WCAG 2.1 AA compliant components
- **Design system**: Based on [Figma](https://www.figma.com/design/S9yCZSaZ9q54XSojWNhJft/Rust-Lang-ES)

## :building_construction: Project Structure

```
.
├── crates/          # Rust components
└── js/              # JavaScript components
```

## :art: Component Usage

### React
```tsx
import { Button, TelegramIcon } from "@rustlanges/react";

function App() {
  return (
    <Button 
      variant="primary"
      icon={<TelegramIcon />}
      label="Send"
    />
  );
}
```

### Leptos
```rust
use rustlanges_leptos::components::Button;

view! {
    <Button variant=ButtonVariant::Primary>
        "Hello Rust!"
    </Button>
}
```

## :paintbrush: Design System

All components follow specifications from our [official Figma](https://www.figma.com/design/S9yCZSaZ9q54XSojWNhJft/Rust-Lang-ES):

- :triangular_ruler: [Design Guidelines](https://www.figma.com/file/S9yCZSaZ9q54XSojWNhJft/Rust-Lang-ES?node-id=0%3A1)
- :art: [Color Palette](https://www.figma.com/file/S9yCZSaZ9q54XSojWNhJft/Rust-Lang-ES?node-id=1%3A2)
- :pencil2: [Iconography](https://www.figma.com/file/S9yCZSaZ9q54XSojWNhJft/Rust-Lang-ES?node-id=24-117)

## :hammer_and_wrench: Development

1. Clone the repository:
```bash
git clone https://github.com/rustlanges/design-system.git
cd design-system
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development environment:
```bash
pnpm run dev
```

## :handshake: Contributing

Follow our [contribution guide](CONTRIBUTING.EN.md) to:
- :new: Add new components
- :bug: Report issues
- :sparkles: Suggest improvements

**Important**: All components must:
1. Follow Figma specifications
2. Pass accessibility tests
3. Include documentation

## :page_facing_up: License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

---

<div align="center">
  <img src="./.github/RustLangES_Logo.png" width="200" alt="RustLangES logo">
  <p>Part of the RustLangES ecosystem</p>
</div>
