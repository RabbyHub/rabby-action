import {
  apiProvider,
  ETH_CHAIN_ID,
  formatProvider,
  SENDER,
  walletProvider,
} from '../../../__mocks__';
import {
  ApproveTokenRequireData,
  ParsedTransactionActionData,
} from '../../types';
import { parseTxData, preExecData, txData } from './mocks';
import { parseActionApproveToken } from './parseAction';
import { fetchDataApproveToken } from './fetchData';
import { formatSecurityEngineApproveToken } from './formatSecurityEngine';
import {
  parseAction,
  fetchActionRequiredData,
  formatSecurityEngineContext,
} from '../..';

const createApproveTokenActionData = () =>
  parseActionApproveToken({
    type: 'transaction',
    data: parseTxData['action'],
    balanceChange: preExecData.balance_change,
    sender: txData.from,
    preExecVersion: preExecData.pre_exec_version,
    gasUsed: preExecData.gas.gas_used,
    tx: txData,
  }) as ParsedTransactionActionData;

/**
 * https://extension-tests.revoke.cash/
 * [approve()] button
 */
test.each([
  [
    parseActionApproveToken,
    fetchDataApproveToken,
    formatSecurityEngineApproveToken,
  ],
  [parseAction, fetchActionRequiredData, formatSecurityEngineContext],
])('ApproveToken', async (_parseAction, _fetchData, _format) => {
  const actionData = _parseAction({
    type: 'transaction',
    data: parseTxData['action'],
    balanceChange: preExecData.balance_change,
    sender: txData.from,
    preExecVersion: preExecData.pre_exec_version,
    gasUsed: preExecData.gas.gas_used,
    tx: txData,
  }) as ParsedTransactionActionData;
  expect(actionData).toMatchSnapshot('parseActionApproveToken');

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
  expect(requireData).toMatchSnapshot('fetchDataApproveToken');

  const ctx = await _format({
    type: 'transaction',
    actionData,
    requireData,
    chainId: ETH_CHAIN_ID,
    isTestnet: false,
    provider: formatProvider,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEngineApproveToken');
});

test('loads the token balance from wallet ethRpc', async () => {
  const actionData = createApproveTokenActionData();
  const token = actionData.approveToken!.token;
  const ethRpc = jest.fn().mockResolvedValue('0xde0b6b3a7640000');
  const getToken = jest.fn().mockResolvedValue({
    ...token,
    amount: 0,
    raw_amount: '0',
    raw_amount_hex_str: '0x0',
  });

  const requireData = (await fetchDataApproveToken({
    type: 'transaction',
    actionData,
    contractCall: parseTxData.contract_call,
    chainId: ETH_CHAIN_ID,
    sender: SENDER,
    walletProvider: {
      ...walletProvider,
      ethRpc,
    },
    tx: txData,
    apiProvider: Object.assign(Object.create(apiProvider), { getToken }),
  })) as ApproveTokenRequireData;

  expect(ethRpc).toHaveBeenCalledWith(
    {
      method: 'eth_call',
      params: [
        {
          to: token.id,
          data: `0x70a08231${SENDER.slice(2).padStart(64, '0')}`,
        },
        'latest',
      ],
    },
    ETH_CHAIN_ID
  );
  expect(getToken).not.toHaveBeenCalled();
  expect(requireData.token).toMatchObject({
    id: token.id,
    name: token.name,
    amount: 1,
    raw_amount: '1000000000000000000',
    raw_amount_hex_str: '0xde0b6b3a7640000',
  });
});

test('keeps parsed token data when wallet ethRpc returns an invalid balance', async () => {
  const actionData = createApproveTokenActionData();
  const token = actionData.approveToken!.token;

  const requireData = (await fetchDataApproveToken({
    type: 'transaction',
    actionData,
    contractCall: parseTxData.contract_call,
    chainId: ETH_CHAIN_ID,
    sender: SENDER,
    walletProvider: {
      ...walletProvider,
      ethRpc: jest.fn().mockResolvedValue('not-a-hex-quantity'),
    },
    tx: txData,
    apiProvider,
  })) as ApproveTokenRequireData;

  expect(requireData.token).toMatchObject({
    id: token.id,
    name: token.name,
    amount: 0,
    raw_amount_hex_str: '0x0',
  });
});

test('keeps parsed token data when apiProvider returns no token', async () => {
  const actionData = createApproveTokenActionData();
  const token = actionData.approveToken!.token;
  const getToken = jest.fn().mockResolvedValue(undefined);

  const requireData = (await fetchDataApproveToken({
    type: 'transaction',
    actionData,
    contractCall: parseTxData.contract_call,
    chainId: ETH_CHAIN_ID,
    sender: SENDER,
    walletProvider,
    tx: txData,
    apiProvider: Object.assign(Object.create(apiProvider), { getToken }),
  })) as ApproveTokenRequireData;

  expect(getToken).toHaveBeenCalledWith(SENDER, ETH_CHAIN_ID, token.id);
  expect(requireData.token).toMatchObject({
    id: token.id,
    name: token.name,
    amount: 0,
    raw_amount_hex_str: '0x0',
  });
});
