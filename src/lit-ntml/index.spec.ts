import { html, htmlFragment, htmlFragmentSync, htmlSync } from './index.js';

it.each<[string, (...args: any[]) => any]>([
  ['html()', html],
  ['htmlFragment()', htmlFragment],
  ['htmlFragmentSync()', htmlFragmentSync],
  ['htmlSync()', htmlSync],
])(`contains %s`, (_, a) => {
  expect(a).toBeTruthy();
});
