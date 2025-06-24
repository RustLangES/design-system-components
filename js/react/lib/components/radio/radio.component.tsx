import { cn } from "@/utils/tw-merge";
import { InputHTMLAttributes } from "react";

type RadioProps = InputHTMLAttributes<HTMLInputElement>;

export const Radio = ({ className, ...rest }: RadioProps) => {
  return (
    <input
      className={cn(["rustlanges-radio", className])}
      type="radio"
      {...rest}
    />
  );
};
