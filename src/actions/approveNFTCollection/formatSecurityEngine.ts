import {
  ApproveNFTRequireData,
  FormatSecurityEngineContext,
} from '../../types';

export const formatSecurityEngineApproveNFTCollection: FormatSecurityEngineContext =
  async (options) => {
    const { actionData, requireData, chainId, provider } = options;

    if (!actionData.approveNFTCollection || !chainId) {
      return {};
    }
    const data = requireData as ApproveNFTRequireData;
    const { spender } = actionData.approveNFTCollection;
    return {
      collectionApprove: {
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
