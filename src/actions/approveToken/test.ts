import {
  apiProvider,
  CHAIN_ID,
  formatProvider,
  SENDER,
  walletProvider,
} from '../../../__mocks__';
import { ParsedTransactionActionData } from '../../types';
import { parseTxData, preExecData, txData } from './mocks';
import { parseActionApproveToken } from './parseAction';
import { fetchDataApproveToken } from './fetchData';
import { formatSecurityEngineApproveToken } from './formatSecurityEngine';

test('ApproveToken', async () => {
  const actionData = (await parseActionApproveToken({
    type: 'transaction',
    data: parseTxData['action'],
    balanceChange: preExecData.balance_change,
    tx: txData,
    preExecVersion: preExecData.pre_exec_version,
    gasUsed: preExecData.gas.gas_used,
  })) as ParsedTransactionActionData;
  expect(actionData).toMatchSnapshot('parseActionApproveToken');

  const requireData = await fetchDataApproveToken({
    type: 'transaction',
    actionData,
    contractCall: parseTxData.contract_call,
    chainId: CHAIN_ID,
    sender: SENDER,
    walletProvider,
    tx: txData,
    apiProvider,
  });
  expect(requireData).toMatchSnapshot('fetchDataApproveToken');

  const ctx = await formatSecurityEngineApproveToken({
    type: 'transaction',
    actionData,
    requireData,
    chainId: CHAIN_ID,
    isTestnet: false,
    provider: formatProvider,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEngineApproveToken');
});
