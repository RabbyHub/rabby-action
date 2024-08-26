import { FetchActionRequiredData } from '../../types';

export const fetchDataCancelTx: FetchActionRequiredData = async (options) => {
  const { walletProvider, actionData, chainId, sender } = options;

  if (!actionData.cancelTx) {
    return {};
  }

  const chain = walletProvider.findChain({
    serverId: chainId,
  });
  if (chain && actionData.cancelTx.nonce !== undefined) {
    const pendingTxs = await walletProvider.getPendingTxsByNonce(
      sender,
      chain.id,
      Number(actionData.cancelTx.nonce)
    );
    return {
      pendingTxs,
    };
  } else {
    return {
      pendingTxs: [],
    };
  }
};
