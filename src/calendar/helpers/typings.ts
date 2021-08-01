import type { CalendarInitBase, DateTimeFormatter } from '../typings';

export interface GetWeekdaysInit extends CalendarInitBase {
  longWeekdayFormat: DateTimeFormatter;
  narrowWeekdayFormat: DateTimeFormatter;
}
