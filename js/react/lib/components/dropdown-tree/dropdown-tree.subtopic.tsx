import { Badge } from "../badge";
import { Level } from "../level";
import { withAs } from "@/utils/hoc";
import { TopicElement } from "./dropdown-tree.types";

export const DropdownTreeSubTopic = withAs(
  (Component, { level, state, title, ...rest }: TopicElement) => {
    return (
      <Component
        {...rest}
        tabIndex={0}
        className="rustlanges-dropdown-tree-subtopic"
      >
        <Level variant={level} />
        <span className="rustlanges-dropdown-tree-subtopic__title">
          {title}
        </span>
        <Badge type="default" variant={state} />
      </Component>
    );
  }
);
