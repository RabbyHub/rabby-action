import {
  apiProvider,
  ETH_CHAIN_ID,
  SENDER,
  walletProvider,
} from '../../__mocks__';
import { fetchStagedActionRequiredData } from '..';
import {
  ParsedTransactionActionData,
  ParsedTypedDataActionData,
} from '../types';
import { txData } from './addLiquidity/mocks';

// The dispatcher may only stage a single recognised action. Anything else must
// fall back to the full legacy required data, or a staged gate would silently
// drop the rules belonging to the actions it skipped.

const spender = '0x7a250d5630b4cf539739df2c5dacb4c659f2488d';
const token = {
  id: '0x6b175474e89094c44da98b954eedeac495271d0f',
  chain: ETH_CHAIN_ID,
  decimals: 18,
} as any;

const runTransaction = (actionData: unknown, extra: object = {}) =>
  fetchStagedActionRequiredData({
    type: 'transaction',
    actionData,
    contractCall: null,
    chainId: ETH_CHAIN_ID,
    sender: SENDER,
    walletProvider,
    tx: txData,
    apiProvider,
    ...extra,
  } as any);

test('two staged actions fall back to legacy', async () => {
  const stage = await runTransaction({
    approveToken: { spender, token },
    swap: { receiver: SENDER },
  } as ParsedTransactionActionData);

  expect(stage.kind).toBe('legacy');
});

test('a staged action combined with an unregistered action falls back to legacy', async () => {
  const stage = await runTransaction({
    approveToken: { spender, token },
    deployContract: {},
  });

  expect(stage.kind).toBe('legacy');
});

test('contractCall combined with common falls back to legacy', async () => {
  const stage = await runTransaction(
    {
      contractCall: {},
      common: {
        title: 't',
        desc: 'd',
        is_asset_changed: false,
        is_involving_privacy: false,
        from: SENDER,
      },
    },
    { contractCall: { contract: { id: spender } } }
  );

  expect(stage.kind).toBe('legacy');
});

test('an unregistered action alone falls back to legacy', async () => {
  const stage = await runTransaction({ deployContract: {} });

  expect(stage.kind).toBe('legacy');
});

test('text actions fall back to legacy', async () => {
  const stage = await fetchStagedActionRequiredData({
    type: 'text',
    actionData: { createKey: {} },
    chainId: ETH_CHAIN_ID,
    sender: SENDER,
    walletProvider,
    apiProvider,
  } as any);

  expect(stage.kind).toBe('legacy');
});

test('metadata keys are not counted as actions', async () => {
  const stage = await fetchStagedActionRequiredData({
    type: 'typed_data',
    actionData: {
      buyNFT: {},
      chainId: ETH_CHAIN_ID,
      sender: SENDER,
      actionType: 'buy_nft',
      brand: { logo_url: '', name: 'x' },
      contractId: spender,
    } as unknown as ParsedTypedDataActionData,
    chainId: ETH_CHAIN_ID,
    sender: SENDER,
    walletProvider,
    apiProvider,
  } as any);

  expect(stage.kind).toBe('buyNFT');
});
