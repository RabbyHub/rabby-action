import {
  apiProvider,
  ETH_CHAIN_ID,
  formatProvider,
  SENDER,
  walletProvider,
} from '../../../__mocks__';
import { ParsedTransactionActionData } from '../../types';
import { fetchDataApproveNFT } from './fetchData';
import { formatSecurityEngineApproveNFT } from './formatSecurityEngine';
import { parseTxData, preExecData, txData } from './mocks';
import { parseActionApproveNFT } from './parseAction';
import {
  parseAction,
  fetchActionRequiredData,
  formatSecurityEngineContext,
} from '../..';

/**
 * https://etherscan.io/address/0x75d639e5e52b4ea5426f2fb46959b9c3099b729a#writeContract#F2
 * - approve('0x7a250d5630b4cf539739df2c5dacb4c659f2488d', 745)
 */
test.each([
  [parseActionApproveNFT, fetchDataApproveNFT, formatSecurityEngineApproveNFT],
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
  expect(actionData).toMatchSnapshot('parseActionApproveNFT');

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
  expect(requireData).toMatchSnapshot('fetchDataApproveNFT');

  const ctx = await _format({
    type: 'transaction',
    actionData,
    requireData,
    chainId: ETH_CHAIN_ID,
    isTestnet: false,
    provider: formatProvider,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEngineApproveNFT');
});
