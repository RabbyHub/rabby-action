import {
  apiProvider,
  ETH_CHAIN_ID,
  formatProvider,
  SENDER,
  walletProvider,
} from '../../../__mocks__';
import { ParsedTransactionActionData } from '../../types';
import { parseTxData, preExecData, txData } from './mocks';
import { parseActionDeployContract } from './parseAction';
import { fetchDataDeployContract } from './fetchData';
import { formatSecurityEngineDeployContract } from './formatSecurityEngine';
import {
  parseAction,
  fetchActionRequiredData,
  formatSecurityEngineContext,
} from '../..';

/**
 * https://metamask.github.io/test-dapp/#deployButton
 * - [Deploy] button
 */
test.each([
  [
    parseActionDeployContract,
    fetchDataDeployContract,
    formatSecurityEngineDeployContract,
  ],
  [parseAction, fetchActionRequiredData, formatSecurityEngineContext],
])('DeployContract', async (_parseAction, _fetchData, _format) => {
  const actionData = _parseAction({
    type: 'transaction',
    data: parseTxData['action'],
    balanceChange: preExecData.balance_change,
    tx: txData,
    preExecVersion: preExecData.pre_exec_version,
    gasUsed: preExecData.gas.gas_used,
  }) as ParsedTransactionActionData;
  expect(actionData).toMatchSnapshot('parseActionDeployContract');

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
  expect(requireData).toMatchSnapshot('fetchDataDeployContract');

  const ctx = await _format({
    type: 'transaction',
    actionData,
    requireData,
    chainId: ETH_CHAIN_ID,
    isTestnet: false,
    provider: formatProvider,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEngineDeployContract');
});
