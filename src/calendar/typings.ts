export interface Calendar {
  calendar: CalendarDay[][];
  disabledDatesSet: Set<number>;
  disabledDaysSet: Set<number>;
  key: string;
}

export interface CalendarDay extends CalendarWeekday {
  disabled: boolean;
  fullDate: Date | null;
  key: string;
}

export interface CalendarInit extends CalendarInitBase {

  date: Date;
  dayFormat: DateTimeFormatter;
  disabledDates?: Date[];
  disabledDays?: number[];
  fullDateFormat: DateTimeFormatter;
  locale: string;
  max?: Date;
  min?: Date;
  weekNumberType?: WeekNumberType;
}


export interface CalendarInitBase {
  firstDayOfWeek?: number;
  showWeekNumber?: boolean;
  weekNumberTemplate?: string;
}

export interface CalendarWeekday {
  label: string;
  value: string;
}

export type DateTimeFormatter = Intl.DateTimeFormat['format'];

export type WeekNumberType = 'first-4-day-week' | 'first-day-of-year' | 'first-full-week';
