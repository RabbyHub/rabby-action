// Starts the request now and turns a synchronous throw into a rejection, so a
// throwing provider cannot abort construction of a sibling request array or
// orphan an already-started promise.
export const startRequest = <T>(callback: () => T | Promise<T>): Promise<T> =>
  Promise.resolve().then(callback);
