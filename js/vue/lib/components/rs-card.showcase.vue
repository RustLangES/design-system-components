<script setup lang="ts">
import Showcase from "@rustlanges/showcase/vue";
import RsCard from "./rs-card.vue";

const props = {
  clickable: "boolean",
  disabled: "boolean",
  className: {
    kind: "string",
    default: "min-w-50 min-h-50",
  },
  onClick: "callback",
};
</script>

<template>
  <Showcase name="Card" :props="props" :component="RsCard" />
</template>
