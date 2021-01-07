import { cloneDeep } from '../lib/clone-deep.js';

export interface DeepCloneOptions {
  absolute?: boolean;
}

export function deepCloneSync<T>(
  target: T,
  options?: DeepCloneOptions
): T {
  if (target == null) throw new TypeError(`'target' is not defined`);

  return options && options.absolute
    ? cloneDeep<T>(target)
    : JSON.parse(JSON.stringify(target)) as T;
}

export async function deepClone<T>(
  target: T,
  options?: DeepCloneOptions
): Promise<T> {
  return deepCloneSync<T>(target, options);
}
