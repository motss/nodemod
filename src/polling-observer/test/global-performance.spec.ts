const globalThat = global as any;

afterEach(() => {
  /** NOTE(motss): Remove fake 'window' object */
  globalThat.window = void 0;
});

it(`uses 'perf_hooks' on Node.js`, async () => {
  const { globalPerformance } = await import('../global-performance.js');

  const perf = await globalPerformance();
  const timerify = (perf as any).timerify;

  expect(typeof(timerify)).toStrictEqual('function');
});

it(`uses 'window.Performance' on browser`, async () => {
  /** NOTE(motss): Fake a browser runtime environment */
  globalThat.window = {};

  const { globalPerformance } = await import('../global-performance.js');

  const perf = await globalPerformance() as any;
  expect(perf).toBe(undefined);
});
