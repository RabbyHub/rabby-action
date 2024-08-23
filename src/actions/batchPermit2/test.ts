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
import { parseActionBatchPermit2 } from './parseAction';
import { fetchDataBatchPermit2 } from './fetchData';
import { formatSecurityEngineBatchPermit2 } from './formatSecurityEngine';

/**
 * https://extension-tests.revoke.cash/
 * [Permit2 Batch] button
 */
test('BatchPermit2', async () => {
  const actionData = (await parseActionBatchPermit2({
    type: 'typed_data',
    data: parseTxData['action'],
    typedData: txData,
    sender: SENDER,
  })) as ParsedTypedDataActionData;
  expect(actionData).toMatchSnapshot('parseActionBatchPermit2');

  const requireData = await fetchDataBatchPermit2({
    type: 'typed_data',
    actionData,
    chainId: CHAIN_ID,
    walletProvider,
    apiProvider,
    sender: SENDER,
  });
  expect(requireData).toMatchSnapshot('fetchDataBatchPermit2');

  const ctx = await formatSecurityEngineBatchPermit2({
    type: 'typed_data',
    actionData,
    requireData,
    chainId: CHAIN_ID,
    isTestnet: false,
    provider: formatProvider,
    origin: ORIGIN,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEngineBatchPermit2');
});
