import { ContextActionData } from '@rabby-wallet/rabby-security-engine/dist/rules';
import { ActionRequireData } from './actionRequireData';
import { ParsedActionData } from './parsedActionData';

type BaseFormatSecurityEngineContextParameters = {
  isTestnet: boolean;
  chainId: string;
  requireData: ActionRequireData;
  provider: {
    getTimeSpan: (time: number) => {
      d: number;
      h: number;
      m: number;
      s: number;
    };
    hasAddress: (address: string) => Promise<boolean>;
  };
};

export type FormatTransactionSecurityEngineContextParameters =
  BaseFormatSecurityEngineContextParameters & {
    type: 'transaction';
    actionData: ParsedActionData<'transaction'>;
  };

export type FormatTypedDataSecurityEngineContextParameters =
  BaseFormatSecurityEngineContextParameters & {
    type: 'typed_data';
    actionData: ParsedActionData<'typed_data'>;
    origin: string;
  };

export type FormatTextSecurityEngineContextParameters =
  BaseFormatSecurityEngineContextParameters & {
    type: 'text';
    actionData: ParsedActionData<'text'>;
    origin: string;
  };

export type FormatSecurityEngineContextParameters =
  | FormatTransactionSecurityEngineContextParameters
  | FormatTypedDataSecurityEngineContextParameters
  | FormatTextSecurityEngineContextParameters;

export type FormatSecurityEngineContext = (
  options: FormatSecurityEngineContextParameters
) => Promise<ContextActionData>;
