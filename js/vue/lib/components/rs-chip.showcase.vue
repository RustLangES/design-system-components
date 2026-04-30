<script setup lang="ts">
import Showcase from "@rustlanges/showcase/vue";
import RsChip from "./rs-chip.vue";

const props = {
  variant: {
    kind: "string",
    default: "featured",
    options: [
      "featured",
      "official",
      "numeric",
      "description",
      "location",
      "small",
    ],
  },
  label: {
    kind: "string",
    default: "Destacado",
  },
};
</script>

<template>
  <Showcase name="Chip" :props="props" :component="RsChip" />
</template>
