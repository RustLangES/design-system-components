import { ReactNode } from "react";
import { cn } from "../../utils/tw-merge";
import { ButtonVariants, variants } from "./button.const";

export type ButtonProps = {
  variant?: ButtonVariants;
  label?: string;
  disabled?: boolean;
  icon?: ReactNode;
  className?: string;
};

export const Button = (props: ButtonProps) => {
  const { label, variant = "primary", icon, className, ...attr } = props;
  return (
    <button
      className={cn(
        ...variants[variant],
        "px-8 h-12 text-button w-fit cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2.5 transition",
        "[&>svg]:size-6",
        className
      )}
      {...attr}
    >
      {variant !== "icon" ? label : null}
      {icon ? icon : null}
    </button>
  );
};
