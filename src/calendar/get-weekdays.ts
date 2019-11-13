import { CalendarWeekday, GetWeekdaysOptions } from './calendar_typing.js';
import { toUTCDate } from './to-utc-date.js';

export function getWeekdays(options: GetWeekdaysOptions): CalendarWeekday[] {
  const {
    firstDayOfWeek = 0,
    showWeekNumber = false,
    weekLabel = 'Wk',

    longWeekdayFormat,
    narrowWeekdayFormat,
  } = options || {};

  const fixedFirstDayOfWeek = 1 + ((firstDayOfWeek + (firstDayOfWeek < 0 ? 7 : 0)) % 7);
  const initialValue: CalendarWeekday[] = showWeekNumber ?
    [{ label: weekLabel === 'Wk' ? 'Week' : weekLabel, value: weekLabel }] :
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
