import { fetchActionRequiredData } from './fetchActionRequiredData';
import {
  ActionRequireData,
  ExtraActionRequiredDataState,
  FetchActionRequiredDataParameters,
} from './types';
import React from 'react';

export const useFetchActionRequiredData = () => {
  const [requiredData, setRequiredData] =
    React.useState<ActionRequireData>(null);

  const setHasInteraction: NonNullable<
    ExtraActionRequiredDataState['setHasInteraction']
  > = React.useCallback((hasInteraction) => {
    setRequiredData((prev) => {
      return {
        ...prev,
        hasInteraction,
      };
    });
  }, []);

  const _fetchActionRequiredData = React.useCallback(
    async (options: FetchActionRequiredDataParameters) => {
      const result = await fetchActionRequiredData({
        ...options,
        extraActionDataState: {
          setHasInteraction,
        },
      });
      setRequiredData(result);
      return result;
    },
    [setHasInteraction]
  );

  return {
    fetchActionRequiredData: _fetchActionRequiredData,
    requiredData,
  };
};
