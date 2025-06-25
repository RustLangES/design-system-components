import { cn } from "@/utils/tw-merge";
import { DAY_VARIANTS } from "./component.const";

type CalendarDayProps = {
  disabled?: boolean;
  selected?: boolean;
  day: Date;
  onSelectDay: (date: Date) => void;
};

export const CalendarDay = ({
  disabled,
  selected,
  day,
  onSelectDay,
}: CalendarDayProps) => {
  return (
    <button
      className={cn([
        "mb-1 flex min-h-9 min-w-9 cursor-pointer appearance-none items-center justify-center rounded-sm border-2 text-sm font-medium transition",
        "border-black",
        "dark:border-neutral-50",
        disabled && DAY_VARIANTS.disabled,
        selected && DAY_VARIANTS.selected,
      ])}
      aria-selected={selected}
      data-date={day.toISOString().split("T")[0]}
      onClick={() => !disabled && onSelectDay(day)}
    >
      {day.getDate()}
    </button>
  );
};
