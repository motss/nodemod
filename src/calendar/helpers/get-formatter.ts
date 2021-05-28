import type { DateTimeFormatter } from '../typings.js';

export function getFormatter(formatter: Intl.DateTimeFormat): DateTimeFormatter {
  /**
   * NOTE: Due to IE11, a LTR mark (`\u200e` or `8206` in hex) will be included even when
   * `locale=en-US` is used. This helper function strips that away for consistency's sake as
   * modern browsers do not include that.
   *
   *   ```js
   *   const now = new Date('2018-01-01');
   *   const a = Intl.DateTimeFormat('en-US', { day: 'numeric', timeZone: 'UTC' }).format(now);
   *
   *   a.split(''); // On IE11, this returns ['', '1'].
   *   ```
   */
  return n => formatter.format(n).replace(/\u200e/gi, '');
}
