import { test } from 'uvu';
import * as assert from 'uvu/assert';

import { getWeekdays } from '../../../calendar/index';
import type { TestGetWeekdays } from '../mocks/get-weekdays';
import { mockGetWeekdaysData } from '../mocks/get-weekdays';

([undefined, null] as (undefined | null)[]).forEach((testInit) => {
  test(`weekdays (${testInit})`, (testInit) => {
    try {
      getWeekdays(testInit as never);
    } catch (e: unknown) {
      const error = e as TypeError;

      assert.is(error.name, TypeError.name);
      assert.match(error.message, 'longWeekdayFormat');
    }
  });
});

(mockGetWeekdaysData as TestGetWeekdays[]).forEach(([
  testName,
  testInit,
  expected,
]) => {
  test(`weekdays (${testName})`, () => {
    const result = getWeekdays(testInit);

    assert.equal(result, expected);
  });
});

test.run();
