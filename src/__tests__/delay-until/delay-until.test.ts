import { test } from 'uvu';
import * as assert from 'uvu/assert';

import { delayUntil } from '../../delay-until/index';

test(`delays`, async () => {
  const timeout = 3e3;

  const delayTask = delayUntil(timeout);

  assert.is(await delayTask, undefined);
});

test(`resolves with optional 'delay'`, async () => {
  const delayTask = delayUntil();

  assert.is(await delayTask, undefined);
});

test(`fallbacks not-a-number 'delay' to '0' and resolves`, async () => {
  const delayTask = delayUntil(null as never);

  assert.is(await delayTask, undefined);
});

test.run();
