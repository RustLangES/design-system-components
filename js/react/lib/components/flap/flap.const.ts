import { StarBold } from "@/icons";

export const FLAP_VARIANTS = {
  highlight: "text-primary-400",
  numeric: "text-primary-200",
  descriptive: "text-secondary-400",
};

export const FLAP_ICONS = {
  highlight: StarBold,
  numeric: undefined,
  descriptive: undefined,
};

export type FlapVariants = keyof typeof FLAP_VARIANTS;
