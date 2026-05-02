<script setup lang="ts">
import Showcase from "@rustlanges/showcase/vue";
import RsLevel from "./rs-level.vue";

const props = {
  variant: {
    kind: "string",
    default: "n1",
    options: ["n1", "n2", "n3", "op"],
  },
};
</script>

<template>
  <Showcase name="Level" :props="props" :component="RsLevel" />
</template>
