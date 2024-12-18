import { OpenApiService } from '@rabby-wallet/rabby-api';
import { ExtraActionRequiredDataState } from '../types';
import PQueue from 'p-queue';

export function fetchReceiverHasTransfer({
  apiProvider,
  sender,
  chainId,
  spender,
  extraActionDataState,
  queue,
  result,
  receiverData,
}: {
  apiProvider: OpenApiService;
  sender: string;
  chainId: string;
  spender: string;
  extraActionDataState: ExtraActionRequiredDataState | undefined;
  queue: PQueue;
  receiverData: {
    hasTransfer: boolean | null;
  };
  result: {
    extraState: { receiverHasTransfer: () => void };
  };
}) {
  const handleHasTransfer = async () => {
    const result = await apiProvider.hasTransfer(sender, chainId, spender);

    return result.has_transfer;
  };

  if (!extraActionDataState) {
    queue.add(async () => {
      receiverData.hasTransfer = await handleHasTransfer();
    });
  }

  if (extraActionDataState?.setReceiverHasTransfer) {
    result.extraState.receiverHasTransfer = async () => {
      const result = await handleHasTransfer();
      extraActionDataState.setReceiverHasTransfer?.(result);
    };
  }
}
