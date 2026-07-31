import PQueue from 'p-queue';
import {
  FetchActionRequiredData,
  FetchActionRequiredDataParameters,
  StagedActionRequiredData,
  TransferOwnerRequireData,
  ReceiverData,
} from '../../types';
import { waitQueueFinished } from '../../utils/waitQueueFinished';
import { catchTimeoutError } from '../../utils/catchTimeoutError';
import { startRequest } from '../../utils/startRequest';

export const fetchStagedDataTransferOwner = async (
  options: FetchActionRequiredDataParameters
): Promise<Extract<
  StagedActionRequiredData,
  { kind: 'transferOwner' }
> | null> => {
  const transferOwner = options.actionData.transferOwner;
  if (!transferOwner) {
    return null;
  }

  const { walletProvider, apiProvider, chainId, sender } = options;
  const addr = transferOwner.to;
  if (!addr) {
    return null;
  }

  const chain = walletProvider.findChain({ serverId: chainId });
  const whitelistPromise = startRequest(() => walletProvider.getWhitelist());
  const displayData = Promise.all([
    startRequest(() =>
      catchTimeoutError(apiProvider.hasTransfer(chainId, sender, addr), {
        has_transfer: false,
      })
    ),
    startRequest(() => apiProvider.addrDesc(addr)),
    startRequest(() => apiProvider.isTokenContract(chainId, addr)),
    whitelistPromise,
  ])
    .then(
      ([
        { has_transfer },
        { desc },
        { is_token },
        whitelist,
      ]): TransferOwnerRequireData => {
        const receiver: ReceiverData = {
          address: addr,
          chain: chain!,
          eoa: null,
          cex: null,
          contract: null,
          usd_value: desc.usd_value,
          hasTransfer: has_transfer,
          isTokenContract: is_token,
          name: walletProvider.ALIAS_ADDRESS[addr.toLowerCase()] || desc.name,
          onTransferWhitelist: whitelist.includes(addr.toLowerCase()),
        };
        if (desc.cex?.id) {
          receiver.cex = {
            id: desc.cex.id,
            logo: desc.cex.logo_url,
            name: desc.cex.name,
            bornAt: desc.born_at,
            isDeposit: desc.cex.is_deposit,
          };
        }
        if (desc.contract && Object.keys(desc.contract).length > 0) {
          receiver.contract = desc.contract;
        }
        if (!receiver.cex && !receiver.contract) {
          receiver.eoa = { id: addr, bornAt: desc.born_at };
        }
        return { receiver };
      }
    )
    .catch(() => null);

  const whitelist = await whitelistPromise;
  return {
    kind: 'transferOwner',
    securityData: {
      receiver: {
        onTransferWhitelist: whitelist.includes(addr.toLowerCase()),
      },
    },
    displayData,
  };
};

export const fetchDataTransferOwner: FetchActionRequiredData = async (
  options
) => {
  if (!options.actionData.transferOwner) {
    return {};
  }
  const queue = new PQueue();
  const { actionData, walletProvider, apiProvider, chainId, sender } = options;
  const addr = actionData.transferOwner?.to;
  const result: TransferOwnerRequireData = {
    receiver: null,
  };
  if (addr) {
    const chain = walletProvider.findChain({
      serverId: chainId,
    });
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
    queue.add(async () => {
      const { has_transfer } = await catchTimeoutError(
        apiProvider.hasTransfer(chainId, sender, addr),
        {
          has_transfer: false,
        }
      );
      receiverData.hasTransfer = has_transfer;
    });
    queue.add(async () => {
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
      receiverData.name = desc.name;
    });
    queue.add(async () => {
      if (addr) {
        const { is_token } = await apiProvider.isTokenContract(chainId, addr);
        receiverData.isTokenContract = is_token;
      }

      if (walletProvider.ALIAS_ADDRESS[addr.toLowerCase()]) {
        receiverData.name = walletProvider.ALIAS_ADDRESS[addr.toLowerCase()];
      }

      const whitelist = await walletProvider.getWhitelist();
      receiverData.onTransferWhitelist = whitelist.includes(addr.toLowerCase());
    });
    await waitQueueFinished(queue);
    result.receiver = receiverData;
  }
  return result;
};
