import { FetchActionRequiredData } from '../../types';
import { fetchDataSwap } from '../swap/fetchData';

export const fetchDataWrapToken: FetchActionRequiredData = async (options) => {
  if (!options.actionData.wrapToken) {
    return {};
  }

  return fetchDataSwap(options, options.actionData.wrapToken);
};
