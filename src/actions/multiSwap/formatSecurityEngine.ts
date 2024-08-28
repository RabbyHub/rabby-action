import {
  AssetOrderRequireData,
  FormatSecurityEngineContext,
} from '../../types';

export const formatSecurityEngineMultiSwap: FormatSecurityEngineContext =
  async (options) => {
    const { actionData, requireData, chainId } = options;

    if (!actionData.multiSwap) {
      return {};
    }
    const { receiver } = actionData.multiSwap;
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
