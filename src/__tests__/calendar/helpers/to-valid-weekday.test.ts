import { test } from 'uvu';
import * as assert from 'uvu/assert';

import { toValidWeekday } from '../../../calendar/index';

type TestSuccess = [number, number];
([
  [0, 0],
  [1, 1],
  [2, 2],
  [3, 3],
  [4, 4],
  [5, 5],
  [6, 6],
  [7, 0],
  [8, 1],
  [9, 2],

  [-0, 0],
  [-1, 6],
  [-2, 5],
  [-3, 4],
  [-4, 3],
  [-5, 2],
  [-6, 1],
  [-7, 0],
  [-8, 6],
  [-9, 5],
] as TestSuccess[]).forEach(([
  testWeekday,
  expected,
]) => {
  test(`valid weekday (weekday=${testWeekday})`, () => {
    const result = toValidWeekday(testWeekday);

    assert.is(result, expected);
  });
});

test.run();
