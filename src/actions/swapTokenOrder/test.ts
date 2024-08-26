import {
  apiProvider,
  formatProvider,
  walletProvider,
  SENDER,
  ETH_CHAIN_ID,
  ORIGIN,
} from '../../../__mocks__';
import { parseTxData, txData } from './mocks';
import { parseActionSwapTokenOrder } from './parseAction';
import { fetchDataSwapTokenOrder } from './fetchData';
import { formatSecurityEngineSwapTokenOrder } from './formatSecurityEngine';
import { parseTypedDataAction } from '../../utils/parseTypedDataAction';
import {
  parseAction,
  fetchActionRequiredData,
  formatSecurityEngineContext,
} from '../..';

/**
/**
 * https://bebop.xyz/trade?network=arbitrum+one&sell=ARB&buy=USDC.e
 * ARB -> USDC.e
 */
test.each([
  [
    parseTypedDataAction(parseActionSwapTokenOrder),
    fetchDataSwapTokenOrder,
    formatSecurityEngineSwapTokenOrder,
  ],
  [parseAction, fetchActionRequiredData, formatSecurityEngineContext],
])('SwapTokenOrder', async (_parseAction, _fetchData, _format) => {
  const actionData = _parseAction({
    type: 'typed_data',
    data: parseTxData['action'],
    typedData: txData,
    sender: SENDER,
  });
  expect(actionData).toMatchSnapshot('parseActionSwapTokenOrder');

  const requireData = await _fetchData({
    type: 'typed_data',
    actionData,
    chainId: ETH_CHAIN_ID,
    walletProvider,
    apiProvider,
    sender: SENDER,
  });
  expect(requireData).toMatchSnapshot('fetchDataSwapTokenOrder');

  const ctx = await _format({
    type: 'typed_data',
    actionData,
    requireData,
    chainId: ETH_CHAIN_ID,
    isTestnet: false,
    provider: formatProvider,
    origin: ORIGIN,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEngineSwapTokenOrder');
});
