import { ParseAction } from '../../types';

export const parseActionCancelTx: ParseAction<'transaction'> = (options) => {
  const { data } = options;

  if (data?.type !== 'cancel_tx') {
    return {};
  }

  return {
    cancelTx: {
      nonce: options.tx.nonce,
    },
  };
};
