import { OpenApiService } from '@rabby-wallet/rabby-api';
import { ExtraActionRequiredDataState } from '../types';
import PQueue from 'p-queue';

export function fetchHasInteraction({
  apiProvider,
  sender,
  chainId,
  spender,
  extraActionDataState,
  queue,
  result,
}: {
  apiProvider: OpenApiService;
  sender: string;
  chainId: string;
  spender: string;
  extraActionDataState: ExtraActionRequiredDataState | undefined;
  queue: PQueue;
  result: {
    hasInteraction: boolean | null;
    extraState: { hasInteraction: () => void };
  };
}) {
  const handleHasInteraction = async () => {
    const hasInteraction = await apiProvider.hasInteraction(
      sender,
      chainId,
      spender
    );

    return hasInteraction.has_interaction;
  };

  if (!extraActionDataState) {
    queue.add(async () => {
      result.hasInteraction = await handleHasInteraction();
    });
  }

  if (extraActionDataState?.setHasInteraction) {
    result.extraState.hasInteraction = async () => {
      const hasInteraction = await handleHasInteraction();
      extraActionDataState.setHasInteraction?.(hasInteraction);
    };
  }
}
