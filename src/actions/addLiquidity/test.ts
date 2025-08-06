import {
  apiProvider,
  ETH_CHAIN_ID,
  formatProvider,
  SENDER,
  walletProvider,
} from '../../../__mocks__';
import { ParsedTransactionActionData } from '../../types';
import { fetchDataAddLiquidity } from './fetchData';
import { formatSecurityEngineAddLiquidity } from './formatSecurityEngine';
import { parseTxData, preExecData, txData } from './mocks';
import { parseActionAddLiquidity } from './parseAction';
import {
  parseAction,
  fetchActionRequiredData,
  formatSecurityEngineContext,
} from '../..';

/**
 * https://basescan.org/tx/0x1b1c4087897ca02ece20f4d8db8469a4642ef02be19b8a2a49ec8fd542495e6e
 *
 */
test.each([
  [
    parseActionAddLiquidity,
    fetchDataAddLiquidity,
    formatSecurityEngineAddLiquidity,
  ],
  [parseAction, fetchActionRequiredData, formatSecurityEngineContext],
])('ApproveNFT', async (_parseAction, _fetchData, _format) => {
  const actionData = _parseAction({
    type: 'transaction',
    data: parseTxData['action'],
    balanceChange: preExecData.balance_change,
    sender: txData.from,
    preExecVersion: preExecData.pre_exec_version,
    gasUsed: preExecData.gas.gas_used,
    tx: txData,
  }) as ParsedTransactionActionData;
  expect(actionData).toMatchSnapshot('parseActionAddLiquidity');

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
  expect(requireData).toMatchSnapshot('fetchDataAddLiquidity');

  const ctx = await _format({
    type: 'transaction',
    actionData,
    requireData,
    chainId: ETH_CHAIN_ID,
    isTestnet: false,
    provider: formatProvider,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEngineAddLiquidity');
});
