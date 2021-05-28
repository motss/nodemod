import type { WeekNumberType } from '../typings.js';
import { toUTCDate } from './to-utc-date.js';

function getNormalizedDate(weekNumberType: WeekNumberType, date: Date): Date {
  const fy = date.getUTCFullYear();
  const m = date.getUTCMonth();
  const d = date.getUTCDate();
  const wd = date.getUTCDay();

  let offset = wd;

  if (weekNumberType === 'first-4-day-week') offset = 3;
  if (weekNumberType === 'first-day-of-year') offset = 6;
  if (weekNumberType === 'first-full-week') offset = 0;

  return toUTCDate(fy, m, d - wd + offset);
}

/**
 * {@link https://bit.ly/2UvEN2y Compute week number by type}
 */
export function getWeekNumber(weekNumberType: WeekNumberType, date: Date): number {
  const normalizedDate = getNormalizedDate(weekNumberType, date);
  const firstDayOfYear = toUTCDate(normalizedDate.getUTCFullYear(), 0, 1);
  const numDays = 1 + ((+normalizedDate - +firstDayOfYear) / 864e5);

  return Math.ceil(numDays / 7);
}
