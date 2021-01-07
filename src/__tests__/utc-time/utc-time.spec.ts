import { utcTime } from '../../utc-time/index.js';

const msReplacer = (expected: Date, datetime: Date) => {
  const msFromExpected = expected.toJSON().replace(/^.+T\d{2}:\d{2}:\d{2}\.(\d+)Z/i, '$1');

  return new Date(
    datetime
      .toJSON()
      .replace(
        /^(.+T\d{2}:\d{2}:\d{2})\.\d+Z/i,
        (_, s) => {
          return `${s}.${msFromExpected}Z`;
        }
      )
  );
};

test(`utcTime works w/o any params`, async () => {
  const d = await utcTime();

  expect(d instanceof Date).toBe(true);
  expect(d.toJSON()).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/i);
});

test(`'startDatetime' is null`, async () => {
  const d = await utcTime({ startDatetime: null as never });

  expect(d instanceof Date).toBe(true);
  expect(d.toJSON()).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/i);
});

test(`'offset' is null`, async () => {
  const d = await utcTime({ offset: null as never });

  expect(d instanceof Date).toBe(true);
  expect(d.toJSON()).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/i);
});

test(`'offset' is empty object`, async () => {
  const d = await utcTime({
    offset: {},
  });

  expect(d instanceof Date).toBe(true);
  expect(d.toJSON()).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/i);
});

test(`'startDatetime' is specified`, async () => {
  const datetime = '2018-03-03T03:03:03.030Z';
  const d = await utcTime({
    startDatetime: datetime,
  });

  expect(d instanceof Date).toBe(true);
  expect(d).toEqual(new Date(datetime));
});

test(`'startDatetime' is specified with offset`, async () => {
  const datetime = '2018-03-03T03:03:03.030Z';
  const d = await utcTime({
    startDatetime: datetime,
    offset: {
      hour: 3,
      minute: -3,
      second: 3,
      millisecond: -3,
    },
  });

  expect(d instanceof Date).toBe(true);
  expect(d).toEqual(new Date('2018-03-03T06:00:06.027Z'));
});

test(`'offset.hour' is positive`, async () => {
  const now = new Date();
  const hour = 3;
  const d = await utcTime({
    offset: {
      hour,
    },
  });

  expect(d instanceof Date).toBe(true);
  expect(d).toEqual(
    msReplacer(d, new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours() + hour,
      now.getUTCMinutes(),
      now.getUTCSeconds()
    )))
  );
});

test(`'offset.hour' is negative`, async () => {
  const now = new Date();
  const hour = -13;
  const d = await utcTime({
    offset: {
      hour,
    },
  });

  expect(d instanceof Date).toBe(true);
  expect(d).toEqual(
    msReplacer(d, new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours() + hour,
      now.getUTCMinutes(),
      now.getUTCSeconds()
    )))
  );
});

test(`'offset.minute' is positive`, async () => {
  const now = new Date();
  const minute = 3;
  const d = await utcTime({
    offset: {
      minute,
    },
  });

  expect(d instanceof Date).toBe(true);
  expect(d).toEqual(
    msReplacer(d, new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes() + minute,
      now.getUTCSeconds()
    )))
  );
});

test(`'offset.minute' is negative`, async () => {
  const now = new Date();
  const minute = -13;
  const d = await utcTime({
    offset: {
      minute,
    },
  });

  expect(d instanceof Date).toBe(true);
  expect(d).toEqual(
    msReplacer(d, new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes() + minute,
      now.getUTCSeconds()
    )))
  );
});

test(`'offset.second' is positive`, async () => {
  const now = new Date();
  const second = 3;
  const d = await utcTime({
    offset: {
      second,
    },
  });

  expect(d instanceof Date).toBe(true);
  expect(d).toEqual(
    msReplacer(d, new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds() + second
    )))
  );
});

test(`'offset.second' is negative`, async () => {
  const now = new Date();
  const second = -13;
  const d = await utcTime({
    offset: {
      second,
    },
  });

  expect(d instanceof Date).toBe(true);
  expect(d).toEqual(
    msReplacer(d, new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds() + second
    )))
  );
});

test(`'offset.millisecond' is positive`, async () => {
  const now = new Date();
  const millisecond = 3;
  const d = await utcTime({
    offset: {
      millisecond,
    },
  });

  expect(d instanceof Date).toBe(true);
  expect(d).toEqual(
    msReplacer(d, new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds(),
      now.getUTCMilliseconds() + millisecond
    )))
  );
});

test(`'offset.millisecond' is negative`, async () => {
  const now = new Date();
  const millisecond = -13;
  const d = await utcTime({
    offset: {
      millisecond,
    },
  });

  expect(d instanceof Date).toBe(true);
  expect(d).toEqual(
    msReplacer(d, new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds(),
      now.getUTCMilliseconds() + millisecond
    )))
  );
});
