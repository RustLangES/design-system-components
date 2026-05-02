import clsx from "clsx";
import { forwardRef } from "react";
import { InputFieldProps } from "./input.types";

export const Input = forwardRef<HTMLInputElement, InputFieldProps>(
  function Input(
    {
      errorMessage,
      hasError = !!errorMessage,
      icon,
      disabled,
      className,
      containerClassName,
      ...props
    },
    ref
  ) {
    return (
      <div className={clsx("rustlanges-input__container", containerClassName)}>
        <div
          className={clsx(
            "rustlanges-input",
            hasError && "rustlanges-input--error",
            className
          )}
        >
          {icon && <span className="rustlanges-input__icon">{icon}</span>}
          <input
            ref={ref}
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
);
