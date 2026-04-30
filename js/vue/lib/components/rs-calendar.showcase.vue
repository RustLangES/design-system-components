<script setup lang="ts">
import { ref } from "vue";
import Showcase from "@rustlanges/showcase/vue";
import RsCalendar from "./rs-calendar.vue";

const single = ref<Date | null>(null);
</script>

<template>
  <Showcase name="Calendar">
    <RsCalendar
      v-model:value="single"
      type="single"
    />
  </Showcase>
</template>
