import PQueue from 'p-queue';

export const waitQueueFinished = (q: PQueue) => {
  return new Promise((resolve) => {
    if (q.pending <= 0) {
      resolve(null);
    }
    q.on('empty', () => {
      if (q.pending <= 0) resolve(null);
    });
  });
};
