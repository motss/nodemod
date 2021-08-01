import { cloneDeep } from 'lodash-es';

import type { DeepCloneOptions } from './typings';

export function deepCloneSync<T>(
  target: T,
  options?: DeepCloneOptions
): T {
  if (target == null) throw new TypeError(`'target' is not defined`);

  return options && options.absolute
    ? cloneDeep<T>(target)
    : JSON.parse(JSON.stringify(target)) as T;
}
