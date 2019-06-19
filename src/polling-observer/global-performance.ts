export async function globalPerformance() {
  return ('undefined' !== typeof(window) ? window : global as any).performance;
}
