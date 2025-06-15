// components/Input.tsx
import React from "react";
import clsx from "clsx";
import { FiMapPin } from "react-icons/fi";

interface InputProps {
  placeholder?: string;
  state?: "default" | "hover" | "active" | "inactive" | "error";
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  placeholder = "Input",
  state = "default",
  error,
}) => {
  const baseStyles =
    "flex items-center rounded-[12px] border-1 gap-2 px-4 py-2 w-full text-sm rounded-lg border ml-6 outline-none transition bg-white bg-[#FAFAFA] dark:text-white dark:bg-[#000000]";

  const stateClasses = {
    default: "border-gray-400",
    hover: "border-gray-600",
    active: "border-blue-600 bg-blue-50 dark:bg-[#2A2A2A] dark:border-blue-500",
    inactive: "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-[#2A2A2A] dark:border-[#2A2A2A] dark:text-gray-500",
    error: "border-red-500 text-red-600 dark:border-red-500 dark:text-red-400",
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <div
        className={clsx(
          baseStyles,
          stateClasses[state],
          state === "hover" && "hover:border-gray-600",
          state === "active" && "focus:border-[#888888]",
        )}
      >
        <span className="text-gray-500 dark:text-gray-400">
            <FiMapPin/>
        </span>
        <input
          className="bg-transparent outline-none w-full placeholder:text-gray-500 dark:placeholder:text-gray-400"
          placeholder={placeholder}
          disabled={state === "inactive"}
        />
      </div>
      {state === "error" && (
        <span className="text-xs text-red-500 mt-1">
          {error || "Mensaje de error"}
        </span>
      )}
    </div>
  );
};
