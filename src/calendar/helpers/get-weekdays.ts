import type { CalendarWeekday } from '../typings.js';
import { toUTCDate } from './to-utc-date.js';
import type { GetWeekdaysInit } from './typings.js';

export function getWeekdays(init: GetWeekdaysInit): CalendarWeekday[] {
  const {
    firstDayOfWeek = 0,
    showWeekNumber = false,
    weekLabel,

    longWeekdayFormat,
    narrowWeekdayFormat,
  } = init || {};

  const fixedFirstDayOfWeek = 1 + ((firstDayOfWeek + (firstDayOfWeek < 0 ? 7 : 0)) % 7);
  const weekLabel2 = weekLabel || 'Wk';
  const initialValue: CalendarWeekday[] =
    showWeekNumber ?
    [{
      label: weekLabel2 === 'Wk' ? 'Week' : weekLabel2,
      value: weekLabel2,
    }] :
    [];

  const weekdays = Array.from(Array(7)).reduce<CalendarWeekday[]>((p, _, i) => {
    const d = toUTCDate(2017, 0, fixedFirstDayOfWeek + i);

    /** NOTE: Stripping LTR mark away for x-browser compatibilities and consistency reason */
    p.push({
      label: longWeekdayFormat(d),
      value: narrowWeekdayFormat(d),
    });

    return p;
  }, initialValue);

  return weekdays;
}
