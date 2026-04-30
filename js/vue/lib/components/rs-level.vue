<script setup lang="ts">
import { computed, useAttrs } from "vue";

defineOptions({ inheritAttrs: false });

const LEVEL_VARIANTS = {
  n1: "rustlanges-level--n1",
  n2: "rustlanges-level--n2",
  n3: "rustlanges-level--n3",
  op: "rustlanges-level--op",
} as const;

const LEVEL_LABELS = {
  n1: "N1",
  n2: "N2",
  n3: "N3",
  op: "Op",
} as const;

type LevelVariant = keyof typeof LEVEL_VARIANTS;

const props = withDefaults(
  defineProps<{
    variant: LevelVariant;
    as?: "div" | "span" | "button" | "a";
  }>(),
  {
    as: "div",
  }
);

const attrs = useAttrs();

const className = computed(() => [
  "rustlanges-level",
  LEVEL_VARIANTS[props.variant],
  attrs.class,
]);

const label = computed(() => LEVEL_LABELS[props.variant]);
</script>

<template>
  <component :is="as" :class="className">
    {{ label }}
  </component>
</template>
