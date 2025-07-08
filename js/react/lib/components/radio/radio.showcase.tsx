import { registerCase } from "@rustlanges/showcase";
import { Radio } from "./radio.component";

registerCase("Radio", {
  props: {
    checked: {
      kind: "boolean",
      optional: true,
    },
  },
  component: Radio,
});
