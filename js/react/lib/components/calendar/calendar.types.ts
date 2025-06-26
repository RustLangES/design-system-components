export type CalendarRangeDate = {
  start?: Date;
  end?: Date;
};

export type CalendarTypeValue = {
  single: Date | null;
  multiple: Record<string, boolean> | null;
  range: CalendarRangeDate | null;
};

export type SelectionType = keyof CalendarTypeValue; // "single" | "multiple" | "range"

export type SingleCalendar = {
  type: "single";
  value: Date | null;
  onChange: (value: Date | null) => void;
};

export type MultipleCalendar = {
  type: "multiple";
  value: Record<string, Date> | null;
  onChange: (value: Record<string, Date> | null) => void;
};

export type RangeCalendar = {
  type: "range";
  value: CalendarRangeDate | null;
  onChange: (value: CalendarRangeDate | null) => void;
};

export type CalendarProps = SingleCalendar | MultipleCalendar | RangeCalendar;
