import { AxiosError } from 'axios';
export const catchTimeoutError = async <T>(
  promise: Promise<T>,
  timeoutResponse: T
): Promise<T> => {
  try {
    return await promise;
  } catch (error) {
    if (
      error instanceof AxiosError &&
      (error.code === AxiosError.ECONNABORTED ||
        error.code === AxiosError.ETIMEDOUT)
    ) {
      return timeoutResponse;
    }
    throw error;
  }
};
