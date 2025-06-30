/// <reference types="vite/client" />

import { MiniUI } from "./miniui";

declare global {
  export namespace JSX {
    export type IntrinsicElements = {
      [E in MiniUI.HTMLElementType]: MiniUI.HTMLElementProps<E>;
    };
  }
}
