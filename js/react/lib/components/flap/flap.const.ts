import { StarBold } from "@/icons";

export const FLAP_VARIANTS = {
  highlight: "rustlanges-flap--highlight",
  numeric: "rustlanges-flap--numeric",
  descriptive: "rustlanges-flap--descriptive",
};

export const FLAP_ICONS = {
  highlight: StarBold,
  numeric: undefined,
  descriptive: undefined,
};

export type FlapVariants = keyof typeof FLAP_VARIANTS;
