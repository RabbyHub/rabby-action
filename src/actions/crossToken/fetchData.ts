import { FetchActionRequiredData } from '../../types';
import { fetchDataSwap } from '../swap/fetchData';

export const fetchDataCrossToken: FetchActionRequiredData = async (options) => {
  if (!options.actionData.crossToken) {
    return {};
  }

  return fetchDataSwap(options, options.actionData.crossToken);
};
