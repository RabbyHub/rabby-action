import { FetchActionRequiredData } from '../../types';
import { fetchDataSwap } from '../swap/fetchData';

export const fetchDataCrossSwapToken: FetchActionRequiredData = async (
  options
) => {
  if (!options.actionData.crossSwapToken) {
    return {};
  }
  return fetchDataSwap(options, options.actionData.crossSwapToken);
};
