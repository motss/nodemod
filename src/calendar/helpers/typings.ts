import type { CalendarInitBase, DateTimeFormatter } from '../typings.js';

export interface GetWeekdaysInit extends CalendarInitBase {
  longWeekdayFormat: DateTimeFormatter;
  narrowWeekdayFormat: DateTimeFormatter;
}
