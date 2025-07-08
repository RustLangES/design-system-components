import { registerCase } from "@rustlanges/showcase";
import { Input } from "./input";

registerCase("Input", {
  props: {
    placeholder: {
      kind: "string",
      default: "Input",
    },
    icon: "icon",
    disabled: "boolean",
    hasError: "boolean",
    errorMessage: {
      kind: "string",
      default: "Error",
    },
  },
  component: Input,
});
