import { cn } from "@/utils/tw-merge";
import { ChipVariants, icons, variants } from "./chip.const";
import React from "react";

export type ChipProps = {
  variant?: ChipVariants;
  label?: string;
  className?: string;
};

export const Chip = (props: ChipProps) => {
  const { label, variant = "featured", className, ...attr } = props;
  return (
    <div
      className={cn(variants[variant], "rustlanges-chip", className)}
      {...attr}
    >
      {icons[variant] ? React.createElement(icons[variant]) : null}
      {variant !== "numeric" ? label : `#${label}`}
    </div>
  );
};
