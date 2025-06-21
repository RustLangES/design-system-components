import { BadgeTypes, BadgeVariants } from "./badge.const";

export type BadgeProps =
  | {
      type: Extract<BadgeTypes, "numeric">;
      variant: BadgeVariants;
      count: number;
    }
  | {
      type: Exclude<BadgeTypes, "numeric">;
      variant: BadgeVariants;
      count?: never;
    };
