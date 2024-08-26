import {
  apiProvider,
  ETH_CHAIN_ID,
  formatProvider,
  ORIGIN,
  SENDER,
  walletProvider,
} from '../../../__mocks__';
import { ParsedTransactionActionData } from '../../types';
import { fetchDataSend } from './fetchData';
import { formatSecurityEngineSend } from './formatSecurityEngine';
import {
  parseTxData,
  parseTxDataTypedData,
  preExecData,
  txData,
  txDataTypedData,
} from './mocks';
import { parseActionSend } from './parseAction';
import {
  parseAction,
  fetchActionRequiredData,
  formatSecurityEngineContext,
} from '../..';
import { parseTypedDataAction } from '../../utils/parseTypedDataAction';

/**
 * https://metamask.github.io/test-dapp/#sendButton
 * Send Eth
 * - [Send Legacy Transaction] button
 */
test.each([
  [parseActionSend, fetchDataSend, formatSecurityEngineSend],
  [parseAction, fetchActionRequiredData, formatSecurityEngineContext],
])('Send -> Transaction', async (_parseAction, _fetchData, _format) => {
  const actionData = _parseAction({
    type: 'transaction',
    data: parseTxData['action'],
    balanceChange: preExecData.balance_change,
    sender: txData.from,
    preExecVersion: preExecData.pre_exec_version,
    gasUsed: preExecData.gas.gas_used,
    tx: txData,
  }) as ParsedTransactionActionData;
  expect(actionData).toMatchSnapshot('parseActionSend');

  const requireData = await _fetchData({
    type: 'transaction',
    actionData,
    contractCall: parseTxData.contract_call,
    chainId: ETH_CHAIN_ID,
    sender: SENDER,
    walletProvider,
    tx: txData,
    apiProvider,
  });

  expect(requireData).toMatchSnapshot('fetchDataSend');

  const ctx = await _format({
    type: 'transaction',
    actionData,
    requireData,
    chainId: ETH_CHAIN_ID,
    isTestnet: false,
    provider: formatProvider,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEngineSend');
});

/**
 * https://syncswap.xyz/
 * gas use USDT
 * ETH -> USDC.e
 */
test.skip.each([
  [
    parseTypedDataAction(parseActionSend),
    fetchDataSend,
    formatSecurityEngineSend,
  ],
  [parseAction, fetchActionRequiredData, formatSecurityEngineContext],
])('Send -> TypedData', async (_parseAction, _fetchData, _format) => {
  const actionData = _parseAction({
    type: 'typed_data',
    data: parseTxDataTypedData['action'],
    typedData: txDataTypedData,
    sender: SENDER,
  });
  expect(actionData).toMatchSnapshot('parseActionSend');

  const requireData = await _fetchData({
    type: 'typed_data',
    actionData,
    chainId: ETH_CHAIN_ID,
    walletProvider,
    apiProvider,
    sender: SENDER,
  });
  expect(requireData).toMatchSnapshot('fetchDataSend');

  const ctx = await _format({
    type: 'typed_data',
    actionData,
    requireData,
    chainId: ETH_CHAIN_ID,
    isTestnet: false,
    provider: formatProvider,
    origin: ORIGIN,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEngineSend');
});
