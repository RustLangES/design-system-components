<div align="right">
    <a href="./CONTRIBUTING.ES.md"> :es: ES </a>
</div>

# Contribution Guide for RustLangES Design System

## Introduction

Welcome to the RustLangES components repository. This guide will help you effectively contribute to the Design System, whether you're adding new components, improving existing ones, or fixing issues.

## Repository Structure

The repository is organized as follows:

```
.
├── crates/          # Rust components
├── js/              # JavaScript components
│   └── react/
│       ├── lib/     # Component library
│       │   ├── components/  # Individual components
│       │   ├── icons/       # System icons
│       │   └── utils/       # Shared utilities
│       └── showcase/        # Interactive demo
├── flake.nix        # Nix configuration
└── package.json     # Main pnpm configuration
```

## Prerequisites

- Node.js _v22_
- pnpm _v10_ (package manager)
- Basic knowledge of:
  - React _v19_ (for JS components)
  - Tailwind CSS _v4_ (for styling)
  - TypeScript _v5_ (for typing)

## Initial Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/RustLangES/design-system-components.git
   cd design-system-components
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development environment:
   ```bash
   pnpm run dev
   ```

## Workflow

1. **Create a branch** following the `<tech>/<component>` format:
   ```bash
   git checkout -b react/button-group
   ```

2. Make your changes following conventions.

3. Run tests and checks:
   ```bash
   pnpm run lint
   pnpm run check:tsc
   ```

4. Commit your changes with descriptive messages.

5. Open a Pull Request against the `main` branch.

## Creating New Components

### For React Components

1. Create a new folder in `js/react/lib/components/` with the component name (e.g., `button-group`).

2. Structure files as follows:
   ```
   button-group/
   ├── button-group.component.tsx  # Component implementation
   ├── button-group.const.ts       # Constants and styles
   ├── button-group.types.ts       # TypeScript types (optional)
   └── index.ts                    # Public exports
   ```

3. Implement the component following the style defined in [Figma](https://www.figma.com/design/S9yCZSaZ9q54XSojWNhJft/Rust-Lang-ES).

4. Use Tailwind CSS for styling, defining variants in the `.const.ts` file.

5. Export the component in `index.ts`:
   ```typescript
   export { default } from './button-group.component';
   export * from './button-group.types'; // If applicable
   ```

6. Update `js/react/lib/index.ts` to export the new component.

#### React Implementation Example

**button-group.const.ts**:
```typescript
export const BUTTON_GROUP_VARIANTS = {
  primary: "bg-blue-500 text-white",
  secondary: "bg-gray-200 text-gray-800",
  // ... other variants
};
```

**button-group.component.tsx**:
```typescript
import { BUTTON_GROUP_VARIANTS } from './button-group.const';

interface ButtonGroupProps {
  variant?: keyof typeof BUTTON_GROUP_VARIANTS;
  // ... other props
}

export default function ButtonGroup({ variant = 'primary', ...props }: ButtonGroupProps) {
  const baseClasses = "flex rounded-md overflow-hidden";
  const variantClasses = BUTTON_GROUP_VARIANTS[variant];
  
  return (
    <div className={`${baseClasses} ${variantClasses}`}>
      {/* Component implementation */}
    </div>
  );
}
```

## Code Conventions

1. **Styling**: Use Tailwind CSS following the Figma design. Avoid inline styles when possible.

2. **Typing**: Use TypeScript strictly. Define interfaces for component props.

3. **Structure**: Follow the existing file structure (component, constants, types).

4. **Naming**:
   - Filenames: kebab-case (`button-group.component.tsx`)
   - Component names: PascalCase (`ButtonGroup`)
   - Constant names: UPPER_SNAKE_CASE (`BUTTON_GROUP_VARIANTS`)

5. **Documentation**: Include JSDoc comments for complex components and props.

## Testing and Demonstration

1. **Showcase**: Add usage examples in `js/react/showcase/App.tsx` following existing patterns:
   ```typescript
   <ShowComponent
     title="Button Group"
     propsDef={{
       variant: {
         type: "string",
         options: ["primary", "secondary"],
         default: "primary",
       },
       // ... other props
     }}
     component={ButtonGroup}
   />
   ```

2. **Verification**:
   - Run `pnpm run lint` for code style verification.
   - Run `pnpm run check:tsc` for type checking.
   - Run `pnpm run build` to ensure proper component building.

## Pull Request Guidelines

1. **Descriptive title**: E.g., "feat(react): add ButtonGroup component"

2. **Detailed description**:
   - Purpose of changes
   - Screenshots (for visual changes)
   - Change list

3. **References**: Link related issues or Figma designs.

4. **Verifications**: Ensure:
   - All tests pass
   - Code follows conventions
   - Documentation is updated

## Icon Usage in Components

1. **Available Icons**:
   - The project includes an established icon set located in `js/react/lib/icons/`.
   - All available icons are exported from `js/react/lib/icons/index.ts`.

2. **How to Use Icons**:
   - Import icons directly from the icons path:
     ```typescript
     import { Github, Telegram, ArrowRight } from "@rustlanges/react";
     ```
   - Icons should be used as React components and can receive optional props like `size` and `color` when needed.

3. **Component Integration**:
   - When a component requires an icon (e.g., Button, Alert), it should accept an `icon` prop that receives a React element (the icon component):
     ```typescript
     <Button icon={<Telegram />} label="Send" />
     ```
   - Never create new icons without consulting the design team.

4. **Current Icon List**:
   ```
   Alert, ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Book, Close, 
   Discord, File, Github, Linkedin, Link, Location, Menu, Moon, 
   Project, Roadmap, Share, StarBold, SunLine, Telegram, Twitter, Youtube
   ```
   All icons are available in the [Figma icons node](https://www.figma.com/design/S9yCZSaZ9q54XSojWNhJft/Rust-Lang-ES?node-id=24-117&t=5z3NPbWGrqNUq2Uf-0)

5. **Correct Implementation Example**:
   ```typescript
   import { Button } from "./button.component";
   import { Telegram } from "../icons/telegram";

   function UsageExample() {
     return (
       <Button 
         variant="primary" 
         icon={<Telegram size={18} />} 
         label="Send message" 
       />
     );
   }
   ```

6. **Prohibitions**:
   - No inline SVGs in components.
   - No external icon packages.
   - No new icon files without approval.

7. **New Icon Requests**:
   - If you need a non-existent icon, open an issue describing:
     - Use case
     - Visual reference (preferably from Figma design)
     - Required sizes

## Support

If you have questions or need help:
- Review existing issues
- Check the Figma design
- Ask in the [RustLangES Discord channel](https://discord.gg/S32wevFN4X)

Thank you for contributing to the RustLangES Design System!
