import { FetchActionRequiredData } from '../../types';
import { fetchDataSwap } from '../swap/fetchData';

export const fetchDataMultiSwap: FetchActionRequiredData = async (options) => {
  if (!options.actionData.multiSwap) {
    return {};
  }
  return fetchDataSwap(options, options.actionData.multiSwap);
};
