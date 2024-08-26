import {
  apiProvider,
  ETH_CHAIN_ID,
  formatProvider,
  SENDER,
  walletProvider,
} from '../../../__mocks__';
import { ParsedTransactionActionData } from '../../types';
import { parseTxData, preExecData, txData } from './mocks';
import { parseActionPushMultiSig } from './parseAction';
import { fetchDataPushMultiSig } from './fetchData';
import { formatSecurityEnginePushMultiSig } from './formatSecurityEngine';
import {
  parseAction,
  fetchActionRequiredData,
  formatSecurityEngineContext,
} from '../..';

/**
 * https://app.safe.global/transactions/tx?safe=bnb:0x20823BB02947C741A5cc2F1CcFd8293C4a8d08B3&id=multisig_0x20823BB02947C741A5cc2F1CcFd8293C4a8d08B3_0x9c9f9b76620673a0d952c5c8d4fb5ca002f29e06f57922d85c5dbe4298302f71
 */
test.each([
  [
    parseActionPushMultiSig,
    fetchDataPushMultiSig,
    formatSecurityEnginePushMultiSig,
  ],
  [parseAction, fetchActionRequiredData, formatSecurityEngineContext],
])('PushMultiSig', async (_parseAction, _fetchData, _format) => {
  const actionData = _parseAction({
    type: 'transaction',
    data: parseTxData['action'],
    balanceChange: preExecData.balance_change,
    tx: txData,
    preExecVersion: preExecData.pre_exec_version,
    gasUsed: preExecData.gas.gas_used,
  }) as ParsedTransactionActionData;
  expect(actionData).toMatchSnapshot('parseActionPushMultiSig');

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
  expect(requireData).toMatchSnapshot('fetchDataPushMultiSig');

  const ctx = await _format({
    type: 'transaction',
    actionData,
    requireData,
    chainId: ETH_CHAIN_ID,
    isTestnet: false,
    provider: formatProvider,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEnginePushMultiSig');
});
