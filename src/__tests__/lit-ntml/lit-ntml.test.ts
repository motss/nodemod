import { test } from 'uvu';
import * as assert from 'uvu/assert';

import { html, htmlFragment, htmlFragmentSync, htmlSync } from '../../lit-ntml/index';

type A =
  | typeof html
  | typeof htmlFragment
  | typeof htmlFragmentSync
  | typeof htmlSync;

([
  ['html()', html],
  ['htmlFragment()', htmlFragment],
  ['htmlFragmentSync()', htmlFragmentSync],
  ['htmlSync()', htmlSync],
] as [string, A][]).forEach(([testName, testFn]) => {
  test(`contains ${testName}`, () => {
    assert.ok(testFn);
  });
});

test.run()
