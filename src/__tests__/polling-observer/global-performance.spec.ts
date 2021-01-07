import './setup.js';

afterEach(() => {
  /** NOTE(motss): Remove fake 'window' object */
  Object.assign(global, { window: undefined });
});

it(`uses 'perf_hooks' on Node.js`, async () => {
  const { globalPerformance } = await import('../../polling-observer/global-performance.js');

  const perf = await globalPerformance();
  const timerify = (perf as unknown as import('perf_hooks').Performance).timerify;

  expect(typeof(timerify)).toStrictEqual('function');
});

it(`uses 'window.Performance' on browser`, async () => {
  /** NOTE(motss): Fake a browser runtime environment */
  Object.assign(global, { window: {} });

  const { globalPerformance } = await import('../../polling-observer/global-performance.js');

  const perf = await globalPerformance();

  expect(perf).toBe(undefined);
});
