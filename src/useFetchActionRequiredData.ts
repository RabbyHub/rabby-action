import { fetchActionRequiredData } from './fetchActionRequiredData';
import {
  ActionRequireData,
  ExtraActionRequiredDataState,
  FetchActionRequiredDataParameters,
  ReceiverData,
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

  const setReceiverHasTransfer: NonNullable<
    ExtraActionRequiredDataState['setReceiverHasTransfer']
  > = React.useCallback((hasTransfer) => {
    setRequiredData((prev: { unexpectedAddr: ReceiverData }) => {
      return {
        ...prev,
        unexpectedAddr: {
          ...prev?.unexpectedAddr,
          hasTransfer,
        },
      };
    });
  }, []);

  const _fetchActionRequiredData = React.useCallback(
    async (options: FetchActionRequiredDataParameters) => {
      const result = await fetchActionRequiredData({
        ...options,
        extraActionDataState: {
          setHasInteraction,
          setReceiverHasTransfer,
        },
      });
      setRequiredData(result);
      return result;
    },
    [setHasInteraction, setReceiverHasTransfer]
  );

  return {
    fetchActionRequiredData: _fetchActionRequiredData,
    requiredData,
  };
};
