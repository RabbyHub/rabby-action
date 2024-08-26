import {
  apiProvider,
  ETH_CHAIN_ID,
  formatProvider,
  SENDER,
  walletProvider,
} from '../../../__mocks__';
import { ParsedTransactionActionData } from '../../types';
import { parseTxData, preExecData, txData } from './mocks';
import { parseActionUnwrapToken } from './parseAction';
import { fetchDataUnwrapToken } from './fetchData';
import { formatSecurityEngineUnwrapToken } from './formatSecurityEngine';
import {
  parseAction,
  fetchActionRequiredData,
  formatSecurityEngineContext,
} from '../..';

/**
 * Rabby Swap
 * WMATIC -> MATIC
 */
test.each([
  [
    parseActionUnwrapToken,
    fetchDataUnwrapToken,
    formatSecurityEngineUnwrapToken,
  ],
  [parseAction, fetchActionRequiredData, formatSecurityEngineContext],
])('UnwrapToken', async (_parseAction, _fetchData, _format) => {
  const actionData = _parseAction({
    type: 'transaction',
    data: parseTxData['action'],
    balanceChange: preExecData.balance_change,
    tx: txData,
    preExecVersion: preExecData.pre_exec_version,
    gasUsed: preExecData.gas.gas_used,
  }) as ParsedTransactionActionData;
  expect(actionData).toMatchSnapshot('parseActionUnwrapToken');

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
  expect(requireData).toMatchSnapshot('fetchDataUnwrapToken');

  const ctx = await _format({
    type: 'transaction',
    actionData,
    requireData,
    chainId: ETH_CHAIN_ID,
    isTestnet: false,
    provider: formatProvider,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEngineUnwrapToken');
});
