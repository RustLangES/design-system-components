import { Location, StarBold } from "@/icons";

export const variants = {
  featured: [
    "border rounded-[20px]",
    "bg-primary-400 border-black text-black",
    "min-h-[32px]",
    "text-sm",
    "p-[4px] px-[12px]",
  ],
  numeric: [
    "border rounded-[20px]",
    "bg-primary-200 border-black text-black",
    "min-h-[32px]",
    "text-sm",
    "p-[4px] px-[12px]",
  ],
  description: [
    "border rounded-[20px]",
    "bg-secondary-200 border-black text-black",
    "min-h-[32px]",
    "text-sm",
    "p-[4px] px-[12px]",
  ],
  location: [
    "border rounded-[20px]",
    "bg-secondary-200 border-black text-black",
    "min-h-[24px]",
    "text-sm",
    "p-[2px] px-[12px]",
  ],
  small: [
    "border rounded-[20px]",
    "bg-secondary-200 border-black text-black",
    "min-h-[22px]",
    "text-xs",
    "p-[2px] px-[8px]",
  ],
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
