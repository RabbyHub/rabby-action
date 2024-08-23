import { FetchActionRequiredData } from '../../types';
import { fetchDataAssetOrder } from '../assetOrder/fetchData';

export const fetchDataBuyNFT: FetchActionRequiredData = async (options) => {
  if (options.type !== 'typed_data') {
    return {};
  }
  if (!options.actionData.contractId || !options.actionData.buyNFT) {
    return {};
  }

  return fetchDataAssetOrder(options, {
    receiver: options.actionData.contractId,
  });
};
