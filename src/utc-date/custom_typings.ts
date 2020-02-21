export interface UTCDateOffset {
  year?: number;
  month?: number;
  day?: number;
}

export interface UTCDateParams {
  startDate?: string | number | Date;
  offset?: UTCDateOffset;
}
