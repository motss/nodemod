import { delayUntil } from '..';

beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

it(`delays`, async () => {
  const delayTask = delayUntil(3e3);

  jest.runAllTimers();
  expect(delayTask).resolves.toBe(undefined);
}, 10e3);

it(`resolves with optional 'delay'`, async () => {
  const delayTask = delayUntil();

  jest.runAllTimers();
  expect(delayTask).resolves.toBe(undefined);
}, 10e3);

it(`fallbacks not-a-number 'delay' to '0' and resolves`, async () => {
  const delayTask = delayUntil(null!);

  jest.runAllTimers();
  expect(delayTask).resolves.toBe(undefined);
}, 10e3);
