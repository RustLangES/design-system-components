<script setup lang="ts">
import { computed, ref } from "vue";
import RsBadge from "./rs-badge.vue";
import RsArrowDown from "../icons/rs-arrow-down.vue";
import RsArrowUp from "../icons/rs-arrow-up.vue";

const BADGE_TEXT = {
  completed: "Completo",
  reading: "Leyendo",
  pending: "Pendiente",
  unread: "No leído",
} as const;

const DROPDOWN_STATUS_VARIANTS: Record<BadgeVariant, string[]> = {
  completed: [
    "bg-success-100 text-success-600 [&>div]:bg-success-600",
    "dark:bg-success-900 dark:text-success-400 dark:[&>div]:bg-success-400",
  ],
  reading: [
    "bg-warning-100 text-warning-500 [&>div]:bg-warning-500",
    "dark:bg-warning-950 dark:text-warning-300 [&>div]:bg-warning-300",
  ],
  pending: [
    "bg-error-100 text-error-600 [&>div]:bg-error-600",
    "dark:bg-error-950 dark:text-error-300 [&>div]:bg-error-300",
  ],
  unread: [
    "bg-neutral-100 text-neutral-500 [&>div]:bg-neutral-500",
    "dark:bg-neutral-950 dark:text-neutral-300 [&>div]:bg-neutral-300",
  ],
};

const DROPDOWN_OPTIONS: Array<{ label: string; value: BadgeVariant }> = [
  { label: "Completo", value: "completed" },
  { label: "Leyendo", value: "reading" },
  { label: "Pendiente", value: "pending" },
  { label: "No leído", value: "unread" },
];

type BadgeVariant = keyof typeof BADGE_TEXT;

const props = withDefaults(
  defineProps<{
    modelValue?: BadgeVariant;
    value?: BadgeVariant;
  }>(),
  {
    modelValue: undefined,
    value: undefined,
  }
);

const emit = defineEmits<{
  (e: "change", value: BadgeVariant): void;
  (e: "update:modelValue", value: BadgeVariant): void;
}>();

const current = computed<BadgeVariant>(
  () => props.modelValue ?? props.value ?? "unread"
);

const open = ref(false);

const toggle = () => {
  open.value = !open.value;
};

const select = (value: BadgeVariant) => {
  emit("change", value);
  emit("update:modelValue", value);
  open.value = false;
};

const triggerClass = computed(() => [
  "text-paragraph-2 rustlanges-dropdown__view",
  ...DROPDOWN_STATUS_VARIANTS[current.value],
]);

const contentClass = computed(() => [
  "rustlanges-dropdown__content",
  open.value
    ? "rustlanges-dropdown__content--open"
    : "rustlanges-dropdown__content--closed",
]);

const triggerText = computed(() => BADGE_TEXT[current.value]);
</script>

<template>
  <div class="rustlanges-dropdown">
    <button :class="triggerClass" @click="toggle">
      <div class="rustlanges-dropdown__view-dot" />
      <span class="mr-2">{{ triggerText }}</span>
      <component
        :is="open ? RsArrowUp : RsArrowDown"
        class="rustlanges-dropdown__view-icon"
      />
    </button>
    <div :class="contentClass">
      <ul v-if="open" class="rustlanges-dropdown__list">
        <li
          v-for="opt in DROPDOWN_OPTIONS"
          :key="opt.value"
          class="rustlanges-dropdown__list-item"
          @click="select(opt.value)"
        >
          <RsBadge type="text" :variant="opt.value" />
        </li>
      </ul>
    </div>
  </div>
</template>
