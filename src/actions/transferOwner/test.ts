import {
  apiProvider,
  ETH_CHAIN_ID,
  formatProvider,
  ORIGIN,
  SENDER,
  walletProvider,
} from '../../../__mocks__';
import { fetchDataTransferOwner } from './fetchData';
import { formatSecurityEngineTransferOwner } from './formatSecurityEngine';
import { parseTxData, txData } from './mocks';
import { parseActionTransferOwner } from './parseAction';
import {
  parseAction,
  fetchActionRequiredData,
  formatSecurityEngineContext,
} from '../..';

/**
 * https://brain.debank.com/action-group/tx/0x13af4035
 * id: 83085816
 * chainId: eth
 * contract_id: 0x2129f8a9b6c3092a600da82ce859b7a9a69983e4
 */
test.each([
  [
    parseActionTransferOwner,
    fetchDataTransferOwner,
    formatSecurityEngineTransferOwner,
  ],
  [parseAction, fetchActionRequiredData, formatSecurityEngineContext],
])('TransferOwner', async (_parseAction, _fetchData, _format) => {
  const actionData = _parseAction({
    type: 'typed_data',
    data: parseTxData['action'],
    typedData: txData,
    sender: SENDER,
  });
  expect(actionData).toMatchSnapshot('parseActionTransferOwner');

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

  expect(requireData).toMatchSnapshot('fetchDataTransferOwner');

  const ctx = await _format({
    type: 'transaction',
    actionData,
    requireData,
    chainId: ETH_CHAIN_ID,
    isTestnet: false,
    provider: formatProvider,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEngineTransferOwner');
});
