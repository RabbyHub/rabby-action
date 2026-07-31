import { formatSecurityEngineContext } from './formatSecurityEngineContext';
import { StagedActionRequiredData } from './types';
import {
  formatStagedActionSecurityContext,
  StagedSecurityEngineContextParameters,
} from './stagedActionRegistry';

export const formatStagedSecurityEngineContext = (
  options: StagedSecurityEngineContextParameters,
  stage: StagedActionRequiredData
) => {
  if (stage.kind === 'legacy') {
    return formatSecurityEngineContext({
      ...options,
      requireData: stage.requiredData,
    });
  }

  return formatStagedActionSecurityContext(options, stage);
};
