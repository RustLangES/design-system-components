import { registerCase } from "@rustlanges/showcase";
import { Level } from "./level.component";

registerCase("Level", {
  props: {
    variant: {
      kind: "string",
      options: ["n1", "n2", "n3", "op"],
      default: "n1",
    },
    label: {
      kind: "string",
      default: "Oficial",
    },
    as: {
      kind: "string",
      default: "span",
      options: ["a", "button", "span"],
    },
  },
  component: Level,
});
