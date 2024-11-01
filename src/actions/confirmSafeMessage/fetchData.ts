import { FetchActionRequiredData, MultiSigRequireData } from '../../types';

export const fetchDataConfirmSafeMessage: FetchActionRequiredData = async (
  options
) => {
  if (options.type !== 'typed_data') {
    return {};
  }
  const { actionData, apiProvider } = options;
  if (!actionData.confirmSafeMessage) {
    return {};
  }

  const result: MultiSigRequireData = {
    contract: null,
    id: actionData.confirmSafeMessage.multisig_id,
  };
  const { desc } = await apiProvider.addrDesc(
    actionData.confirmSafeMessage.multisig_id
  );
  if (desc.contract) {
    result.contract = desc.contract;
  }
  return result;
};
