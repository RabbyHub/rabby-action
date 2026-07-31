import { ParseTxResponse, Tx } from '@rabby-wallet/rabby-api/dist/types';
import { ParsedActionData } from './parsedActionData';
import { OpenApiService } from '@rabby-wallet/rabby-api';
import { WalletProvider } from './walletProvider';
import {
  ActionRequireData,
  AddLiquidityRequireData,
  SwapRequireData,
  AssetOrderRequireData,
  SwapTokenOrderRequireData,
  ApproveTokenRequireData,
  ApproveNFTRequireData,
  BatchApproveTokenRequireData,
  TransferOwnerRequireData,
  ContractCallRequireData,
} from './actionRequireData';

type BaseFetchActionRequiredDataParameters<
  T extends 'typed_data' | 'transaction' | 'text' | undefined
> = {
  actionData: ParsedActionData<T>;
  sender: string;
  walletProvider: WalletProvider;
  apiProvider: OpenApiService;
  chainId: string;
  cex?: {
    id: string;
    name: string;
    logo: string;
  };
};

export type FetchTransactionRequiredDataParameters =
  BaseFetchActionRequiredDataParameters<'transaction'> & {
    type: 'transaction';
    contractCall?: ParseTxResponse['contract_call'] | null;
    tx: Tx;
  };

export type FetchTypedDataRequiredDataParameters =
  BaseFetchActionRequiredDataParameters<'typed_data'> & {
    type: 'typed_data';
  };

export type FetchTextRequiredDataParameters =
  BaseFetchActionRequiredDataParameters<'text'> & {
    type: 'text';
  };

export type FetchActionRequiredDataParameters =
  | FetchTransactionRequiredDataParameters
  | FetchTypedDataRequiredDataParameters
  | FetchTextRequiredDataParameters;

export type FetchActionRequiredData<T = undefined> = (
  options: FetchActionRequiredDataParameters,
  likeAction?: T
) => Promise<ActionRequireData>;

export type ReceiverCheckedActionKind =
  | 'swap'
  | 'wrapToken'
  | 'unWrapToken'
  | 'crossToken'
  | 'crossSwapToken';

export type OrderActionKind = 'multiSwap' | 'swapLimitPay';

export type NFTOrderActionKind = 'buyNFT' | 'sellNFT' | 'batchSellNFT';

export type ReceiverSafetyGateData = Pick<
  SwapRequireData,
  'id' | 'sender' | 'receiverInWallet'
>;

export type OrderSafetyGateData = Pick<SwapRequireData, 'id' | 'sender'>;

export type AddLiquiditySafetyGateData = Pick<
  AddLiquidityRequireData,
  'sender' | 'receiver' | 'diff'
>;

export type ContractSafetyGateData = Pick<
  AssetOrderRequireData,
  'id' | 'sender'
>;

export type SwapTokenOrderSafetyGateData = Pick<
  SwapTokenOrderRequireData,
  'id' | 'sender' | 'receiverInWallet'
>;

export type TransferOwnerSafetyGateData = {
  receiver: Pick<
    NonNullable<TransferOwnerRequireData['receiver']>,
    'onTransferWhitelist'
  > | null;
};

export type ContractCallSafetyGateData = Pick<
  ContractCallRequireData,
  'id' | 'isDanger' | 'receiverInWallet'
>;

export type ContractDisplayData = Pick<
  SwapRequireData,
  'protocol' | 'bornAt' | 'rank' | 'hasInteraction'
>;

export type AddLiquidityDisplayData = Pick<
  AddLiquidityRequireData,
  | 'id'
  | 'poolRate'
  | 'marketRate'
  | 'protocol'
  | 'bornAt'
  | 'rank'
  | 'hasInteraction'
>;

type StagedActionData<Kind extends string, SecurityData, DisplayData> = {
  kind: Kind;
  securityData: SecurityData;
  displayData: Promise<DisplayData | null>;
};

type StagedActionsByKind<Kind extends string, SecurityData, DisplayData> = {
  [K in Kind]: StagedActionData<K, SecurityData, DisplayData>;
}[Kind];

export type ReceiverCheckedStagedAction = StagedActionsByKind<
  ReceiverCheckedActionKind,
  ReceiverSafetyGateData,
  ContractDisplayData
>;

export type OrderStagedAction = StagedActionsByKind<
  OrderActionKind,
  OrderSafetyGateData,
  ContractDisplayData
>;

export type NFTOrderStagedAction = StagedActionsByKind<
  NFTOrderActionKind,
  ContractSafetyGateData,
  ContractDisplayData
>;

export type StagedActionRequiredData =
  | ReceiverCheckedStagedAction
  | OrderStagedAction
  | StagedActionData<
      'addLiquidity',
      AddLiquiditySafetyGateData,
      AddLiquidityDisplayData
    >
  | StagedActionData<'assetOrder', ContractSafetyGateData, ContractDisplayData>
  | NFTOrderStagedAction
  | StagedActionData<
      'transferOwner',
      TransferOwnerSafetyGateData,
      TransferOwnerRequireData
    >
  | StagedActionData<
      'contractCall',
      ContractCallSafetyGateData,
      ContractCallRequireData
    >
  | StagedActionData<
      'swapTokenOrder',
      SwapTokenOrderSafetyGateData,
      ContractDisplayData
    >
  | {
      kind: 'legacy';
      requiredData: ActionRequireData;
    };

export type StagedActionMaterialization =
  | { status: 'ready'; requiredData: ActionRequireData }
  | { status: 'unknown' };

export type StagedActionKind = Exclude<
  StagedActionRequiredData,
  { kind: 'legacy' }
>['kind'];

export type FetchStagedActionRequiredData = (
  options: FetchActionRequiredDataParameters
) => Promise<StagedActionRequiredData>;
