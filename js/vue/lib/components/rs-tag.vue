<script setup lang="ts">
import { computed, useAttrs } from "vue";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    label?: string;
    selected?: boolean;
    as?: "span" | "button" | "a" | "li";
  }>(),
  {
    label: undefined,
    selected: false,
    as: "span",
  }
);

const emit = defineEmits<{
  (e: "update:selected", value: boolean): void;
}>();

const attrs = useAttrs();

const className = computed(() => [
  "rustlanges-tag",
  props.selected ? "rustlanges-tag--selected" : "rustlanges-tag--default",
  attrs.class,
]);

const onClick = () => {
  emit("update:selected", !props.selected);
};
</script>

<template>
  <component
    :is="as"
    v-bind="$attrs"
    :class="className"
    @click="onClick"
  >
    <slot>{{ label }}</slot>
  </component>
</template>
