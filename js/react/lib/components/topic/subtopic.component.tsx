import { Badge } from "../badge";
import { Level } from "../level";
import { TopicElement } from "./topic.types";
import { withAs } from "@/utils/hoc";

export const SubTopic = withAs(
  (Component, { level, state, title, ...rest }: TopicElement) => {
    return (
      <Component {...rest} tabIndex={0} className="rustlanges-subtopic">
        <Level variant={level} />
        <span className="rustlanges-subtopic__title">{title}</span>
        <Badge type="default" variant={state} />
      </Component>
    );
  }
);
