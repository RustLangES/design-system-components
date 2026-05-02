<script setup lang="ts">
import clsx from "clsx";
import { computed, useAttrs } from "vue";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    modelValue?: string | number;
    hasError?: boolean;
    errorMessage?: string;
    disabled?: boolean;
    type?: string;
    placeholder?: string;
  }>(),
  {
    modelValue: undefined,
    hasError: undefined,
    errorMessage: undefined,
    disabled: false,
    type: "text",
    placeholder: undefined,
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const attrs = useAttrs();

const showError = computed(() => props.hasError ?? Boolean(props.errorMessage));

const wrapperClass = computed(() =>
  clsx(
    "rustlanges-input",
    showError.value && "rustlanges-input--error",
    attrs.class as string | undefined
  )
);

const onInput = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>

<template>
  <div class="rustlanges-input__container">
    <div :class="wrapperClass">
      <span v-if="$slots.icon" class="rustlanges-input__icon">
        <slot name="icon" />
      </span>
      <input
        v-bind="$attrs"
        class="rustlanges-input__inner"
        :type="type"
        :value="modelValue"
        :disabled="disabled"
        :placeholder="placeholder"
        @input="onInput"
      />
    </div>
    <span v-if="showError && errorMessage" class="rustlanges-input__error">
      {{ errorMessage }}
    </span>
  </div>
</template>
