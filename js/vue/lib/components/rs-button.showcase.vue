<script setup lang="ts">
import Showcase from "@rustlanges/showcase/vue";
import RsButton from "./rs-button.vue";

const props = {
  variant: {
    kind: "string",
    default: "primary",
    options: ["primary", "secondary", "text", "icon"],
  },
  onClick: "callback"
};
const slots = {
  default: {
    kind: "string",
    displayName: "label",
    default: "Button",
  },
  icon: "icon",
};
</script>

<template>
  <Showcase
    name="ButtonDef"
    :props="props"
    :slots="slots"
    :component="RsButton"
  />

  <Showcase name="Button">
    <RsButton> Hi </RsButton>
  </Showcase>
</template>
