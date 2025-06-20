import { ReactNode } from "react";
import { cn } from "../../utils/tw-merge";
import { ButtonVariants, variants } from "./button.const";
import { withAs } from "../../utils/hoc/with-as.hoc";

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
        ...variants[variant],
        "text-button flex h-12 w-fit cursor-pointer items-center justify-center gap-2.5 px-8 transition disabled:cursor-not-allowed",
        "[&>svg]:size-6",
        className
      )}
      {...attr}
    >
      {variant !== "icon" ? label : null}
      {icon ? icon : null}
    </Component>
  );
}, "button");
