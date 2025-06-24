import { withAs } from "@/utils/hoc";
import { cn } from "@/utils/tw-merge";

type TagProps = {
  label?: string;
  selected?: boolean;
  className?: string;
};

export const Tag = withAs(
  (Component, { label, selected, className, ...rest }: TagProps) => {
    return (
      <Component
        className={cn([
          selected ? "rustlanges-tag--selected" :  "rustlanges-tag--default",
          "rustlanges-tag",
          className,
        ])}
        {...rest}
      >
        {label}
      </Component>
    );
  }
);
