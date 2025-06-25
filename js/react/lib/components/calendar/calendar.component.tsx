import { ArrowLeft, ArrowRight } from "@/icons";
import { Button } from "../button";
import { getSelectionHandler, WEEK_DAYS } from "./component.const";
import { cn } from "@/utils/tw-merge";
import { useMemo, useState } from "react";
import { getCalendarDays, addMonths, subMonths } from "@/utils/date";
import { CalendarDay } from "./calendar.day";
import { CalendarProps } from "./calendar.types";

/**
 * Calendar Component
 *
 * Renders an interactive monthly calendar that supports different selection modes: single date,
 * multiple dates, or a date range.
 *
 * Props:
 * @param {Date} [defaultMonth] - The initial month to display. Defaults to the current month.
 * @param {("single"|"multiple"|"range")} type - The selection mode defining how dates can be selected.
 * @param {Date | Record<string, boolean> | RangeDate | null} value - The current selection value matching the selection type.
 * @param {(value: Date | Record<string, boolean> | RangeDate | null) => void} onChange - Callback fired when the selection changes.
 *
 * Usage example:
 * ```tsx
 * <Calendar
 *   type="range"
 *   value={{ start: new Date(), end: null }}
 *   onChange={(range) => console.log("Selected range:", range)}
 *   defaultMonth={new Date()}
 * />
 * ```
 *
 * The internal `getSelectionHandler` function determines if a date is selected and how to update
 * the selection when a day is clicked, based on the selection type.
 *
 * @returns JSX.Element representing the calendar UI.
 */
export const Calendar = ({
  defaultMonth,
  ...rest
}: CalendarProps & { defaultMonth?: Date }) => {
  const [month, setMonth] = useState<Date>(defaultMonth ?? new Date());

  const { isSelected, onSelectDay } = useMemo(() => {
    return getSelectionHandler({
      ...rest,
    });
  }, [rest]);

  const calendarDays = useMemo(() => getCalendarDays(month), [month]);

  const handleNextMonth = () => setMonth(current => addMonths(current, 1));
  const handlePrevMonth = () => setMonth(current => subMonths(current, 1));

  const formattedYear = month.getFullYear();
  const formattedMonth = month.toLocaleDateString("es-MX", {
    month: "long",
  });

  return (
    <div
      className={cn([
        "shadow-rb-black grid gap-4 rounded-[20px] border px-3 pb-10 pt-4",
        "bg-light border-2 border-black text-black",
        "dark:bg-dark dark:border-neutral-950 dark:text-neutral-50",
      ])}
    >
      <div className="justify-between} flex items-center">
        <Button
          className="size-7 border-2"
          variant="icon"
          icon={<ArrowLeft />}
          onClick={handlePrevMonth}
        />
        <p className="flex-1 text-center text-sm font-medium capitalize">
          {formattedMonth} {formattedYear}
        </p>
        <Button
          className="size-7 border-2"
          variant="icon"
          icon={<ArrowRight />}
          onClick={handleNextMonth}
        />
      </div>
      <ul className="grid grid-cols-7 text-center" role="grid">
        {WEEK_DAYS.map(day => (
          <li className="mb-1.5 min-w-9 text-xs">{day.slice(0, 2)}</li>
        ))}
        {calendarDays.map(({ date, currentMonth }) => {
          const selected = isSelected(date);
          const disabled = !currentMonth;
          return (
            <li key={date.toISOString()}>
              <CalendarDay
                day={date}
                selected={selected}
                disabled={disabled}
                onSelectDay={onSelectDay}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
