import {
  ApproveTokenRequireData,
  FormatSecurityEngineContext,
} from '../../types';

export const formatSecurityEngineApproveToken: FormatSecurityEngineContext =
  async (options) => {
    const { actionData, requireData, chainId, provider } = options;

    if (!actionData.approveToken || !chainId) {
      return {};
    }
    const data = requireData as ApproveTokenRequireData;
    const { spender } = actionData.approveToken;
    return {
      tokenApprove: {
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
