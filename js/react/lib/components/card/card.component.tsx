import { withAs } from "@/utils/hoc";
import { cn } from "@/utils/tw-merge";
import { CARD_GROUP_VARIANTS } from "./card.const";

export type CardProps = {
  clickable?: boolean;
  className?: string;
  disabled?: boolean;
};

export const Card = withAs((Component, props: CardProps) => {
  const { clickable = false, disabled = false, className, ...attr } = props;

  return (
    <Component
      className={cn(
        ...CARD_GROUP_VARIANTS.default,
        clickable && "cursor-pointer",
        disabled && "pointer-events-none",
        className
      )}
      {...attr}
    ></Component>
  );
}, "div");
