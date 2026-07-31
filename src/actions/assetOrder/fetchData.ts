import {
  ContractSafetyGateData,
  FetchActionRequiredData,
  FetchActionRequiredDataParameters,
  StagedActionRequiredData,
} from '../../types';
import {
  fetchDataCommon,
  fetchStagedCommonDisplayData,
} from '../common/fetchData';

export const fetchStagedDataAssetOrder = async (
  options: FetchActionRequiredDataParameters
): Promise<Extract<
  StagedActionRequiredData,
  { kind: 'assetOrder' }
> | null> => {
  if (options.type === 'text' || !options.actionData.assetOrder) {
    return null;
  }

  const id =
    options.type === 'transaction'
      ? options.tx.to
      : options.actionData.contractId;
  if (!id) {
    return null;
  }

  const securityData: ContractSafetyGateData = {
    id,
    sender: options.sender,
  };
  return {
    kind: 'assetOrder',
    securityData,
    displayData: fetchStagedCommonDisplayData(
      options.apiProvider,
      options.sender,
      options.chainId,
      id
    ),
  };
};

// TODO: text action not supported
export const fetchDataAssetOrder: FetchActionRequiredData = async (options) => {
  let action;

  if (options.type === 'transaction' && options.actionData.assetOrder) {
    action = {
      receiver: options.tx.to,
    };
  }
  if (
    options.type === 'typed_data' &&
    options.actionData.assetOrder &&
    options.actionData.contractId
  ) {
    action = {
      receiver: options.actionData.contractId,
    };
  }

  if (!action || !options.chainId) {
    return {};
  }

  return fetchDataCommon(options, action);
};
