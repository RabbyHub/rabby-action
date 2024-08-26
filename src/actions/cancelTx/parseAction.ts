import { ParseAction } from '../../types';

export const parseActionCancelTx: ParseAction = (options) => {
  const { data } = options;

  if (data?.type !== 'cancel_tx') {
    return {};
  }

  return {
    cancelTx: {
      nonce: options.type === 'transaction' ? options.tx.nonce : undefined,
    },
  };
};
