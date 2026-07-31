import { ContextActionData } from '@rabby-wallet/rabby-security-engine/dist/rules';
import { fetchStagedDataAddLiquidity } from './actions/addLiquidity/fetchData';
import { fetchStagedDataAssetOrder } from './actions/assetOrder/fetchData';
import { fetchStagedDataNFTOrder } from './actions/common/fetchData';
import { fetchStagedDataContractCall } from './actions/contractCall/fetchData';
import { fetchStagedDataSwap } from './actions/swap/fetchData';
import { formatSwapTokenOrderSecurityEngineContext } from './actions/swapTokenOrder/formatSecurityEngine';
import { fetchStagedDataSwapTokenOrder } from './actions/swapTokenOrder/fetchData';
import { fetchStagedDataTransferOwner } from './actions/transferOwner/fetchData';
import { formatSecurityEngineContext } from './formatSecurityEngineContext';
import {
  ActionRequireData,
  ApproveNFTRequireData,
  ApproveTokenRequireData,
  BatchApproveTokenRequireData,
  ContractCallRequireData,
  ContractDisplayData,
  ContractRequireData,
  FetchActionRequiredDataParameters,
  FormatSecurityEngineContextParameters,
  FormatTextSecurityEngineContextParameters,
  FormatTransactionSecurityEngineContextParameters,
  FormatTypedDataSecurityEngineContextParameters,
  NFTOrderActionKind,
  ReceiverCheckedActionKind,
  StagedActionKind,
  StagedActionMaterialization,
  StagedActionRequiredData,
  SwapRequireData,
  SwapTokenOrderRequireData,
} from './types';

type StagedAction = Exclude<StagedActionRequiredData, { kind: 'legacy' }>;
type StagedActionFor<K extends StagedActionKind> = Extract<
  StagedAction,
  { kind: K }
>;

export type StagedSecurityEngineContextParameters =
  | Omit<FormatTransactionSecurityEngineContextParameters, 'requireData'>
  | Omit<FormatTypedDataSecurityEngineContextParameters, 'requireData'>
  | Omit<FormatTextSecurityEngineContextParameters, 'requireData'>;

type StagedActionDefinition<K extends StagedActionKind> = {
  // Return null only when the action cannot use staging; security failures must reject.
  load: (
    options: FetchActionRequiredDataParameters
  ) => Promise<StagedActionFor<K> | null>;
  format: (
    options: StagedSecurityEngineContextParameters,
    stage: StagedActionFor<K>
  ) => Promise<ContextActionData>;
  materialize: (
    stage: StagedActionFor<K>
  ) => Promise<StagedActionMaterialization>;
};

const unknown = (): StagedActionMaterialization => ({ status: 'unknown' });

const ready = (
  requiredData: ActionRequireData
): StagedActionMaterialization => ({
  status: 'ready',
  requiredData,
});

const formatDefault = async (
  options: StagedSecurityEngineContextParameters,
  stage: StagedAction
) =>
  formatSecurityEngineContext({
    ...options,
    requireData: stage.securityData,
  } as FormatSecurityEngineContextParameters);

const formatSwapTokenOrder = async (
  options: StagedSecurityEngineContextParameters,
  stage: StagedActionFor<'swapTokenOrder'>
) => {
  if (options.type !== 'typed_data' || options.isTestnet) {
    return {};
  }

  return formatSwapTokenOrderSecurityEngineContext(
    options.actionData,
    options.chainId,
    stage.securityData.receiverInWallet
  );
};

const materializeContract = ({
  id,
  sender,
  displayData,
}: {
  id: string;
  sender: string;
  displayData: ContractDisplayData;
}): ContractRequireData & { sender: string } => ({
  id,
  sender,
  protocol: displayData.protocol,
  bornAt: displayData.bornAt,
  rank: displayData.rank,
  unexpectedAddr: null,
  receiverInWallet: false,
  hasInteraction: displayData.hasInteraction,
});

const materializeSwap = async (
  stage: StagedActionFor<ReceiverCheckedActionKind>
) => {
  const displayData = await stage.displayData;
  if (!displayData) return unknown();
  const requiredData: SwapRequireData = {
    id: stage.securityData.id,
    sender: stage.securityData.sender,
    receiverInWallet: stage.securityData.receiverInWallet,
    protocol: displayData.protocol,
    bornAt: displayData.bornAt,
    rank: displayData.rank,
    hasInteraction: displayData.hasInteraction,
  };
  return ready(requiredData);
};

const materializeContractOrder = async (
  stage: StagedActionFor<'assetOrder' | 'buyNFT' | 'sellNFT' | 'batchSellNFT'>
) => {
  const displayData = await stage.displayData;
  if (!displayData) return unknown();
  return ready(
    materializeContract({
      id: stage.securityData.id,
      sender: stage.securityData.sender,
      displayData,
    })
  );
};

const materializeSwapTokenOrder = async (
  stage: StagedActionFor<'swapTokenOrder'>
) => {
  const displayData = await stage.displayData;
  if (!displayData) return unknown();
  const requiredData: SwapTokenOrderRequireData = {
    ...materializeContract({
      id: stage.securityData.id,
      sender: stage.securityData.sender,
      displayData,
    }),
    // This value belongs to the contract address in legacy required data;
    // the staged value describes the order receiver for the security engine.
    receiverInWallet: false,
  };
  return ready(requiredData);
};

const materializeTransferOwner = async (
  stage: StagedActionFor<'transferOwner'>
) => {
  const displayData = await stage.displayData;
  return displayData ? ready(displayData) : unknown();
};

const materializeContractCall = async (
  stage: StagedActionFor<'contractCall'>
) => {
  const displayData = await stage.displayData;
  if (!displayData) return unknown();
  const requiredData: ContractCallRequireData = {
    ...displayData,
    id: stage.securityData.id,
    isDanger: stage.securityData.isDanger,
    receiverInWallet: stage.securityData.receiverInWallet,
  };
  return ready(requiredData);
};

const unsupportedMaterialization = async () => unknown();

const receiverCheckedSwap = <K extends ReceiverCheckedActionKind>(
  kind: K
): StagedActionDefinition<K> => ({
  load: (options) =>
    fetchStagedDataSwap(
      options,
      kind,
      (options.actionData as Record<string, { receiver: string } | undefined>)[
        kind
      ]
    ),
  format: formatDefault,
  materialize: materializeSwap,
});

const orderSwap = <K extends 'multiSwap' | 'swapLimitPay'>(
  kind: K
): StagedActionDefinition<K> => ({
  load: (options) =>
    fetchStagedDataSwap(
      options,
      kind,
      (options.actionData as Record<string, { receiver: string } | undefined>)[
        kind
      ]
    ),
  format: formatDefault,
  materialize: unsupportedMaterialization,
});

const nftOrder = <K extends NFTOrderActionKind>(
  kind: K
): StagedActionDefinition<K> => ({
  load: (options) => fetchStagedDataNFTOrder(options, kind),
  format: formatDefault,
  materialize: materializeContractOrder,
});

// Add an action here only after its gate, formatter, and exact legacy mapping
// have been audited. Actions not registered here stay on the full legacy path.
const stagedActionRegistry: {
  [K in StagedActionKind]: StagedActionDefinition<K>;
} = {
  swap: receiverCheckedSwap('swap'),
  wrapToken: receiverCheckedSwap('wrapToken'),
  unWrapToken: receiverCheckedSwap('unWrapToken'),
  crossToken: receiverCheckedSwap('crossToken'),
  crossSwapToken: receiverCheckedSwap('crossSwapToken'),
  multiSwap: orderSwap('multiSwap'),
  swapLimitPay: orderSwap('swapLimitPay'),
  addLiquidity: {
    load: (options) => fetchStagedDataAddLiquidity(options),
    format: formatDefault,
    materialize: unsupportedMaterialization,
  },
  assetOrder: {
    load: (options) => fetchStagedDataAssetOrder(options),
    format: formatDefault,
    materialize: materializeContractOrder,
  },
  buyNFT: nftOrder('buyNFT'),
  sellNFT: nftOrder('sellNFT'),
  batchSellNFT: nftOrder('batchSellNFT'),
  swapTokenOrder: {
    load: (options) => fetchStagedDataSwapTokenOrder(options),
    format: formatSwapTokenOrder,
    materialize: materializeSwapTokenOrder,
  },
  transferOwner: {
    load: (options) => fetchStagedDataTransferOwner(options),
    format: formatDefault,
    materialize: materializeTransferOwner,
  },
  contractCall: {
    load: (options) => fetchStagedDataContractCall(options),
    format: formatDefault,
    materialize: materializeContractCall,
  },
};

export const stagedActionKinds = Object.keys(
  stagedActionRegistry
) as StagedActionKind[];

export const isStagedActionKind = (kind: string): kind is StagedActionKind =>
  Object.prototype.hasOwnProperty.call(stagedActionRegistry, kind);

export const loadStagedAction = <K extends StagedActionKind>(
  kind: K,
  options: FetchActionRequiredDataParameters
) => stagedActionRegistry[kind].load(options);

export const formatStagedActionSecurityContext = <K extends StagedActionKind>(
  options: StagedSecurityEngineContextParameters,
  stage: StagedActionFor<K>
) => stagedActionRegistry[stage.kind].format(options, stage);

export const materializeStagedAction = <K extends StagedActionKind>(
  stage: StagedActionFor<K>
) => stagedActionRegistry[stage.kind].materialize(stage);
