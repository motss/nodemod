import { utcTime } from '../index.js';

test(`invalid 'startDatetime'`, async () => {
  try {
    await utcTime({ startDatetime: 'invalid-date' });
  } catch (e) {
    // tslint:disable-next-line: max-line-length
    expect(e).toStrictEqual(new TypeError(`Expected 'startDatetime' to be a valid datetime, but received 'invalid-date'`));
  }
});

test(`'offset.hour' is not a number`, async () => {
  try {
    await utcTime({ offset: { hour: NaN } });
  } catch (e) {
    // tslint:disable-next-line: max-line-length
    expect(e).toStrictEqual(new TypeError(`Expected 'offset.hour' to be a number, but received 'NaN'`));
  }
});

test(`'offset.minute' is not a number`, async () => {
  try {
    await utcTime({ offset: { minute: NaN } });
  } catch (e) {
    // tslint:disable-next-line: max-line-length
    expect(e).toStrictEqual(new TypeError(`Expected 'offset.minute' to be a number, but received 'NaN'`));
  }
});

test(`'offset.second' is not a number`, async () => {
  try {
    await utcTime({ offset: { second: NaN } });
  } catch (e) {
    // tslint:disable-next-line: max-line-length
    expect(e).toStrictEqual(new TypeError(`Expected 'offset.second' to be a number, but received 'NaN'`));
  }
});

test(`'offset.millisecond' is not a number`, async () => {
  try {
    await utcTime({ offset: { millisecond: NaN } });
  } catch (e) {
    // tslint:disable-next-line: max-line-length
    expect(e).toStrictEqual(new TypeError(`Expected 'offset.millisecond' to be a number, but received 'NaN'`));
  }
});
