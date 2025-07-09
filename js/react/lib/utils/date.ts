type CalendarDay = {
  date: Date;
  currentMonth: boolean;
};

export const getCalendarDays = (baseDate = new Date()): CalendarDay[] => {
  const days: CalendarDay[] = [];

  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();

  const firstOfMonth = new Date(year, month, 1);
  const lastOfMonth = new Date(year, month + 1, 0);

  const totalDays = lastOfMonth.getDate();

  // Config to start on Monday
  const startWeekday = (firstOfMonth.getDay() + 6) % 7;
  const endWeekday = (lastOfMonth.getDay() + 6) % 7;

  // Previous month days
  if (startWeekday > 0) {
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startWeekday - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i;
      days.push({
        date: new Date(year, month - 1, day),
        currentMonth: false,
      });
    }
  }

  // Current month days
  for (let i = 1; i <= totalDays; i++) {
    days.push({
      date: new Date(year, month, i),
      currentMonth: true,
    });
  }

  // Next month days
  const remaining = 6 - endWeekday;
  for (let i = 1; i <= remaining; i++) {
    days.push({
      date: new Date(year, month + 1, i),
      currentMonth: false,
    });
  }

  return days;
};

export const addMonths = (date: Date, amount: number): Date => {
  const year = date.getFullYear();
  const month = date.getMonth() + amount;
  return new Date(year, month, 1);
};

export const subMonths = (date: Date, amount: number): Date => {
  return addMonths(date, -amount);
};
