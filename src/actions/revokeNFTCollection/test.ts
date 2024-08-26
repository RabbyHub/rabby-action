import {
  apiProvider,
  ETH_CHAIN_ID,
  formatProvider,
  SENDER,
  walletProvider,
} from '../../../__mocks__';
import { ParsedTransactionActionData } from '../../types';
import { fetchDataRevokeNFTCollection } from './fetchData';
import { formatSecurityEngineRevokeNFTCollection } from './formatSecurityEngine';
import { parseTxData, preExecData, txData } from './mocks';
import { parseActionRevokeNFTCollection } from './parseAction';
import {
  parseAction,
  fetchActionRequiredData,
  formatSecurityEngineContext,
} from '../..';

/**
 * Rabby Revoke NFT Collection
 */
test.each([
  [
    parseActionRevokeNFTCollection,
    fetchDataRevokeNFTCollection,
    formatSecurityEngineRevokeNFTCollection,
  ],
  [parseAction, fetchActionRequiredData, formatSecurityEngineContext],
])('RevokeNFTCollection', async (_parseAction, _fetchData, _format) => {
  const actionData = _parseAction({
    type: 'transaction',
    data: parseTxData['action'],
    balanceChange: preExecData.balance_change,
    sender: txData.from,
    preExecVersion: preExecData.pre_exec_version,
    gasUsed: preExecData.gas.gas_used,
    tx: txData,
  }) as ParsedTransactionActionData;
  expect(actionData).toMatchSnapshot('parseActionRevokeNFTCollection');

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

  expect(requireData).toMatchSnapshot('fetchDataRevokeNFTCollection');

  const ctx = await _format({
    type: 'transaction',
    actionData,
    requireData,
    chainId: ETH_CHAIN_ID,
    isTestnet: false,
    provider: formatProvider,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEngineRevokeNFTCollection');
});
