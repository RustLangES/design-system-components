import { withAs } from "@/utils/hoc";
import { cn } from "@/utils/tw-merge";
import {
  BADGE_TEXT,
  BADGE_TYPE,
  BADGE_VARIANTS,
  LIMIT_NUMERIC,
} from "./badge.const";
import { BadgeProps } from "./badge.types";

export const Badge = withAs(
  (Component, { type, variant, count, ...rest }: BadgeProps) => {
    const displayValue = () => {
      if (type !== "numeric") return BADGE_TEXT[variant];
      if (count > LIMIT_NUMERIC) return "+9";
      return count;
    };

    return (
      <Component
        {...rest}
        className={cn([
          "text-paragraph-2 flex items-center gap-1 rounded-full border-[0.8px] border-black px-2",
          BADGE_VARIANTS[variant],
          BADGE_TYPE[type],
          "desktop:text-[12px] text-[10px]",
        ])}
      >
        <div className="size-1 rounded-full" />
        <span>{displayValue()}</span>
      </Component>
    );
  }
);
