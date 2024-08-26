import { FetchActionRequiredData } from '../../types';
import { fetchDataApproveToken } from '../approveToken/fetchData';

export const fetchDataRevokeToken: FetchActionRequiredData = async (
  options
) => {
  if (!options.actionData.revokeToken) {
    return {};
  }
  return fetchDataApproveToken(options, options.actionData.revokeToken);
};
