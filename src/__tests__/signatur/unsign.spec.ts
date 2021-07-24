import { test } from 'uvu';
import * as assert from 'uvu/assert';

import { unsign } from '../../signatur';
import { data, secret } from './CONSTANTS';
import type { TestData } from './test_typings';

const signature = 'eyJkYXRhIjp7InNlY3JldEluc2lkZSI6IjEyMyIsInNlY3JldEtleSI6NDU2fX0.WlF_-gDYzfBBPksdvhVvaP_MQ9PWoRiwADbI3MapRg4';

test('returns', async () => {
  const d = await unsign<TestData>(signature, secret);

  assert.equal(d, data);
});

test(`returns with defined 'options[separator]'`, async () => {
  const signature2 = 'eyJkYXRhIjp7InNlY3JldEluc2lkZSI6IjEyMyIsInNlY3JldEtleSI6NDU2fX0:WlF_-gDYzfBBPksdvhVvaP_MQ9PWoRiwADbI3MapRg4';
  const d = await unsign<TestData>(signature2, secret, {
    separator: ':',
  });

  assert.equal(d, data);
});

test('returns with number string', async () => {
  const signature2 = 'eyJkYXRhIjoiMTIzIn0.xOlc5QaiPIH9l1ySgQG-PjAXPCl5TIC3FNcNwH-c7So';
  const d = await unsign<string>(signature2, secret);

  assert.is(d, '123');
});

test('returns with number', async () => {
  const signature2 = 'eyJkYXRhIjoxMjN9.zw4SnCZn_aNwaOFed9e21UZfRJlDdnIyvyS9uey7VC4';
  const d = await unsign<number>(signature2, secret);

  assert.is(d, 123);
});

test('returns with string', async () => {
  const signature2 = 'eyJkYXRhIjoieyAxMjMifQ.KNvYk83AzkqDuYNDGIpNSJJOM5obtkVk3ctRZM8uL7k';
  const d = await unsign<string>(signature2, secret);

  assert.is(d, '{ 123');
});

test.run();
