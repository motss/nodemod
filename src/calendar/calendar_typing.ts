interface CalendarOptionsBase {
  firstDayOfWeek?: number;
  showWeekNumber?: boolean;
  weekLabel?: string;
}

interface CalendarOutputBase {
  label: string;
  value: string;
}

export declare type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

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

export interface CalendarDay extends Nullable<CalendarOutputBase> {
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

// #region getWeekdays
export interface GetWeekdaysOptions extends CalendarOptionsBase {
  longWeekdayFormat: DateTimeFormatter;
  narrowWeekdayFormat: DateTimeFormatter;
}

export type CalendarWeekday = CalendarOutputBase;
// #endregion getWeekdays

// #region getWeekNumber
export interface WeekNumber {
  originalDate: Date;
  fixedDate: Date;
  weekNumber: number;
}
// #endregion getWeekNumber
