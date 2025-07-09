import { BadgeVariants } from "../badge/badge.const";

export const DROPDOWN_STATUS_VARIANTS = {
  completed: [
    "bg-success-100 text-success-600 [&>div]:bg-success-600",
    "dark:bg-success-900 dark:text-success-400 dark:[&>div]:bg-success-400",
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

export type Option = {
  label: string;
  value: BadgeVariants;
};

export const DROPDOWN_OPTIONS: Array<Option> = [
  { label: "Completo", value: "completed" },
  { label: "Leyendo", value: "reading" },
  { label: "Pendiente", value: "pending" },
  { label: "No leído", value: "unread" },
];
