import { walletProvider, SENDER, ETH_CHAIN_ID } from '../__mocks__';
import { loadStagedAction, stagedActionKinds } from './stagedActionRegistry';
import { parseAction } from './parseAction';
import { StagedActionKind } from './types';

/**
 * Staging only pays off when the security gate needs no network request. If
 * producing securityData itself waits on the backend, sign-ready does not move
 * at all, and the dual state and Unknown semantics are pure overhead.
 *
 * The check needs no human auditing: replace every apiProvider method with a
 * promise that never resolves, then call load(). Returning means securityData
 * is local; hanging means the gate waits on the network.
 */

type Scenario = {
  type: 'transaction' | 'typed_data';
  dir: string;
  sender?: string;
  chainId?: string;
  // A few mocks use suffixed export names or share another fixture
  parseKey?: string;
  txKey?: string;
  preExecKey?: string;
};

// Every registry kind must be listed here; an assertion below enforces it.
const SCENARIOS: Record<StagedActionKind, Scenario> = {
  swap: { type: 'transaction', dir: 'swap' },
  wrapToken: { type: 'transaction', dir: 'wrapToken' },
  unWrapToken: { type: 'transaction', dir: 'unwrapToken' },
  crossToken: { type: 'transaction', dir: 'crossToken' },
  // crossSwapToken has no fixture of its own and reuses the swap one;
  // both go through receiverCheckedSwap.
  crossSwapToken: { type: 'transaction', dir: 'swap' },
  multiSwap: { type: 'transaction', dir: 'multiSwap' },
  swapLimitPay: { type: 'transaction', dir: 'swapLimitPay' },
  addLiquidity: { type: 'transaction', dir: 'addLiquidity' },
  transferOwner: { type: 'transaction', dir: 'transferOwner' },
  contractCall: {
    type: 'transaction',
    dir: 'contractCall',
    parseKey: 'parseTxDataTransaction',
    txKey: 'txDataTransaction',
    preExecKey: 'preExecDataTransaction',
  },
  assetOrder: { type: 'typed_data', dir: 'assetOrder' },
  buyNFT: {
    type: 'typed_data',
    dir: 'buyNFT',
    sender: '0xc24a6988496b4d9b3c7ce42c5f865c2f634f184c',
    chainId: 'linea',
  },
  sellNFT: { type: 'typed_data', dir: 'sellNFT' },
  batchSellNFT: {
    type: 'typed_data',
    dir: 'batchSellNFT',
    sender: '0xcb1605ed17f6145db16e26e1d8adfe8f4b175377',
  },
  swapTokenOrder: { type: 'typed_data', dir: 'swapTokenOrder' },
};

const hangingApiProvider = new Proxy(
  {},
  { get: () => () => new Promise(() => undefined) }
) as any;

const buildOptions = (kind: StagedActionKind) => {
  const scenario = SCENARIOS[kind];
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const raw = require(`./actions/${scenario.dir}/mocks`);
  const mod = {
    parseTxData: raw[scenario.parseKey || 'parseTxData'],
    txData: raw[scenario.txKey || 'txData'],
    preExecData: raw[scenario.preExecKey || 'preExecData'],
  };
  const sender = scenario.sender || SENDER;
  const chainId = scenario.chainId || ETH_CHAIN_ID;
  const common = {
    chainId,
    sender,
    walletProvider,
    apiProvider: hangingApiProvider,
  };

  if (scenario.type === 'typed_data') {
    return {
      ...common,
      type: 'typed_data' as const,
      actionData: parseAction({
        type: 'typed_data',
        data: mod.parseTxData.action,
        typedData: mod.txData,
        sender,
      } as any),
    };
  }

  const tx = mod.txData || {
    to: '0xcontract',
    from: sender,
    value: '0x0',
    data: '0x',
  };
  return {
    ...common,
    type: 'transaction' as const,
    tx,
    actionData: parseAction({
      type: 'transaction',
      data: mod.parseTxData.action,
      balanceChange: mod.preExecData?.balance_change,
      tx,
      preExecVersion: mod.preExecData?.pre_exec_version ?? 'v2',
      gasUsed: mod.preExecData?.gas?.gas_used ?? 0,
      sender,
    } as any),
  };
};

const HANG = Symbol('hang');

const probeGate = async (kind: StagedActionKind) => {
  const result = await Promise.race([
    loadStagedAction(kind, buildOptions(kind) as any),
    new Promise((resolve) => setTimeout(() => resolve(HANG), 100)),
  ]);
  if (result === HANG) return 'needs-network';
  if (result === null) return 'falls-back-to-legacy';
  return 'local';
};

test('every registry kind has an audit scenario', () => {
  expect(Object.keys(SCENARIOS).sort()).toEqual([...stagedActionKinds].sort());
});

/**
 * Falling back to legacy is safe -- staging never ran for that action. What is
 * harmful is staging that still waits on the network: it carries the dual state
 * and Unknown semantics without moving sign-ready at all. The registry must not
 * contain such a kind.
 */
test.each(stagedActionKinds)(
  '%s must have a network-free security gate if it stages',
  async (kind) => {
    await expect(probeGate(kind)).resolves.not.toBe('needs-network');
  }
);
