export const CONTACT_FORM_ERROR_MESSAGES = {
  required: "Mensaje de error",
};

export const BASE_INPUT_CLASS =
  "w-full p-2 rounded-md border outline-none transition";

export const CONTACT_FORM_STYLES = {
  light: {
    form: "bg-gray-100",
    bg: "bg-white text-black",
    border: "border-gray-300",
    focus: "focus:border-orange-500",
    error: "border-red-500 text-red-600",
    placeholder: "placeholder-gray-400",
    button: "bg-orange-500 text-white hover:bg-orange-600",
    disabled: "bg-gray-300 text-gray-500",
  },
  dark: {
    form: "bg-[#1e1e1e]",
    bg: "bg-[#2c2c2c] text-white",
    border: "border-gray-600",
    focus: "focus:border-orange-400",
    error: "border-red-500 text-red-500",
    placeholder: "placeholder-gray-500",
    button: "bg-orange-500 text-white hover:bg-orange-600",
    disabled: "bg-gray-700 text-gray-500",
  },
};
