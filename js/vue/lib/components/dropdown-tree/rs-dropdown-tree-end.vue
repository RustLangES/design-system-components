<script setup lang="ts">
import { computed, useAttrs } from "vue";
import RsArrowRight from "../../icons/rs-arrow-right.vue";

defineOptions({ inheritAttrs: false });

withDefaults(
  defineProps<{
    title: string;
    as?: "div" | "a" | "button";
  }>(),
  {
    as: "div",
  }
);

const attrs = useAttrs();

const className = computed(() => ["dropdown-tree-end", attrs.class]);
</script>

<template>
  <component :is="as" :class="className">
    <span class="text-h5">
      {{ title }} <RsArrowRight :width="24" :height="24" />
    </span>
    <span class="text-paragraph-1"><slot /></span>
  </component>
</template>
