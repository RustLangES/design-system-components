<script setup lang="ts">
import { computed, ref } from "vue";
import { addMonths, getCalendarDays, subMonths } from "../utils/date";
import RsArrowLeft from "../icons/rs-arrow-left.vue";
import RsArrowRight from "../icons/rs-arrow-right.vue";
import RsButton from "./rs-button.vue";
import RsCalendarDay from "./rs-calendar-day.vue";

const WEEK_DAYS = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
  "Domingo",
];

type RangeDate = { start?: Date; end?: Date };

type SingleProps = {
  type: "single";
  value: Date | null;
};
type MultipleProps = {
  type: "multiple";
  value: Record<string, Date> | null;
};
type RangeProps = {
  type: "range";
  value: RangeDate | null;
};

const props = withDefaults(
  defineProps<
    (SingleProps | MultipleProps | RangeProps) & { defaultMonth?: Date }
  >(),
  {
    defaultMonth: undefined,
  }
);

const emit = defineEmits<{
  (e: "change", value: Date | Record<string, Date> | RangeDate | null): void;
}>();

const month = ref<Date>(props.defaultMonth ?? new Date());

const calendarDays = computed(() => getCalendarDays(month.value));

const formattedMonth = computed(() =>
  month.value.toLocaleDateString("es-MX", { month: "long" })
);
const formattedYear = computed(() => month.value.getFullYear());

const handlePrev = () => {
  month.value = subMonths(month.value, 1);
};
const handleNext = () => {
  month.value = addMonths(month.value, 1);
};

const isSelected = (date: Date): boolean => {
  if (props.type === "single") {
    return props.value?.toDateString() === date.toDateString();
  }
  if (props.type === "multiple") {
    const key = date.toISOString().split("T")[0];
    return Boolean(props.value?.[key]);
  }
  // range
  const { start, end } = props.value ?? {};
  if (!start) return false;
  if (!end) return date.toDateString() === start.toDateString();
  return date >= start && date <= end;
};

const onSelectDay = (date: Date) => {
  if (props.type === "single") {
    if (props.value && isSelected(date)) emit("change", null);
    else emit("change", date);
    return;
  }
  if (props.type === "multiple") {
    const key = date.toISOString().split("T")[0];
    const current = (props.value ?? {}) as Record<string, Date>;
    const updated = { ...current };
    if (updated[key]) delete updated[key];
    else updated[key] = date;
    emit("change", updated);
    return;
  }
  // range
  const { start, end } = props.value ?? {};
  if (!start || (start && end)) {
    emit("change", { start: date });
  } else if (date < start) {
    emit("change", { start: date, end: start });
  } else {
    emit("change", { start, end: date });
  }
};

const containerClass = [
  "shadow-rb-black grid gap-4 rounded-[20px] border px-3 pb-10 pt-4",
  "bg-light border-2 border-black text-black",
  "dark:bg-dark dark:border-neutral-950 dark:text-neutral-50",
];
</script>

<template>
  <div :class="containerClass">
    <div class="flex items-center justify-between">
      <RsButton
        class="size-7 border-2"
        variant="icon"
        @click="handlePrev"
      >
        <template #icon>
          <RsArrowLeft />
        </template>
      </RsButton>
      <p class="flex-1 text-center text-sm font-medium capitalize">
        {{ formattedMonth }} {{ formattedYear }}
      </p>
      <RsButton
        class="size-7 border-2"
        variant="icon"
        @click="handleNext"
      >
        <template #icon>
          <RsArrowRight />
        </template>
      </RsButton>
    </div>
    <ul class="grid grid-cols-7 text-center" role="grid">
      <li
        v-for="day in WEEK_DAYS"
        :key="day"
        class="mb-1.5 min-w-9 text-xs"
      >
        {{ day.slice(0, 2) }}
      </li>
      <li
        v-for="{ date, currentMonth } in calendarDays"
        :key="date.toISOString()"
      >
        <RsCalendarDay
          :day="date"
          :selected="isSelected(date)"
          :disabled="!currentMonth"
          @select="onSelectDay"
        />
      </li>
    </ul>
  </div>
</template>
