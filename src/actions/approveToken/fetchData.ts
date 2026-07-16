import PQueue from 'p-queue';
import BigNumber from 'bignumber.js';
import {
  ApproveTokenRequireData,
  FetchActionRequiredData,
  ParsedActionData,
} from '../../types';
import { ApproveAction } from '@rabby-wallet/rabby-api/dist/types';
import { waitQueueFinished } from '../../utils/waitQueueFinished';

const BALANCE_OF_SELECTOR = '0x70a08231';

export const fetchDataApproveToken: FetchActionRequiredData<{
  spender: ApproveAction['spender'];
  token?: ApproveAction['token'];
}> = async (options, likeAction) => {
  const queue = new PQueue();
  const { sender, apiProvider, chainId, actionData, walletProvider } = options;
  const action =
    likeAction || (<ParsedActionData<'transaction'>>actionData).approveToken;

  if (!action || !chainId) {
    return {};
  }

  const { spender, token } = action;
  const result: ApproveTokenRequireData = {
    isEOA: false,
    contract: null,
    riskExposure: 0,
    hasInteraction: false,
    rank: null,
    bornAt: 0,
    protocol: null,
    isDanger: false,
    token: {
      ...token,
      amount: 0,
      raw_amount_hex_str: '0x0',
    } as any,
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
  if (token) {
    queue.add(async () => {
      if (!walletProvider.ethRpc) {
        try {
          const tokenData = await apiProvider.getToken(
            sender,
            chainId,
            token.id
          );
          if (tokenData) {
            result.token = tokenData;
          }
          return;
        } catch (e) {
          console.error('apiProvider.getToken failed to fetch token data:', e);
          return;
        }
      }

      const data = `${BALANCE_OF_SELECTOR}${sender
        .toLowerCase()
        .replace(/^0x/, '')
        .padStart(64, '0')}`;
      try {
        const rawAmountHex = await walletProvider.ethRpc(
          {
            method: 'eth_call',
            params: [{ to: token.id, data }, 'latest'],
          },
          chainId
        );
        if (
          typeof rawAmountHex !== 'string' ||
          !/^0x[0-9a-f]+$/i.test(rawAmountHex)
        ) {
          console.error('walletProvider.ethRpc error res:', rawAmountHex);
          return;
        }

        const rawAmount = new BigNumber(rawAmountHex.slice(2), 16);
        result.token = {
          ...token,
          amount: rawAmount
            .div(new BigNumber(10).pow(token.decimals))
            .toNumber(),
          raw_amount: rawAmount.toFixed(0),
          raw_amount_hex_str: `0x${rawAmount.toString(16)}`,
        };
      } catch (error) {
        console.error(
          'walletProvider.ethRpc failed to fetch token balance:',
          error
        );
        return;
      }
    });
  }

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
