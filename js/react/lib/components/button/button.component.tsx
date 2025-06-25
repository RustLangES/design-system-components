import { ReactNode } from "react";
import { ButtonVariants, variants } from "./button.const";
import { withAs } from "@/utils/hoc";
import { cn } from "@/utils/tw-merge";

export type ButtonProps = {
  variant?: ButtonVariants;
  label?: string;
  disabled?: boolean;
  icon?: ReactNode;
  className?: string;
};

export const Button = withAs((Component, props: ButtonProps) => {
  const { label, variant = "primary", icon, className, ...attr } = props;
  return (
    <Component
      className={cn(
        variants[variant],
        "text-button rustlanges-button",
        className
      )}
      {...attr}
    >
      {variant !== "icon" ? label : null}
      {icon ? icon : null}
    </Component>
  );
}, "button");
