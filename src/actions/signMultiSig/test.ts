import {
  apiProvider,
  ETH_CHAIN_ID,
  formatProvider,
  ORIGIN,
  SENDER,
  walletProvider,
} from '../../../__mocks__';
import { fetchDataSignMultiSig } from './fetchData';
import { formatSecurityEngineSignMultiSig } from './formatSecurityEngine';
import { parseTxData, txData } from './mocks';
import { parseActionSignMultiSig } from './parseAction';
import { parseTypedDataAction } from '../../utils/parseTypedDataAction';
import {
  parseAction,
  fetchActionRequiredData,
  formatSecurityEngineContext,
} from '../..';

/**
 * https://brain.debank.com/action-group/typed_data/fd954b3088f7b41fb0e521f65d8f76f0
 * id: 6634098
 * chainId: base
 * contract_id: 0xb5d05de17c00aed6c465b6bbba01d5edae59e19c
 */
test.each([
  [
    parseTypedDataAction(parseActionSignMultiSig),
    fetchDataSignMultiSig,
    formatSecurityEngineSignMultiSig,
  ],
  [parseAction, fetchActionRequiredData, formatSecurityEngineContext],
])('ApproveToken', async (_parseAction, _fetchData, _format) => {
  const actionData = _parseAction({
    type: 'typed_data',
    data: parseTxData['action'],
    typedData: txData,
    sender: SENDER,
  });
  expect(actionData).toMatchSnapshot('parseActionSignMultiSig');

  const requireData = await _fetchData({
    type: 'typed_data',
    actionData,
    chainId: ETH_CHAIN_ID,
    walletProvider,
    apiProvider,
    sender: SENDER,
  });

  expect(requireData).toMatchSnapshot('fetchDataSignMultiSig');

  const ctx = await _format({
    type: 'typed_data',
    actionData,
    requireData,
    chainId: ETH_CHAIN_ID,
    isTestnet: false,
    provider: formatProvider,
    origin: ORIGIN,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEngineSignMultiSig');
});
