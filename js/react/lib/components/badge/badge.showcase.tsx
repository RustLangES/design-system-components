import { registerCase } from "@rustlanges/showcase";
import { Badge } from "./badge.component";

registerCase("Badge", {
  props: {
    variant: {
      kind: "string",
      default: "completed",
      options: ["completed", "pending", "reading", "unread"],
    },
    type: {
      kind: "string",
      default: "numeric",
      options: ["default", "numeric", "text"],
    },
    count: {
      kind: "number",
      default: 1,
      optional: false,
    },
  },
  component: Badge,
});
