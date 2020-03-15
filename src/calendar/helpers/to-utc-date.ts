export function toUTCDate(y: number, m: number, d: number): Date {
  return new Date(Date.UTC(y, m, d));
}
