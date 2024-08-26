import {
  apiProvider,
  ETH_CHAIN_ID,
  formatProvider,
  SENDER,
  walletProvider,
} from '../../../__mocks__';
import { ParsedTransactionActionData } from '../../types';
import { fetchDataSend } from './fetchData';
import { formatSecurityEngineSend } from './formatSecurityEngine';
import { parseTxData, preExecData, txData } from './mocks';
import { parseActionSend } from './parseAction';
import {
  parseAction,
  fetchActionRequiredData,
  formatSecurityEngineContext,
} from '../..';

/**
 * https://metamask.github.io/test-dapp/#sendButton
 * Send Eth
 * - [Send Legacy Transaction] button
 */
test.each([
  [parseActionSend, fetchDataSend, formatSecurityEngineSend],
  [parseAction, fetchActionRequiredData, formatSecurityEngineContext],
])('Send', async (_parseAction, _fetchData, _format) => {
  const actionData = _parseAction({
    type: 'transaction',
    data: parseTxData['action'],
    balanceChange: preExecData.balance_change,
    tx: txData,
    preExecVersion: preExecData.pre_exec_version,
    gasUsed: preExecData.gas.gas_used,
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
