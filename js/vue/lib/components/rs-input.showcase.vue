<script setup lang="ts">
import Showcase from "@rustlanges/showcase/vue";
import RsInput from "./rs-input.vue";

const props = {
  placeholder: {
    kind: "string",
    default: "Input",
  },
  disabled: "boolean",
  hasError: "boolean",
  errorMessage: {
    kind: "string",
    default: "Error",
  },
};

const slots = {
  icon: "icon",
};
</script>

<template>
  <Showcase name="Input" :props="props" :slots="slots" :component="RsInput" />
</template>
