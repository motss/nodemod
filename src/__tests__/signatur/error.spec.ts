import { test } from 'uvu';
import * as assert from 'uvu/assert';

import { sign, unsign } from '../../signatur/index';
import { data, secret } from './CONSTANTS';

test(`throws when undefined 'data'`, async () => {
  try {
    await sign(null as never, null as never);
  } catch (e) {
    assert.equal(e, new TypeError(`Expected 'data' to be defined, but received 'null'`));
  }
});

test(`throws when undefined 'secret'`, async () => {
  try {
    await sign(data, null as never);
  } catch (e) {
    assert.equal(e, new TypeError(`Expected 'secret' to be defined, but received 'null'`));
  }
});

const signature = 'eyJkYXRhIjp7InNlY3JldEluc2lkZSI6IjEyMyIsInNlY3JldEtleSI6NDU2fX0.WlF_-gDYzfBBPksdvhVvaP_MQ9PWoRiwADbI3MapRg4';

test(`throws when undefined 'signature'`, async () => {
  try {
    await unsign(null as never, null as never);
  } catch (e) {
    assert.equal(e, new TypeError(`Expected 'signature' to be defined, but received 'null'`));
  }
});

test(`throws when undefined 'secret'`, async () => {
  try {
    await unsign(signature, null as never);
  } catch (e) {
    assert.equal(e, new TypeError(`Expected 'secret' to be defined, but received 'null'`));
  }
});

test('throws when signature not match', async () => {
  try {
    await unsign('123.456', secret);
  } catch (e) {
    assert.equal(e.toJSON(), {
      error: {
        type: 'invalid_signature',
        message: 'Signature not match',
      },
    });
  }
});

test.run();
