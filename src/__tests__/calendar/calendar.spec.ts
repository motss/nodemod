import { calendar } from '../../calendar/index.js';
import type { Calendar, CalendarInit } from '../../calendar/typings.js';
import { mockCalendarData } from './mocks/calendar.js';

type TestError = [string, undefined | null];
test.each<TestError>([
  [`void`, void 0],
  [`null`, null],
])(`calendar (%s)`, (_, a) => {
  try {
    calendar(a as never);
  } catch (e) {
    expect(e.name).toStrictEqual(TypeError.name);
    expect(e.message).toMatch('getUTCFullYear');
  }
});

type TestSuccess = [string, CalendarInit, Calendar];
test.each<TestSuccess>(mockCalendarData)(`calendar(%s)`, (_, a, expected) => {
  const d = calendar(a);

  expect({
    ...d,
    calendar: [
      d.calendar[0],
      d.calendar[4],
      d.calendar[5],
    ],
  }).toEqual(expected);
});
