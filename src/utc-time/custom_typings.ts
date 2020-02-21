export interface UTCTimeOffset {
  hour?: number;
  minute?: number;
  second?: number;
  millisecond?: number;
}

export interface UTCTimeOpts {
  startDatetime?: string | number | Date;
  offset?: UTCTimeOffset;
}
