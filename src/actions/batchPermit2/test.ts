import {
  apiProvider,
  formatProvider,
  walletProvider,
  SENDER,
  ETH_CHAIN_ID,
  ORIGIN,
} from '../../../__mocks__';
import { parseTxData, txData } from './mocks';
import { parseActionBatchPermit2 } from './parseAction';
import { fetchDataBatchPermit2 } from './fetchData';
import { formatSecurityEngineBatchPermit2 } from './formatSecurityEngine';
import { parseTypedDataAction } from '../../utils/parseTypedDataAction';
import {
  parseAction,
  fetchActionRequiredData,
  formatSecurityEngineContext,
} from '../..';

/**
/**
 * https://extension-tests.revoke.cash/
 * [Permit2 Batch] button
 */
test.each([
  [
    parseTypedDataAction(parseActionBatchPermit2),
    fetchDataBatchPermit2,
    formatSecurityEngineBatchPermit2,
  ],
  [parseAction, fetchActionRequiredData, formatSecurityEngineContext],
])('BatchPermit2', async (_parseAction, _fetchData, _format) => {
  const actionData = _parseAction({
    type: 'typed_data',
    data: parseTxData['action'],
    typedData: txData,
    sender: SENDER,
  });
  expect(actionData).toMatchSnapshot('parseActionBatchPermit2');

  const requireData = await _fetchData({
    type: 'typed_data',
    actionData,
    chainId: ETH_CHAIN_ID,
    walletProvider,
    apiProvider,
    sender: SENDER,
  });
  expect(requireData).toMatchSnapshot('fetchDataBatchPermit2');

  const ctx = await _format({
    type: 'typed_data',
    actionData,
    requireData,
    chainId: ETH_CHAIN_ID,
    isTestnet: false,
    provider: formatProvider,
    origin: ORIGIN,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEngineBatchPermit2');
});
