import {
  apiProvider,
  formatProvider,
  walletProvider,
  ORIGIN,
} from '../../../__mocks__';
import { parseTxData, txData } from './mocks';
import { parseActionBuyNFT } from './parseAction';
import { fetchDataBuyNFT } from './fetchData';
import { formatSecurityEngineBuyNFT } from './formatSecurityEngine';
import { parseTypedDataAction } from '../../utils/parseTypedDataAction';
import {
  parseAction,
  fetchActionRequiredData,
  formatSecurityEngineContext,
} from '../..';

/**
 * https://brain.debank.com/action-group/typed_data/60794fa3db7217cf322612886ae58159
 * address: 0xc24a6988496b4d9b3c7ce42c5f865c2f634f184c
 * chainId: linea
 * id: 6434975
 */
test.each([
  [
    parseTypedDataAction(parseActionBuyNFT),
    fetchDataBuyNFT,
    formatSecurityEngineBuyNFT,
  ],
  [parseAction, fetchActionRequiredData, formatSecurityEngineContext],
])('BuyNFT', async (_parseAction, _fetchData, _format) => {
  const actionData = _parseAction({
    type: 'typed_data',
    data: parseTxData['action'],
    typedData: txData,
    sender: '0xc24a6988496b4d9b3c7ce42c5f865c2f634f184c',
  });
  expect(actionData).toMatchSnapshot('parseActionBuyNFT');

  const requireData = await _fetchData({
    type: 'typed_data',
    actionData,
    chainId: 'linea',
    walletProvider,
    apiProvider,
    sender: '0xc24a6988496b4d9b3c7ce42c5f865c2f634f184c',
  });
  expect(requireData).toMatchSnapshot('fetchDataBuyNFT');

  const ctx = await _format({
    type: 'typed_data',
    actionData,
    requireData,
    chainId: 'linea',
    isTestnet: false,
    provider: formatProvider,
    origin: ORIGIN,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEngineBuyNFT');
});
