// test catchTimeoutError
import { catchTimeoutError } from './catchTimeoutError';
import axios from 'axios';

test('catchTimeoutError should return timeoutResponse on timeout', async () => {
  const timeoutResponse = { has_transfer: false };
  const promise = axios
    .get<{
      has_transfer: boolean;
    }>('http://www.google.com:81/', {
      timeout: 1,
    })
    .then((response) => {
      return response.data;
    });

  const result = await catchTimeoutError(promise, timeoutResponse);
  expect(result).toEqual(timeoutResponse);
});
