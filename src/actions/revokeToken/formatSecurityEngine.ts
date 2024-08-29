import { FormatSecurityEngineContext } from '../../types';

export const formatSecurityEngineRevokeToken: FormatSecurityEngineContext =
  async (options) => {
    const { actionData, requireData, chainId, provider } = options;

    if (!actionData.revokeToken) {
      return {};
    }

    const { gasUsed } = actionData.revokeToken;
    return {
      revokeApprove: {
        gasUsed: gasUsed || 0,
        chainId,
      },
    };
  };
