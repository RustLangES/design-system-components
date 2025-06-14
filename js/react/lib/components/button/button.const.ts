export const variants = {
  primary: [
    "border rounded-2xl",
    "bg-primary-500 border-black text-black shadow-rb-black",
    "dark:bg-primary-300",
    "hover:bg-primary-600 dark:hover:bg-primary-400 active:shadow-none",
    "disabled:bg-neutral-100 disabled:shadow-none disabled:border-neutral-400 disabled:text-neutral-400",
    "dark:disabled:bg-neutral-950",
  ],
  secondary: [
    "border rounded-2xl",
    "bg-light text-neutral-950 border-neutral-950 shadow-rb-neutral-950",
    "dark:bg-dark dark:text-light dark:border-light dark:shadow-rb-neutral-50",
    "hover:shadow-rb-primary-500 hover:border-primary-500 hover:text-primary-500",
    "disabled:bg-neutral-100 disabled:text-neutral-400 disabled:border-neutral-400! disabled:shadow-none",
    "dark:disabled:bg-neutral-950",
    "active:shadow-none",
  ],
  text: [
    "text-neutral-950 hover:text-primary-600",
    "dark:text-light dark:hover:text-primary-300",
  ],
  icon: [
    "rounded-full border aspect-square p-2! !h-fit",
    "bg-light border-black text-black",
    "dark:bg-dark dark:border-light dark:text-light",
    "hover:text-primary-500 hover:border-primary-500",
  ],
};

export type ButtonVariants = keyof typeof variants;
