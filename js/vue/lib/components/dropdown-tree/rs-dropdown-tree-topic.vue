<script setup lang="ts">
import RsArrowDown from "../../icons/rs-arrow-down.vue";
import RsBadge from "../rs-badge.vue";
import RsLevel from "../rs-level.vue";

type BadgeVariant = "completed" | "reading" | "pending" | "unread";
type LevelVariant = "n1" | "n2" | "n3" | "op";

defineProps<{
  level: LevelVariant;
  state: BadgeVariant;
  title: string;
}>();
</script>

<template>
  <details class="rustlanges-dropdown-tree-topic">
    <summary>
      <RsLevel as="span" :variant="level" />
      <span class="text-h6 rustlanges-dropdown-tree-topic__title">
        {{ title }}
      </span>
      <RsBadge type="default" :variant="state" />
      <RsArrowDown :width="24" :height="24" />
    </summary>
    <div>
      <slot />
    </div>
  </details>
</template>
