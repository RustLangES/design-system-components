<script setup lang="ts">
const variants = {
  primary: "rustlanges-button--primary",
  secondary: "rustlanges-button--secondary",
  text: "rustlanges-button--text",
  icon: "rustlanges-button--icon",
};

type ButtonVariants = keyof typeof variants;

const { variant } = defineProps<{
  variant?: ButtonVariants;
}>();
</script>

<template>
  <button
    :class="[
      variants[variant ?? 'primary'] ?? variants.primary,
      'text-button rustlanges-button',
    ]"
    v-bind="$attrs"
  >
    <slot v-if="variant !== 'icon'" />
    <slot name="icon" />
  </button>
</template>
