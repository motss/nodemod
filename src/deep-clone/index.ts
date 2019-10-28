import { cloneDeep } from '../lib/clone-deep.js';

export interface DeepCloneOptions {
  absolute?: boolean;
}
export function deepCloneSync<T>(
  target: T,
  options?: DeepCloneOptions
) {
  if (target == null) throw new TypeError(`'target' is not defined`);

  return options && options.absolute
    ? cloneDeep(target as Record<string, unknown>)
    : JSON.parse(JSON.stringify(target)) as T;
}

export async function deepClone<T>(
  target: T,
  options?: DeepCloneOptions
) {
  return deepCloneSync<T>(target, options);
}
