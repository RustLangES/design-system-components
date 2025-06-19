import { withAs } from "../../utils/hoc/with-as.hoc";
import { cn } from "../../utils/tw-merge";
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
        className={cn([
          "rounded-xl border border-black px-2 leading-[150%]",
          "desktop:text-sm text-xxs",
          LEVEL_VARIANTS[variant],
          className,
        ])}
      >
        {LEVEL_LABELS[variant]}
      </Component>
    );
  }
);
