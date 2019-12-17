import { Calendar, CalendarDay, CalendarOptions } from './calendar_typing.js';
import { getWeekNumber } from './get-week-number.js';
import { toUTCDate } from './to-utc-date.js';

function normalizeWeekday(weekday: number): number {
  if (weekday >= 0 && weekday < 7) return weekday;

  const weekdayOffset = weekday < 0 ? 7 * Math.ceil(Math.abs(weekday / 7)) : 0;

  return (weekdayOffset + weekday) % 7;
}

function shiftDisabledDays(firstDayOfWeek: number, disabledDays: number[]) {
  return disabledDays.map((n) => {
    const day = n - firstDayOfWeek;

    return day < 0 ? 7 + day : day;
  });
}

export function calendar(options: CalendarOptions): Calendar {
  const {
    dayFormat,
    fullDateFormat,
    locale,
    selectedDate,

    disabledDates = [],
    disabledDays = [],
    firstDayOfWeek = 0,
    max,
    min,
    showWeekNumber = false,
    weekLabel = 'Week',
    weekNumberType = 'first-4-day-week',
  }: CalendarOptions = options || {};

  //  Month Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec
  //  Days   31  28  31  30  31  30  31  31  30  31  30  31
  //   31?    0       2       4       6   7       9      11
  //   30?                3       5           8      10
  //  Feb?        1
  //  Su Mo Tu We Th Fr Sa    startDay - _firstDayOfWeek
  //                  1  2        5 - 0 < 0 ? 6 : 5 - 0;
  //  Mo Tu We Th Fr Sa Su
  //               1  2  3        5 - 1 < 0 ? 6 : 5 - 1;
  //  Tu We Th Fr Sa Su Mo
  //            1  2  3  4        5 - 2 < 0 ? 6 : 5 - 2;
  //  We Th Fr Sa Su Mo Tu
  //         1  2  3  4  5        5 - 3 < 0 ? 6 : 5 - 3;
  //  Th Fr Sa Su Mo Tu We
  //      1  2  3  4  5  6        5 - 4 < 0 ? 6 : 5 - 4;
  //  Fr Sa Su Mo Tu We Th
  //   1  2  3  4  5  6  7        5 - 5 < 0 ? 6 : 5 - 5;
  //  Sa Su Mo Tu We Th Fr
  //                     1        5 - 6 < 0 ? 6 : 5 - 6;
  const fy = selectedDate.getUTCFullYear();
  const selectedMonth = selectedDate.getUTCMonth();
  const calendarKey = `${locale}:${toUTCDate(fy, selectedMonth, 1).toJSON()}`;

  const totalDays = toUTCDate(fy, selectedMonth + 1, 0).getUTCDate();
  const preFirstWeekday = toUTCDate(fy, selectedMonth, 1).getUTCDay() - firstDayOfWeek;
  const firstWeekday = normalizeWeekday(preFirstWeekday);
  const totalCol = showWeekNumber ? 8 : 7;
  const firstWeekdayWithWeekNumberOffset = firstWeekday + (showWeekNumber ? 1 : 0);
  const calendarDays: CalendarDay[][] = [];
  const minTime = null == min ? Number.MIN_SAFE_INTEGER : +min;
  const maxTime = null == max ? Number.MAX_SAFE_INTEGER : +max;
  const disabledDatesSet: Set<number> = new Set(disabledDates.map(n => +n));
  const disabledDaysSet: Set<number> = new Set(
    !firstDayOfWeek ? disabledDays : shiftDisabledDays(firstDayOfWeek, disabledDays));

  let calendarRow: CalendarDay[] = [];
  let day = 1;
  let row = 0;
  let col = 0;
  let calendarFilled = false;
  /**
   * NOTE(motss): Thinking this is cool to write,
   * don't blame me for writing this kind of loop.
   * Optimization is totally welcome to make things faster.
   * Also, I'd like to learn a better way. PM me and we can talk about that. 😄
   */
  for (let i = 0, len = 6 * totalCol + (showWeekNumber ? 6 : 0); i <= len; i += 1, col += 1) {
    if (col >= totalCol) {
      col = 0;
      row += 1;
      calendarDays.push(calendarRow);
      calendarRow = [];
    }

    if (i >= len) break;

    const rowVal = col + (row * totalCol);

    if (!calendarFilled && showWeekNumber && col < 1) {
      const { weekNumber } = getWeekNumber(
        weekNumberType,
        toUTCDate(fy, selectedMonth, day - (row < 1 ? firstWeekday : 0)));
      const wkLabel = `${weekLabel} ${weekNumber}`;

      calendarRow.push({
        fullDate: null,
        label: wkLabel,
        value: `${weekNumber}`,
        key: `${calendarKey}:${wkLabel}`,
        disabled: true,
      });
      continue;
    }

    if (calendarFilled || rowVal < firstWeekdayWithWeekNumberOffset) {
      calendarRow.push({
        fullDate: null,
        label: null,
        value: null,
        key: `${calendarKey}:${i}`,
        disabled: true,
      });
      continue;
    }

    const fullDate = toUTCDate(fy, selectedMonth, day);
    const fullDateTime = +fullDate;
    const isDisabledDay =
      disabledDaysSet.has(col) ||
      disabledDatesSet.has(fullDateTime) ||
      (fullDateTime < minTime || fullDateTime > maxTime);

    if (isDisabledDay) disabledDatesSet.add(fullDateTime);

    calendarRow.push({
      fullDate,
      /** NOTE: Stripping LTR mark away for x-browser compatibilities and consistency reason */
      label: fullDateFormat(fullDate),
      value: dayFormat(fullDate),
      key: `${calendarKey}:${fullDate.toJSON()}`,
      disabled: isDisabledDay,
    });
    day += 1;

    if (day > totalDays) calendarFilled = true;
  }

  return {
    disabledDatesSet,
    disabledDaysSet,
    calendar: calendarDays,
    key: calendarKey,
  };
}
