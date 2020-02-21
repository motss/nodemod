import type { UTCTimeOffset, UTCTimeOpts } from './custom_typings.js';

function isValidDatetime(datetime: any) {
  return 'Invalid Date' !== `${new Date(datetime)}`;
}

function isNotANumber(value: any) {
  return value != null && isNaN(+value);
}

export function utcTimeSync({
  startDatetime,
  offset,
}: UTCTimeOpts = {} as UTCTimeOpts) {
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

export async function utcTime(opts?: UTCTimeOpts) {
  return utcTimeSync(opts);
}
