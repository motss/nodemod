export interface SignaturOptions {
  separator?: string;
}

export interface DecodedData<T> {
  data: T;
}

export interface SignaturReturnError {
  error: {
    type: string;
    message: string;
  };
}

export type UnknownRecord = Record<string, unknown>;
