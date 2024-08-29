import PQueue from 'p-queue';
import {
  FetchActionRequiredData,
  TransferOwnerRequireData,
  ReceiverData,
} from '../../types';
import { waitQueueFinished } from '../../utils/waitQueueFinished';

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
      const { has_transfer } = await apiProvider.hasTransfer(
        chainId,
        sender,
        addr
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
