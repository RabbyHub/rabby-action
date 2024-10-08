import { FetchActionRequiredData } from '../../types';
import { fetchDataApproveNFT } from '../approveNFT/fetchData';

export const fetchDataApproveNFTCollection: FetchActionRequiredData = async (
  options
) => {
  if (!options.actionData.approveNFTCollection) {
    return {};
  }

  return fetchDataApproveNFT(options, options.actionData.approveNFTCollection);
};
