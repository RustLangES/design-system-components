import { registerCase } from "@rustlanges/showcase";
import { Card } from "./card.component";

registerCase("Card", {
  props: {
    clickable: "boolean",
    disabled: "boolean",
    className: {
      kind: "string",
      default: "min-w-50 min-h-50",
    },
    onClick: "callback",
  },
  component: Card,
});
