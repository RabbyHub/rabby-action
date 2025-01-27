import PQueue from 'p-queue';
import { ApproveNFTRequireData, FetchActionRequiredData } from '../../types';
import { waitQueueFinished } from '../../utils/waitQueueFinished';
import { fetchHasInteraction } from '../../fetches/fetchHasInteraction';

export const fetchDataApproveNFT: FetchActionRequiredData<{
  spender: string;
}> = async (options, likeAction) => {
  const queue = new PQueue();
  const { sender, apiProvider, chainId, actionData, extraActionDataState } =
    options;
  const action = likeAction || actionData.approveNFT;

  if (!action) {
    return {};
  }

  const result: ApproveNFTRequireData = {
    isEOA: false,
    contract: null,
    riskExposure: 0,
    rank: null,
    bornAt: 0,
    protocol: null,
    isDanger: false,
    tokenBalance: '0',
    hasInteraction: null,
    extraState: {
      hasInteraction: () => undefined,
    },
  };

  queue.add(async () => {
    const contractInfo = await apiProvider.getContractInfo(
      action.spender,
      chainId
    );
    if (!contractInfo) {
      result.isEOA = true;
      result.rank = null;
    } else {
      result.rank = contractInfo.credit.rank_at;
      result.riskExposure = contractInfo.top_nft_spend_usd_value;
      result.bornAt = contractInfo.create_at;
      result.isDanger =
        contractInfo.is_danger.auto || contractInfo.is_danger.edit;
      result.protocol = contractInfo.protocol;
    }

    if (result.isEOA) {
      queue.add(async () => {
        const { desc } = await apiProvider.addrDesc(action.spender);
        result.bornAt = desc.born_at;
      });
    }
  });

  fetchHasInteraction({
    apiProvider,
    sender,
    chainId,
    spender: action.spender,
    extraActionDataState,
    queue,
    result,
  });

  await waitQueueFinished(queue);
  return result;
};
