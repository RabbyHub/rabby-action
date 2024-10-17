import PQueue from 'p-queue';
import { waitQueueFinished } from '../../utils/waitQueueFinished';
import { FetchActionRequiredData, SwapRequireData } from '../../types';

// TODO: text
export const fetchDataSwap: FetchActionRequiredData<{
  receiver: string;
}> = async (options, likeSwapAction) => {
  if (options.type === 'text') {
    return {};
  }
  const queue = new PQueue();
  const { actionData, walletProvider, sender, apiProvider, chainId } = options;
  const swapAction = likeSwapAction || actionData.swap;
  if (!swapAction) {
    return {};
  }

  const { receiver } = swapAction;

  const receiverInWallet = await walletProvider.hasAddress(receiver);
  const id =
    options.type === 'transaction'
      ? options.tx.to
      : options.actionData.contractId;

  if (!id) {
    return {};
  }

  const result: SwapRequireData = {
    id,
    protocol: null,
    bornAt: 0,
    rank: null,
    sender,
    receiverInWallet,
    hasInteraction: false,
  };
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
