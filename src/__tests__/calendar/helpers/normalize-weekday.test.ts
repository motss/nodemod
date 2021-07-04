import { test } from 'uvu';
import * as assert from 'uvu/assert';

import { normalizeWeekday } from '../../../calendar/index';

type TestSuccess = [number, number, boolean, number];
([
  [0, 0, false, 0],
  [0, 1, false, 6],
  [0, 2, false, 5],
  [0, 3, false, 4],
  [0, 4, false, 3],
  [0, 5, false, 2],
  [0, 6, false, 1],

  [1, 0, false, 1],
  [1, 1, false, 0],
  [1, 2, false, 6],
  [1, 3, false, 5],
  [1, 4, false, 4],
  [1, 5, false, 3],
  [1, 6, false, 2],

  [6, 0, false, 6],
  [6, 1, false, 5],
  [6, 2, false, 4],
  [6, 3, false, 3],
  [6, 4, false, 2],
  [6, 5, false, 1],
  [6, 6, false, 0],

  [0, 0, true, 1],
  [0, 1, true, 7],
  [0, 2, true, 6],
  [0, 3, true, 5],
  [0, 4, true, 4],
  [0, 5, true, 3],
  [0, 6, true, 2],

  [1, 0, true, 2],
  [1, 1, true, 1],
  [1, 2, true, 7],
  [1, 3, true, 6],
  [1, 4, true, 5],
  [1, 5, true, 4],
  [1, 6, true, 3],

  [6, 0, true, 7],
  [6, 1, true, 6],
  [6, 2, true, 5],
  [6, 3, true, 4],
  [6, 4, true, 3],
  [6, 5, true, 2],
  [6, 6, true, 1],
] as TestSuccess[]).forEach(([
  testWeekday,
  testFirstDayOfWeek,
  testShowWeekNumber,
  expected,
]) => {
  test(`normalized weekday (weekday=${testWeekday}; firstDayOfWeek=${testFirstDayOfWeek}; showWeekNumber=${testShowWeekNumber})`, () => {
    const result = normalizeWeekday(testWeekday, testFirstDayOfWeek, testShowWeekNumber);

    assert.is(result, expected);
  });
});

test.run();
