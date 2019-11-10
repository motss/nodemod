import { CalendarWeekday, GetWeekdaysOptions } from '../../calendar_typing.js';
import { getFormatter } from '../../get-formatter';

export type TestGetWeekdays = [string, GetWeekdaysOptions, CalendarWeekday[]];
export const mockGetWeekdaysData: TestGetWeekdays[] = [
  [
    `options`,
    {
      longWeekdayFormat: getFormatter(Intl.DateTimeFormat('ja-JP', { weekday: 'long' })),
      narrowWeekdayFormat: getFormatter(Intl.DateTimeFormat('ja-JP', { weekday: 'narrow' })),
    },
    [
      {
        label: 'Week',
        value: 'Wk',
      },
      {
        label: '日曜日',
        value: '日',
      },
      {
        label: '月曜日',
        value: '月',
      },
      {
        label: '火曜日',
        value: '火',
      },
      {
        label: '水曜日',
        value: '水',
      },
      {
        label: '木曜日',
        value: '木',
      },
      {
        label: '金曜日',
        value: '金',
      },
      {
        label: '土曜日',
        value: '土',
      },
    ],
  ],
  [
    `options`,
    {
      longWeekdayFormat: getFormatter(Intl.DateTimeFormat('ja-JP', { weekday: 'long' })),
      narrowWeekdayFormat: getFormatter(Intl.DateTimeFormat('ja-JP', { weekday: 'narrow' })),
      showWeekNumber: false,
    },
    [
      {
        label: '日曜日',
        value: '日',
      },
      {
        label: '月曜日',
        value: '月',
      },
      {
        label: '火曜日',
        value: '火',
      },
      {
        label: '水曜日',
        value: '水',
      },
      {
        label: '木曜日',
        value: '木',
      },
      {
        label: '金曜日',
        value: '金',
      },
      {
        label: '土曜日',
        value: '土',
      },
    ],
  ],
  [
    `options`,
    {
      firstDayOfWeek: 1,
      longWeekdayFormat: getFormatter(Intl.DateTimeFormat('ja-JP', { weekday: 'long' })),
      narrowWeekdayFormat: getFormatter(Intl.DateTimeFormat('ja-JP', { weekday: 'narrow' })),
      showWeekNumber: false,
    },
    [
      {
        label: '月曜日',
        value: '月',
      },
      {
        label: '火曜日',
        value: '火',
      },
      {
        label: '水曜日',
        value: '水',
      },
      {
        label: '木曜日',
        value: '木',
      },
      {
        label: '金曜日',
        value: '金',
      },
      {
        label: '土曜日',
        value: '土',
      },
      {
        label: '日曜日',
        value: '日',
      },
    ],
  ],
  [
    `options`,
    {
      firstDayOfWeek: 1,
      longWeekdayFormat: getFormatter(Intl.DateTimeFormat('ja-JP', { weekday: 'long' })),
      narrowWeekdayFormat: getFormatter(Intl.DateTimeFormat('ja-JP', { weekday: 'narrow' })),
      weekLabel: '曜日',
    },
    [
      {
        label: '曜日',
        value: '曜日',
      },
      {
        label: '月曜日',
        value: '月',
      },
      {
        label: '火曜日',
        value: '火',
      },
      {
        label: '水曜日',
        value: '水',
      },
      {
        label: '木曜日',
        value: '木',
      },
      {
        label: '金曜日',
        value: '金',
      },
      {
        label: '土曜日',
        value: '土',
      },
      {
        label: '日曜日',
        value: '日',
      },
    ],
  ],
  [
    `options`,
    {
      firstDayOfWeek: -1,
      longWeekdayFormat: getFormatter(Intl.DateTimeFormat('ja-JP', { weekday: 'long' })),
      narrowWeekdayFormat: getFormatter(Intl.DateTimeFormat('ja-JP', { weekday: 'narrow' })),
      weekLabel: '曜日',
    },
    [
      {
        label: '曜日',
        value: '曜日',
      },
      {
        label: '土曜日',
        value: '土',
      },
      {
        label: '日曜日',
        value: '日',
      },
      {
        label: '月曜日',
        value: '月',
      },
      {
        label: '火曜日',
        value: '火',
      },
      {
        label: '水曜日',
        value: '水',
      },
      {
        label: '木曜日',
        value: '木',
      },
      {
        label: '金曜日',
        value: '金',
      },
    ],
  ],
];
