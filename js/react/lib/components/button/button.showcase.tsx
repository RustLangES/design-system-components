import { Button } from "./button.component";

export default {
  title: "Button",
  propsDef: {
    variant: {
      type: "string",
      options: ["primary", "secondary", "text", "icon"],
      default: "primary",
    },
    label: {
      type: "string",
      default: "Botón",
    },
    disabled: {
      type: "boolean",
      default: false,
    },
    icon: {
      type: "function",
    },
    className: {
      type: "string",
    },
  },
  component: Button,
};
