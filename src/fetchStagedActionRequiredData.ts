import {
  FetchStagedActionRequiredData,
  StagedActionKind,
} from './types/fetchActionRequiredData';
import { fetchActionRequiredData } from './fetchActionRequiredData';
import { isStagedActionKind, loadStagedAction } from './stagedActionRegistry';

const META_KEYS = ['sender', 'actionType', 'brand', 'contractId', 'chainId'];

const fetchLegacyStage = async (
  options: Parameters<FetchStagedActionRequiredData>[0]
) => ({
  kind: 'legacy' as const,
  requiredData: await fetchActionRequiredData(options),
});

const getOnlyStagedActionKind = (
  options: Parameters<FetchStagedActionRequiredData>[0]
): StagedActionKind | null => {
  if (options.type === 'text') {
    return null;
  }

  const actionData = options.actionData as Record<string, unknown>;
  const actionKeys = Object.keys(actionData).filter(
    (key) =>
      !META_KEYS.includes(key) &&
      actionData[key] !== undefined &&
      actionData[key] !== null
  );

  if (actionKeys.length !== 1) {
    return null;
  }

  const [kind] = actionKeys;
  return isStagedActionKind(kind) ? kind : null;
};

export const fetchStagedActionRequiredData: FetchStagedActionRequiredData =
  async (options) => {
    const chain = options.walletProvider.findChain({
      serverId: options.chainId,
    });
    if (!chain || chain.isTestnet) {
      return fetchLegacyStage(options);
    }

    const kind = getOnlyStagedActionKind(options);
    const staged = kind ? await loadStagedAction(kind, options) : null;

    return staged ?? fetchLegacyStage(options);
  };
