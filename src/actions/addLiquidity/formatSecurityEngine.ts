import {
  AddLiquidityRequireData,
  FormatSecurityEngineContext,
} from '../../types';

export const formatSecurityEngineAddLiquidity: FormatSecurityEngineContext =
  async (options) => {
    const { actionData, requireData, chainId } = options;

    if (!actionData.addLiquidity || !chainId) {
      return {} as any;
    }

    const data = requireData as AddLiquidityRequireData;

    return {
      addLiquidity: {
        receiverMatch:
          data.receiver?.toLowerCase() === data.sender.toLowerCase(),
        diff: data.diff,
      },
    };
  };
