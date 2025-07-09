import { PropsWithChildren } from "react";
import { ArrowDown } from "@/icons";
import { Badge } from "../badge";
import { Level } from "../level";
import { TopicElement } from "./dropdown-tree.types";
import { cn } from "@/utils/tw-merge";

const DROPDOWN_TREE_START_VARIANT = {
  default: "rustlanges-dropdown-tree-start--default",
  extended: "rustlanges-dropdown-tree-start--extended",
};

type StartProps = {
  variant: keyof typeof DROPDOWN_TREE_START_VARIANT;
} & PropsWithChildren &
  TopicElement;

export const DropdownTreeStart = ({
  level,
  variant,
  title,
  state,
  children,
}: StartProps) => {
  return (
    <details
      className={cn([
        "rustlanges-dropdown-tree-start",
        DROPDOWN_TREE_START_VARIANT[variant],
      ])}
    >
      <summary>
        <Badge type="text" variant={state} />
        <Level as="span" variant={level} />
        <span className="text-h5 rustlanges-dropdown-tree-start__title">
          {title}
        </span>
        <ArrowDown width={24} height={24} />
      </summary>
      <div>{children}</div>
    </details>
  );
};
