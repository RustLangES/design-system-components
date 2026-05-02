<script setup lang="ts">
import Showcase from "@rustlanges/showcase/vue";
import RsAvatar from "./rs-avatar.vue";

const props = {
  alt: "string",
  size: {
    kind: "number",
    default: 32,
  },
  avatarUrl: {
    kind: "string",
    default:
      "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
  },
};
</script>

<template>
  <Showcase name="Avatar" :props="props" :component="RsAvatar" />
</template>
