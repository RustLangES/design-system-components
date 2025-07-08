import { registerCase } from "@rustlanges/showcase";
import { DropdownState } from "./dropdown.component";

registerCase("Dropdown", {
  props: {
    onChange: "callback",
    value: {
      kind: "string",
      default: "completed",
      options: ["completed", "pending", "reading", "unread"],
    },
  },
  component: DropdownState,
});
