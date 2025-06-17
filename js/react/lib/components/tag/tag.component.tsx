import { ComponentPropsWithoutRef, useMemo } from "react";
import { cn } from "../../utils/tw-merge";
import { TAG_VARIANTS } from "./tag.const";

type TagProps<C extends React.ElementType> = {
  as?: C;
  label?: string;
} & Omit<ComponentPropsWithoutRef<C>, "children">;

export const Tag = <C extends React.ElementType = "span"> ({ label, selected, className , as, ...rest }: TagProps<C>) => {
  const Component = useMemo(() => as || "span", [as])
  return (
    <Component
      className={cn([
        selected ? TAG_VARIANTS.selected : TAG_VARIANTS.default,
        "text-xs font-semibold grid place-items-center px-2 h-7 border cursor-pointer rounded-[20px] transition",
        className
      ])}
      {...rest}
    >
      {label}
    </Component>
  );
};