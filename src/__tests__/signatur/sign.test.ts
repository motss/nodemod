import { test } from 'uvu';
import * as assert from 'uvu/assert';

import { sign } from '../../signatur/index';
import { data, secret } from './CONSTANTS';

test('returns', async () => {
  const d = await sign(data, secret);

  assert.is(d, 'eyJkYXRhIjp7InNlY3JldEluc2lkZSI6IjEyMyIsInNlY3JldEtleSI6NDU2fX0.WlF_-gDYzfBBPksdvhVvaP_MQ9PWoRiwADbI3MapRg4');
});

test(`returns with defined 'options[separator]'`, async () => {
  const d = await sign(data, secret, {
    separator: ':',
  });

  assert.is(d, 'eyJkYXRhIjp7InNlY3JldEluc2lkZSI6IjEyMyIsInNlY3JldEtleSI6NDU2fX0:WlF_-gDYzfBBPksdvhVvaP_MQ9PWoRiwADbI3MapRg4');
});

test.run();
