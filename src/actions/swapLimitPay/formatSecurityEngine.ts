import {
  AssetOrderRequireData,
  FormatSecurityEngineContext,
} from '../../types';

export const formatSecurityEngineSwapLimitPay: FormatSecurityEngineContext =
  async (options) => {
    const { actionData, requireData, chainId } = options;

    if (!actionData.swapLimitPay) {
      return {};
    }
    const { receiver } = actionData.swapLimitPay;
    const data = requireData as AssetOrderRequireData;
    return {
      multiSwap: {
        from: data.sender,
        receiver: receiver || '',
        chainId,
        id: data.id,
      },
    };
  };
