import { FetchActionRequiredData } from '../../types';
import { fetchDataSwap } from '../swap/fetchData';

export const fetchDataSwapLimitPay: FetchActionRequiredData = async (
  options
) => {
  if (!options.actionData.swapLimitPay) {
    return {};
  }
  return fetchDataSwap(options, options.actionData.swapLimitPay);
};
