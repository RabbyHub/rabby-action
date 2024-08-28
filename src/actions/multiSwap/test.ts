import {
  apiProvider,
  ETH_CHAIN_ID,
  formatProvider,
  SENDER,
  walletProvider,
} from '../../../__mocks__';
import { ParsedTransactionActionData } from '../../types';
import { parseTxData, preExecData, txData } from './mocks';
import { parseActionMultiSwap } from './parseAction';
import { fetchDataMultiSwap } from './fetchData';
import { formatSecurityEngineMultiSwap } from './formatSecurityEngine';
import {
  parseAction,
  fetchActionRequiredData,
  formatSecurityEngineContext,
} from '../..';

/**
 * https://app.odos.xyz/
 * multi from token
 */
test.each([
  [parseActionMultiSwap, fetchDataMultiSwap, formatSecurityEngineMultiSwap],
  [parseAction, fetchActionRequiredData, formatSecurityEngineContext],
])('MultiSwap', async (_parseAction, _fetchData, _format) => {
  const actionData = _parseAction({
    type: 'transaction',
    data: parseTxData['action'],
    balanceChange: preExecData.balance_change,
    sender: txData.from,
    preExecVersion: preExecData.pre_exec_version,
    gasUsed: preExecData.gas.gas_used,
    tx: txData,
  }) as ParsedTransactionActionData;
  expect(actionData).toMatchSnapshot('parseActionMultiSwap');

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
  expect(requireData).toMatchSnapshot('fetchDataMultiSwap');

  const ctx = await _format({
    type: 'transaction',
    actionData,
    requireData,
    chainId: ETH_CHAIN_ID,
    isTestnet: false,
    provider: formatProvider,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEngineMultiSwap');
});
