import {
  apiProvider,
  ETH_CHAIN_ID,
  formatProvider,
  SENDER,
  walletProvider,
} from '../../../__mocks__';
import { ParsedTransactionActionData } from '../../types';
import { parseTxData, preExecData, txData } from './mocks';
import { parseActionWrapToken } from './parseAction';
import { fetchDataWrapToken } from './fetchData';
import { formatSecurityEngineWrapToken } from './formatSecurityEngine';
import {
  parseAction,
  fetchActionRequiredData,
  formatSecurityEngineContext,
} from '../..';

/**
 * Rabby Swap
 * MATIC -> WMATIC
 */
test.each([
  [parseActionWrapToken, fetchDataWrapToken, formatSecurityEngineWrapToken],
  [parseAction, fetchActionRequiredData, formatSecurityEngineContext],
])('WrapToken', async (_parseAction, _fetchData, _format) => {
  const actionData = _parseAction({
    type: 'transaction',
    data: parseTxData['action'],
    balanceChange: preExecData.balance_change,
    tx: txData,
    preExecVersion: preExecData.pre_exec_version,
    gasUsed: preExecData.gas.gas_used,
  }) as ParsedTransactionActionData;
  expect(actionData).toMatchSnapshot('parseActionWrapToken');

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
  expect(requireData).toMatchSnapshot('fetchDataWrapToken');

  const ctx = await _format({
    type: 'transaction',
    actionData,
    requireData,
    chainId: ETH_CHAIN_ID,
    isTestnet: false,
    provider: formatProvider,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEngineWrapToken');
});
