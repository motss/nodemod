import { toValidWeekday } from './to-valid-weekday';

export function normalizeWeekday(
  weekDay: number,
  firstDayOfWeek: number,
  showWeekNumber: boolean
): number {
  const x = toValidWeekday(weekDay - firstDayOfWeek);

  return showWeekNumber ? 1 + x : x;
}
