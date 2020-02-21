import { OnfinishFulfilled, PollingObserver } from '..';
import type { PollingMeasure } from '../polling-measure.js';
import type { MockData } from './test_typings.js';

it(`finishes polling with condition fulfills`, (done) => {
  const data: MockData = { items: [Math.floor(Math.random() * Math.PI)] };
  const obs = new PollingObserver<MockData>(d => Boolean(d && d.items.length > 0));
  obs.observe(
    async () => {
      return new Promise<MockData>((yay) => {
        setTimeout(() => yay(data), 2e3);
      });
    },
    { interval: 1e3, timeout: 5e3 });

  obs.onfinish = (d) => {
    const { status, value } = d as OnfinishFulfilled<MockData>;

    expect(status).toStrictEqual('finish');
    expect(value).toStrictEqual({ ...data });
    done();
  };
}, 10e3);

it(`timeouts a polling`, (done) => {
  const data: MockData = { items: [Math.floor(Math.random() * Math.PI)] };
  const obs = new PollingObserver<MockData>(() => false);
  obs.observe(
    async () => {
      return new Promise<MockData>(yay => setTimeout(() => yay(data), 7e3));
    },
    { interval: 1e3, timeout: 5e3 });

  obs.onfinish = (d) => {
    const { status, value } = d as OnfinishFulfilled<MockData>;

    expect(status).toStrictEqual('timeout');
    expect(value).toStrictEqual({ ...data });
    done();
  };
}, 10e3);

it(`timeouts a polling with > 1 repeat`, (done) => {
  const data: MockData = { items: [Math.floor(Math.random() * Math.PI)] };
  const obs = new PollingObserver<MockData>(() => false);
  obs.observe(
    async () => {
      /**
       * NOTE(motss): The promise resolves after 1s timeout and the next run will be
       * scheduled to happen in roughly (1e3 - 1) milliseconds.
       */
      return new Promise<MockData>(yay => setTimeout(() => yay(data), 1));
    },
    { interval: 1e3, timeout: 5e3 });

  obs.onfinish = (d) => {
    const { status, value } = d as OnfinishFulfilled<MockData>;

    expect(status).toStrictEqual('timeout');
    expect(value).toStrictEqual({ ...data });
    done();
  };
}, 10e3);

it(`reads records when polling finishes`, (done) => {
  const data: MockData = { items: [Math.floor(Math.random() * Math.PI)] };
  const obs = new PollingObserver<MockData>(() => false);
  obs.observe(
    async () => {
      return new Promise<MockData>(yay => setTimeout(() => yay(data), 1));
    },
    { interval: 1e3, timeout: 5e3 });

  obs.onfinish = (d, records) => {
    const { status, value } = d as OnfinishFulfilled<MockData>;

    expect(status).toStrictEqual('timeout');
    expect(value).toStrictEqual({ ...data });
    expect(records.length).toBeGreaterThan(1);
    expect(records[0].toJSON()).toMatchObject({
      duration: expect.any(Number),
      entryType: expect.stringMatching('polling-measure'),
      name: expect.stringMatching(/^polling:\d+/gi),
      startTime: expect.any(Number),
    } as PollingMeasure);
    expect(obs.takeRecords().length).toBeGreaterThan(1);
    expect(obs.takeRecords()[0].toJSON()).toMatchObject({
      duration: expect.any(Number),
      entryType: expect.stringMatching('polling-measure'),
      name: expect.stringMatching(/^polling:\d+/gi),
      startTime: expect.any(Number),
    } as PollingMeasure);
    done();
  };
}, 10e3);

it(`clears records when observer disconnects`, (done) => {
  const data: MockData = { items: [Math.floor(Math.random() * Math.PI)] };
  const obs = new PollingObserver<MockData>(() => false);
  obs.observe(
    async () => {
      return new Promise<MockData>(yay => setTimeout(() => yay(data), 1));
    },
    { interval: 1e3, timeout: 5e3 });

  obs.onfinish = (d, records) => {
    const { status, value } = d as OnfinishFulfilled<MockData>;

    expect(status).toStrictEqual('timeout');
    expect(value).toStrictEqual({ ...data });
    expect(records.length).toBeGreaterThan(1);
    expect(obs.takeRecords().length).toBeGreaterThan(1);

    obs.disconnect();

    expect(obs.takeRecords().length).toBeLessThan(1);
    done();
  };
}, 10e3);

it(`forces polling to stop by disconnecting the observer`, (done) => {
  const data: MockData = { items: [Math.floor(Math.random() * Math.PI)] };
  const obs = new PollingObserver<MockData>(() => {
    /**
     * NOTE(motss): Disconnect observer after 1st polling.
     */
    obs.disconnect();
    return false;
  });

  obs.observe(
    async () => {
      return new Promise<MockData>(yay => setTimeout(() => yay(data), 1));
    },
    { interval: 2e3, timeout: 5e3 });

  obs.onfinish = (d, records) => {
    const { status, value } = d as OnfinishFulfilled<MockData>;

    expect(status).toStrictEqual('finish');
    expect(value).toStrictEqual({ ...data });
    expect(records.length).toStrictEqual(1);
    expect(obs.takeRecords().length).toStrictEqual(0);
    done();
  };
}, 10e3);

it(`disconnects observer before first polling initiates`, (done) => {
  const data: MockData = { items: [Math.floor(Math.random() * Math.PI)] };
  const obs = new PollingObserver<MockData>(() => false);

  obs.observe(
    async () => {
      return new Promise<MockData>(yay => setTimeout(() => yay(data), 1));
    },
    { interval: 2e3, timeout: 5e3 });

  obs.onfinish = (d, records) => {
    const { status, value } = d as OnfinishFulfilled<MockData>;

    expect(status).toStrictEqual('finish');
    expect(value).toStrictEqual(undefined!);
    expect(records).toStrictEqual([]);
    expect(obs.takeRecords()).toStrictEqual([]);
    done();
  };

  obs.disconnect();
}, 10e3);

it(`re-observes after disconnected`, async (done) => {
  const getMockData = (): MockData => ({ items: [Math.floor(Math.random() * Math.PI)] });
  const pollingFn = (d: MockData) => async () => {
    return new Promise<MockData>(yay => setTimeout(() => yay(d), 1));
  };

  const obs = new PollingObserver<MockData>(() => false);
  const pollingOpts = { interval: 1e3, timeout: 3e3 };

  await new Promise((yay) => {
    const mockData = getMockData();

    obs.onfinish = (d, records) => {
      const { status, value } = d as OnfinishFulfilled<MockData>;

      expect(status).toStrictEqual('timeout');
      expect(value).toStrictEqual({ ...mockData });
      expect(records.length).toBeGreaterThan(1);
      expect(obs.takeRecords().length).toBeGreaterThan(1);
      yay();
    };
    obs.observe(pollingFn(mockData), pollingOpts);
  });

  obs.disconnect();
  expect(obs.takeRecords().length).toBeLessThan(1);

  await new Promise((yay) => {
    const mockData2 = getMockData();

    obs.onfinish = (d, records) => {
      const { status, value } = d as OnfinishFulfilled<MockData>;

      expect(status).toStrictEqual('timeout');
      expect(value).toStrictEqual({ ...mockData2 });
      expect(records.length).toBeGreaterThan(1);
      expect(obs.takeRecords().length).toBeGreaterThan(1);
      yay();
    };
    obs.observe(pollingFn(mockData2), pollingOpts);
  });

  done();
}, 10e3);

it(`polls with optional 'interval'`, (done) => {
  const data: MockData = { items: [Math.floor(Math.random() * Math.PI)] };
  const obs = new PollingObserver<MockData>(() => false);

  obs.observe(
    async () => {
      return new Promise<MockData>(yay => setTimeout(() => yay(data), 1));
    },
    { timeout: 5e3 });

  obs.onfinish = (d) => {
    const { status, value } = d as OnfinishFulfilled<MockData>;

    expect(status).toStrictEqual('timeout');
    expect(value).toStrictEqual({ ...data });
    expect(obs.takeRecords().length).toBeGreaterThan(1);
    done();
  };
}, 10e3);

it(`polls with optional 'timeout'`, (done) => {
  const data: MockData = { items: [Math.floor(Math.random() * Math.PI)] };
  const startsAt = +new Date();
  const obs = new PollingObserver<MockData>(() => {
    /** NOTE(motss): It still needs to be stopped to pass the test */
    const endsAt = +new Date();
    return Math.floor(endsAt - startsAt) > 5e3;
  });

  obs.observe(
    async () => {
      return new Promise<MockData>(yay => setTimeout(() => yay(data), 1));
    },
    { interval: 2e3 });

  obs.onfinish = (d, records) => {
    const { status, value } = d as OnfinishFulfilled<MockData>;

    expect(status).toStrictEqual('finish');
    expect(value).toStrictEqual({ ...data });
    expect(records.length).toBeGreaterThan(1);
    expect(obs.takeRecords().length).toBeGreaterThan(1);
    done();
  };
}, 10e3);

it(`polls with optional 'options'`, (done) => {
  const data: MockData = { items: [Math.floor(Math.random() * Math.PI)] };
  const startsAt = +new Date();
  const obs = new PollingObserver<MockData>(() => {
    /** NOTE(motss): It still needs to be stopped to pass the test */
    const endsAt = +new Date();
    return Math.floor(endsAt - startsAt) > 5e3;
  });

  obs.observe(
    async () => {
      return new Promise<MockData>(yay => setTimeout(() => yay(data), 1));
    });

  obs.onfinish = (d, records) => {
    const { status, value } = d as OnfinishFulfilled<MockData>;

    expect(status).toStrictEqual('finish');
    expect(value).toStrictEqual({ ...data });
    expect(records.length).toBeGreaterThan(1);
    expect(obs.takeRecords().length).toBeGreaterThan(1);
    done();
  };
}, 10e3);

it(`polls with async 'conditionCallback'`, (done) => {
  const data: MockData = { items: [Math.floor(Math.random() * Math.PI)] };
  const obs = new PollingObserver<MockData>(async () => false);

  obs.observe(
    async () => {
      return new Promise<MockData>(yay => setTimeout(() => yay(data), 1));
    },
    { interval: 2e3, timeout: 5e3 });

  obs.onfinish = (d, records) => {
    const { status, value } = d as OnfinishFulfilled<MockData>;

    expect(status).toStrictEqual('timeout');
    expect(value).toStrictEqual({ ...data });
    expect(records.length).toBeGreaterThan(1);
    expect(obs.takeRecords().length).toBeGreaterThan(1);
    done();
  };
}, 10e3);

it(`polls with non-async 'callback'`, (done) => {
  const data: MockData = { items: [Math.floor(Math.random() * Math.PI)] };
  const obs = new PollingObserver<MockData>(async () => false);

  obs.observe(() => data, { interval: 2e3, timeout: 5e3 });

  obs.onfinish = (d, records) => {
    const { status, value } = d as OnfinishFulfilled<MockData>;

    expect(status).toStrictEqual('timeout');
    expect(value).toStrictEqual({ ...data });
    expect(records.length).toBeGreaterThan(1);
    expect(obs.takeRecords().length).toBeGreaterThan(1);
    done();
  };
}, 8e3);

it(`polls without 'onfinish' callback`, (done) => {
  const data: MockData = { items: [Math.floor(Math.random() * Math.PI)] };
  const obs = new PollingObserver<MockData>(async () => false);

  setTimeout(() => {
    expect(obs.takeRecords().length).toBeGreaterThan(1);
    done();
  }, 8e3);

  obs.observe(() => data, { interval: 2e3, timeout: 5e3 });

  expect(obs.takeRecords().length).toBeLessThan(1);
}, 10e3);
