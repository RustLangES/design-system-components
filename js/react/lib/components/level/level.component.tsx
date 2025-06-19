import { ComponentPropsWithoutRef } from "react";
import { cn } from "../../utils/tw-merge";
import { LEVEL_LABELS, LEVEL_VARIANTS, LevelVariants } from "./level.const";

type LevelProps<C extends React.ElementType> = {
  variant: LevelVariants;
  className?: string;
  as?: C;
} & Omit<ComponentPropsWithoutRef<C>, "children">;

export const Level = <C extends React.ElementType = "span">({
  as,
  variant,
  className,
  ...rest
}: LevelProps<C>) => {
  const Component = as || "span";
  return (
    <Component
      className={cn([
        "rounded-xl border border-black px-2 leading-[150%]",
        "desktop:text-sm text-xxs",
        LEVEL_VARIANTS[variant],
        className,
      ])}
      {...rest}
    >
      {LEVEL_LABELS[variant]}
    </Component>
  );
};
