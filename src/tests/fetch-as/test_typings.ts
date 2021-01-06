export interface TestSuccessData {
  message: string;
}

export interface TestErrorData extends TestSuccessData {
  type: string;
}
