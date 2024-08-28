import { SwapLimitPay } from '@rabby-wallet/rabby-api/dist/types';
import { ParseAction } from '../../types';

export const parseActionSwapLimitPay: ParseAction = (options) => {
  const { data } = options;

  if (data?.type !== 'swap_token_limit_pay') {
    return {};
  }

  const {
    pay_token: payToken,
    receive_token: receiveToken,
    receiver,
  } = data.data as SwapLimitPay;

  return {
    swapLimitPay: {
      payToken,
      receiveToken,
      receiver,
    },
  };
};
