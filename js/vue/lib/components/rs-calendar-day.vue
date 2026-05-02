<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    day: Date;
    selected?: boolean;
    disabled?: boolean;
  }>(),
  {
    selected: false,
    disabled: false,
  }
);

const emit = defineEmits<{
  (e: "select", date: Date): void;
}>();

const className = computed(() => [
  "mb-1 flex min-h-9 min-w-9 cursor-pointer appearance-none items-center justify-center rounded-sm border-2 text-sm font-medium transition",
  "border-black",
  "dark:border-neutral-50",
  props.disabled && "opacity-50 cursor-not-allowed",
  props.selected && "bg-primary-500 text-light dark:text-neutral-950",
]);

const handleClick = () => {
  if (!props.disabled) emit("select", props.day);
};

const isoDate = computed(() => props.day.toISOString().split("T")[0]);
</script>

<template>
  <button
    :class="className"
    :aria-selected="selected"
    :data-date="isoDate"
    @click="handleClick"
  >
    {{ day.getDate() }}
  </button>
</template>
