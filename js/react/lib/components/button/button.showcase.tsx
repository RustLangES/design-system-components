import { registerCase } from "@rustlanges/showcase";
import { Button } from "./button.component";

registerCase("Button", {
  props: {
    variant: {
      kind: "string",
      options: ["primary", "secondary", "text", "icon"],
      default: "primary",
    },
    label: {
      kind: "string",
      default: "Botón",
    },
    disabled: "boolean",
    icon: "icon",
    className: "string",
    onClick: "callback",
  },
  component: Button,
});
