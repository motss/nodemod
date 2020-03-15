export function toValidWeekday(weekday: number): number {
  if (weekday >= 0 && weekday < 7) return Math.abs(weekday);

  const weekdayOffset = weekday < 0 ? 7 * Math.ceil(Math.abs(weekday)) : 0;

  return (weekdayOffset + weekday) % 7;
}
