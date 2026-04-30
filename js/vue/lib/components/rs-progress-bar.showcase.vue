<script setup lang="ts">
import Showcase from "@rustlanges/showcase/vue";
import RsProgressBar from "./rs-progress-bar.vue";

const props = {
  percentage: {
    kind: "number",
    default: 30,
  },
};
</script>

<template>
  <Showcase name="ProgressBar" :props="props" :component="RsProgressBar" />
</template>
