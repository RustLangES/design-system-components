<script setup lang="ts">
import Showcase from "@rustlanges/showcase/vue";
import RsTag from "./rs-tag.vue";

const props = {
  label: {
    kind: "string",
    default: "tag",
  },
  selected: "boolean",
  as: {
    kind: "string",
    optional: true,
    options: ["span", "button", "a"],
  },
  onClick: "callback",
};
</script>

<template>
  <Showcase name="Tag" :props="props" :component="RsTag" />
</template>
