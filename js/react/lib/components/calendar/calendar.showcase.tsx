import { useState } from "react";
import { registerCase } from "@rustlanges/showcase";
import { Calendar } from "./calendar.component";
import { CalendarRangeDate } from "./calendar.types";

registerCase("Calendar", () => {
  const [single, setSingle] = useState<Date | null>(new Date());
  const [multiple, setMultiple] = useState<Record<string, Date> | null>(null);
  const [range, setRange] = useState<CalendarRangeDate | null>(null);

  return (
    <div className="flex flex-col gap-2">
      <Calendar type="single" onChange={setSingle} value={single} />
      <Calendar type="multiple" onChange={setMultiple} value={multiple} />
      <Calendar type="range" onChange={setRange} value={range} />
    </div>
  );
});
