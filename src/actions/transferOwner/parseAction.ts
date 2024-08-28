import { TransferOwnerAction } from '@rabby-wallet/rabby-api/dist/types';
import { ParseAction } from '../../types';

export const parseActionTransferOwner: ParseAction = (options) => {
  const { data } = options;

  if (data?.type !== 'transfer_ownership') {
    return {};
  }

  const { description, from_addr, to_addr } = data.data as TransferOwnerAction;

  return {
    transferOwner: {
      description,
      from: from_addr,
      to: to_addr,
    },
  };
};
