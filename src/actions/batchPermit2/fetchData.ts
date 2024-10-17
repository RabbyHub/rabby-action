import PQueue from 'p-queue';
import {
  BatchApproveTokenRequireData,
  FetchActionRequiredData,
} from '../../types';
import { waitQueueFinished } from '../../utils/waitQueueFinished';

export const fetchDataBatchPermit2: FetchActionRequiredData = async (
  options
) => {
  if (options.type !== 'typed_data') {
    return {};
  }
  const { actionData, apiProvider, sender, chainId } = options;
  if (!actionData.batchPermit2 || !chainId) {
    return {};
  }

  const queue = new PQueue();
  const tokens = actionData.batchPermit2.token_list;
  const spender = actionData.batchPermit2.spender;
  const result: BatchApproveTokenRequireData = {
    isEOA: false,
    contract: null,
    riskExposure: 0,
    rank: null,
    bornAt: 0,
    protocol: null,
    isDanger: false,
    tokens: tokens.map((token) => ({
      ...token,
      amount: 0,
      raw_amount_hex_str: '0x0',
    })),
    hasInteraction: false,
  };
  queue.add(async () => {
    const contractInfo = await apiProvider.getContractInfo(spender, chainId);
    if (!contractInfo) {
      result.isEOA = true;
      result.rank = null;
    } else {
      result.rank = contractInfo.credit.rank_at;
      result.riskExposure = contractInfo.spend_usd_value;
      result.bornAt = contractInfo.create_at;
      result.isDanger =
        contractInfo.is_danger.auto || contractInfo.is_danger.edit;
      result.protocol = contractInfo.protocol;
    }

    if (result.isEOA) {
      queue.add(async () => {
        const { desc } = await apiProvider.addrDesc(spender);
        result.bornAt = desc.born_at;
      });
    }
  });
  queue.add(async () => {
    const list = await Promise.all(
      tokens.map((token) => apiProvider.getToken(sender, chainId, token.id))
    );
    result.tokens = list;
  });

  queue.add(async () => {
    const hasInteraction = await apiProvider.hasInteraction(
      sender,
      chainId,
      spender
    );
    result.hasInteraction = hasInteraction.has_interaction;
  });

  await waitQueueFinished(queue);
  return result;
};
