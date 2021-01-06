import { toValidWeekday } from '../../../calendar/helpers/to-valid-weekday.js';

type TestSuccess = [number, number];
test.each<TestSuccess>([
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
])(`valid weekday (%i)`, (a, expected) => {
  expect(toValidWeekday(a)).toStrictEqual(expected);
});
