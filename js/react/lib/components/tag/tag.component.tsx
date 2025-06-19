import { cn } from "../../utils/tw-merge";
import { TAG_VARIANTS } from "./tag.const";
import { withAs } from "../../utils/hoc/with-as.hoc";

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
          selected ? TAG_VARIANTS.selected : TAG_VARIANTS.default,
          "grid h-7 cursor-pointer place-items-center rounded-[20px] border px-2 text-xs font-semibold transition",
          className,
        ])}
        {...rest}
      >
        {label}
      </Component>
    );
  }
);
