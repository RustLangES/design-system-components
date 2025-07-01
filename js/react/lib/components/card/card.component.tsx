import { PropsWithChildren } from "react";
import { withAs } from "@/utils/hoc";
import { cn } from "@/utils/tw-merge";

export type CardProps = PropsWithChildren & {
  clickable?: boolean;
  className?: string;
};

export const Card = withAs((Component, props: CardProps) => {
  const { clickable = false, className, ...attr } = props;

  return (
    <Component
      className={cn(
        "rustlanges-card",
        clickable && "rustlanges-card--clickable",
        className
      )}
      {...attr}
    />
  );
}, "div");
