<script setup lang="ts">
import Showcase from "@rustlanges/showcase/vue";
import RsRadio from "./rs-radio.vue";

const props = {
  disabled: "boolean",
  name: {
    kind: "string",
    default: "radio",
  },
};
</script>

<template>
  <Showcase name="Radio" :props="props" :component="RsRadio" />
</template>
