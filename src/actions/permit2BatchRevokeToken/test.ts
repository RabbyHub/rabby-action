import {
  apiProvider,
  ETH_CHAIN_ID,
  formatProvider,
  SENDER,
  walletProvider,
} from '../../../__mocks__';
import { ParsedTransactionActionData } from '../../types';
import { parseTxData, preExecData, txData } from './mocks';
import { parseActionPermit2BatchRevokeToken } from './parseAction';
import { fetchDataPermit2BatchRevokeToken } from './fetchData';
import { formatSecurityEnginePermit2BatchRevokeToken } from './formatSecurityEngine';
import {
  parseAction,
  fetchActionRequiredData,
  formatSecurityEngineContext,
} from '../..';

/**
 * Rabby Batch Revoke Permit2
 * - OP Chain permit2
 */
test.each([
  [
    parseActionPermit2BatchRevokeToken,
    fetchDataPermit2BatchRevokeToken,
    formatSecurityEnginePermit2BatchRevokeToken,
  ],
  [parseAction, fetchActionRequiredData, formatSecurityEngineContext],
])('Permit2BatchRevokeToken', async (_parseAction, _fetchData, _format) => {
  const actionData = _parseAction({
    type: 'transaction',
    data: parseTxData['action'],
    balanceChange: preExecData.balance_change,
    tx: txData,
    preExecVersion: preExecData.pre_exec_version,
    gasUsed: preExecData.gas.gas_used,
  }) as ParsedTransactionActionData;
  expect(actionData).toMatchSnapshot('parseActionPermit2BatchRevokeToken');

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
  expect(requireData).toMatchSnapshot('fetchDataPermit2BatchRevokeToken');

  const ctx = await _format({
    type: 'transaction',
    actionData,
    requireData,
    chainId: ETH_CHAIN_ID,
    isTestnet: false,
    provider: formatProvider,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEnginePermit2BatchRevokeToken');
});
