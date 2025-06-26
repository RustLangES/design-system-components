import { Badge } from "../badge";
import { Level } from "../level";
import { ButtonHTMLAttributes } from "react";
import { TopicElement } from "./topic.types";
import { withAs } from "@/utils/hoc";

type SubTopicProps = TopicElement & ButtonHTMLAttributes<HTMLButtonElement>;

export const SubTopic = withAs(
  (Component, { level, state, title, ...rest }: SubTopicProps) => {
    return (
      <Component {...rest} tabIndex={0} className="rustlanges-subtopic">
        <Level variant={level} />
        <span className="rustlanges-subtopic__title">{title}</span>
        <Badge type="default" variant={state} />
      </Component>
    );
  }
);
