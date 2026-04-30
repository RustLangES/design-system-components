<script setup lang="ts">
import { computed, useAttrs } from "vue";
import RsLocation from "../icons/rs-location.vue";
import RsStarBold from "../icons/rs-star-bold.vue";

defineOptions({ inheritAttrs: false });

const variants = {
  featured: "rustlanges-chip--featured",
  official: "rustlanges-chip--official",
  numeric: "rustlanges-chip--numeric",
  description: "rustlanges-chip--description",
  location: "rustlanges-chip--location",
  small: "rustlanges-chip--small",
} as const;

type ChipVariant = keyof typeof variants;

const icons: Record<ChipVariant, unknown> = {
  featured: RsStarBold,
  official: null,
  numeric: null,
  description: null,
  location: RsLocation,
  small: RsLocation,
};

const props = withDefaults(
  defineProps<{
    variant?: ChipVariant;
    label?: string;
  }>(),
  {
    variant: "featured",
    label: undefined,
  }
);

const attrs = useAttrs();

const className = computed(() => [
  variants[props.variant],
  "rustlanges-chip",
  attrs.class,
]);

const icon = computed(() => icons[props.variant]);

const text = computed(() =>
  props.variant === "numeric" ? `#${props.label ?? ""}` : props.label
);
</script>

<template>
  <div :class="className">
    <component :is="icon" v-if="icon" />
    {{ text }}
  </div>
</template>
