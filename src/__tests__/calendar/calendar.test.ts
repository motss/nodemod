import { test } from 'uvu';
import * as assert from 'uvu/assert';

import { calendar } from '../../calendar/index';
import type { Calendar, CalendarInit } from '../../calendar/typings';
import { mockCalendarData } from './mocks/calendar';

([
  undefined,
  null,
] as (undefined | null)[]).forEach((testInit) => {
  test(`calendar (${testInit})`, () => {
    try {
      calendar(testInit as never);
    } catch (e: unknown) {
      const error = e as TypeError;

      assert.is(error.name, TypeError.name);
      assert.match(error.message, 'getUTCFullYear');
    }
  });
});

type TestSuccess = [string, CalendarInit, Calendar];
(mockCalendarData as TestSuccess[]).forEach(([
  testName,
  testInit,
  expected,
]) => {
  test(`calendar ${testName}`, () => {
    const result = calendar(testInit);

    assert.match(result.key, expected.key);
    assert.equal(result.disabledDatesSet, expected.disabledDatesSet);
    assert.equal(result.disabledDaysSet, expected.disabledDaysSet);

    const pickedRowIdx = [0, 4, 5];

    expected.calendar.forEach((row, rowIdx) => {
      row.forEach((col, colIdx) => {
        const chosenRowIdx = pickedRowIdx[rowIdx];
        const calendarCol = result.calendar[chosenRowIdx][colIdx];

        assert.is(calendarCol.disabled, col.disabled);
        assert.equal(calendarCol.fullDate, col.fullDate);
        assert.match(calendarCol.key, col.key);
        assert.is(calendarCol.label, col.label);
        assert.is(calendarCol.value, col.value);
      });
    });
  });
});

test.run()
