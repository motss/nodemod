import { delayUntil } from '../delay-until/index';
import { PollingMeasure } from './polling-measure';

export interface PollingObserverOptions {
  timeout?: number;
  interval?: number;
}
type PollingCallback<T> = () => T | Promise<T>;
type ConditionCallback<T> = (
  data: T | null | undefined,
  records: PollingObserver<T>['_records'],
  object: PollingObserver<T>
) => boolean | Promise<boolean>;

export interface OnfinishFulfilled<T> {
  status: 'finish' | 'timeout';
  value: T | null | undefined;
}
export interface OnfinishRejected {
  readonly status: 'error';
  reason: Error;
}
export type OnfinishValue<T> = OnfinishFulfilled<T> | OnfinishRejected;
type OnfinishCallback<T> = (
  value: OnfinishValue<T>,
  records: PollingObserver<T>['_records'],
  object: PollingObserver<T>
) => unknown;

function isPromise<T>(r: T | Promise<T>): r is Promise<T> {
  return 'function' === typeof((r as Promise<T>).then);
}

const perf = globalThis.performance;

export class PollingObserver<T> {
  public onfinish?: OnfinishCallback<T>;

  private _forceStop = false;
  private _records: PollingMeasure[] = [];
  private _isPolling = false;

  constructor(public conditionCallback: ConditionCallback<T>) {
    if ('function' !== typeof(conditionCallback)) {
      throw new TypeError(`'conditionCallback' is not defined`);
    }
  }

  public disconnect(): void {
    this._forceStop = true;

    if (!this._isPolling) this._records = [];
  }

  public async observe(
    callback: PollingCallback<T>,
    options?: PollingObserverOptions
  ): Promise<void> {
    /**
     * NOTE(motss): To ensure `this._forceStop` is always reset before start observing.
     */
    this._forceStop = false;

    const { interval, timeout }: PollingObserverOptions = options || {};
    const isValidInterval = 'number' === typeof(interval) && interval > 0;
    const obsTimeout = 'number' === typeof(timeout) ? +timeout : -1;
    const obsInterval = isValidInterval ? +(interval as number) : 100;

    const isInfinitePolling = obsTimeout < 1;
    const records = this._records;
    const onfinishCallback = this.onfinish;
    const conditionCallback = this.conditionCallback;
    const loop = true;

    let totalTime = 0;
    let value: T | null | undefined = void 0;
    let i = 0;
    let status: OnfinishFulfilled<T>['status'] = 'finish';
    let result: OnfinishValue<T> = {} as OnfinishValue<T>;

    try {
      polling: while (loop) {
        if (this._forceStop) break polling;

        /** NOTE(motss): Set to indicate polling initiates */
        this._isPolling = true;

        const conditionResult = conditionCallback(value, records, this);
        const didConditionMeet = isPromise(conditionResult) ?
          await conditionResult : conditionResult;
        const didTimeout = isInfinitePolling ? false : totalTime >= obsTimeout;

        if (didTimeout || didConditionMeet) {
          status = didTimeout ? 'timeout' : status;
          break polling;
        }

        const startAt = perf.now();
        const r = callback();
        value = isPromise(r) ? await r : r;
        const endAt = perf.now();
        const duration = endAt - startAt;
        const timeLeft = isValidInterval ? obsInterval - duration : 0;

        records.push(new PollingMeasure(`polling:${i}`, duration, startAt));

        totalTime += (duration > obsInterval ? duration : obsInterval);
        i += 1;

        if (timeLeft > 0) await delayUntil(timeLeft);
      }

      result = { status, value };
    } catch (e) {
      result = { status: 'error', reason: e as Error };
    } finally {
      const recordsSlice = records.slice();

      if (this._forceStop) this._records = [];

      /** NOTE(motss): Reset flags */
      this._isPolling = this._forceStop = false;

      if ('function' === typeof(onfinishCallback)) {
        onfinishCallback(result, recordsSlice, this);
      }
    }
  }

  public takeRecords(): PollingMeasure[] {
    return this._records;
  }
}
