import {
  SingleCalendar,
  MultipleCalendar,
  RangeCalendar,
  CalendarProps,
} from "./calendar.types";

export const WEEK_DAYS = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
  "Domingo",
];

export const DAY_VARIANTS = {
  selected: "bg-primary-500 text-light dark:text-neutral-950",
  disabled: "opacity-50 cursor-not-allowed",
};

function getSingleSelection({ value, onChange }: SingleCalendar) {
  const isSelected = (date: Date) =>
    value?.toDateString() === date.toDateString();

  const onSelectDay = (date: Date) => {
    if (value && isSelected(date)) return onChange(null);
    onChange(date);
  };
  return { isSelected, onSelectDay };
}

function getMultipleSelection({ value, onChange }: MultipleCalendar) {
  const onSelectDay = (date: Date) => {
    const key = date.toISOString().split("T")[0];
    const current = value ?? {};
    const updated = { ...current };
    if (updated[key]) delete updated[key];
    else updated[key] = date;
    onChange(updated);
  };

  const isSelected = (date: Date) =>
    !!value?.[date.toISOString().split("T")[0]];
  return { isSelected, onSelectDay };
}

function getRangeSelection({ value, onChange }: RangeCalendar) {
  const { start, end } = value ?? {};
  const onSelectDay = (date: Date) => {
    if (!start || (start && end)) {
      onChange({ start: date });
    } else {
      if (date < start) onChange({ start: date, end: start });
      else onChange({ start, end: date });
    }
  };
  const isSelected = (date: Date) => {
    if (!start) return false;
    if (!end) return date.toDateString() === start.toDateString();
    return date >= start && date <= end;
  };
  return { isSelected, onSelectDay };
}

export function getSelectionHandler(props: CalendarProps) {
  switch (props.type) {
    case "single":
      return getSingleSelection(props);
    case "multiple":
      return getMultipleSelection(props);
    case "range":
      return getRangeSelection(props);
    default:
      throw new Error("Invalid calendar selection type");
  }
}
