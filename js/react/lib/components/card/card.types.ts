import { CARD_GROUP_VARIANTS } from "./card.const";

export interface CardGroupProps {
  variant?: keyof typeof CARD_GROUP_VARIANTS;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}
