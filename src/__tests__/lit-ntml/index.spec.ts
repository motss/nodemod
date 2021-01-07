import { html, htmlFragment, htmlFragmentSync, htmlSync } from '../../lit-ntml/index.js';

type A =
  | typeof html
  | typeof htmlFragment
  | typeof htmlFragmentSync
  | typeof htmlSync;

it.each<[string, A]>([
  ['html()', html],
  ['htmlFragment()', htmlFragment],
  ['htmlFragmentSync()', htmlFragmentSync],
  ['htmlSync()', htmlSync],
])(`contains %s`, (_, a) => {
  expect(a).toBeTruthy();
});
