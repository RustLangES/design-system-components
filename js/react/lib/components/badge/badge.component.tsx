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
      if (count > LIMIT_NUMERIC) return `+${LIMIT_NUMERIC}`;
      return count;
    };

    return (
      <Component
        {...rest}
        className={cn([
          "text-paragraph-2 rustlanges-badge",
          BADGE_VARIANTS[variant],
          BADGE_TYPE[type],
        ])}
      >
        <div className="rustlanges-badge__dot" />
        <span>{displayValue()}</span>
      </Component>
    );
  }
);
