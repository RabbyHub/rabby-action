import {
  apiProvider,
  formatProvider,
  walletProvider,
  SENDER,
  ETH_CHAIN_ID,
  ORIGIN,
} from '../../../__mocks__';
import { parseTxData, txData } from './mocks';
import { parseActionAssetOrder } from './parseAction';
import { fetchDataAssetOrder } from './fetchData';
import { formatSecurityEngineAssetOrder } from './formatSecurityEngine';
import { parseTypedDataAction } from '../../utils/parseTypedDataAction';

/**
 * https://extension-tests.revoke.cash/
 * [Seaport v1] button
 */
test('AssetOrder - typedData', async () => {
  const actionData = parseTypedDataAction(parseActionAssetOrder)({
    type: 'typed_data',
    data: parseTxData['action'],
    typedData: txData,
    sender: SENDER,
  });
  expect(actionData).toMatchSnapshot('parseActionAssetOrder');

  const requireData = await fetchDataAssetOrder({
    type: 'typed_data',
    actionData,
    chainId: ETH_CHAIN_ID,
    walletProvider,
    apiProvider,
    sender: SENDER,
  });
  expect(requireData).toMatchSnapshot('fetchDataAssetOrder');

  const ctx = await formatSecurityEngineAssetOrder({
    type: 'typed_data',
    actionData,
    requireData,
    chainId: ETH_CHAIN_ID,
    isTestnet: false,
    provider: formatProvider,
    origin: ORIGIN,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEngineAssetOrder');
});

test.todo('AssetOrder - transaction');
