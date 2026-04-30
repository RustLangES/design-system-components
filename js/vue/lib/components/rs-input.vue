<script setup lang="ts">
import clsx from "clsx";
import { computed, useAttrs } from "vue";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    hasError?: boolean;
    errorMessage?: string;
    disabled?: boolean;
    placeholder?: string;
  }>(),
  {
    hasError: undefined,
    errorMessage: undefined,
    disabled: false,
    placeholder: undefined,
  }
);

const attrs = useAttrs();

const showError = computed(
  () => props.hasError ?? Boolean(props.errorMessage)
);

const wrapperClass = computed(() =>
  clsx(
    "rustlanges-input",
    showError.value && "rustlanges-input--error",
    attrs.class as string | undefined
  )
);
</script>

<template>
  <div class="rustlanges-input__container">
    <div :class="wrapperClass">
      <span v-if="$slots.icon" class="rustlanges-input__icon">
        <slot name="icon" />
      </span>
      <input
        class="rustlanges-input__inner"
        :disabled="disabled"
        :placeholder="placeholder"
      />
    </div>
    <span v-if="showError && errorMessage" class="rustlanges-input__error">
      {{ errorMessage }}
    </span>
  </div>
</template>
