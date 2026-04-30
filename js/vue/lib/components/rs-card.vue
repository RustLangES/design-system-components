<script setup lang="ts">
import { computed, useAttrs } from "vue";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    clickable?: boolean;
    disabled?: boolean;
    as?: "div" | "a" | "button";
  }>(),
  {
    clickable: false,
    disabled: false,
    as: "div",
  }
);

const attrs = useAttrs();

const className = computed(() => [
  "rustlanges-card",
  props.clickable && "rustlanges-card--clickable",
  props.disabled && "disabled rustlanges-card--disabled",
  attrs.class,
]);
</script>

<template>
  <component :is="as" :class="className">
    <slot />
  </component>
</template>
