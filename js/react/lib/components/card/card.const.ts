export const CARD_GROUP_VARIANTS = {
  default: [
    "min-w-96 min-h-96",
    "border-1 shadow-brutal rounded-lg border-black p-4 bg-light",

    "dark:bg-neutral-800",
  ],
  clickable: [
    "cursor-pointer disabled:pointer-events-none",

    "active:shadow-none",
    "hover:shadow-rb-violet-700 hover:border-violet-700",
    "disabled:bg-neutral-100 disabled:shadow-none disabled:border-neutral-400 disabled:text-neutral-400",

    "dark:active:shadow-none",
    "hover:dark:border-primary-600 hover:dark:shadow-rb-primary-600",
    "dark:disabled:shadow-none dark:disabled:border-neutral-100"
  ]
};
