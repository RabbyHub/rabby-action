import PQueue from 'p-queue';
import {
  AssetOrderRequireData,
  ContractDisplayData,
  ContractRequireData,
  ContractSafetyGateData,
  FetchActionRequiredData,
  FetchActionRequiredDataParameters,
  NFTOrderActionKind,
  ReceiverData,
  StagedActionRequiredData,
} from '../../types';
import { waitQueueFinished } from '../../utils/waitQueueFinished';
import { catchTimeoutError } from '../../utils/catchTimeoutError';
import { startRequest } from '../../utils/startRequest';

export const settleStagedDisplay = <T>(request: () => T | Promise<T>) =>
  startRequest(request).then(
    (value) => ({ success: true as const, value }),
    () => ({ success: false as const })
  );

export const fetchStagedCommonDisplayData = (
  apiProvider: FetchActionRequiredDataParameters['apiProvider'],
  sender: string,
  chainId: string,
  id: string
): Promise<ContractDisplayData | null> =>
  Promise.all([
    settleStagedDisplay(() => apiProvider.getContractInfo(id, chainId)),
    settleStagedDisplay(() => apiProvider.hasInteraction(sender, chainId, id)),
  ])
    .then(([contractInfo, hasInteraction]): ContractDisplayData | null => {
      const contract = contractInfo.success ? contractInfo.value : null;
      const interaction = hasInteraction.success ? hasInteraction.value : null;

      if (
        !contract ||
        typeof contract.create_at !== 'number' ||
        !contract.credit ||
        (typeof contract.credit.rank_at !== 'number' &&
          contract.credit.rank_at !== null) ||
        (contract.protocol !== null && typeof contract.protocol !== 'object') ||
        typeof interaction?.has_interaction !== 'boolean'
      ) {
        return null;
      }

      return {
        protocol: contract.protocol,
        bornAt: contract.create_at,
        rank: contract.credit.rank_at,
        hasInteraction: interaction.has_interaction,
      };
    })
    .catch(() => null);

// buyNFT / sellNFT / batchSellNFT share one shape: typed_data only, gate is the
// locally-parsed contractId + sender, everything else is display.
export const fetchStagedDataNFTOrder = async <K extends NFTOrderActionKind>(
  options: FetchActionRequiredDataParameters,
  kind: K
): Promise<Extract<StagedActionRequiredData, { kind: K }> | null> => {
  if (
    options.type !== 'typed_data' ||
    !options.actionData.contractId ||
    !(options.actionData as Record<string, unknown>)[kind]
  ) {
    return null;
  }

  const id = options.actionData.contractId;
  const securityData: ContractSafetyGateData = { id, sender: options.sender };
  return {
    kind,
    securityData,
    displayData: fetchStagedCommonDisplayData(
      options.apiProvider,
      options.sender,
      options.chainId,
      id
    ),
  } as Extract<StagedActionRequiredData, { kind: K }>;
};

export const fetchDataCommon: FetchActionRequiredData<{
  receiver: string;
}> = async (options, likeAction) => {
  const { walletProvider, actionData, sender, apiProvider, chainId } = options;
  const queue = new PQueue();
  let action = likeAction;

  if (options.type === 'typed_data' && options.actionData.contractId) {
    action = {
      receiver: options.actionData.contractId,
    };
  }

  if (!action || !chainId) {
    return {};
  }
  const { receiver } = action;

  const result: ContractRequireData = {
    id: receiver,
    protocol: null,
    bornAt: 0,
    rank: null,
    unexpectedAddr: null,
    receiverInWallet: false,
    hasInteraction: false,
  };

  (result as AssetOrderRequireData).sender = sender;

  let isEOA = false;
  queue.add(async () => {
    const contractInfo = await apiProvider.getContractInfo(receiver, chainId);
    if (!contractInfo) {
      result.rank = null;
      isEOA = true;
    } else {
      result.rank = contractInfo.credit.rank_at;
      result.bornAt = contractInfo.create_at;
      result.protocol = contractInfo.protocol;
    }
  });

  if (isEOA) {
    queue.add(async () => {
      const { desc } = await apiProvider.addrDesc(receiver);
      result.bornAt = desc.born_at;
    });
  }

  queue.add(async () => {
    const hasInteraction = await apiProvider.hasInteraction(
      sender,
      chainId,
      receiver
    );
    result.hasInteraction = hasInteraction.has_interaction;
  });

  if (actionData.contractCall || actionData.common) {
    const chain = walletProvider.findChain({
      serverId: chainId,
    });

    queue.add(async () => {
      const addr = actionData.common?.receiver;

      if (addr) {
        result.receiverInWallet = await walletProvider.hasAddress(addr);
        const receiverData: ReceiverData = {
          address: addr,
          chain: chain!,
          eoa: null,
          cex: null,
          contract: null,
          usd_value: 0,
          hasTransfer: false,
          isTokenContract: false,
          name: null,
          onTransferWhitelist: false,
        };

        const { has_transfer } = await catchTimeoutError(
          apiProvider.hasTransfer(chainId, sender, addr),
          {
            has_transfer: false,
          }
        );
        receiverData.hasTransfer = has_transfer;

        const { desc } = await apiProvider.addrDesc(addr);
        if (desc.cex?.id) {
          receiverData.cex = {
            id: desc.cex.id,
            logo: desc.cex.logo_url,
            name: desc.cex.name,
            bornAt: desc.born_at,
            isDeposit: desc.cex.is_deposit,
          };
        }
        if (desc.contract && Object.keys(desc.contract).length > 0) {
          receiverData.contract = desc.contract;
        }
        if (!receiverData.cex && !receiverData.contract) {
          receiverData.eoa = {
            id: addr,
            bornAt: desc.born_at,
          };
        }
        receiverData.usd_value = desc.usd_value;
        if (receiver) {
          const { is_token } = await apiProvider.isTokenContract(chainId, addr);
          receiverData.isTokenContract = is_token;
        }
        receiverData.name = desc.name;
        if (walletProvider.ALIAS_ADDRESS[addr.toLowerCase()]) {
          receiverData.name = walletProvider.ALIAS_ADDRESS[addr.toLowerCase()];
        }

        const whitelist = await walletProvider.getWhitelist();
        receiverData.onTransferWhitelist = whitelist.includes(
          addr.toLowerCase()
        );
        result.unexpectedAddr = receiverData;
      }
    });
  }
  await waitQueueFinished(queue);
  return result;
};
