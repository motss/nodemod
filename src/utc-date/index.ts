import type { UTCDateOffset, UTCDateParams } from './custom_typings.js';

export function utcDateSync({
  startDate,
  offset,
}: UTCDateParams = {}): Date {
  const dated = null == startDate ? new Date() : new Date(startDate);
  const { year, month, day }: UTCDateOffset = offset || {};
  const validatedYear = +(null == year ? 0 : year);
  const validatedMonth = +(null == month ? 0 : month);
  const validatedDay = +(null == day ? 0 : day);

  if (isNaN(validatedYear)) {
    throw new TypeError(`Expected 'year' to be a valid number, but received '${year}'`);
  }

  if (isNaN(validatedMonth)) {
    throw new TypeError(`Expected 'month' to be a valid number, but received '${month}'`);
  }

  if (isNaN(validatedDay)) {
    throw new TypeError(`Expected 'day' to be a valid number, but received '${day}'`);
  }

  return new Date(Date.UTC(
    dated.getUTCFullYear() + validatedYear,
    dated.getUTCMonth() + validatedMonth,
    dated.getUTCDate() + validatedDay));
}

export async function utcDate(options?: UTCDateParams): Promise<Date> {
  return utcDateSync(options);
}
