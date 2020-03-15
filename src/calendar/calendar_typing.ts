interface CalendarOptionsBase {
  firstDayOfWeek?: number;
  showWeekNumber?: boolean;
  weekLabel?: string;
}

// #region getWeekdays
export interface GetWeekdaysOptions extends CalendarOptionsBase {
  longWeekdayFormat: DateTimeFormatter;
  narrowWeekdayFormat: DateTimeFormatter;
}

export interface CalendarWeekday {
  label: string;
  value: string;
}
// #endregion getWeekdays

export type DateTimeFormatter = Intl.DateTimeFormat['format'];

export type WeekNumberType = 'first-4-day-week' | 'first-day-of-year' | 'first-full-week';

// #region calendar
export interface CalendarOptions extends CalendarOptionsBase {
  dayFormat: DateTimeFormatter;
  fullDateFormat: DateTimeFormatter;
  locale: string;
  selectedDate: Date;

  disabledDates?: Date[];
  disabledDays?: number[];
  max?: Date;
  min?: Date;
  weekNumberType?: WeekNumberType;
}

export interface CalendarDay extends CalendarWeekday {
  fullDate: Date | null;
  key: string;
  disabled: boolean;
}

export interface Calendar {
  key: string;
  calendar: CalendarDay[][];
  disabledDatesSet: Set<number>;
  disabledDaysSet: Set<number>;
}
// #endregion calendar
