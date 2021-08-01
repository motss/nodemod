import { test } from 'uvu';
import * as assert from 'uvu/assert';

import type { OnfinishRejected} from '../../polling-observer/index';
import { PollingObserver } from '../../polling-observer/index';
import type { MockData } from './test_typings';

test(`throws when 'conditionCallback' is undefined`, () => {
  assert.throws(
    () => new PollingObserver(undefined as never),
    new TypeError(`'conditionCallback' is not defined`)
  );
});

test(`stops polling when error occurs`, async () => {
  const obs = new PollingObserver<MockData>(() => false);
  const task = new Promise<OnfinishRejected>((resolve) => {
    obs.onfinish = data => resolve(data as OnfinishRejected);
  });

  obs.observe(
    async () => {
      throw new Error('polling error');
    },
    { interval: 1e3 }
  );

  const { reason, status } = await task;

  assert.is(status, 'error');
  assert.equal(reason, new Error('polling error'));
});

test.run();
