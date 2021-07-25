import type { CalendarWeekday } from '../typings';
import { toUTCDate } from './to-utc-date';
import type { GetWeekdaysInit } from './typings';

export function getWeekdays(init: GetWeekdaysInit): CalendarWeekday[] {
  const {
    firstDayOfWeek = 0,
    showWeekNumber = false,
    weekLabel,

    longWeekdayFormat,
    narrowWeekdayFormat,
  } = init || {};
  const fixedFirstDayOfWeek = 1 + ((firstDayOfWeek + (firstDayOfWeek < 0 ? 7 : 0)) % 7);
  /* c8 ignore start */
  /** FIXME(rongsen): c8 outputs incorrect test coverage mapping for unknown reason */
  const $weekLabel = weekLabel || 'Wk';
  /* c8 ignore stop */

  const weekdays: CalendarWeekday[] = [
    ...(
      showWeekNumber ?
        [{
          label: $weekLabel === 'Wk' ? 'Week' : $weekLabel,
          value: $weekLabel,
        }] :
        []
    ),
    ...Array.from(Array(7)).map<CalendarWeekday>((_, i) => {
      const d = toUTCDate(2017, 0, fixedFirstDayOfWeek + i);

      /** NOTE: Stripping LTR mark away for x-browser compatibilities and consistency reason */
      return {
        label: longWeekdayFormat(d),
        value: narrowWeekdayFormat(d),
      };
    }),
  ];

  return weekdays;
}
