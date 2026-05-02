import { Location, StarBold } from "@/icons";

export const variants = {
  featured: "rustlanges-chip--featured",
  official: "rustlanges-chip--official",
  numeric: "rustlanges-chip--numeric",
  description: "rustlanges-chip--description",
  location: "rustlanges-chip--location",
  small: "rustlanges-chip--small",
};

export type ChipVariants = keyof typeof variants;

export const icons = {
  featured: StarBold,
  official: null,
  numeric: null,
  description: null,
  location: Location,
  small: Location,
};

export type ChipIcons = keyof typeof icons;
