import clsx from "clsx";
import { InputFieldProps } from "./input.types";

export function Input({
  errorMessage,
  hasError = !!errorMessage,
  icon,
  disabled,
  className,
  ...props
}: InputFieldProps) {
  return (
    <div className="rustlanges-input__container">
      <div
        className={clsx(
          "rustlanges-input",
          hasError && "rustlanges-input--error",
          className
        )}
      >
        {icon && <span className="rustlanges-input__icon">{icon}</span>}
        <input
          disabled={disabled}
          className="rustlanges-input__inner"
          {...props}
        />
      </div>
      {hasError && errorMessage && (
        <span className="rustlanges-input__error">{errorMessage}</span>
      )}
    </div>
  );
}
