<script setup lang="ts">
import { computed } from "vue";

const BADGE_VARIANTS = {
  completed: "rustlanges-badge--variant-completed",
  reading: "rustlanges-badge--variant-reading",
  pending: "rustlanges-badge--variant-pending",
  unread: "rustlanges-badge--variant-unread",
} as const;

const BADGE_TYPE = {
  default: "rustlanges-badge--type-default",
  numeric: "rustlanges-badge--type-numeric",
  text: undefined,
} as const;

const BADGE_TEXT = {
  completed: "Completo",
  reading: "Leyendo",
  pending: "Pendiente",
  unread: "No leído",
} as const;

const LIMIT_NUMERIC = 9;

type BadgeVariant = keyof typeof BADGE_VARIANTS;
type BadgeType = keyof typeof BADGE_TYPE;

const props = withDefaults(
  defineProps<{
    type?: BadgeType;
    variant: BadgeVariant;
    count?: number;
  }>(),
  {
    type: "text",
    count: undefined,
  }
);

const className = computed(() => [
  "text-paragraph-2 rustlanges-badge",
  BADGE_VARIANTS[props.variant],
  BADGE_TYPE[props.type],
]);

const displayValue = computed(() => {
  if (props.type !== "numeric") return BADGE_TEXT[props.variant];
  if ((props.count ?? 0) > LIMIT_NUMERIC) return `+${LIMIT_NUMERIC}`;
  if (!props.count) return "0";
  return props.count;
});
</script>

<template>
  <div :class="className">
    <div class="rustlanges-badge__dot" />
    <span>{{ displayValue }}</span>
  </div>
</template>
