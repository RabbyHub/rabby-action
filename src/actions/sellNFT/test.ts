import {
  apiProvider,
  formatProvider,
  walletProvider,
  SENDER,
  ETH_CHAIN_ID,
  ORIGIN,
} from '../../../__mocks__';
import { parseTxData, txData } from './mocks';
import { parseActionSellNFT } from './parseAction';
import { fetchDataSellNFT } from './fetchData';
import { formatSecurityEngineSellNFT } from './formatSecurityEngine';
import { parseTypedDataAction } from '../../utils/parseTypedDataAction';
import {
  parseAction,
  fetchActionRequiredData,
  formatSecurityEngineContext,
} from '../..';

/**
/**
 * https://brain.debank.com/action-group/typed_data/a42fd2da1ff833684ed76cd90d71ee96
 * - contract_id: 0xeaf5453b329eb38be159a872a6ce91c9a8fb0260
 * id: 6635428
 */
test.each([
  [
    parseTypedDataAction(parseActionSellNFT),
    fetchDataSellNFT,
    formatSecurityEngineSellNFT,
  ],
  [parseAction, fetchActionRequiredData, formatSecurityEngineContext],
])('SellNFT', async (_parseAction, _fetchData, _format) => {
  const actionData = _parseAction({
    type: 'typed_data',
    data: parseTxData['action'],
    typedData: txData,
    sender: SENDER,
  });
  expect(actionData).toMatchSnapshot('parseActionSellNFT');

  const requireData = await _fetchData({
    type: 'typed_data',
    actionData,
    chainId: ETH_CHAIN_ID,
    walletProvider,
    apiProvider,
    sender: SENDER,
  });
  expect(requireData).toMatchSnapshot('fetchDataSellNFT');

  const ctx = await _format({
    type: 'typed_data',
    actionData,
    requireData,
    chainId: ETH_CHAIN_ID,
    isTestnet: false,
    provider: formatProvider,
    origin: ORIGIN,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEngineSellNFT');
});
