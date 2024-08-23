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

/**
 * https://extension-tests.revoke.cash/
 * Common - Type Data
 * first button
 */
test('ContractCall -> TypedData', async () => {
  const actionData = parseTypedDataAction(parseActionContractCall)({
    type: 'typed_data',
    data: parseTxDataTypedData['action'],
    typedData: txDataTypedData,
    sender: SENDER,
  });
  expect(actionData).toMatchSnapshot('parseActionContractCall');

  const requireData = await fetchDataContractCall({
    type: 'typed_data',
    actionData,
    chainId: ETH_CHAIN_ID,
    walletProvider,
    apiProvider,
    sender: SENDER,
  });
  expect(requireData).toMatchSnapshot('fetchDataContractCall');

  const ctx = await formatSecurityEngineContractCall({
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
test('ContractCall -> Transaction', async () => {
  const actionData = parseActionContractCall({
    type: 'transaction',
    data: parseTxDataTransaction['action'],
    balanceChange: preExecDataTransaction.balance_change,
    tx: txDataTransaction,
    preExecVersion: preExecDataTransaction.pre_exec_version,
    gasUsed: preExecDataTransaction.gas.gas_used,
  }) as ParsedTransactionActionData;
  expect(actionData).toMatchSnapshot('parseActionContractCall');

  const requireData = await fetchDataContractCall({
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

  const ctx = await formatSecurityEngineContractCall({
    type: 'transaction',
    actionData,
    requireData,
    chainId: ETH_CHAIN_ID,
    isTestnet: false,
    provider: formatProvider,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEngineContractCall');
});
