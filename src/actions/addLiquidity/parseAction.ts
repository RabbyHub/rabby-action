import { ParseAction } from '../../types';
import { TokenItem } from '@rabby-wallet/rabby-api/dist/types';

interface AddLiquidityActionData {
  receiver: string;
  exchange_rate: string;
  min_exchange_rate: string;
  max_exchange_rate: string;
  token0: TokenItem;
  token1: TokenItem;
}

export const parseActionAddLiquidity: ParseAction = (options) => {
  const { data } = options;

  if (data?.type !== 'add_liquidity') {
    return {};
  }

  const {
    receiver,
    exchange_rate,
    min_exchange_rate,
    max_exchange_rate,
    token0,
    token1,
  } = data.data as unknown as AddLiquidityActionData;

  return {
    addLiquidity: {
      receiver,
      exchange_rate,
      min_exchange_rate,
      max_exchange_rate,
      token0,
      token1,
    },
  };
};
