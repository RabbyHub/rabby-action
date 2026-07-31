import {
  FormatSecurityEngineContext,
  ParsedTypedDataActionData,
} from '../../types';

export const formatSwapTokenOrderSecurityEngineContext = (
  actionData: ParsedTypedDataActionData,
  chainId: string,
  receiverInWallet: boolean
) => {
  if (!actionData.swapTokenOrder) {
    return {};
  }

  const receiveTokenIsFake =
    actionData.swapTokenOrder.receiveToken.is_verified === false;
  const receiveTokenIsScam = receiveTokenIsFake
    ? false
    : !!actionData.swapTokenOrder.receiveToken.is_suspicious;
  return {
    swapTokenOrder: {
      receiveTokenIsFake,
      receiveTokenIsScam,
      receiver: actionData.swapTokenOrder.receiver,
      from: actionData.sender,
      usdValuePercentage: actionData.swapTokenOrder.usdValuePercentage,
      chainId,
      id: actionData.contractId,
      receiverInWallet,
    },
  };
};

export const formatSecurityEngineSwapTokenOrder: FormatSecurityEngineContext =
  async (options) => {
    if (options.type !== 'typed_data') {
      return {};
    }
    const { actionData, chainId, provider } = options;

    if (!actionData.swapTokenOrder) {
      return {};
    }

    const receiverInWallet = await provider.hasAddress(
      actionData.swapTokenOrder.receiver
    );
    return formatSwapTokenOrderSecurityEngineContext(
      actionData,
      chainId,
      receiverInWallet
    );
  };
