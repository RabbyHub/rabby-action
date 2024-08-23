import { FetchActionRequiredData } from '../../types';
import { fetchDataCommon } from '../common/fetchData';

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
