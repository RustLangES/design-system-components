import { PropsWithChildren } from "react";
import { ArrowDown } from "@/icons";
import { Badge } from "../badge";
import { Level } from "../level";
import { TopicElement } from "./dropdown-tree.types";

type DropdownTreeTopicProps = PropsWithChildren & TopicElement;

export const DropdownTreeTopic = ({
  level,
  title,
  state,
  children,
}: DropdownTreeTopicProps) => {
  return (
    <details className="rustlanges-dropdown-tree-topic">
      <summary>
        <Level as="span" variant={level} />
        <span className="text-h6 rustlanges-dropdown-tree-topic__title">
          {title}
        </span>
        <Badge type="default" variant={state} />
        <ArrowDown width={24} height={24} />
      </summary>
      <div>{children}</div>
    </details>
  );
};
