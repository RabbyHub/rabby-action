import {
  apiProvider,
  formatProvider,
  walletProvider,
  SENDER,
  ETH_CHAIN_ID,
  ORIGIN,
} from '../../../__mocks__';
import { parseTxData, txData } from './mocks';
import { parseActionCoboSafeCreate } from './parseAction';
import { fetchDataCoboSafeCreate } from './fetchData';
import { formatSecurityEngineCoboSafeCreate } from './formatSecurityEngine';
import { parseTypedDataAction } from '../../utils/parseTypedDataAction';
import {
  parseAction,
  fetchActionRequiredData,
  formatSecurityEngineContext,
} from '../..';

/**
/**
 * https://argus.cobo.com/#/home
 * [Create Cobo Safe] button
 */
test.each([
  [
    parseTypedDataAction(parseActionCoboSafeCreate),
    fetchDataCoboSafeCreate,
    formatSecurityEngineCoboSafeCreate,
  ],
  [parseAction, fetchActionRequiredData, formatSecurityEngineContext],
])('CoboSafeCreate', async (_parseAction, _fetchData, _format) => {
  const actionData = _parseAction({
    type: 'typed_data',
    data: parseTxData['action'],
    typedData: txData,
    sender: SENDER,
  });
  expect(actionData).toMatchSnapshot('parseActionCoboSafeCreate');

  const requireData = await _fetchData({
    type: 'typed_data',
    actionData,
    chainId: ETH_CHAIN_ID,
    walletProvider,
    apiProvider,
    sender: SENDER,
  });
  expect(requireData).toMatchSnapshot('fetchDataCoboSafeCreate');

  const ctx = await _format({
    type: 'typed_data',
    actionData,
    requireData,
    chainId: ETH_CHAIN_ID,
    isTestnet: false,
    provider: formatProvider,
    origin: ORIGIN,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEngineCoboSafeCreate');
});
