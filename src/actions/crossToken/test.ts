import {
  apiProvider,
  ETH_CHAIN_ID,
  formatProvider,
  SENDER,
  walletProvider,
} from '../../../__mocks__';
import { ParsedTransactionActionData } from '../../types';
import { parseTxData, preExecData, txData } from './mocks';
import { parseActionCrossToken } from './parseAction';
import { fetchDataCrossToken } from './fetchData';
import { formatSecurityEngineCrossToken } from './formatSecurityEngine';
import {
  parseAction,
  fetchActionRequiredData,
  formatSecurityEngineContext,
} from '../..';

/**
 * https://brain.debank.com/action-group/tx/0x1fd8010c
 * id: 88112394
 * contract_id: 0x1231deb6f5749ef6ce6943a275a1d3e7486f4eae
 * chain_id: mode
 */
test.each([
  [parseActionCrossToken, fetchDataCrossToken, formatSecurityEngineCrossToken],
  [parseAction, fetchActionRequiredData, formatSecurityEngineContext],
])('CrossToken', async (_parseAction, _fetchData, _format) => {
  const actionData = _parseAction({
    type: 'transaction',
    data: parseTxData['action'],
    balanceChange: preExecData.balance_change,
    tx: txData,
    preExecVersion: preExecData.pre_exec_version,
    gasUsed: preExecData.gas.gas_used,
  }) as ParsedTransactionActionData;
  expect(actionData).toMatchSnapshot('parseActionCrossToken');

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
  expect(requireData).toMatchSnapshot('fetchDataCrossToken');

  const ctx = await _format({
    type: 'transaction',
    actionData,
    requireData,
    chainId: ETH_CHAIN_ID,
    isTestnet: false,
    provider: formatProvider,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEngineCrossToken');
});
