<script setup lang="ts">
import RsArrowDown from "../../icons/rs-arrow-down.vue";
import RsBadge from "../rs-badge.vue";
import RsLevel from "../rs-level.vue";
import RsRadio from "../rs-radio.vue";

type BadgeVariant = "completed" | "reading" | "pending" | "unread";
type LevelVariant = "n1" | "n2" | "n3" | "op";

defineProps<{
  level: LevelVariant;
  state: BadgeVariant;
  title: string;
  name?: string;
  value?: string | number;
  modelValue?: string | number | boolean;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number | boolean): void;
}>();
</script>

<template>
  <details class="rustlanges-dropdown-tree-subject">
    <summary>
      <RsBadge type="text" :variant="state" />
      <RsLevel as="span" :variant="level" />
      <span class="text-h5 rustlanges-dropdown-tree-subject__title">
        {{ title }}
      </span>
      <RsArrowDown :width="24" :height="24" />
      <RsRadio
        :name="name"
        :value="value"
        :model-value="modelValue"
        :disabled="disabled"
        @update:model-value="(v) => emit('update:modelValue', v)"
      />
    </summary>
    <div>
      <slot />
    </div>
  </details>
</template>
