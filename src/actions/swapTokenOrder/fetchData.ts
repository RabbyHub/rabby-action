import {
  FetchActionRequiredData,
  FetchActionRequiredDataParameters,
  StagedActionRequiredData,
  SwapTokenOrderSafetyGateData,
} from '../../types';
import {
  fetchDataCommon,
  fetchStagedCommonDisplayData,
} from '../common/fetchData';

export const fetchStagedDataSwapTokenOrder = async (
  options: FetchActionRequiredDataParameters
): Promise<Extract<
  StagedActionRequiredData,
  { kind: 'swapTokenOrder' }
> | null> => {
  if (
    options.type !== 'typed_data' ||
    !options.actionData.contractId ||
    !options.actionData.swapTokenOrder?.receiver
  ) {
    return null;
  }

  const displayData = fetchStagedCommonDisplayData(
    options.apiProvider,
    options.sender,
    options.chainId,
    options.actionData.contractId
  );
  const receiverInWallet = await options.walletProvider.hasAddress(
    options.actionData.swapTokenOrder.receiver
  );
  const securityData: SwapTokenOrderSafetyGateData = {
    id: options.actionData.contractId,
    sender: options.sender,
    receiverInWallet,
  };
  return {
    kind: 'swapTokenOrder',
    securityData,
    displayData,
  };
};

export const fetchDataSwapTokenOrder: FetchActionRequiredData = async (
  options
) => {
  if (options.type !== 'typed_data') {
    return {};
  }
  if (!options.actionData.contractId || !options.actionData.swapTokenOrder) {
    return {};
  }

  return fetchDataCommon(options, {
    receiver: options.actionData.contractId,
  });
};
