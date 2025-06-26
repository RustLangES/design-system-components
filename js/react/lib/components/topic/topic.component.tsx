import { PropsWithChildren } from "react";
import { ArrowDown } from "@/icons";
import { Badge } from "../badge";
import { Level } from "../level";
import { TopicElement } from "./topic.types";

type TopicProps = PropsWithChildren & TopicElement;
export const Topic = ({ level, title, state, children }: TopicProps) => {
  return (
    <details className="rustlanges-topic">
      <summary className="rustlanges-topic__summary">
        <Level as="span" variant={level} />
        <span className="text-h6 rustlanges-topic__title">{title}</span>
        <Badge type="default" variant={state} />
        <ArrowDown />
      </summary>
      {children}
    </details>
  );
};
