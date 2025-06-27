import { InputHTMLAttributes, PropsWithChildren } from "react";
import { ArrowDown } from "@/icons";
import { Badge } from "../badge";
import { Level } from "../level";
import { TopicElement } from "./dropdown-tree.types";
import { cn } from "@/utils/tw-merge";
import { Radio } from "../radio";

type SubjectProps = PropsWithChildren &
  TopicElement &
  InputHTMLAttributes<HTMLInputElement>;
export const DropdownTreeSubject = ({
  level,
  title,
  state,
  children,
  ...rest
}: SubjectProps) => {
  return (
    <details className={cn(["rustlanges-dropdown-tree-subject"])}>
      <summary>
        <Badge type="text" variant={state} />
        <Level as="span" variant={level} />
        <span className="text-h5 rustlanges-dropdown-tree-subject__title">
          {title}
        </span>
        <ArrowDown width={24} height={24} />
        <Radio {...rest} />
      </summary>

      <div>{children}</div>
    </details>
  );
};
