import { stubMethod } from 'hanbi';
import { test } from 'uvu';
import * as assert from 'uvu/assert';

import { delayUntil } from '../../delay-until/index';

const mockSetTimeout = stubMethod(globalThis, 'setTimeout');

test.before.each(() => {
  mockSetTimeout.callsFake((cb) => {
    return cb() as unknown as NodeJS.Timeout;
  });
  assert.not.equal(globalThis.setTimeout, mockSetTimeout.original);
});

test.after.each(() => {
  mockSetTimeout.reset();
});

test.after(() => {
  mockSetTimeout.restore();
  assert.equal(globalThis.setTimeout, mockSetTimeout.original);
});

test(`delays`, async () => {
  const delayTask = delayUntil(3e3);

  assert.ok(mockSetTimeout.called);
  assert.is(await delayTask, undefined);
});

test(`resolves with optional 'delay'`, async () => {
  const delayTask = delayUntil();

  assert.not.ok(mockSetTimeout.called);
  assert.is(await delayTask, undefined);
});

test(`fallbacks not-a-number 'delay' to '0' and resolves`, async () => {
  const delayTask = delayUntil(null as never);

  assert.not.ok(mockSetTimeout.called);
  assert.is(await delayTask, undefined);
});

test.run();
