import {
  apiProvider,
  formatProvider,
  walletProvider,
  ETH_CHAIN_ID,
  ORIGIN,
} from '../../../__mocks__';
import { parseTxData, txData } from './mocks';
import { parseActionBatchSellNFT } from './parseAction';
import { fetchDataBatchSellNFT } from './fetchData';
import { formatSecurityEngineBatchSellNFT } from './formatSecurityEngine';
import { parseTypedDataAction } from '../../utils/parseTypedDataAction';
import {
  parseAction,
  fetchActionRequiredData,
  formatSecurityEngineContext,
} from '../..';

/**
 * https://test-dapp-lyart.vercel.app/security
 * address: 0xcb1605ed17f6145db16e26e1d8adfe8f4b175377
 * chainId: eth
 * button: [Batch Sell NFT]
 */
test.each([
  [
    parseTypedDataAction(parseActionBatchSellNFT),
    fetchDataBatchSellNFT,
    formatSecurityEngineBatchSellNFT,
  ],
  [parseAction, fetchActionRequiredData, formatSecurityEngineContext],
])('BatchSellNFT', async (_parseAction, _fetchData, _format) => {
  const actionData = _parseAction({
    type: 'typed_data',
    data: parseTxData['action'],
    typedData: txData,
    sender: '0xcb1605ed17f6145db16e26e1d8adfe8f4b175377',
  });
  expect(actionData).toMatchSnapshot('parseActionBatchSellNFT');

  const requireData = await _fetchData({
    type: 'typed_data',
    actionData,
    chainId: ETH_CHAIN_ID,
    walletProvider,
    apiProvider,
    sender: '0xcb1605ed17f6145db16e26e1d8adfe8f4b175377',
  });
  expect(requireData).toMatchSnapshot('fetchDataBatchSellNFT');

  const ctx = await _format({
    type: 'typed_data',
    actionData,
    requireData,
    chainId: ETH_CHAIN_ID,
    isTestnet: false,
    provider: formatProvider,
    origin: ORIGIN,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEngineBatchSellNFT');
});
