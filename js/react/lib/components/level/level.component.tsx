import { withAs } from "@/utils/hoc";
import { cn } from "@/utils/tw-merge";
import { LEVEL_LABELS, LEVEL_VARIANTS, LevelVariants } from "./level.const";

type LevelProps = {
  variant: LevelVariants;
  className?: string;
};

export const Level = withAs(
  (Component, { variant, className, ...rest }: LevelProps) => {
    return (
      <Component
        {...rest}
        className={cn(["rustlanges-level", LEVEL_VARIANTS[variant], className])}
      >
        {LEVEL_LABELS[variant]}
      </Component>
    );
  }
);
