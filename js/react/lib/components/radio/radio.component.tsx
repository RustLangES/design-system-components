import { cn } from "@/utils/tw-merge";
import { InputHTMLAttributes } from "react";

type RadioProps = InputHTMLAttributes<HTMLInputElement>;

export const Radio = ({ className, ...rest }: RadioProps) => {
  return (
    <input
      className={cn([
        "shadow-rb-black aspect-square appearance-none transition",
        "flex size-4 items-center justify-center rounded-full border border-black",
        "after:absolute after:size-2 after:rounded-full after:transition",
        "dark:bg-dark bg-white",
        "after:bg-gray dark:after:bg-neutral-500",
        "checked:after:bg-primary-500",
        className,
      ])}
      type="radio"
      {...rest}
    />
  );
};
