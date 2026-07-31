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
  parseAction,
} from '..';
import { ParsedTypedDataActionData } from '../types';
import {
  parseTxData as assetOrderData,
  txData as assetOrderTypedData,
} from './assetOrder/mocks';
import {
  parseTxData as batchSellNFTData,
  txData as batchSellNFTTypedData,
} from './batchSellNFT/mocks';
import {
  parseTxData as buyNFTData,
  txData as buyNFTTypedData,
} from './buyNFT/mocks';
import {
  parseTxData as sellNFTData,
  txData as sellNFTTypedData,
} from './sellNFT/mocks';
import {
  parseTxData as swapTokenOrderData,
  txData as swapTokenOrderTypedData,
} from './swapTokenOrder/mocks';

const displayOnlyScenarios = [
  {
    kind: 'assetOrder',
    action: assetOrderData.action,
    typedData: assetOrderTypedData,
    sender: SENDER,
    chainId: ETH_CHAIN_ID,
  },
  {
    kind: 'buyNFT',
    action: buyNFTData.action,
    typedData: buyNFTTypedData,
    sender: '0xc24a6988496b4d9b3c7ce42c5f865c2f634f184c',
    chainId: 'linea',
  },
  {
    kind: 'sellNFT',
    action: sellNFTData.action,
    typedData: sellNFTTypedData,
    sender: SENDER,
    chainId: ETH_CHAIN_ID,
  },
  {
    kind: 'batchSellNFT',
    action: batchSellNFTData.action,
    typedData: batchSellNFTTypedData,
    sender: '0xcb1605ed17f6145db16e26e1d8adfe8f4b175377',
    chainId: ETH_CHAIN_ID,
  },
] as const;

const parseTypedAction = (
  action: unknown,
  typedData: unknown,
  sender: string
) =>
  parseAction({
    type: 'typed_data',
    data: action as any,
    typedData: typedData as any,
    sender,
  }) as ParsedTypedDataActionData;

test.each(displayOnlyScenarios)(
  '$kind uses the security gate without waiting for display data',
  async ({ kind, action, typedData, sender, chainId }) => {
    const actionData = parseTypedAction(action, typedData, sender);
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
    const options = {
      type: 'typed_data' as const,
      actionData,
      chainId,
      sender,
      walletProvider,
      apiProvider: stagedApiProvider as any,
    };

    const stagePromise = fetchStagedActionRequiredData(options);
    await Promise.resolve();
    expect(stagedApiProvider.getContractInfo).toHaveBeenCalledTimes(1);
    expect(stagedApiProvider.hasInteraction).toHaveBeenCalledTimes(1);

    const stage = await stagePromise;
    expect(stage.kind).toBe(kind);
    if (stage.kind === 'legacy') {
      throw new Error(`${kind} should use the staged security gate`);
    }
    expect(stage.securityData).toEqual({
      id: actionData.contractId,
      sender,
    });

    const legacyRequireData = await fetchActionRequiredData({
      ...options,
      apiProvider,
    });
    await expect(
      formatStagedSecurityEngineContext(
        {
          type: 'typed_data',
          actionData,
          chainId,
          isTestnet: false,
          provider: formatProvider,
          origin: ORIGIN,
        },
        stage
      )
    ).resolves.toEqual(
      await formatSecurityEngineContext({
        type: 'typed_data',
        actionData,
        requireData: legacyRequireData,
        chainId,
        isTestnet: false,
        provider: formatProvider,
        origin: ORIGIN,
      })
    );

    resolveContract({
      protocol: { name: 'Test', logo_url: '' },
      create_at: 1,
      credit: { rank_at: 2 },
    });
    resolveInteraction({ has_interaction: true });
    await expect(stage.displayData).resolves.toEqual({
      protocol: { name: 'Test', logo_url: '' },
      bornAt: 1,
      rank: 2,
      hasInteraction: true,
    });
  }
);

test.each(displayOnlyScenarios)(
  '$kind ignores display failures after its security gate',
  async ({ action, typedData, sender, chainId }) => {
    const actionData = parseTypedAction(action, typedData, sender);
    const stage = await fetchStagedActionRequiredData({
      type: 'typed_data',
      actionData,
      chainId,
      sender,
      walletProvider,
      apiProvider: {
        ...apiProvider,
        getContractInfo: jest.fn(() => {
          throw new Error('display failed');
        }),
        hasInteraction: jest.fn(() => {
          throw new Error('display failed');
        }),
      } as any,
    });

    if (stage.kind === 'legacy') {
      throw new Error(
        'display-only action should use the staged security gate'
      );
    }
    await expect(stage.displayData).resolves.toBeNull();
  }
);

test.each([
  'assetOrder',
  'buyNFT',
  'sellNFT',
  'batchSellNFT',
  'swapTokenOrder',
])('%s falls back to legacy without a contract id', async (kind) => {
  const stage = await fetchStagedActionRequiredData({
    type: 'typed_data',
    actionData: { [kind]: {} } as ParsedTypedDataActionData,
    chainId: ETH_CHAIN_ID,
    sender: SENDER,
    walletProvider,
    apiProvider,
  });

  expect(stage.kind).toBe('legacy');
});

test('swap token order waits for its receiver safety gate, not display data', async () => {
  const actionData = parseTypedAction(
    swapTokenOrderData.action,
    swapTokenOrderTypedData,
    SENDER
  );
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
  const options = {
    type: 'typed_data' as const,
    actionData,
    chainId: ETH_CHAIN_ID,
    sender: SENDER,
    walletProvider: stagedWalletProvider,
    apiProvider: stagedApiProvider as any,
  };

  const stagePromise = fetchStagedActionRequiredData(options);
  await Promise.resolve();
  expect(stagedApiProvider.getContractInfo).toHaveBeenCalledTimes(1);
  expect(stagedApiProvider.hasInteraction).toHaveBeenCalledTimes(1);
  expect(stagedWalletProvider.hasAddress).toHaveBeenCalledWith(
    actionData.swapTokenOrder?.receiver
  );

  resolveReceiver(true);
  const stage = await stagePromise;
  expect(stage.kind).toBe('swapTokenOrder');
  if (stage.kind !== 'swapTokenOrder') {
    throw new Error('swap token order should use the staged security gate');
  }
  expect(stage.securityData).toEqual({
    id: actionData.contractId,
    sender: SENDER,
    receiverInWallet: true,
  });

  const stagedFormatProvider = {
    ...formatProvider,
    hasAddress: jest.fn(() => {
      throw new Error('staged formatter must not repeat the receiver lookup');
    }),
  };
  const stagedContext = await formatStagedSecurityEngineContext(
    {
      type: 'typed_data',
      actionData,
      chainId: ETH_CHAIN_ID,
      isTestnet: false,
      provider: stagedFormatProvider,
      origin: ORIGIN,
    },
    stage
  );
  expect(stagedFormatProvider.hasAddress).not.toHaveBeenCalled();

  const legacyContext = await formatSecurityEngineContext({
    type: 'typed_data',
    actionData,
    requireData: await fetchActionRequiredData({
      ...options,
      walletProvider,
      apiProvider,
    }),
    chainId: ETH_CHAIN_ID,
    isTestnet: false,
    provider: {
      ...formatProvider,
      hasAddress: jest.fn(() => Promise.resolve(true)),
    },
    origin: ORIGIN,
  });
  expect(stagedContext).toEqual(legacyContext);

  resolveContract({
    protocol: { name: 'Test', logo_url: '' },
    create_at: 1,
    credit: { rank_at: 2 },
  });
  resolveInteraction({ has_interaction: true });
  await expect(stage.displayData).resolves.toEqual({
    protocol: { name: 'Test', logo_url: '' },
    bornAt: 1,
    rank: 2,
    hasInteraction: true,
  });
});

test('swap token order rejects when its receiver safety lookup fails', async () => {
  const actionData = parseTypedAction(
    swapTokenOrderData.action,
    swapTokenOrderTypedData,
    SENDER
  );

  await expect(
    fetchStagedActionRequiredData({
      type: 'typed_data',
      actionData,
      chainId: ETH_CHAIN_ID,
      sender: SENDER,
      walletProvider: {
        ...walletProvider,
        hasAddress: jest.fn(() => {
          throw new Error('receiver safety lookup failed');
        }),
      },
      apiProvider,
    })
  ).rejects.toThrow('receiver safety lookup failed');
});
