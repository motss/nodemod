import { test } from 'uvu';
import * as assert from 'uvu/assert';

import { normalize, normalizeSync } from '../../normalize-diacritics/index';

type A =
  | typeof normalize
  | typeof normalizeSync;

(
  [
    ['normalize()', normalize],
    ['normalizeSync()', normalizeSync],
  ] as [string, A][]
).forEach(([, fn]) => {
  test('contains %s', () => {
    assert.ok(fn);
  });
});

test.run()
