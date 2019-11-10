<div align='center' style='text-align: center;'>
  <h1 style='border-bottom: none;'>calendar</h1>

  <p>Minimal module to compute a calendar</p>
</div>

<hr />

[![MIT License][mit-license-badge]][mit-license-url]

> Calendar module for [AppDatepicker].

## Table of contents <!-- omit in toc -->

- [Usage](#usage)
- [API Reference](#api-reference)
  - [Typings](#typings)
    - [WeekNumberType](#weeknumbertype)
    - [CalendarOptions](#calendaroptions)
    - [Calendar](#calendar)
    - [GetWeekdaysOptions](#getweekdaysoptions)
    - [CalendarWeekday](#calendarweekday)
  - [calendar(options)](#calendaroptions)
  - [getWeekdays(options)](#getweekdaysoptions)
  - [getFormatter(formatter)](#getformatterformatter)
- [License](#license)

## Usage

```ts
import { calendar } from 'nodemod/dist/calendar.js';
import { getWeekdays } from 'nodemod/dist/get-weekdays.js';
import { getFormatter } from 'nodemod/dist/get-formatter.js';

const weekdaysOptions = {
  longWeekdayFormat: getFormatter(Intl.DateTimeFormat('en-US', { weekday: 'long' })),
  narrowWeekdayFormat: getFormatter(Intl.DateTimeFormat('en-US', { weekday: 'narrow' })),

  // Optional properties and their default values:
  // firstDayOfWeek: 0,
  // showWeekNumber: true,
  // weekLabel: 'Wk',
};
const weekdays = getWeekdays(weekdaysOptions);

const calendarOptions = {
  dayFormat: getFormatter(Intl.DateTimeFormat('en-US', { day: 'numeric' })),
  fullDateFormat: getFormatter(Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' })),
  locale: 'en-US',
  selectedDate: new Date('2020-02-02'),

  // Optional properties and their default values:
  // disabledDates: [],
  // disabledDays: [],
  // firstDayOfWeek: 0,
  // max,
  // min,
  // showWeekNumber: false,
  // weekNumberType: 'first-4-day-week',
};
const calendarData = calendar(calendarOptions);

console.table([
  ...weekdays.map(n => n.value),
  ...calendarData.calendar.map(n => n.map(n => n.value)),
]);
```

## API Reference

### Typings

#### WeekNumberType

```ts
type WeekNumberType = 'first-4-day-week' | 'first-day-of-year' | 'first-full-week';
```

#### CalendarOptions

```ts
interface CalendarOptions {
  dayFormat: Intl.DateTimeFormat['format'];
  fullDateFormat: Intl.DateTimeFormat['format'];
  locale: string;
  selectedDate: Date;

  disableDates?: Date[]; // Default: []
  disabledDays?: number[]; // Default: []
  firstDayOfWeek?: number; // Default: 0
  max?: Date;
  min?: Date;
  showWeekNumber?: boolean; // Default: false
  weekLabel?: string; // Default: 'Week'
  weekNumberType?: WeekNumberType; // Default: 'first-4-day-week'
}
```

#### Calendar

```ts
interface CalendarDay {
  disabled: boolean;
  fullDate: Date | null;
  key: string;
  label: string | null;
  value: string | null;
}

interface Calendar {
  calendar: CalendarDay[][] | null;
  disabledDatesSet: Set<number> | null;
  disabledDaysSet: Set<number> | null;
  key: string;
}
```

#### GetWeekdaysOptions

```ts
longWeekdayFormat: Intl.DateTimeFormat['format'];
narrowWeekdayFormat: Intl.DateTimeFormat['format'];

firstDayOfWeek?: number; // Default: 0
showWeekNumber?: boolean; // Default: true
weekLabel?: string; // Default: 'Wk'
```

#### CalendarWeekday

```ts
interface CalendarWeekday {
  label: string;
  value: string;
}
```

### calendar(options)

- `options` <[CalendarOptions]> Calendar options.
  - `dayFormat` <[Intl.DateTimeFormat.prototype.format]> DateTime formatter for `day`. _It is recommended to use [getFormatter()]_.
  - `fullDateFormat` <[Intl.DateTimeFormat.prototype.format]> DateTime formatter for `fullDate`. _It is recommended to use [getFormatter()]_.
  - `locale` <[string][string-mdn-url]> ISO-693 language code. _See [ISO Language Code Table]_.
  - `selectedDate` <[Date][date-mdn-url]> Selected date. Calendar displays based on the current month of the selected date.
  - `firstDayOfWeek` <?[number][number-mdn-url]> Optional first day of a week. Defaults to `0` (Sunday).
  - `showWeekNumber` <?[boolean][boolean-mdn-url]> If true, show week number. Defaults to `false`.
  - `weekLabel` <?[string][string-mdn-url]> Optional label for week number. Defaults to `Week`.
  - `disabledDates` <?[Array][array-mdn-url]<[Date][date-mdn-url]>> Optional list of disabled dates. Each disabled dates on the calendar are not selectable nor focusable. Defaults to `[]`.
  - `disabledDays` <?[Array][array-mdn-url]<[number][number-mdn-url]>> Optional list of disabled days. Each value represents the week day to be disabled, i.e. `1` means all dates which are Monday are disabled, not selectable nor focusable. Defaults to `[]`.
  - `max` <?[Date][date-mdn-url]> Optional max date.
  - `min` <?[Date][date-mdn-url]> Optional min date.
  - `weekNumberType` <?[WeekNumberType]> Optional week number type. Defaults to `first-4-day-week`.
- returns: <[Calendar]> An object that contains the 2D array of the calendar, unique key of the calendar, a Set of disabled dates, and a Set of disabled days.

### getWeekdays(options)

- `options` <[GetWeekdaysOptions]> Weekdays options.
  - `longWeekdayFormat` <[Intl.DateTimeFormat.prototype.format]> DateTime formatter for long `weekday`. _It is recommended to use [getFormatter()]_.
  - `narrowWeekdayFormat` <[Intl.DateTimeFormat.prototype.format]> DateTime formatter for narrow `weekday`. _It is recommended to use [getFormatter()]_.
  - `firstDayOfWeek` <?[number][number-mdn-url]> Optional first day of a week. Defaults to `0` (Sunday).
  - `showWeekNumber` <?[boolean][boolean-mdn-url]> If true, show week number. Defaults to `true`.
  - `weekLabel` <?[string][string-mdn-url]> Optional label for week number. Defaults to `Wk`.
- returns: <[Array][array-mdn-url]<[CalendarWeekday]>> A list of calendar weekday.

### getFormatter(formatter)

- `formatter` <[Intl.DateTimeFormat.prototype.format]> DateTime formatter.
- returns: <[Function][function-mdn-url]> A wrapper to the DateTime formatter.

This helper function strips any LTR marking in a formatted date/ time string. IE11 includes LTR mark in all formatted output however all modern browsers do not do that anymore.

## License

[MIT License](http://motss.mit-license.org/) © Rong Sen Ng

<!-- References -->

[AppDatepicker]: https://github.com/motss/app-datepicker
[Calendar]: #calendar
[CalendarWeekday]: #calendarweekday
[CalendarOptions]: #calendaroptions
[getFormatter()]: #getFormatter
[Intl.DateTimeFormat.prototype.format]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/format
[ISO Language Code Table]: http://www.lingoes.net/en/translator/langcode.htm
[Node.js]: https://github.com/nodejs/node
[WeekNumberType]: #weeknumbertype

<!-- MDN -->

[array-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
[boolean-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
[date-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
[error-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
[function-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
[map-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
[number-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
[object-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[promise-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[regexp-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
[set-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
[string-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[void-mdn-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void

<!-- Badges -->

[mit-license-badge]: https://flat.badgen.net/badge/license/MIT/blue

<!-- Links -->

[mit-license-url]: https://github.com/motss/deno_mod/blob/master/LICENSE
