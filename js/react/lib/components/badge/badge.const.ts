export const BADGE_VARIANTS = {
  completed: "rustlanges-badge--variant-completed",
  reading: "rustlanges-badge--variant-reading",
  pending: "rustlanges-badge--variant-pending",
  unread: "rustlanges-badge--variant-unread",
};

export const BADGE_TYPE = {
  default: "rustlanges-badge--type-default",
  numeric: "rustlanges-badge--type-numeric",
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
