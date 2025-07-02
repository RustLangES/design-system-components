import { InputHTMLAttributes, ReactNode } from "react";
import { INPUT_VARIANTS } from "./input.const";

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: keyof typeof INPUT_VARIANTS;
  errorMessage?: string;
  icon?: ReactNode;
}
