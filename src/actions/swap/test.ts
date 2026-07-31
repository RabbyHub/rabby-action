import {
  apiProvider,
  ETH_CHAIN_ID,
  formatProvider,
  SENDER,
  walletProvider,
} from '../../../__mocks__';
import { ParsedTransactionActionData } from '../../types';
import { fetchDataSwap } from './fetchData';
import { formatSecurityEngineSwap } from './formatSecurityEngine';
import { parseTxData, preExecData, txData } from './mocks';
import { parseActionSwap } from './parseAction';
import {
  parseAction,
  fetchActionRequiredData,
  fetchStagedActionRequiredData,
  formatStagedSecurityEngineContext,
  formatSecurityEngineContext,
} from '../..';

/**
 * Rabby Swap
 */
test.each([
  [parseActionSwap, fetchDataSwap, formatSecurityEngineSwap],
  [parseAction, fetchActionRequiredData, formatSecurityEngineContext],
])('Swap', async (_parseAction, _fetchData, _format) => {
  const actionData = _parseAction({
    type: 'transaction',
    data: parseTxData['action'],
    balanceChange: preExecData.balance_change,
    sender: txData.from,
    preExecVersion: preExecData.pre_exec_version,
    gasUsed: preExecData.gas.gas_used,
    tx: txData,
  }) as ParsedTransactionActionData;
  expect(actionData).toMatchSnapshot('parseActionSwap');

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

  expect(requireData).toMatchSnapshot('fetchDataSwap');

  const ctx = await _format({
    type: 'transaction',
    actionData,
    requireData,
    chainId: ETH_CHAIN_ID,
    isTestnet: false,
    provider: formatProvider,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEngineSwap');
});

test('only waits for swap security data before returning the gate', async () => {
  const actionData = parseActionSwap({
    type: 'transaction',
    data: parseTxData['action'],
    balanceChange: preExecData.balance_change,
    sender: txData.from,
    preExecVersion: preExecData.pre_exec_version,
    gasUsed: preExecData.gas.gas_used,
    tx: txData,
  }) as ParsedTransactionActionData;
  let resolveReceiver = (_value: boolean) => {};
  let resolveContract = (_value: any) => {};
  let resolveInteraction = (_value: any) => {};
  const receiverPromise = new Promise<boolean>((resolve) => {
    resolveReceiver = resolve;
  });
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
  const stagedWalletProvider = {
    ...walletProvider,
    hasAddress: jest.fn(() => receiverPromise),
  };

  const stagePromise = fetchStagedActionRequiredData({
    type: 'transaction',
    actionData,
    contractCall: parseTxData.contract_call,
    chainId: ETH_CHAIN_ID,
    sender: SENDER,
    walletProvider: stagedWalletProvider,
    tx: txData,
    apiProvider: stagedApiProvider as any,
  });

  await Promise.resolve();
  expect(stagedApiProvider.getContractInfo).toHaveBeenCalledTimes(1);
  expect(stagedApiProvider.hasInteraction).toHaveBeenCalledTimes(1);
  resolveReceiver(false);

  const stage = await stagePromise;
  expect(stage.kind).toBe('swap');
  if (stage.kind !== 'swap') {
    throw new Error('swap should use the staged security gate');
  }
  expect(stage.securityData).toEqual({
    id: txData.to,
    sender: SENDER,
    receiverInWallet: false,
  });

  resolveContract({
    protocol: { name: 'Test', logo_url: '' },
    create_at: 1,
    credit: { rank_at: 2 },
  });
  resolveInteraction({ has_interaction: true });
  const detailData = await stage.displayData;
  expect(detailData).toEqual({
    protocol: { name: 'Test', logo_url: '' },
    bornAt: 1,
    rank: 2,
    hasInteraction: true,
  });
  if (!detailData) {
    throw new Error('swap detail data should be available');
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

test('swap display failures keep the security gate usable', async () => {
  const actionData = parseActionSwap({
    type: 'transaction',
    data: parseTxData['action'],
    balanceChange: preExecData.balance_change,
    sender: txData.from,
    preExecVersion: preExecData.pre_exec_version,
    gasUsed: preExecData.gas.gas_used,
    tx: txData,
  }) as ParsedTransactionActionData;
  const failedApiProvider = {
    ...apiProvider,
    getContractInfo: jest.fn(() => {
      throw new Error('detail failed');
    }),
    hasInteraction: jest.fn(() => {
      throw new Error('detail failed');
    }),
  };
  const options = {
    type: 'transaction' as const,
    actionData,
    contractCall: parseTxData.contract_call,
    chainId: ETH_CHAIN_ID,
    sender: SENDER,
    walletProvider,
    tx: txData,
    apiProvider: failedApiProvider as any,
  };

  const stage = await fetchStagedActionRequiredData(options);
  expect(stage.kind).toBe('swap');
  if (stage.kind === 'legacy') {
    throw new Error('swap should use the staged security gate');
  }
  await expect(stage.displayData).resolves.toBeNull();
});

test('swap rejects when its receiver safety lookup fails', async () => {
  const actionData = parseActionSwap({
    type: 'transaction',
    data: parseTxData['action'],
    balanceChange: preExecData.balance_change,
    sender: txData.from,
    preExecVersion: preExecData.pre_exec_version,
    gasUsed: preExecData.gas.gas_used,
    tx: txData,
  }) as ParsedTransactionActionData;

  await expect(
    fetchStagedActionRequiredData({
      type: 'transaction',
      actionData,
      contractCall: parseTxData.contract_call,
      chainId: ETH_CHAIN_ID,
      sender: SENDER,
      walletProvider: {
        ...walletProvider,
        hasAddress: jest.fn(() => {
          throw new Error('receiver safety lookup failed');
        }),
      },
      tx: txData,
      apiProvider,
    })
  ).rejects.toThrow('receiver safety lookup failed');
});

test.each([
  'wrapToken',
  'unWrapToken',
  'crossToken',
  'crossSwapToken',
  'multiSwap',
  'swapLimitPay',
])('%s reuses the swap security gate', async (actionKey) => {
  let resolveReceiver = (_value: boolean) => {};
  let resolveContract = (_value: any) => {};
  let resolveInteraction = (_value: any) => {};
  const receiverPromise = new Promise<boolean>((resolve) => {
    resolveReceiver = resolve;
  });
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
  const stagedWalletProvider = {
    ...walletProvider,
    hasAddress: jest.fn(() => receiverPromise),
  };
  const stagePromise = fetchStagedActionRequiredData({
    type: 'transaction',
    actionData: {
      [actionKey]: { receiver: SENDER },
    } as ParsedTransactionActionData,
    contractCall: parseTxData.contract_call,
    chainId: ETH_CHAIN_ID,
    sender: SENDER,
    walletProvider: stagedWalletProvider,
    tx: txData,
    apiProvider: stagedApiProvider as any,
  });

  await Promise.resolve();
  expect(stagedApiProvider.getContractInfo).toHaveBeenCalledTimes(1);
  expect(stagedApiProvider.hasInteraction).toHaveBeenCalledTimes(1);
  const needsReceiverCheck =
    actionKey !== 'multiSwap' && actionKey !== 'swapLimitPay';
  if (needsReceiverCheck) {
    resolveReceiver(false);
  }

  const stage = await stagePromise;
  expect(stage.kind).toBe(actionKey);
  if (stage.kind === 'legacy' || stage.kind === 'addLiquidity') {
    throw new Error('swap variant should use the staged security gate');
  }
  expect(stage.securityData).toEqual(
    needsReceiverCheck
      ? { id: txData.to, sender: SENDER, receiverInWallet: false }
      : { id: txData.to, sender: SENDER }
  );
  expect(stagedWalletProvider.hasAddress).toHaveBeenCalledTimes(
    needsReceiverCheck ? 1 : 0
  );

  resolveContract(null);
  resolveInteraction({ has_interaction: false });
  await stage.displayData;
});

test('multiple action keys fall back to the complete required-data path', async () => {
  const stage = await fetchStagedActionRequiredData({
    type: 'transaction',
    actionData: {
      swap: { receiver: SENDER },
      wrapToken: { receiver: SENDER },
    } as ParsedTransactionActionData,
    contractCall: parseTxData.contract_call,
    chainId: ETH_CHAIN_ID,
    sender: SENDER,
    walletProvider,
    tx: txData,
    apiProvider,
  });

  expect(stage.kind).toBe('legacy');
});
