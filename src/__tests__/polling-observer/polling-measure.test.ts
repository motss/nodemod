import { test } from 'uvu';
import * as assert from 'uvu/assert';

import { PollingMeasure } from '../../polling-observer/index';

test(`instantiates 'PollingMeasure'`, () => {
  const entry = new PollingMeasure('polling:0', 100, 100);

  assert.instance(entry, PollingMeasure);
  assert.type(entry.duration, 'number');
  assert.is(entry.entryType, 'polling-measure');
  assert.match(entry.name, 'polling:');
  assert.type(entry.startTime, 'number');
});

test(`returns JSON object via '.toJSON()'`, () => {
  const entry = new PollingMeasure('polling:0', 100, 100);

  assert.not.instance(entry.toJSON, PollingMeasure);
  assert.type(entry.duration, 'number');
  assert.is(entry.entryType, 'polling-measure');
  assert.match(entry.name, 'polling:');
  assert.type(entry.startTime, 'number');
});

test.run()
