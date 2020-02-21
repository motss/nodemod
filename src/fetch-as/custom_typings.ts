export interface ExtendedFetchResponse extends Response {
  size: number;
  timeout: number;
}

export type FetchType = Exclude<keyof Body, 'body' | 'bodyUsed'>;
export type UnknownRecord = Record<string, unknown>;

export interface FetchAsInfo extends Pick<ExtendedFetchResponse, 'size'|'timeout'|'type'> {
  headers: UnknownRecord;
}

export interface FetchAsReturnType<T = any, U = any> {
  status: number;
  info: FetchAsInfo;

  data?: T;
  error?: U;
}
