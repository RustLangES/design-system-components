<div align="right">
    <a href="./CONTRIBUTING.EN.md"> :us: EN </a>
</div>

# Guía de Contribución para el Design System de RustLangES

## Introducción

Bienvenido al repositorio de componentes de RustLangES. Esta guía te ayudará a contribuir efectivamente al Design System, ya sea que estés añadiendo nuevos componentes, mejorando los existentes o corrigiendo problemas.

## Estructura del Repositorio

El repositorio está organizado de la siguiente manera:

```
.
├── crates/          # Componentes para Rust
├── js/              # Componentes para JavaScript
│   └── react/
│       ├── lib/     # Biblioteca de componentes
│       │   ├── components/  # Componentes individuales
│       │   ├── icons/       # Iconos del sistema
│       │   └── utils/       # Utilidades compartidas
│       └── showcase/        # Demostración interactiva
├── flake.nix        # Configuración de Nix
└── package.json     # Configuración principal de pnpm
```

## Requisitos Previos

- Node.js _v22_
- pnpm _v10_ (gestor de paquetes)
- Conocimiento básico de:
  - React _v19_ (para componentes JS)
  - Tailwind CSS _v4_ (para estilos)
  - TypeScript _v5_ (para tipado)

## Configuración Inicial

1. Clona el repositorio:
   ```bash
   git clone https://github.com/RustLangES/design-system-components.git
   cd design-system-components
   ```

2. Instala dependencias:
   ```bash
   pnpm install
   ```

3. Inicia el entorno de desarrollo:
   ```bash
   pnpm run dev
   ```

## Flujo de Trabajo

1. **Crea una rama** con el formato `<tech>/<component>`:
   ```bash
   git checkout -b react/button-group
   ```

2. Realiza tus cambios siguiendo las convenciones.

3. Ejecuta las pruebas y verificaciones:
   ```bash
   pnpm run lint
   pnpm run check:tsc
   ```

4. Haz commit de tus cambios con mensajes descriptivos.

5. Abre un Pull Request contra la rama `main`.

## Creación de Nuevos Componentes

### Para Componentes React

1. Crea una nueva carpeta en `js/react/lib/components/` con el nombre del componente (ej. `button-group`).

2. Estructura los archivos como sigue:
   ```
   button-group/
   ├── button-group.component.tsx  # Implementación del componente
   ├── button-group.const.ts       # Constantes y estilos
   ├── button-group.types.ts       # Tipos TypeScript (opcional)
   └── index.ts                    # Exportación pública
   ```

3. Implementa el componente siguiendo el estilo definido en [Figma](https://www.figma.com/design/S9yCZSaZ9q54XSojWNhJft/Rust-Lang-ES).

4. Usa Tailwind CSS para los estilos, definiendo las variantes en el archivo `.const.ts`.

5. Exporta el componente en `index.ts`:
   ```typescript
   export { default } from './button-group.component';
   export * from './button-group.types'; // Si aplica
   ```

6. Actualiza el archivo `js/react/lib/index.ts` para exportar el nuevo componente.

#### Ejemplo de implementación en React

**button-group.const.ts**:
```typescript
export const BUTTON_GROUP_VARIANTS = {
  primary: "bg-blue-500 text-white",
  secondary: "bg-gray-200 text-gray-800",
  // ... otras variantes
};
```

**button-group.component.tsx**:
```typescript
import { BUTTON_GROUP_VARIANTS } from './button-group.const';

interface ButtonGroupProps {
  variant?: keyof typeof BUTTON_GROUP_VARIANTS;
  // ... otras props
}

export default function ButtonGroup({ variant = 'primary', ...props }: ButtonGroupProps) {
  const baseClasses = "flex rounded-md overflow-hidden";
  const variantClasses = BUTTON_GROUP_VARIANTS[variant];
  
  return (
    <div className={`${baseClasses} ${variantClasses}`}>
      {/* Implementación del componente */}
    </div>
  );
}
```

## Convenciones de Código

1. **Estilos**: Usa Tailwind CSS siguiendo el diseño de Figma. Evita estilos inline cuando sea posible.

2. **Tipado**: Usa TypeScript estrictamente. Define interfaces para las props de los componentes.

3. **Estructura**: Sigue la estructura de archivos existente (componente, constantes, tipos).

4. **Nombramiento**:
   - Nombres de archivos: kebab-case (`button-group.component.tsx`)
   - Nombres de componentes: PascalCase (`ButtonGroup`)
   - Nombres de constantes: UPPER_SNAKE_CASE (`BUTTON_GROUP_VARIANTS`)

5. **Documentación**: Incluye comentarios JSDoc para componentes y props complejas.

## Testing y Demostración

1. **Showcase**: Añade ejemplos de uso en `js/react/showcase/App.tsx` siguiendo el patrón existente:
   ```typescript
   <ShowComponent
     title="Button Group"
     propsDef={{
       variant: {
         type: "string",
         options: ["primary", "secondary"],
         default: "primary",
       },
       // ... otras props
     }}
     component={ButtonGroup}
   />
   ```

2. **Verificación**:
   - Ejecuta `pnpm run lint` para verificar el estilo de código.
   - Ejecuta `pnpm run check:tsc` para verificar los tipos.
   - Ejecuta `pnpm run build` para asegurar que el componente se construye correctamente.

## Directrices para Pull Requests

1. **Título descriptivo**: Ej. "feat(react): add ButtonGroup component"

2. **Descripción detallada**:
   - Propósito del cambio
   - Capturas de pantalla (para cambios visuales)
   - Lista de cambios

3. **Referencias**: Enlaza a issues relacionados o diseños en Figma.

4. **Verificaciones**: Asegúrate de que:
   - Todos los tests pasan
   - El código sigue las convenciones
   - La documentación está actualizada

## Uso de Iconos en los Componentes

1. **Iconos Disponibles**:
   - El proyecto ya cuenta con un conjunto de iconos establecidos que se encuentran en `js/react/lib/icons/`.
   - Todos los iconos disponibles están exportados desde `js/react/lib/icons/index.ts`.

2. **Cómo Usar los Iconos**:
   - Importa los iconos directamente desde la ruta de icons:
     ```typescript
     import { Github, Telegram, ArrowRight } from "@rustlanges/react";
     ```
   - Los iconos deben usarse como componentes React y pueden recibir props opcionales como `size` y `color` cuando sea necesario.

3. **Integración con Componentes**:
   - Cuando un componente requiera un icono (ej. Button, Alert, etc.), debe aceptar una prop `icon` que reciba un elemento React (el componente del icono):
     ```typescript
     <Button icon={<Telegram />} label="Enviar" />
     ```
   - Nunca crear nuevos iconos sin antes consultar con el equipo de diseño.

4. **Lista de Iconos Actuales**:
   ```
   Alert, ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Book, Close, 
   Discord, File, Github, Linkedin, Link, Location, Menu, Moon, 
   Project, Roadmap, Share, StarBold, SunLine, Telegram, Twitter, Youtube
   ```
   Todos los iconos están disponibles en el [nodo de iconos](https://www.figma.com/design/S9yCZSaZ9q54XSojWNhJft/Rust-Lang-ES?node-id=24-117&t=5z3NPbWGrqNUq2Uf-0) de Figma

5. **Ejemplo de Implementación Correcta**:
   ```typescript
   import { Button } from "./button.component";
   import { Telegram } from "../icons/telegram";

   function UsageExample() {
     return (
       <Button 
         variant="primary" 
         icon={<Telegram size={18} />} 
         label="Enviar mensaje" 
       />
     );
   }
   ```

6. **Prohibiciones**:
   - No incluir SVG inline en los componentes.
   - No usar paquetes de iconos externos.
   - No crear nuevos archivos de iconos sin aprobación.

7. **Solicitud de Nuevos Iconos**:
   - Si necesitas un icono que no existe, abre un issue describiendo:
     - Caso de uso
     - Referencia visual (preferiblemente del diseño en Figma)
     - Tamaños requeridos

## Soporte

Si tienes preguntas o necesitas ayuda:
- Revisa los issues existentes
- Consulta el diseño en Figma
- Pregunta en el canal de [Discord de RustLangES](https://discord.gg/S32wevFN4X)

¡Gracias por contribuir al Design System de RustLangES!
