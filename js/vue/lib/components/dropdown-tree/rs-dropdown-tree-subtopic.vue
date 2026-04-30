<script setup lang="ts">
import { computed, useAttrs } from "vue";
import RsBadge from "../rs-badge.vue";
import RsLevel from "../rs-level.vue";

defineOptions({ inheritAttrs: false });

type BadgeVariant = "completed" | "reading" | "pending" | "unread";
type LevelVariant = "n1" | "n2" | "n3" | "op";

withDefaults(
  defineProps<{
    level: LevelVariant;
    state: BadgeVariant;
    title: string;
    as?: "div" | "a" | "button" | "li";
  }>(),
  {
    as: "div",
  }
);

const attrs = useAttrs();

const className = computed(() => [
  "rustlanges-dropdown-tree-subtopic",
  attrs.class,
]);
</script>

<template>
  <component :is="as" :class="className" tabindex="0">
    <RsLevel :variant="level" />
    <span class="rustlanges-dropdown-tree-subtopic__title">
      {{ title }}
    </span>
    <RsBadge type="default" :variant="state" />
  </component>
</template>
