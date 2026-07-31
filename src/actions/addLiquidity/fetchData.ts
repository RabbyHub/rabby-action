import PQueue from 'p-queue';
import {
  AddLiquidityDisplayData,
  AddLiquidityRequireData,
  AddLiquiditySafetyGateData,
  FetchActionRequiredData,
  FetchActionRequiredDataParameters,
  ParsedActionData,
  StagedActionRequiredData,
} from '../../types';
import { waitQueueFinished } from '../../utils/waitQueueFinished';
import BigNumber from 'bignumber.js';
import { fetchStagedCommonDisplayData } from '../common/fetchData';

type AddLiquidityAction = {
  receiver: string;
  exchange_rate: string;
  min_exchange_rate: string;
  max_exchange_rate: string;
  token0: any;
  token1: any;
};

export const fetchStagedDataAddLiquidity = async (
  options: FetchActionRequiredDataParameters,
  likeAction?: AddLiquidityAction
): Promise<Extract<
  StagedActionRequiredData,
  { kind: 'addLiquidity' }
> | null> => {
  const { actionData, apiProvider, sender, chainId } = options;
  const action =
    likeAction || (<ParsedActionData<'transaction'>>actionData).addLiquidity;

  if (!action || options.type === 'text') {
    return null;
  }

  const { receiver, exchange_rate, token0, token1 } = action;
  const id =
    options.type === 'transaction'
      ? options.tx.to
      : options.actionData.contractId;
  if (!id) {
    return null;
  }

  const poolRate = new BigNumber(exchange_rate);
  const token0Price = new BigNumber(token0.price);
  const token1Price = new BigNumber(token1.price);
  if (
    [poolRate, token0Price, token1Price].some(
      (price) => !price.isFinite() || !price.isGreaterThan(0)
    )
  ) {
    throw new Error('Invalid add liquidity security data');
  }

  const fairExchangeRate = token0Price.div(token1Price);
  const diff = +poolRate
    .minus(fairExchangeRate)
    .abs()
    .div(fairExchangeRate)
    .times(100)
    .toFixed(4);
  if (!Number.isFinite(diff)) {
    throw new Error('Invalid add liquidity security data');
  }
  const securityData: AddLiquiditySafetyGateData = {
    sender,
    receiver,
    diff,
  };
  const displayData = fetchStagedCommonDisplayData(
    apiProvider,
    sender,
    chainId,
    id
  ).then((contractDisplay): AddLiquidityDisplayData | null => {
    if (!contractDisplay) {
      return null;
    }

    return {
      ...contractDisplay,
      id,
      poolRate: exchange_rate,
      marketRate: fairExchangeRate.toFixed(),
    };
  });

  return { kind: 'addLiquidity', securityData, displayData };
};

export const fetchDataAddLiquidity: FetchActionRequiredData<
  AddLiquidityAction
> = async (options, likeAction) => {
  const { actionData, apiProvider, sender, walletProvider, chainId } = options;

  const action =
    likeAction || (<ParsedActionData<'transaction'>>actionData).addLiquidity;

  if (!action || options.type === 'text') {
    return {};
  }

  const { receiver, exchange_rate, token0, token1 } = action;

  const fair_exchange_rate = new BigNumber(token0.price).div(token1.price);

  const diff = +new BigNumber(exchange_rate)
    .minus(fair_exchange_rate)
    .abs()
    .div(fair_exchange_rate)
    .times(100)
    .toFixed(4);

  const receiverInWallet = await walletProvider.hasAddress(receiver);

  const id =
    options.type === 'transaction'
      ? options.tx.to
      : options.actionData.contractId;
  if (!id) {
    return {};
  }

  const result: AddLiquidityRequireData = {
    id,
    protocol: null,
    bornAt: 0,
    rank: null,
    sender,
    receiverInWallet,
    hasInteraction: false,
    receiver,
    poolRate: exchange_rate,
    token0,
    token1,
    marketRate: fair_exchange_rate.toFixed(),
    diff,
  };
  const queue = new PQueue();

  queue.add(async () => {
    const contractInfo = await apiProvider.getContractInfo(id, chainId);
    if (!contractInfo) {
      result.rank = null;
    } else {
      result.rank = contractInfo.credit.rank_at;
      result.bornAt = contractInfo.create_at;

      result.protocol = contractInfo.protocol;
    }
  });

  queue.add(async () => {
    const hasInteraction = await apiProvider.hasInteraction(
      sender,
      chainId,
      id
    );
    result.hasInteraction = hasInteraction.has_interaction;
  });

  await waitQueueFinished(queue);

  return result;
};
