import type { TestErrorData, TestSuccessData } from './test_typings.js';

export const url = 'http://localhost:5353';

export const successData: TestSuccessData = {
  message: 'OK',
};

export const errorData: TestErrorData = {
  type: 'not_found',
  message: 'Not found',
};
