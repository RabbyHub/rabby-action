import {
  apiProvider,
  formatProvider,
  walletProvider,
  SENDER,
  ETH_CHAIN_ID,
  ORIGIN,
} from '../../../__mocks__';
import { parseTxData, txData } from './mocks';
import { parseActionCoboSafeModificationRole } from './parseAction';
import { fetchDataCoboSafeModificationRole } from './fetchData';
import { formatSecurityEngineCoboSafeModificationRole } from './formatSecurityEngine';
import { parseTypedDataAction } from '../../utils/parseTypedDataAction';
import {
  parseAction,
  fetchActionRequiredData,
  formatSecurityEngineContext,
} from '../..';

/**
/**
 * https://argus.cobo.com/#/home
 * Modification Queue
 * [Proceed to multisg] button
 */
test.each([
  [
    parseTypedDataAction(parseActionCoboSafeModificationRole),
    fetchDataCoboSafeModificationRole,
    formatSecurityEngineCoboSafeModificationRole,
  ],
  [parseAction, fetchActionRequiredData, formatSecurityEngineContext],
])('CoboSafeModificationRole', async (_parseAction, _fetchData, _format) => {
  const actionData = _parseAction({
    type: 'typed_data',
    data: parseTxData['action'],
    typedData: txData,
    sender: SENDER,
  });
  expect(actionData).toMatchSnapshot('parseActionCoboSafeModificationRole');

  const requireData = await _fetchData({
    type: 'typed_data',
    actionData,
    chainId: ETH_CHAIN_ID,
    walletProvider,
    apiProvider,
    sender: SENDER,
  });
  expect(requireData).toMatchSnapshot('fetchDataCoboSafeModificationRole');

  const ctx = await _format({
    type: 'typed_data',
    actionData,
    requireData,
    chainId: ETH_CHAIN_ID,
    isTestnet: false,
    provider: formatProvider,
    origin: ORIGIN,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEngineCoboSafeModificationRole');
});
