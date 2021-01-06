import { normalize, normalizeSync } from '../../normalize-diacritics/index.js';

it.each<[string, (...args: any[]) => any]>([
  ['normalize()', normalize],
  ['normalizeSync()', normalizeSync],
])(`contains %s`, (_, a) => {
  expect(a).toBeTruthy();
});
