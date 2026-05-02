<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import RsFerris from "../icons/rs-ferris.vue";

const props = defineProps<{
  percentage: number;
}>();

const percentage = computed(() => Number(props.percentage ?? 0));

const isInMinLimit = computed(() => percentage.value < 25);
const progressIsInLimit = computed(
  () => percentage.value === 0 || percentage.value === 100
);

const position = computed<CSSProperties>(() => ({
  right: isInMinLimit.value ? "auto" : `${100 - percentage.value}%`,
  left: isInMinLimit.value ? `${percentage.value}%` : "auto",
}));

const fillStyle = computed<CSSProperties>(() => ({
  width: `${percentage.value}%`,
}));

const labelClass = computed(() => [
  "text-overline rustlanges-progress-bar__percentage",
  isInMinLimit.value && "rustlanges-progress-bar__percentage--invert",
]);

const fillClass = computed(() => [
  "rustlanges-progress-bar__fill",
  progressIsInLimit.value && "rustlanges-progress-bar__fill--limit",
]);
</script>

<template>
  <div class="rustlanges-progress-bar__container">
    <div class="rustlanges-progress-bar">
      <span :class="labelClass" :style="position">
        {{ percentage }}%
        <RsFerris :width="15" :height="15" />
      </span>
      <div :class="fillClass" :style="fillStyle" />
    </div>
  </div>
</template>
