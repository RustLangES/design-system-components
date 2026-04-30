<script setup lang="ts">
import Showcase from "@rustlanges/showcase/vue";
import RsDropdown from "./rs-dropdown.vue";

const props = {
  "onUpdate:modelValue": "callback",
  modelValue: {
    kind: "string",
    default: "completed",
    options: ["completed", "pending", "reading", "unread"],
  },
};
</script>

<template>
  <Showcase name="Dropdown" :props="props" :component="RsDropdown" />
</template>
