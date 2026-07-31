import { StagedActionMaterialization, StagedActionRequiredData } from './types';
import { materializeStagedAction } from './stagedActionRegistry';

export type { StagedActionMaterialization } from './types';

export const materializeStagedActionRequiredData = async (
  stage: StagedActionRequiredData
): Promise<StagedActionMaterialization> => {
  if (stage.kind === 'legacy') {
    return { status: 'ready', requiredData: stage.requiredData };
  }

  return materializeStagedAction(stage);
};
