import { normalize, normalizeSync } from '../../normalize-diacritics/index.js';

type A =
  | typeof normalize
  | typeof normalizeSync;

it.each<[string, A]>([
  ['normalize()', normalize],
  ['normalizeSync()', normalizeSync],
])(`contains %s`, (_, a) => {
  expect(a).toBeTruthy();
});
