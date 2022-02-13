import { getWeekNumber } from './helpers/get-week-number';
import { normalizeWeekday } from './helpers/normalize-weekday';
import { toUTCDate } from './helpers/to-utc-date';
import { toValidWeekday } from './helpers/to-valid-weekday';
import type { Calendar, CalendarDay, CalendarInit } from './typings';

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
export function calendar(init: CalendarInit): Calendar {
  const {
    date,
    dayFormat,
    disabledDates = [],
    disabledDays = [],
    firstDayOfWeek = 0,
    fullDateFormat,
    locale = 'en-US',
    max,
    min,
    showWeekNumber = false,
    weekNumberTemplate = 'Week %s',
    weekNumberType = 'first-4-day-week',
  }: CalendarInit = init || {};

  const firstDayOfWeek2 = toValidWeekday(firstDayOfWeek);

  const dateYear = date.getUTCFullYear();
  const dateMonth = date.getUTCMonth();
  const firstDateOfMonth = toUTCDate(dateYear, dateMonth, 1);

  const disabledDaysSet = new Set(
    disabledDays.map(n => normalizeWeekday(n, firstDayOfWeek2, showWeekNumber))
  );
  const disabledDatesSet = new Set(disabledDates.map(n => +n));
  const calendarKey = [
    firstDateOfMonth.toJSON(),
    firstDayOfWeek2,
    locale,
    null == max ? '' : max.toJSON(),
    null == min ? '' : min.toJSON(),
    Array.from(disabledDaysSet).join(','),
    Array.from(disabledDatesSet).join(','),
    weekNumberType,
  ].filter(Boolean).join(':');

  const firstDayOfWeekOffset =
    normalizeWeekday(firstDateOfMonth.getUTCDay(), firstDayOfWeek2, showWeekNumber);
  const minTime = null == min ? +new Date('2000-01-01') : +min;
  const maxTime = null == max ? +new Date('2100-12-31') : +max;
  const colNum = showWeekNumber ? 8 : 7;
  const totalDays = toUTCDate(dateYear, 1 + dateMonth, 0).getUTCDate();
  const rows: CalendarDay[][] = [];

  let cols: CalendarDay[] = [];
  let calendarComplete = false;
  let curDay = 1;

  /**
   * This would be constant since there are only in total of 6x7 cells in calendar month.
   * Only some cells will be filled with day depends on the value of `totalDays`.
   * Others will be empty (not-filled cells).
   */
  for (const row of [0, 1, 2, 3, 4, 5]) {
    for (const col of ([0, 1, 2, 3, 4, 5, 6].concat(colNum === 7 ? [] : [7]))) {
      const idx = col + (row * colNum);

      // Week label when week number needs to be shown
      if (!calendarComplete && showWeekNumber && col === 0) {
        const weekNumberOffset = row < 1 ? firstDayOfWeek2 : 0;

        const weekNumber = getWeekNumber(
          weekNumberType,
          toUTCDate(dateYear, dateMonth, curDay - weekNumberOffset)
        );
        const weekLabel = weekNumberTemplate.replace('%s', String(weekNumber));

        cols.push({
          fullDate: null,
          label: weekLabel,
          value: `${weekNumber}`,
          key: `${calendarKey}:${weekLabel}`,
          disabled: true,
        });

        continue;
      }

      // Empty days before and after the actual calendar days of the month
      if (calendarComplete || idx < firstDayOfWeekOffset) {
        cols.push({
          fullDate: null,
          label: '',
          value: '',
          key: `${calendarKey}:${idx}`,
          disabled: true,
        });

        continue;
      }

      const curDate = toUTCDate(dateYear, dateMonth, curDay);
      const curTime = +curDate;
      const isDisabledDay =
        disabledDaysSet.has(col) ||
        disabledDatesSet.has(curTime) ||
        (curTime < minTime || curTime > maxTime);

      if (isDisabledDay) disabledDatesSet.add(curTime);

      cols.push({
        fullDate: curDate,
        /** NOTE: Stripping LTR mark away for x-browser compatibilities and consistency reason */
        label: fullDateFormat(curDate),
        value: dayFormat(curDate),
        key: `${calendarKey}:${curDate.toJSON()}`,
        disabled: isDisabledDay,
      });

      curDay += 1;

      if (curDay > totalDays) calendarComplete = true;
    }

    rows.push(cols);
    cols = [];
  }

  return {
    disabledDatesSet,
    calendar: rows,
    disabledDaysSet: new Set(disabledDays.map(n => toValidWeekday(n))),
    key: calendarKey,
  };
}
