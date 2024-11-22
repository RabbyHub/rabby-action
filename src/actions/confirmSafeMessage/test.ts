import {
  apiProvider,
  ETH_CHAIN_ID,
  formatProvider,
  ORIGIN,
  SENDER,
  walletProvider,
} from '../../../__mocks__';
import { fetchDataConfirmSafeMessage } from './fetchData';
import { formatSecurityEngineConfirmSafeMessage } from './formatSecurityEngine';
import { parseTxData, txData } from './mocks';
import { parseActionConfirmSafeMessage } from './parseAction';
import { parseTypedDataAction } from '../../utils/parseTypedDataAction';
import {
  parseAction,
  fetchActionRequiredData,
  formatSecurityEngineContext,
} from '../..';

test.each([
  [
    parseTypedDataAction(parseActionConfirmSafeMessage),
    fetchDataConfirmSafeMessage,
    formatSecurityEngineConfirmSafeMessage,
  ],
  [parseAction, fetchActionRequiredData, formatSecurityEngineContext],
])('Confirm Safe Message', async (_parseAction, _fetchData, _format) => {
  const actionData = _parseAction({
    type: 'typed_data',
    data: parseTxData['action'],
    typedData: txData,
    sender: SENDER,
  });
  expect(actionData).toMatchSnapshot('parseActionConfirmSafeMessage');

  const requireData = await _fetchData({
    type: 'typed_data',
    actionData,
    chainId: ETH_CHAIN_ID,
    walletProvider,
    apiProvider,
    sender: SENDER,
  });
  expect(requireData).toMatchSnapshot('fetchDataConfirmSafeMessage');

  const ctx = await _format({
    type: 'typed_data',
    actionData,
    requireData,
    chainId: ETH_CHAIN_ID,
    isTestnet: false,
    provider: formatProvider,
    origin: ORIGIN,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEngineConfirmSafeMessage');
});
