import { FetchActionRequiredData } from '../../types';
import { fetchDataSwap } from '../swap/fetchData';

export const fetchDataUnwrapToken: FetchActionRequiredData = async (
  options
) => {
  if (!options.actionData.unWrapToken) {
    return {};
  }
  return fetchDataSwap(options, options.actionData.unWrapToken);
};
