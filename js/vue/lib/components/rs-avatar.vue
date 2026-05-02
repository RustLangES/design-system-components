<script setup lang="ts">
import { computed, useAttrs, type CSSProperties } from "vue";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    avatarUrl: string;
    alt?: string;
    size?: number;
    as?: "div" | "a" | "button" | "span";
  }>(),
  {
    alt: undefined,
    size: 32,
    as: "div",
  }
);

const attrs = useAttrs();

const className = computed(() => ["rustlanges-avatar", attrs.class]);

const style = computed<CSSProperties>(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
}));
</script>

<template>
  <component :is="as" :class="className" :style="style">
    <img class="rustlanges-avatar__img" :src="avatarUrl" :alt="alt" />
  </component>
</template>
