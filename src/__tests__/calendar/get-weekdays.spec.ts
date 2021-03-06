import { getWeekdays } from '../../calendar/get-weekdays.js';
import type { TestGetWeekdays } from './mocks/get-weekdays.js';
import { mockGetWeekdaysData } from './mocks/get-weekdays.js';

type TestError = [string, undefined | null];
test.each<TestError>([
  [`void`, void 0],
  [`null`, null],
])(`weekdays (%s)`, (_, a) => {
  try {
    getWeekdays(a as never);
  } catch (e) {
    expect(e.name).toStrictEqual(TypeError.name);
    expect(e.message).toMatch('longWeekdayFormat');
  }
});

test.each<TestGetWeekdays>(mockGetWeekdaysData)(`weekdays (%s)`, (_, a, expected) => {
  const d = getWeekdays(a);

  expect(d).toStrictEqual(expected);
});
