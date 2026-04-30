<script setup lang="ts">
import { computed, ref, useAttrs } from "vue";
import RsTag from "./rs-tag.vue";
import RsSearch from "../icons/rs-search.vue";
import RsFilter from "../icons/rs-filter.vue";

defineOptions({ inheritAttrs: false });

type Option = { label: string; value: string };

const props = withDefaults(
  defineProps<{
    filters?: Option[];
    activeFilters?: Option[];
    placeholder?: string;
  }>(),
  {
    filters: () => [],
    activeFilters: () => [],
    placeholder: "Buscar",
  }
);

const emit = defineEmits<{
  (e: "changeFilter", value: Option[]): void;
}>();

const attrs = useAttrs();
const filterOpen = ref(false);

const hasFilter = computed(() => props.filters.length > 0);

const containerClass = computed(() => [
  "rustlanges-input-search-container",
  attrs.class,
]);

const labelClass = computed(() => [
  "rustlanges-input-search",
  hasFilter.value && "rustlanges-input-search--filter",
]);

const dropdownClass = computed(() => [
  "rustlanges-input-search-backdrop__content",
  filterOpen.value
    ? "rustlanges-input-search-backdrop__content--open"
    : "rustlanges-input-search-backdrop__content--closed",
]);

const isSelected = (filter: Option) =>
  props.activeFilters.some(({ value }) => value === filter.value);

const handleSelectFilter = (filter: Option) => {
  if (isSelected(filter)) {
    emit(
      "changeFilter",
      props.activeFilters.filter(({ value }) => value !== filter.value)
    );
  } else {
    emit("changeFilter", [...props.activeFilters, filter]);
  }
};

const toggleFilters = () => {
  filterOpen.value = !filterOpen.value;
};

const closeFilters = () => {
  if (hasFilter.value) filterOpen.value = false;
};
</script>

<template>
  <div :class="containerClass">
    <label :class="labelClass">
      <RsSearch :width="24" :height="24" />
      <input
        type="text"
        :placeholder="placeholder"
        class="text-caption"
        @click="closeFilters"
      />
    </label>
    <div class="rustlanges-input-search__filter">
      <button v-if="hasFilter" tabindex="0" @click="toggleFilters">
        <RsFilter :width="24" :height="24" />
      </button>
      <div :class="dropdownClass">
        <ul v-if="filterOpen" class="rustlanges-input-search-backdrop__list">
          <li
            v-for="filter in filters"
            :key="filter.value"
            @click="handleSelectFilter(filter)"
          >
            <RsTag
              as="button"
              tabindex="0"
              :selected="isSelected(filter)"
              :label="filter.label"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
