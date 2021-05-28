import './setup.js';

import type { OnfinishRejected} from '../../polling-observer/index.js';
import { PollingObserver } from '../../polling-observer/index.js';
import type { MockData } from './test_typings.js';

it(`throws when 'conditionCallback' is undefined`, () => {
  expect(() => new PollingObserver(undefined as never))
    .toThrowError(new TypeError(`'conditionCallback' is not defined`));
});

it(`stops polling when error occurs`, (done) => {
  const obs = new PollingObserver<MockData>(() => false);
  obs.observe(
    async () => {
      throw new Error('polling error');
    },
    { interval: 1e3 });

  obs.onfinish = (d) => {
    const { status, reason } = d as OnfinishRejected;

    expect(status).toStrictEqual('error');
    expect(reason).toStrictEqual(new Error('polling error'));
    done();
  };
}, 10e3);
