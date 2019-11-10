import { WeekNumber, WeekNumberType } from './calendar_typing.js';
import { toUTCDate } from './to-utc-date.js';

function toFixedDate(weekNumberType: WeekNumberType, date: Date): Date {
  const wd = date.getUTCDay();
  const fy = date.getUTCFullYear();
  const m = date.getUTCMonth();
  const d = date.getUTCDate();

  switch (weekNumberType) {
    case 'first-4-day-week':
      return toUTCDate(fy, m, d - wd + 3);
    case 'first-day-of-year':
      return toUTCDate(fy, m, d - wd + 6);
    case 'first-full-week':
      return toUTCDate(fy, m, d - wd);
    default:
      return date;
  }
}

/**
 * {@link https://bit.ly/2UvEN2y|Compute week number by type}
 */
export function getWeekNumber(weekNumberType: WeekNumberType, date: Date): WeekNumber {
  const fixedNow = toFixedDate(weekNumberType, date);
  const firstDayOfYear = toUTCDate(fixedNow.getUTCFullYear(), 0, 1);
  const wk = Math.ceil(((+fixedNow - +firstDayOfYear) / 864e5 + 1) / 7);

  return {
    originalDate: date,
    fixedDate: fixedNow,
    weekNumber: wk,
  };
}
