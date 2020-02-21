import { delayUntil } from '../index.js';

it(`delays`, async () => {
  const delayTask = delayUntil(3e3);

  expect(delayTask).resolves.toBe(undefined);
}, 10e3);

it(`resolves with optional 'delay'`, async () => {
  const delayTask = delayUntil();

  expect(delayTask).resolves.toBe(undefined);
}, 10e3);

it(`fallbacks not-a-number 'delay' to '0' and resolves`, async () => {
  const delayTask = delayUntil(null!);

  expect(delayTask).resolves.toBe(undefined);
}, 10e3);
