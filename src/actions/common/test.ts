import {
  apiProvider,
  formatProvider,
  walletProvider,
  SENDER,
  ETH_CHAIN_ID,
  ORIGIN,
} from '../../../__mocks__';
import { parseTxDataTypedData, txDataTypedData } from './mocks';
import { parseActionCommon } from './parseAction';
import { fetchDataCommon } from './fetchData';
import { formatSecurityEngineCommon } from './formatSecurityEngine';
import { parseTypedDataAction } from '../../utils/parseTypedDataAction';
import {
  parseAction,
  fetchActionRequiredData,
  formatSecurityEngineContext,
} from '../..';

/**
 * https://metamask.github.io/test-dapp/#signTypedDataV4
 * Sign Typed Data V4
 * [Sign] button
 */
test.each([
  [
    parseTypedDataAction(parseActionCommon),
    fetchDataCommon,
    formatSecurityEngineCommon,
  ],
  [parseAction, fetchActionRequiredData, formatSecurityEngineContext],
])('Common -> TypedData', async (_parseAction, _fetchData, _format) => {
  const actionData = _parseAction({
    type: 'typed_data',
    data: parseTxDataTypedData['action'],
    typedData: txDataTypedData,
    sender: SENDER,
  });
  expect(actionData).toMatchSnapshot('parseActionCommon');

  const requireData = await _fetchData({
    type: 'typed_data',
    actionData,
    chainId: ETH_CHAIN_ID,
    walletProvider,
    apiProvider,
    sender: SENDER,
  });
  expect(requireData).toMatchSnapshot('fetchDataCommon');

  const ctx = await _format({
    type: 'typed_data',
    actionData,
    requireData,
    chainId: ETH_CHAIN_ID,
    isTestnet: false,
    provider: formatProvider,
    origin: ORIGIN,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEngineCommon');
});
