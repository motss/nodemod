import type { CalendarInitBase, DateTimeFormatter } from '../typings';

export interface GetWeekdaysInit extends OmitCalendarInitBase {
  longWeekdayFormat: DateTimeFormatter;
  narrowWeekdayFormat: DateTimeFormatter;
  shortWeekLabel?: string;
  weekLabel?: string;
}

type OmitCalendarInitBase = Omit<CalendarInitBase, 'weekNumberTemplate'>;
