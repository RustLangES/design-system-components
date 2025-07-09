import { registerCase } from "@rustlanges/showcase";
import { Tag } from "./tag.component";

registerCase("Tag", {
  props: {
    label: {
      kind: "string",
      default: "tag",
    },
    selected: "boolean",
    as: {
      kind: "string",
      optional: true,
      options: ["span", "button", "a"],
    },

    onClick: "callback",
  },
  component: Tag,
});
