<script setup lang="ts">
import Showcase from "@rustlanges/showcase/vue";
import RsBadge from "./rs-badge.vue";

const props = {
  variant: {
    kind: "string",
    default: "completed",
    options: ["completed", "reading", "pending", "unread"],
  },
  type: {
    kind: "string",
    default: "text",
    options: ["text", "default", "numeric"],
  },
  count: {
    kind: "number",
    default: 1,
  },
};
</script>

<template>
  <Showcase name="Badge" :props="props" :component="RsBadge" />
</template>
