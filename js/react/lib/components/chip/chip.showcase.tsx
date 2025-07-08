import { registerCase } from "@rustlanges/showcase";
import { Chip } from "./chip.component";

registerCase("Chip", {
  props: {
    variant: {
      kind: "string",
      default: "featured",
      options: [
        "featured",
        "numeric",
        "description",
        "location",
        "small",
      ],
    },
    label: {
      kind: "string",
      default: "Destacado",
    },
  },
  component: Chip,
});
