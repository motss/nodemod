import { test } from 'uvu';
import * as assert from 'uvu/assert';

import type { OnfinishFulfilled, PollingMeasure } from '../../polling-observer/index';
import { PollingObserver } from '../../polling-observer/index';
import type { MockData } from './test_typings';

([
  ['finishes', d => Boolean(d?.items.length), 'finish'],
  ['timeouts', () => false, 'timeout'],
] as [string, (data?: MockData | null) => boolean, OnfinishFulfilled<unknown>['status']][]).forEach(([
  testName,
  testFn,
  expectedStatus,
]) => {
  test(`${testName} polling`, async () => {
    const data: MockData = { items: [Math.floor(Math.random() * Math.PI)] };
    const obs = new PollingObserver<MockData>(testFn);
    const task = new Promise<[OnfinishFulfilled<MockData>, PollingMeasure[]]>((resolve) => {
      obs.onfinish = (data, records) => resolve([data, records] as unknown as [OnfinishFulfilled<MockData>, PollingMeasure[]]);
    });

    obs.observe(
      async () => new Promise((resolve) => setTimeout(() => resolve(data), 1e3)),
      { interval: 1e3, timeout: 5e3 }
    );

    const [
      {
        status,
        value,
      },
      records,
    ] = await task;

    assert.is(status, expectedStatus);
    assert.equal(value, data);

    const firstRecord = records[0].toJSON();

    assert.type(firstRecord.duration, 'number');
    assert.is(firstRecord.entryType, 'polling-measure');
    assert.match(firstRecord.name, 'polling:');
    assert.type(firstRecord.startTime, 'number');

    assert.ok(obs.takeRecords().length > 0);

    const [firstRecordTaken] = obs.takeRecords();

    assert.type(firstRecordTaken.duration, 'number');
    assert.is(firstRecordTaken.entryType, 'polling-measure');
    assert.match(firstRecordTaken.name, 'polling:');
    assert.type(firstRecordTaken.startTime, 'number');
  });
});

([
  ['forces polling to stop by disconnecting the observer', 1],
  ['disconnects observer before first polling initiates', 0],
] as [string, number][]).forEach(([
  testName,
  testStopPollingIndex,
]) => {
  test(testName, async () => {
    const data: MockData = { items: [Math.floor(Math.random() * Math.PI)] };
    const obs = new PollingObserver<MockData>(() => {
      /**
       * NOTE(motss): Disconnect observer after 1st polling.
       */
      testStopPollingIndex && obs.disconnect();
      return false;
    });
    const task = new Promise<[OnfinishFulfilled<MockData>, PollingMeasure[]]>((resolve) => {
      obs.onfinish = (data, records) => resolve([data, records] as unknown as [OnfinishFulfilled<MockData>, PollingMeasure[]]);
    });

    obs.observe(
      async () => {
        return new Promise((resolve) => setTimeout(() => resolve(data), 1));
      },
      { interval: 1e3, timeout: 5e3 }
    );

    !testStopPollingIndex && obs.disconnect();

    const [
      {
        status,
        value,
      },
      records,
    ] = await task;

    assert.is(status, 'finish');
    assert.is(obs.takeRecords().length, 0);
    assert.equal(value, data);
    assert.is(records.length, 1);
  });
});

test(`re-observes after disconnected`, async () => {
  const getMockData = (): MockData => ({ items: [Math.floor(Math.random() * Math.PI)] });
  const pollingFn = (d: MockData) => async () => {
    return new Promise<MockData>(resolve => setTimeout(() => resolve(d), 1));
  };

  const obs = new PollingObserver<MockData>(() => false);
  const pollingOpts = { interval: 1e3, timeout: 3e3 };

  const mockData = getMockData();

  {
    const [
      {
        status,
        value,
      },
      records,
    ] = await new Promise<[OnfinishFulfilled<MockData>, PollingMeasure[]]>((resolve) => {
      obs.onfinish =(data, records) => resolve([data, records] as unknown as [OnfinishFulfilled<MockData>, PollingMeasure[]]);
      obs.observe(pollingFn(mockData), pollingOpts);
    });

    assert.is(status, 'timeout');
    assert.equal(value, mockData);
    assert.ok(records.length > 1);
    assert.ok(obs.takeRecords().length > 1);

    obs.disconnect();

    assert.ok(obs.takeRecords().length < 1);
  }

  const [
    {
      status,
      value,
    },
    records,
  ] = await new Promise<[OnfinishFulfilled<MockData>, PollingMeasure[]]>((resolve) => {
    obs.onfinish =(data, records) => resolve([data, records] as unknown as [OnfinishFulfilled<MockData>, PollingMeasure[]]);
    obs.observe(pollingFn(mockData), pollingOpts);
  });

  assert.is(status, 'timeout');
  assert.equal(value, mockData);
  assert.ok(records.length > 1);
  assert.ok(obs.takeRecords().length > 1);
});

test(`polls with optional 'interval'`, async () => {
  const data: MockData = { items: [Math.floor(Math.random() * Math.PI)] };
  const obs = new PollingObserver<MockData>(() => false);
  const task = new Promise<OnfinishFulfilled<MockData>>((resolve) => {
    obs.onfinish = data => resolve(data as OnfinishFulfilled<MockData>);
  });

  obs.observe(
    async () => {
      return new Promise<MockData>(resolve => setTimeout(() => resolve(data), 1));
    },
    { timeout: 3e3 }
  );

  const {
    status,
    value,
  } = await task;

  assert.is(status, 'timeout');
  assert.equal(value, data);
  assert.ok(obs.takeRecords().length > 1);
});

test(`polls with optional 'timeout'`, async () => {
  const data: MockData = { items: [Math.floor(Math.random() * Math.PI)] };
  const startsAt = +new Date();
  const obs = new PollingObserver<MockData>(() => {
    /** NOTE(motss): It still needs to be stopped to pass the test */
    const endsAt = +new Date();
    return Math.floor(endsAt - startsAt) > 5e3;
  });
  const task = new Promise<[OnfinishFulfilled<MockData>, PollingMeasure[]]>((resolve) => {
    obs.onfinish = (data, records) => resolve([data, records] as unknown as [OnfinishFulfilled<MockData>, PollingMeasure[]])
  });

  obs.observe(
    async () => {
      return new Promise<MockData>(resolve => setTimeout(() => resolve(data), 1));
    },
    { interval: 2e3 });

  const [
    {
      status,
      value,
    },
    records,
  ] = await task;

  assert.is(status, 'finish');
  assert.equal(value, data);
  assert.ok(records.length > 1);
  assert.ok(obs.takeRecords().length > 1);
});

test(`polls with optional 'options'`, async () => {
  const data: MockData = { items: [Math.floor(Math.random() * Math.PI)] };
  const startsAt = +new Date();
  const obs = new PollingObserver<MockData>(() => {
    /** NOTE(motss): It still needs to be stopped to pass the test */
    const endsAt = +new Date();
    return Math.floor(endsAt - startsAt) > 5e3;
  });
  const task = new Promise<[OnfinishFulfilled<MockData>, PollingMeasure[]]>((resolve) => {
    obs.onfinish = (data, records) => resolve([data, records] as unknown as [OnfinishFulfilled<MockData>, PollingMeasure[]]);
  });

  obs.observe(
    async () => {
      return new Promise<MockData>(resolve => setTimeout(() => resolve(data), 1));
    });

  const [
    {
      status,
      value,
    },
    records,
  ] = await task;

  assert.is(status, 'finish');
  assert.equal(value, data);
  assert.ok(records.length > 1);
  assert.ok(obs.takeRecords().length > 1);
});

test(`polls with async 'conditionCallback'`, async () => {
  const data: MockData = { items: [Math.floor(Math.random() * Math.PI)] };
  const obs = new PollingObserver<MockData>(async () => false);
  const task = new Promise<[OnfinishFulfilled<MockData>, PollingMeasure[]]>((resolve) => {
    obs.onfinish = (data, records) => resolve([data, records] as unknown as [OnfinishFulfilled<MockData>, PollingMeasure[]]);
  });

  obs.observe(
    async () => {
      return new Promise<MockData>(resolve => setTimeout(() => resolve(data), 1));
    },
    { interval: 2e3, timeout: 5e3 });

  const [
    {
      status,
      value,
    },
    records,
  ] = await task;

  assert.is(status, 'timeout');
  assert.equal(value, data);
  assert.ok(records.length > 1);
  assert.ok(obs.takeRecords().length > 1);
});

test(`polls with non-async 'callback'`, async () => {
  const data: MockData = { items: [Math.floor(Math.random() * Math.PI)] };
  const obs = new PollingObserver<MockData>(async () => false);
  const task = new Promise<[OnfinishFulfilled<MockData>, PollingMeasure[]]>((resolve) => {
    obs.onfinish = (data, records) => resolve([data, records] as unknown as [OnfinishFulfilled<MockData>, PollingMeasure[]]);
  });

  obs.observe(() => data, { interval: 2e3, timeout: 5e3 });

  const [
    {
      status,
      value,
    },
    records,
  ] = await task;

  assert.is(status, 'timeout');
  assert.equal(value, data);
  assert.ok(records.length > 1);
  assert.ok(obs.takeRecords().length > 1);
});

test(`polls without 'onfinish' callback`, async () => {
  const data: MockData = { items: [Math.floor(Math.random() * Math.PI)] };
  const obs = new PollingObserver<MockData>(async () => false);

  const timeout = new Promise((resolve) => setTimeout(resolve, 8e3));

  obs.observe(() => data, { interval: 2e3, timeout: 5e3 });

  assert.ok(obs.takeRecords().length < 1);

  await timeout;

  assert.ok(obs.takeRecords().length > 0);
});

test(`timeouts a polling with > 1 repeat`, async () => {
  const data: MockData = { items: [Math.floor(Math.random() * Math.PI)] };
  const obs = new PollingObserver<MockData>(() => false);
  const task = new Promise<OnfinishFulfilled<MockData>>((resolve) => {
    obs.onfinish = data => resolve(data as OnfinishFulfilled<MockData>);
  });

  obs.observe(
    async () => {
      /**
       * NOTE(motss): The promise resolves after 1s timeout and the next run will be
       * scheduled to happen in roughly (1e3 - 1) milliseconds.
       */
      return new Promise<MockData>(resolve => setTimeout(() => resolve(data), 1));
    },
    { interval: 1e3, timeout: 5e3 });

  const {
    status,
    value,
  } = await task;

  assert.is(status, 'timeout');
  assert.equal(value, data);
});

test.run();
