import { ParseTxResponse, Tx } from '@rabby-wallet/rabby-api/dist/types';
import { ParsedActionData } from './parsedActionData';
import { OpenApiService } from '@rabby-wallet/rabby-api';
import { WalletProvider } from './walletProvider';
import { ActionRequireData } from './actionRequireData';

export type ExtraActionRequiredDataState = {
  setHasInteraction?: (v: boolean) => void;
};

type BaseFetchActionRequiredDataParameters<
  T extends 'typed_data' | 'transaction' | 'text' | undefined
> = {
  actionData: ParsedActionData<T>;
  sender: string;
  walletProvider: WalletProvider;
  apiProvider: OpenApiService;
  chainId: string;
  extraActionDataState?: ExtraActionRequiredDataState;
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
