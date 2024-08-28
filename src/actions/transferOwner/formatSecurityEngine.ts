import { TransferOwnerRequireData } from '../../types';
import { FormatSecurityEngineContext } from '../../types';

export const formatSecurityEngineTransferOwner: FormatSecurityEngineContext =
  async (options) => {
    const { actionData, requireData, chainId, provider } = options;

    if (!actionData.transferOwner || !chainId) {
      return {};
    }
    const data = requireData as TransferOwnerRequireData;
    return {
      transferOwner: {
        receiverInWhitelist: !!data.receiver?.onTransferWhitelist,
      },
    };
  };
