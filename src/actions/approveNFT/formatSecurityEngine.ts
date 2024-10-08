import {
  ApproveNFTRequireData,
  FormatSecurityEngineContext,
} from '../../types';

export const formatSecurityEngineApproveNFT: FormatSecurityEngineContext =
  async (options) => {
    const { actionData, requireData, chainId, provider } = options;

    if (!actionData.approveNFT || !chainId) {
      return {};
    }
    const data = requireData as ApproveNFTRequireData;
    const { spender } = actionData.approveNFT;
    return {
      nftApprove: {
        chainId,
        spender,
        isEOA: data.isEOA,
        riskExposure: data.riskExposure,
        deployDays: provider.getTimeSpan(
          Math.floor(Date.now() / 1000) - data.bornAt
        ).d,
        isDanger: !!data.isDanger,
      },
    };
  };
