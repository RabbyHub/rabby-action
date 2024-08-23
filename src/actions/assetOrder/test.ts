import {
  apiProvider,
  formatProvider,
  walletProvider,
  SENDER,
  CHAIN_ID,
  ORIGIN,
} from '../../../__mocks__';
import { ParsedTypedDataActionData } from '../../types';
import { parseTxData, txData } from './mocks';
import { parseActionAssetOrder } from './parseAction';
import { fetchDataAssetOrder } from './fetchData';
import { formatSecurityEngineAssetOrder } from './formatSecurityEngine';

test('AssetOrder - typedData', async () => {
  const actionData = (await parseActionAssetOrder({
    type: 'typed_data',
    data: parseTxData['action'],
    typedData: txData,
    sender: SENDER,
  })) as ParsedTypedDataActionData;
  expect(actionData).toMatchSnapshot('parseActionAssetOrder');

  const requireData = await fetchDataAssetOrder({
    type: 'typed_data',
    actionData,
    chainId: CHAIN_ID,
    walletProvider,
    apiProvider,
    sender: SENDER,
  });
  expect(requireData).toMatchSnapshot('fetchDataAssetOrder');

  const ctx = await formatSecurityEngineAssetOrder({
    type: 'typed_data',
    actionData,
    requireData,
    chainId: CHAIN_ID,
    isTestnet: false,
    provider: formatProvider,
    origin: ORIGIN,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEngineAssetOrder');
});
