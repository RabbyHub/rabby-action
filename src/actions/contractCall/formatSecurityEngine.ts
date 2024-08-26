import {
  ContractCallRequireData,
  FormatSecurityEngineContext,
} from '../../types';

export const formatSecurityEngineContractCall: FormatSecurityEngineContext =
  async (options) => {
    const { actionData, requireData, chainId, provider } = options;

    if (!actionData.contractCall || !chainId) {
      return {};
    }
    const data = requireData as ContractCallRequireData;
    return {
      contractCall: {
        chainId,
        id: data.id,
      },
    };
  };
