declare namespace NodeJS {
  interface Global {
    performance: import('perf_hooks').Performance;
  }
}
