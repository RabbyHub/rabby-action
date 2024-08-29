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

    if (options.type === 'typed_data') {
      if (options.actionData.contractId) {
        return {
          contractCall: {
            id: options.actionData.contractId,
            chainId: chainId,
          },
        };
      }
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
