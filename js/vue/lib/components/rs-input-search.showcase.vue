<script setup lang="ts">
import Showcase from "@rustlanges/showcase/vue";
import RsInputSearch from "./rs-input-search.vue";

const filters = [
  { label: "Recientes", value: "recent" },
  { label: "ES", value: "es" },
  { label: "EN", value: "en" },
  { label: "Libros", value: "books" },
  { label: "Guías", value: "guides" },
  { label: "Frameworks", value: "frameworks" },
  { label: "Librerías", value: "libraries" },
  { label: "Multinivel", value: "multi" },
  { label: "Principiante", value: "beginner" },
  { label: "Intermedio", value: "intermediate" },
  { label: "Avanzado", value: "advanced" },
];
</script>

<template>
  <Showcase name="InputSearchPlain">
    <RsInputSearch placeholder="Buscar" />
  </Showcase>

  <Showcase name="InputSearchWithFilters">
    <RsInputSearch placeholder="Buscar" :filters="filters" />
  </Showcase>
</template>
