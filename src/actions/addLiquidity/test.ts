import {
  apiProvider,
  ETH_CHAIN_ID,
  formatProvider,
  SENDER,
  walletProvider,
} from '../../../__mocks__';
import { ParsedTransactionActionData } from '../../types';
import { fetchDataAddLiquidity } from './fetchData';
import { formatSecurityEngineAddLiquidity } from './formatSecurityEngine';
import { parseTxData, preExecData, txData } from './mocks';
import { parseActionAddLiquidity } from './parseAction';
import {
  parseAction,
  fetchActionRequiredData,
  fetchStagedActionRequiredData,
  formatStagedSecurityEngineContext,
  formatSecurityEngineContext,
} from '../..';

/**
 * https://basescan.org/tx/0x1b1c4087897ca02ece20f4d8db8469a4642ef02be19b8a2a49ec8fd542495e6e
 *
 */
test.each([
  [
    parseActionAddLiquidity,
    fetchDataAddLiquidity,
    formatSecurityEngineAddLiquidity,
  ],
  [parseAction, fetchActionRequiredData, formatSecurityEngineContext],
])('ApproveNFT', async (_parseAction, _fetchData, _format) => {
  const actionData = _parseAction({
    type: 'transaction',
    data: parseTxData['action'],
    balanceChange: preExecData.balance_change,
    sender: txData.from,
    preExecVersion: preExecData.pre_exec_version,
    gasUsed: preExecData.gas.gas_used,
    tx: txData,
  }) as ParsedTransactionActionData;
  expect(actionData).toMatchSnapshot('parseActionAddLiquidity');

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
  expect(requireData).toMatchSnapshot('fetchDataAddLiquidity');

  const ctx = await _format({
    type: 'transaction',
    actionData,
    requireData,
    chainId: ETH_CHAIN_ID,
    isTestnet: false,
    provider: formatProvider,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEngineAddLiquidity');
});

test('add liquidity gate skips the unused receiver lookup', async () => {
  const actionData = {
    addLiquidity: {
      receiver: SENDER,
      exchange_rate: '1',
      min_exchange_rate: '1',
      max_exchange_rate: '1',
      token0: { price: 2 },
      token1: { price: 1 },
    },
  } as ParsedTransactionActionData;
  let resolveContract = (_value: any) => {};
  let resolveInteraction = (_value: any) => {};
  const contractPromise = new Promise<any>((resolve) => {
    resolveContract = resolve;
  });
  const interactionPromise = new Promise<any>((resolve) => {
    resolveInteraction = resolve;
  });
  const stagedApiProvider = {
    ...apiProvider,
    getContractInfo: jest.fn(() => contractPromise),
    hasInteraction: jest.fn(() => interactionPromise),
  };
  const hasAddress = jest.fn();

  const stage = await fetchStagedActionRequiredData({
    type: 'transaction',
    actionData,
    contractCall: parseTxData.contract_call,
    chainId: ETH_CHAIN_ID,
    sender: SENDER,
    walletProvider: { ...walletProvider, hasAddress },
    tx: txData,
    apiProvider: stagedApiProvider as any,
  });

  expect(hasAddress).not.toHaveBeenCalled();
  expect(stage.kind).toBe('addLiquidity');
  if (stage.kind !== 'addLiquidity') {
    throw new Error('add liquidity should use the staged security gate');
  }
  expect(stage.securityData).toEqual({
    sender: SENDER,
    receiver: SENDER,
    diff: 50,
  });

  resolveContract({
    protocol: { name: 'Test', logo_url: '' },
    create_at: 1,
    credit: { rank_at: 2 },
  });
  resolveInteraction({ has_interaction: true });
  const detailData = await stage.displayData;
  expect(detailData).toEqual({
    id: txData.to,
    poolRate: '1',
    marketRate: '2',
    protocol: { name: 'Test', logo_url: '' },
    bornAt: 1,
    rank: 2,
    hasInteraction: true,
  });
  if (!detailData) {
    throw new Error('add liquidity detail data should be available');
  }
  await expect(
    formatStagedSecurityEngineContext(
      {
        type: 'transaction',
        actionData,
        chainId: ETH_CHAIN_ID,
        isTestnet: false,
        provider: formatProvider,
      },
      stage
    )
  ).resolves.toEqual(
    await formatSecurityEngineContext({
      type: 'transaction',
      actionData,
      requireData: { ...stage.securityData, ...detailData },
      chainId: ETH_CHAIN_ID,
      isTestnet: false,
      provider: formatProvider,
    })
  );
});

test('add liquidity display failures do not block the security gate', async () => {
  const actionData = {
    addLiquidity: {
      receiver: SENDER,
      exchange_rate: '1',
      min_exchange_rate: '1',
      max_exchange_rate: '1',
      token0: { price: 2 },
      token1: { price: 1 },
    },
  } as ParsedTransactionActionData;
  const stage = await fetchStagedActionRequiredData({
    type: 'transaction',
    actionData,
    contractCall: parseTxData.contract_call,
    chainId: ETH_CHAIN_ID,
    sender: SENDER,
    walletProvider,
    tx: txData,
    apiProvider: {
      ...apiProvider,
      getContractInfo: jest.fn(() => {
        throw new Error('detail failed');
      }),
      hasInteraction: jest.fn(() => {
        throw new Error('detail failed');
      }),
    } as any,
  });

  expect(stage.kind).toBe('addLiquidity');
  if (stage.kind !== 'addLiquidity') {
    throw new Error('add liquidity should use the staged security gate');
  }
  await expect(stage.displayData).resolves.toBeNull();
});

test.each([
  ['zero token price', 1, 0, '1'],
  ['negative prices', -1, 1, '-1'],
])(
  'add liquidity rejects $name',
  async (_name, token0Price, token1Price, exchangeRate) => {
    await expect(
      fetchStagedActionRequiredData({
        type: 'transaction',
        actionData: {
          addLiquidity: {
            receiver: SENDER,
            exchange_rate: exchangeRate,
            min_exchange_rate: '1',
            max_exchange_rate: '1',
            token0: { price: token0Price },
            token1: { price: token1Price },
          },
        } as ParsedTransactionActionData,
        contractCall: parseTxData.contract_call,
        chainId: ETH_CHAIN_ID,
        sender: SENDER,
        walletProvider,
        tx: txData,
        apiProvider,
      })
    ).rejects.toThrow('Invalid add liquidity security data');
  }
);
