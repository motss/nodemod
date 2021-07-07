import { performance } from 'perf_hooks';
import { test } from 'uvu';
import * as assert from 'uvu/assert';

test.before(() => {
  Object.assign(globalThis, { performance });

  assert.ok(globalThis.performance);
  assert.type(globalThis.performance.now, 'function');
});
