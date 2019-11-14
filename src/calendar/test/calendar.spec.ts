import { calendar } from '../calendar.js';
import { Calendar, CalendarOptions } from '../calendar_typing.js';
import { mockCalendarData } from './mocks/calendar.js';

type TestError = [string, undefined | null];
test.each<TestError>([
  [`void`, void 0],
  [`null`, null],
])(`calendar(%s)`, (_, a) => {
  try {
    calendar(a!);
  } catch (e) {
    expect(e.name).toStrictEqual(TypeError.name);
    expect(e.message).toMatch('getUTCFullYear');
  }
});

type TestSuccess = [string, CalendarOptions, Calendar];
test.each<TestSuccess>(mockCalendarData)(`calendar(%s)`, (_, a, expected) => {
  const d = calendar(a);

  expect(d).toEqual(expected);
});