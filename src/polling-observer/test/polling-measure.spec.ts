import { PollingMeasure } from '../polling-measure';

it(`instantiates 'PollingMeasure'`, () => {
  const entry = new PollingMeasure('polling:0', 100, 100);

  expect(entry).toBeInstanceOf(PollingMeasure);
  expect(entry).toMatchObject({
    duration: expect.any(Number),
    entryType: expect.stringMatching('polling-measure'),
    name: expect.stringMatching(/^polling:\d+/i),
    startTime: expect.any(Number),
  } as PollingMeasure);
});

it(`returns JSON object via '.toJSON()'`, () => {
  const entry = new PollingMeasure('polling:0', 100, 100);

  expect(entry.toJSON()).not.toBeInstanceOf(PollingMeasure);
  expect(entry).toMatchObject({
    duration: expect.any(Number),
    entryType: expect.stringMatching('polling-measure'),
    name: expect.stringMatching(/^polling:\d+/i),
    startTime: expect.any(Number),
  } as PollingMeasure);
});
