<script setup lang="ts">
import { computed, useAttrs } from "vue";

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  modelValue?: string | number | boolean;
  value?: string | number;
  name?: string;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number | boolean): void;
}>();

const attrs = useAttrs();

const className = computed(() => ["rustlanges-radio", attrs.class]);

const checked = computed(() => {
  if (props.value === undefined) return Boolean(props.modelValue);
  return props.modelValue === props.value;
});

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (props.value !== undefined) emit("update:modelValue", props.value);
  else emit("update:modelValue", target.checked);
};
</script>

<template>
  <input
    type="radio"
    :class="className"
    :name="name"
    :value="value"
    :checked="checked"
    :disabled="disabled"
    @change="onChange"
  />
</template>
