import { PropsWithChildren } from "react";
import { withAs } from "@/utils/hoc";
import { cn } from "@/utils/tw-merge";

export type CardProps = PropsWithChildren & {
  clickable?: boolean;
  disabled?: boolean;
  className?: string;
};

export const Card = withAs((Component, props: CardProps) => {
  const { clickable = false, disabled = false, className, ...attr } = props;

  // TODO: Add parity with the leptos version | e.g. variants like 'normal' and 'resource'
  // TODO: If 'resource', add the svg of the card with the drop shadow effect

  return (
    <Component
      className={cn(
        "rustlanges-card",
        clickable && "rustlanges-card--clickable",
        disabled && "disabled rustlanges-card--disabled",
        className
      )}
      {...attr}
    />
  );
}, "div");
