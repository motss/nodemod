import type { GetWeekdaysInit } from '../../../calendar/helpers/typings';
import { getFormatter } from '../../../calendar/index';
import type { CalendarWeekday } from '../../../calendar/typings';

export type TestGetWeekdays = [string, GetWeekdaysInit, CalendarWeekday[]];
export const mockGetWeekdaysData: TestGetWeekdays[] = [
  [
    `{ ... }`,
    {
      longWeekdayFormat: getFormatter(Intl.DateTimeFormat('ja-JP', { weekday: 'long' })),
      narrowWeekdayFormat: getFormatter(Intl.DateTimeFormat('ja-JP', { weekday: 'narrow' })),
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
    `{ showWeekNumber: false }`,
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
    `{ firstDayOfWeek: 1 }`,
    {
      firstDayOfWeek: 1,
      longWeekdayFormat: getFormatter(Intl.DateTimeFormat('ja-JP', { weekday: 'long' })),
      narrowWeekdayFormat: getFormatter(Intl.DateTimeFormat('ja-JP', { weekday: 'narrow' })),
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
    `{ firstDayOfWeek: 1, showWeekNumber: true }`,
    {
      firstDayOfWeek: 1,
      longWeekdayFormat: getFormatter(Intl.DateTimeFormat('ja-JP', { weekday: 'long' })),
      narrowWeekdayFormat: getFormatter(Intl.DateTimeFormat('ja-JP', { weekday: 'narrow' })),
      showWeekNumber: true,
    },
    [
      {
        label: 'Week',
        value: 'Wk',
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
    `{ firstDayOfWeek: 1, shortWeekLabel: '曜日', showWeekNumber: true, weekLabel: '曜日' }`,
    {
      firstDayOfWeek: 1,
      longWeekdayFormat: getFormatter(Intl.DateTimeFormat('ja-JP', { weekday: 'long' })),
      narrowWeekdayFormat: getFormatter(Intl.DateTimeFormat('ja-JP', { weekday: 'narrow' })),
      shortWeekLabel: '曜日',
      showWeekNumber: true,
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
    `{ firstDayOfWeek: -1, shortWeekLabel: '曜日', showWeekNumber: true, weekLabel: '曜日' }`,
    {
      firstDayOfWeek: -1,
      longWeekdayFormat: getFormatter(Intl.DateTimeFormat('ja-JP', { weekday: 'long' })),
      narrowWeekdayFormat: getFormatter(Intl.DateTimeFormat('ja-JP', { weekday: 'narrow' })),
      shortWeekLabel: '曜日',
      showWeekNumber: true,
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
  [
    `{ shortWeekLabel: '', weekLabel: '' }`,
    {
      longWeekdayFormat: getFormatter(Intl.DateTimeFormat('ja-JP', { weekday: 'long' })),
      narrowWeekdayFormat: getFormatter(Intl.DateTimeFormat('ja-JP', { weekday: 'narrow' })),
      shortWeekLabel: '',
      showWeekNumber: true,
      weekLabel: '',
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
];
