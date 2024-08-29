import { ContractRequireData, FormatSecurityEngineContext } from '../../types';

export const formatSecurityEngineCommon: FormatSecurityEngineContext = async (
  options
) => {
  if (!options.actionData.common) {
    return {};
  }

  return {
    common: {
      ...options.actionData.common,
      receiverInWallet: (options.requireData as ContractRequireData)
        ?.receiverInWallet,
    },
  };
};
