import {
  apiProvider,
  ETH_CHAIN_ID,
  formatProvider,
  ORIGIN,
  SENDER,
  walletProvider,
} from '../../__mocks__';
import {
  fetchActionRequiredData,
  fetchStagedActionRequiredData,
  formatSecurityEngineContext,
  formatStagedSecurityEngineContext,
} from '..';
import { defaultRules } from '@rabby-wallet/rabby-security-engine/dist/rules';
import type { Context } from '@rabby-wallet/rabby-security-engine/dist/rules';
import {
  ParsedTransactionActionData,
  ParsedTypedDataActionData,
} from '../types';

const spender = '0x7a250d5630b4cf539739df2c5dacb4c659f2488d';
const receiver = '0x5d4b2a02c59197eb2cae95a6df9fe27af60459d4';
const token = {
  id: '0x6b175474e89094c44da98b954eedeac495271d0f',
  chain: ETH_CHAIN_ID,
  decimals: 18,
} as any;
const tx = {
  from: SENDER,
  to: token.id,
  data: '0x',
  value: '0x0',
} as any;

const formatTransactionContext = (
  actionData: ParsedTransactionActionData,
  requireData: any
) =>
  formatSecurityEngineContext({
    type: 'transaction',
    actionData,
    requireData,
    chainId: ETH_CHAIN_ID,
    isTestnet: false,
    provider: formatProvider,
  });

// Verify the dispatch fallback with a kind still in the registry: failing any
// precondition must take the legacy path rather than quietly staging.
test.each([
  { name: 'testnet', findChain: () => ({ isTestnet: true }) },
  { name: 'unresolved chain', findChain: () => undefined },
])('$name keeps the legacy required-data path', async ({ findChain }) => {
  const stage = await fetchStagedActionRequiredData({
    type: 'transaction',
    actionData: {
      swap: { receiver },
    } as ParsedTransactionActionData,
    contractCall: null,
    chainId: ETH_CHAIN_ID,
    sender: SENDER,
    walletProvider: {
      ...walletProvider,
      findChain: jest.fn(findChain),
    } as any,
    tx,
    apiProvider: {
      ...apiProvider,
      getContractInfo: jest.fn(() => null),
      addrDesc: jest.fn(() => ({ desc: {} })),
    } as any,
  });

  expect(stage.kind).toBe('legacy');
});

test('transfer owner only waits for the whitelist safety gate', async () => {
  const actionData = {
    transferOwner: { to: receiver },
  } as ParsedTransactionActionData;
  let resolveDescription = (_value: any) => {};
  const descriptionPromise = new Promise((resolve) => {
    resolveDescription = resolve;
  });
  const stagedWalletProvider = {
    ...walletProvider,
    getWhitelist: jest.fn(() => Promise.resolve([receiver])),
  };
  const stagedApiProvider = {
    ...apiProvider,
    addrDesc: jest.fn(() => descriptionPromise),
  } as any;
  const options = {
    type: 'transaction' as const,
    actionData,
    contractCall: null,
    chainId: ETH_CHAIN_ID,
    sender: SENDER,
    walletProvider: stagedWalletProvider as any,
    tx,
    apiProvider: stagedApiProvider,
  };

  const stage = await fetchStagedActionRequiredData(options);
  expect(stage.kind).toBe('transferOwner');
  if (stage.kind !== 'transferOwner') {
    throw new Error('transfer owner should use the staged security gate');
  }
  expect(stage.securityData).toEqual({
    receiver: { onTransferWhitelist: true },
  });

  const legacyRequireData = await fetchActionRequiredData({
    ...options,
    apiProvider,
  });
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
    await formatTransactionContext(actionData, legacyRequireData)
  );

  resolveDescription((apiProvider as any).addrDesc());
  await expect(stage.displayData).resolves.toMatchObject({
    receiver: { address: receiver },
  });
});

test('contract call waits for phishing data, not contract display metadata', async () => {
  const actionData = { contractCall: {} } as ParsedTransactionActionData;
  let resolveDescription = (_value: any) => {};
  let resolveInteraction = (_value: any) => {};
  const descriptionPromise = new Promise((resolve) => {
    resolveDescription = resolve;
  });
  const interactionPromise = new Promise((resolve) => {
    resolveInteraction = resolve;
  });
  const stagedApiProvider = {
    ...apiProvider,
    getContractInfo: jest.fn(() => ({
      ...(apiProvider as any).getContractInfo(),
      is_phishing: null,
    })),
    addrDesc: jest.fn(() => descriptionPromise),
    hasInteraction: jest.fn(() => interactionPromise),
  } as any;
  const contractCall = { func: '', contract: { id: spender } } as any;
  const options = {
    type: 'transaction' as const,
    actionData,
    contractCall,
    chainId: ETH_CHAIN_ID,
    sender: SENDER,
    walletProvider,
    tx: { ...tx, to: spender },
    apiProvider: stagedApiProvider,
  };

  const stage = await fetchStagedActionRequiredData(options);
  expect(stage.kind).toBe('contractCall');
  if (stage.kind !== 'contractCall') {
    throw new Error('contract call should use the staged security gate');
  }
  expect(stage.securityData).toEqual({
    id: spender,
    isDanger: false,
    receiverInWallet: false,
  });

  const legacyRequireData = await fetchActionRequiredData({
    ...options,
    apiProvider,
  });
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
    await formatTransactionContext(actionData, legacyRequireData)
  );

  resolveDescription((apiProvider as any).addrDesc());
  resolveInteraction({ has_interaction: true });
  await expect(stage.displayData).resolves.toBeNull();
});

test('contract call rejects an incomplete phishing flag', async () => {
  await expect(
    fetchStagedActionRequiredData({
      type: 'transaction',
      actionData: { contractCall: {} } as ParsedTransactionActionData,
      contractCall: { func: '', contract: { id: spender } } as any,
      chainId: ETH_CHAIN_ID,
      sender: SENDER,
      walletProvider,
      tx: { ...tx, to: spender },
      apiProvider: {
        ...apiProvider,
        getContractInfo: jest.fn(() => ({
          ...(apiProvider as any).getContractInfo(),
          is_phishing: undefined,
        })),
      } as any,
    })
  ).rejects.toThrow('Invalid contract call security data');
});

test.each([
  {
    actionData: { swap: { receiver } } as ParsedTransactionActionData,
  },
  {
    actionData: {
      addLiquidity: {
        receiver,
        exchange_rate: '1',
        token0: { price: 1 },
        token1: { price: 1 },
      },
    } as ParsedTransactionActionData,
  },
])(
  'missing contract display metadata stays unknown',
  async ({ actionData }) => {
    const stage = await fetchStagedActionRequiredData({
      type: 'transaction',
      actionData,
      contractCall: null,
      chainId: ETH_CHAIN_ID,
      sender: SENDER,
      walletProvider,
      tx,
      apiProvider: {
        ...apiProvider,
        getContractInfo: jest.fn(() => null),
        hasInteraction: jest.fn(() => ({ has_interaction: false })),
      } as any,
    });

    if (stage.kind === 'legacy') {
      throw new Error('action should use the staged security gate');
    }
    await expect(stage.displayData).resolves.toBeNull();
  }
);
