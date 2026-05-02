<script setup lang="ts">
import { computed } from "vue";
import RsArrowDown from "../../icons/rs-arrow-down.vue";
import RsBadge from "../rs-badge.vue";
import RsLevel from "../rs-level.vue";

const VARIANTS = {
  default: "rustlanges-dropdown-tree-start--default",
  extended: "rustlanges-dropdown-tree-start--extended",
} as const;

type StartVariant = keyof typeof VARIANTS;

type BadgeVariant = "completed" | "reading" | "pending" | "unread";
type LevelVariant = "n1" | "n2" | "n3" | "op";

const props = defineProps<{
  variant: StartVariant;
  level: LevelVariant;
  state: BadgeVariant;
  title: string;
}>();

const className = computed(() => [
  "rustlanges-dropdown-tree-start",
  VARIANTS[props.variant],
]);
</script>

<template>
  <details :class="className">
    <summary>
      <RsBadge type="text" :variant="state" />
      <RsLevel as="span" :variant="level" />
      <span class="text-h5 rustlanges-dropdown-tree-start__title">
        {{ title }}
      </span>
      <RsArrowDown :width="24" :height="24" />
    </summary>
    <div>
      <slot />
    </div>
  </details>
</template>
