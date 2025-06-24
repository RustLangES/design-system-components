import { ComponentPropsWithoutRef } from "react";
import { FLAP_ICONS, FLAP_VARIANTS } from "./flap.const";
import { cn } from "@/utils/tw-merge";

type FlapProps = {
  label: string;
  variant: keyof typeof FLAP_VARIANTS;
} & Omit<ComponentPropsWithoutRef<"span">, "children">;

export const Flap = ({ label, variant, className, ...rest }: FlapProps) => {
  const Icon = FLAP_ICONS[variant];
  return (
    <div title={label} className={cn(["rustlanges-flap", className])} {...rest}>
      <svg
        viewBox="0 0 145 49"
        fill="none"
        preserveAspectRatio="none"
        className={cn(["rustlanges-flap__svg", FLAP_VARIANTS[variant]])}
      >
        <path
          d="M120.962 5.00869L141.872 30.4082C147.78 37.5847 142.676 48.3997 133.38 48.3997L12.488 48.3996C3.19249 48.3996 -1.91244 37.5847 3.99561 30.4082L24.906 5.00869C26.9955 2.47056 30.1108 1.00009 33.3984 1.00009L112.47 1.0001C115.757 1.0001 118.872 2.47057 120.962 5.00869Z"
          fill="currentColor"
          stroke="black"
        />
      </svg>
      <span
        className={cn([
          "rustlanges-flap__view",
          !!Icon && "rustlanges-flap__view--icon",
        ])}
      >
        {Icon ? <Icon /> : null}
        <span className="text-paragraph-2 rustlanges-flap__view-text">
          {label}
        </span>
      </span>
    </div>
  );
};
