import { unsign } from '..';
import { data, secret } from './CONSTANTS.js';
import type { TestData } from './test_typings.js';

// tslint:disable-next-line:max-line-length
const signature = 'eyJkYXRhIjp7InNlY3JldEluc2lkZSI6IjEyMyIsInNlY3JldEtleSI6NDU2fX0.WlF_-gDYzfBBPksdvhVvaP_MQ9PWoRiwADbI3MapRg4';

it('returns', async () => {
  const d = await unsign<TestData>(signature, secret);

  expect(d).toStrictEqual(data);
});

it(`returns with defined 'options[separator]'`, async () => {
  // tslint:disable-next-line:max-line-length
  const signature2 = 'eyJkYXRhIjp7InNlY3JldEluc2lkZSI6IjEyMyIsInNlY3JldEtleSI6NDU2fX0:WlF_-gDYzfBBPksdvhVvaP_MQ9PWoRiwADbI3MapRg4';
  const d = await unsign(signature2, secret, {
    separator: ':',
  });

  expect(d).toStrictEqual(data);
});

it('returns with number string', async () => {
  const signature2 = 'eyJkYXRhIjoiMTIzIn0.xOlc5QaiPIH9l1ySgQG-PjAXPCl5TIC3FNcNwH-c7So';
  const d = await unsign(signature2, secret);

  expect(d).toStrictEqual('123');
});

it('returns with number', async () => {
  const signature2 = 'eyJkYXRhIjoxMjN9.zw4SnCZn_aNwaOFed9e21UZfRJlDdnIyvyS9uey7VC4';
  const d = await unsign(signature2, secret);

  expect(d).toStrictEqual(123);
});

it('returns with string', async () => {
  const signature2 = 'eyJkYXRhIjoieyAxMjMifQ.KNvYk83AzkqDuYNDGIpNSJJOM5obtkVk3ctRZM8uL7k';
  const d = await unsign(signature2, secret);

  expect(d).toStrictEqual('{ 123');
});
