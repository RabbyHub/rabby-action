import { MultiSwapAction } from '@rabby-wallet/rabby-api/dist/types';
import { ParseAction } from '../../types';

export const parseActionMultiSwap: ParseAction = (options) => {
  const { data } = options;

  if (data?.type !== 'multi_swap_token') {
    return {};
  }

  const {
    pay_token_list: payTokenList,
    receive_token_list: receiveTokenList,
    receiver,
  } = data.data as MultiSwapAction;

  return {
    multiSwap: {
      payTokenList,
      receiveTokenList,
      receiver,
    },
  };
};
