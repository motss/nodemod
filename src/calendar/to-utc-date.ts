export function toUTCDate(fullYear: number, month: number, day: number) {
  return new Date(Date.UTC(fullYear, month, day));
}
