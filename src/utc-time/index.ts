import type { UTCTimeOffset, UTCTimeOpts } from './custom_typings.js';

function isValidDatetime(datetime: unknown) {
  return 'Invalid Date' !== `${new Date(datetime as never)}`;
}

function isNotANumber(value: unknown): boolean {
  return value != null && isNaN(+(value as number));
}

export function utcTimeSync({
  startDatetime,
  offset,
}: UTCTimeOpts = {} as UTCTimeOpts): Date {
  const isNullishDatetime = null == startDatetime;

  if (!isNullishDatetime && !isValidDatetime(startDatetime)) {
    throw new TypeError(
      `Expected 'startDatetime' to be a valid datetime, but received '${startDatetime}'`);
  }

  const {
    hour = 0,
    minute = 0,
    second = 0,
    millisecond = 0,
  }: UTCTimeOffset = offset || {};

  if (isNotANumber(hour)) {
    throw new TypeError(`Expected 'offset.hour' to be a number, but received '${hour}'`);
  }

  if (isNotANumber(minute)) {
    throw new TypeError(`Expected 'offset.minute' to be a number, but received '${minute}'`);
  }

  if (isNotANumber(second)) {
    throw new TypeError(`Expected 'offset.second' to be a number, but received '${second}'`);
  }

  if (isNotANumber(millisecond)) {
    throw new TypeError(
      `Expected 'offset.millisecond' to be a number, but received '${millisecond}'`);
  }

  const newDatetime = isNullishDatetime
    ? new Date()
    : new Date(startDatetime as string);

  return new Date(Date.UTC(
    newDatetime.getUTCFullYear(),
    newDatetime.getUTCMonth(),
    newDatetime.getUTCDate(),
    newDatetime.getUTCHours() + hour,
    newDatetime.getUTCMinutes() + minute,
    newDatetime.getUTCSeconds() + second,
    newDatetime.getUTCMilliseconds() + millisecond
  ));
}

export async function utcTime(opts?: UTCTimeOpts): Promise<Date> {
  return utcTimeSync(opts);
}
