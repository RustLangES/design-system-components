import { InputHTMLAttributes, ReactNode } from "react";

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  errorMessage?: string;
  icon?: ReactNode;
  /**
   * Class applied to the outer container that wraps the input + error message.
   * Use `className` to style the input wrapper itself.
   */
  containerClassName?: string;
}
