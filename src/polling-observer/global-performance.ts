export async function globalPerformance(): Promise<Performance> {
  return ('undefined' !== typeof(window) ? window : global).performance;
}
