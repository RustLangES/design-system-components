<script setup lang="ts">
import { computed, useAttrs } from "vue";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    label?: string;
    selected?: boolean;
    as?: "span" | "button" | "a";
  }>(),
  {
    label: undefined,
    selected: false,
    as: "span",
  }
);

const attrs = useAttrs();

const className = computed(() => [
  "rustlanges-tag",
  props.selected ? "rustlanges-tag--selected" : "rustlanges-tag--default",
  attrs.class,
]);
</script>

<template>
  <component :is="as" :class="className">
    {{ label }}
  </component>
</template>
