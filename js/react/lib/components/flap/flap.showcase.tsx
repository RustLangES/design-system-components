import { registerCase } from "@rustlanges/showcase";
import { Flap } from "./flap.component";

registerCase("Flap", {
  props: {
    variant: {
      kind: "string",
      default: "descriptive",
      options: ["highlight", "descriptive", "numeric"],
    },
    label: {
      kind: "string",
      default: "Oficial",
    },
  },
  component: Flap,
});
