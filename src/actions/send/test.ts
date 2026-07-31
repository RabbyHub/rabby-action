import {
  apiProvider,
  ETH_CHAIN_ID,
  formatProvider,
  ORIGIN,
  SENDER,
  walletProvider,
} from '../../../__mocks__';
import { ParsedTransactionActionData } from '../../types';
import { fetchDataSend } from './fetchData';
import { formatSecurityEngineSend } from './formatSecurityEngine';
import {
  parseTxData,
  parseTxDataTypedData,
  preExecData,
  txData,
  txDataTypedData,
} from './mocks';
import { parseActionSend } from './parseAction';
import {
  parseAction,
  fetchActionRequiredData,
  formatSecurityEngineContext,
} from '../..';
import { parseTypedDataAction } from '../../utils/parseTypedDataAction';

/**
 * https://metamask.github.io/test-dapp/#sendButton
 * Send Eth
 * - [Send Legacy Transaction] button
 */
test.each([
  [parseActionSend, fetchDataSend, formatSecurityEngineSend],
  [parseAction, fetchActionRequiredData, formatSecurityEngineContext],
])('Send -> Transaction', async (_parseAction, _fetchData, _format) => {
  const actionData = _parseAction({
    type: 'transaction',
    data: parseTxData['action'],
    balanceChange: preExecData.balance_change,
    sender: txData.from,
    preExecVersion: preExecData.pre_exec_version,
    gasUsed: preExecData.gas.gas_used,
    tx: txData,
  }) as ParsedTransactionActionData;
  expect(actionData).toMatchSnapshot('parseActionSend');

  const requireData = await _fetchData({
    type: 'transaction',
    actionData,
    contractCall: parseTxData.contract_call,
    chainId: ETH_CHAIN_ID,
    sender: SENDER,
    walletProvider,
    tx: txData,
    apiProvider,
  });

  expect(requireData).toMatchSnapshot('fetchDataSend');

  const ctx = await _format({
    type: 'transaction',
    actionData,
    requireData,
    chainId: ETH_CHAIN_ID,
    isTestnet: false,
    provider: formatProvider,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEngineSend');
});

/**
 * https://syncswap.xyz/
 * gas use USDT
 * ETH -> USDC.e
 */
test.skip.each([
  [
    parseTypedDataAction(parseActionSend),
    fetchDataSend,
    formatSecurityEngineSend,
  ],
  [parseAction, fetchActionRequiredData, formatSecurityEngineContext],
])('Send -> TypedData', async (_parseAction, _fetchData, _format) => {
  const actionData = _parseAction({
    type: 'typed_data',
    data: parseTxDataTypedData['action'],
    typedData: txDataTypedData,
    sender: SENDER,
  });
  expect(actionData).toMatchSnapshot('parseActionSend');

  const requireData = await _fetchData({
    type: 'typed_data',
    actionData,
    chainId: ETH_CHAIN_ID,
    walletProvider,
    apiProvider,
    sender: SENDER,
  });
  expect(requireData).toMatchSnapshot('fetchDataSend');

  const ctx = await _format({
    type: 'typed_data',
    actionData,
    requireData,
    chainId: ETH_CHAIN_ID,
    isTestnet: false,
    provider: formatProvider,
    origin: ORIGIN,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEngineSend');
});

test('starts independent send lookups concurrently', async () => {
  let resolvePrivateKey = (_value: string) => {};
  const privateKeyPromise = new Promise<string>((resolve) => {
    resolvePrivateKey = resolve;
  });
  (apiProvider.hasTransfer as jest.Mock).mockClear();
  (apiProvider.addrDesc as jest.Mock).mockClear();
  walletProvider.getWhitelist.mockClear();

  const pending = fetchDataSend({
    type: 'transaction',
    actionData: { send: parseTxData.action.data } as any,
    contractCall: parseTxData.contract_call,
    chainId: ETH_CHAIN_ID,
    sender: SENDER,
    walletProvider: {
      ...walletProvider,
      hasPrivateKeyInWallet: jest.fn(() => privateKeyPromise),
    },
    tx: txData,
    apiProvider,
  });

  await Promise.resolve();
  expect(apiProvider.hasTransfer).toHaveBeenCalledTimes(1);
  expect(apiProvider.addrDesc).toHaveBeenCalledTimes(1);
  expect(walletProvider.getWhitelist).toHaveBeenCalledTimes(1);

  resolvePrivateKey('');
  await pending;
});

test.each(['addrDesc', 'checkSpoofing'])(
  'rejects when the %s security input fails',
  async (failedMethod) => {
    const failedApiProvider = {
      ...apiProvider,
      [failedMethod]: jest.fn(() => {
        throw new Error('security input failed');
      }),
    };

    await expect(
      fetchDataSend({
        type: 'transaction',
        actionData: { send: parseTxData.action.data } as any,
        contractCall: parseTxData.contract_call,
        chainId: ETH_CHAIN_ID,
        sender: SENDER,
        walletProvider,
        tx: txData,
        apiProvider: failedApiProvider as any,
      })
    ).rejects.toThrow('security input failed');
  }
);

test('starts CEX danger lookup before slow independent gate data', async () => {
  let resolveWhitelist = (_value: string[]) => {};
  const whitelistPromise = new Promise<string[]>((resolve) => {
    resolveWhitelist = resolve;
  });
  const cexApiProvider = {
    ...apiProvider,
    addrDesc: jest.fn().mockResolvedValue({
      desc: {
        name: null,
        cex: {
          id: 'cex',
          logo_url: '',
          name: 'CEX',
          is_deposit: true,
        },
        contract: {},
        protocol: {},
        born_at: 0,
        usd_value: 0,
      },
    }),
    depositCexSupport: jest.fn().mockResolvedValue({ support: true }),
  };
  const pending = fetchDataSend({
    type: 'transaction',
    actionData: { send: parseTxData.action.data } as any,
    contractCall: parseTxData.contract_call,
    chainId: ETH_CHAIN_ID,
    sender: SENDER,
    walletProvider: {
      ...walletProvider,
      getWhitelist: jest.fn(() => whitelistPromise),
    },
    tx: txData,
    apiProvider: cexApiProvider as any,
  });

  await new Promise((resolve) => setTimeout(resolve, 0));
  expect(cexApiProvider.depositCexSupport).toHaveBeenCalledTimes(1);

  resolveWhitelist([]);
  await pending;
});
