import { FetchActionRequiredData } from '../../types';
import { fetchDataCommon } from '../common/fetchData';

export const fetchDataSellNFT: FetchActionRequiredData = async (options) => {
  if (options.type !== 'typed_data') {
    return {};
  }
  if (!options.actionData.contractId || !options.actionData.sellNFT) {
    return {};
  }

  return fetchDataCommon(options, {
    receiver: options.actionData.contractId,
  });
};
