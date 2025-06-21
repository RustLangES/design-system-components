export const BADGE_VARIANTS = {
  completed: [
    "bg-success-100 text-success-600 [&>div]:bg-success-600",
    "dark:bg-success-950 dark:text-success-400 [&>div]:bg-success-600",
  ],
  reading: [
    "bg-warning-100 text-warning-500 [&>div]:bg-warning-500",
    "dark:bg-warning-950 dark:text-warning-300 [&>div]:bg-warning-300",
  ],
  pending: [
    "bg-error-100 text-error-600 [&>div]:bg-error-600",
    "dark:bg-error-950 dark:text-error-300 [&>div]:bg-error-300",
  ],
  unread: [
    "bg-neutral-100 text-neutral-500 [&>div]:bg-neutral-500",
    "dark:bg-neutral-950 dark:text-neutral-300 [&>div]:bg-neutral-300",
  ],
};

export const BADGE_TYPE = {
  default: "[&>span]:hidden size-4 px-0! justify-center",
  numeric: "flex-row-reverse ",
  text: undefined,
};

export const BADGE_TEXT = {
  completed: "Completo",
  reading: "Leyendo",
  pending: "Pendiente",
  unread: "No leído",
};

export const LIMIT_NUMERIC = 9;
export type BadgeVariants = keyof typeof BADGE_VARIANTS;
export type BadgeTypes = keyof typeof BADGE_TYPE;
