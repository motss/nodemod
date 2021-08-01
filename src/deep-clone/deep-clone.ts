import { deepCloneSync } from './deep-clone-sync';
import type { DeepCloneOptions } from './typings';

export async function deepClone<T>(target: T, options?: DeepCloneOptions): Promise<T> {
  return deepCloneSync<T>(target, options);
}
