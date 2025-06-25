import { Location, StarBold } from "@/icons";

export const variants = {
  featured: "rustlanges-chip--featured",
  numeric: "rustlanges-chip--numeric",
  description: "rustlanges-chip--description",
  location: "rustlanges-chip--location",
  small: "rustlanges-chip--small",
};

export type ChipVariants = keyof typeof variants;

export const icons = {
  featured: StarBold,
  numeric: null,
  description: null,
  location: Location,
  small: Location,
};

export type ChipIcons = keyof typeof icons;
