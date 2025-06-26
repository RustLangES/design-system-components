import { BadgeVariants } from "../badge/badge.const";
import { LevelVariants } from "../level/level.const";

export type TopicElement = {
  level: LevelVariants;
  title: string;
  state: BadgeVariants;
};
