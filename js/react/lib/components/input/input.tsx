import { INPUT_VARIANTS, ERROR_TEXT_CLASSES } from "./input.const";
import { InputFieldProps } from "./input.types";
import clsx from "clsx";

export default function InputField({
  variant = "default",
  label,
  errorMessage,
  icon,
  disabled,
  className,
  ...props
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-black">{label}</label>}
      <div
        className={clsx(
          "flex items-center gap-2 px-4 py-2 rounded-xl transition-colors",
          INPUT_VARIANTS[variant],
          className
        )}
      >
        {icon && <span className="text-neutral-500">{icon}</span>}
        <input
          disabled={variant === "inactive" || disabled}
          className={clsx(
            "w-full outline-none bg-transparent placeholder:text-inherit",
            { "text-neutral-400": variant === "inactive" }
          )}
          {...props}
        />
      </div>
      {variant === "error" && errorMessage && (
        <span className={ERROR_TEXT_CLASSES}>{errorMessage}</span>
      )}
    </div>
  );
}
