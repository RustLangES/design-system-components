<script setup lang="ts">
const variants = {
  primary: "rustlanges-button--primary",
  secondary: "rustlanges-button--secondary",
  text: "rustlanges-button--text",
  icon: "rustlanges-button--icon",
};

type ButtonVariants = keyof typeof variants;

const { variant, as } = defineProps<{
  variant?: ButtonVariants;
  as?: "button" | "a";
}>();
</script>

<template>
  <component
    :is="as ?? 'button'"
    :class="[
      variants[variant ?? 'primary'] ?? variants.primary,
      'text-button rustlanges-button',
    ]"
    v-bind="$attrs"
  >
    <slot v-if="variant !== 'icon'" />
    <slot name="icon" />
  </component>
</template>
