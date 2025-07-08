import { registerCase } from "@rustlanges/showcase";
import { ProgressBar } from "./progress-bar.component";

registerCase("Progress Bar", {
  props: {
    percentage: {
      kind: "number",
      default: 50,
      optional: false,
    },
  },
  component: ProgressBar,
});
