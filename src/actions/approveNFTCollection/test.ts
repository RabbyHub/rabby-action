import {
  apiProvider,
  ETH_CHAIN_ID,
  formatProvider,
  SENDER,
  walletProvider,
} from '../../../__mocks__';
import { ParsedTransactionActionData } from '../../types';
import { parseTxData, preExecData, txData } from './mocks';
import { parseActionApproveNFTCollection } from './parseAction';
import { fetchDataApproveNFTCollection } from './fetchData';
import { formatSecurityEngineApproveNFTCollection } from './formatSecurityEngine';
import {
  parseAction,
  fetchActionRequiredData,
  formatSecurityEngineContext,
} from '../..';

/**
 *https://etherscan.io/address/0x75d639e5e52b4ea5426f2fb46959b9c3099b729a#writeContract#F11
 * - setApprovalForAll('0x7a250d5630b4cf539739df2c5dacb4c659f2488d', true)
 */
test.each([
  [
    parseActionApproveNFTCollection,
    fetchDataApproveNFTCollection,
    formatSecurityEngineApproveNFTCollection,
  ],
  [parseAction, fetchActionRequiredData, formatSecurityEngineContext],
])('ApproveNFTCollection', async (_parseAction, _fetchData, _format) => {
  const actionData = _parseAction({
    type: 'transaction',
    data: parseTxData['action'],
    balanceChange: preExecData.balance_change,
    tx: txData,
    preExecVersion: preExecData.pre_exec_version,
    gasUsed: preExecData.gas.gas_used,
  }) as ParsedTransactionActionData;
  expect(actionData).toMatchSnapshot('parseActionApproveNFTCollection');

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
  expect(requireData).toMatchSnapshot('fetchDataApproveNFTCollection');

  const ctx = await _format({
    type: 'transaction',
    actionData,
    requireData,
    chainId: ETH_CHAIN_ID,
    isTestnet: false,
    provider: formatProvider,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEngineApproveNFTCollection');
});
