import {
  apiProvider,
  formatProvider,
  walletProvider,
  SENDER,
  ETH_CHAIN_ID,
  ORIGIN,
} from '../../../__mocks__';
import {
  preExecDataTransaction,
  parseTxDataTransaction,
  txDataTransaction,
  parseTxDataTypedData,
  txDataTypedData,
} from './mocks';
import { parseActionContractCall } from './parseAction';
import { fetchDataContractCall } from './fetchData';
import { formatSecurityEngineContractCall } from './formatSecurityEngine';
import { parseTypedDataAction } from '../../utils/parseTypedDataAction';
import { ParsedTransactionActionData } from '../../types';
import {
  parseAction,
  fetchActionRequiredData,
  formatSecurityEngineContext,
} from '../..';

/**
 * https://extension-tests.revoke.cash/
 * Common - Type Data
 * first button
 */
test.each([
  [
    parseTypedDataAction(parseActionContractCall),
    fetchDataContractCall,
    formatSecurityEngineContractCall,
  ],
  [parseAction, fetchActionRequiredData, formatSecurityEngineContext],
])('ContractCall -> TypedData', async (_parseAction, _fetchData, _format) => {
  const actionData = _parseAction({
    type: 'typed_data',
    data: parseTxDataTypedData['action'],
    typedData: txDataTypedData,
    sender: SENDER,
  });
  expect(actionData).toMatchSnapshot('parseActionContractCall');

  const requireData = await _fetchData({
    type: 'typed_data',
    actionData,
    chainId: ETH_CHAIN_ID,
    walletProvider,
    apiProvider,
    sender: SENDER,
  });
  expect(requireData).toMatchSnapshot('fetchDataContractCall');

  const ctx = await _format({
    type: 'typed_data',
    actionData,
    requireData,
    chainId: ETH_CHAIN_ID,
    isTestnet: false,
    provider: formatProvider,
    origin: ORIGIN,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEngineContractCall');
});

/**
 * https://extension-tests.revoke.cash/
 * Cross Chain Swap
 * [USD Value] button
 */
test.each([
  [
    parseActionContractCall,
    fetchDataContractCall,
    formatSecurityEngineContractCall,
  ],
  [parseAction, fetchActionRequiredData, formatSecurityEngineContext],
])('ContractCall -> Transaction', async (_parseAction, _fetchData, _format) => {
  const actionData = _parseAction({
    type: 'transaction',
    data: parseTxDataTransaction['action'],
    balanceChange: preExecDataTransaction.balance_change,
    sender: txDataTransaction.from,
    preExecVersion: preExecDataTransaction.pre_exec_version,
    gasUsed: preExecDataTransaction.gas.gas_used,
    tx: txDataTransaction,
  }) as ParsedTransactionActionData;
  expect(actionData).toMatchSnapshot('parseActionContractCall');

  const requireData = await _fetchData({
    type: 'transaction',
    actionData,
    contractCall: parseTxDataTransaction.contract_call,
    chainId: ETH_CHAIN_ID,
    sender: SENDER,
    walletProvider,
    tx: txDataTransaction,
    apiProvider,
  });
  expect(requireData).toMatchSnapshot('fetchDataContractCall');

  const ctx = await _format({
    type: 'transaction',
    actionData,
    requireData,
    chainId: ETH_CHAIN_ID,
    isTestnet: false,
    provider: formatProvider,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEngineContractCall');
});
