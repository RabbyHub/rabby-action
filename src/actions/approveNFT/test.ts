import {
  apiProvider,
  formatProvider,
  walletProvider,
} from '../../../__mocks__';
import { ParsedTransactionActionData } from '../../types';
import { fetchDataApproveNFT } from './fetchData';
import { formatSecurityEngineApproveNFT } from './formatSecurityEngine';
import { parseTxData, preExecData, txData } from './mocks';
import { parseActionApproveNFT } from './parseAction';

test.concurrent('ApproveNFT', async () => {
  const actionData = (await parseActionApproveNFT({
    type: 'transaction',
    data: parseTxData['action'],
    balanceChange: preExecData.balance_change,
    tx: txData,
    preExecVersion: preExecData.pre_exec_version,
    gasUsed: preExecData.gas.gas_used,
  })) as ParsedTransactionActionData;
  expect(actionData).toMatchSnapshot();

  const requireData = await fetchDataApproveNFT({
    type: 'transaction',
    actionData,
    contractCall: parseTxData.contract_call,
    chainId: 'eth',
    sender: txData.from,
    walletProvider,
    tx: txData,
    apiProvider,
  });
  expect(requireData).toMatchSnapshot();

  const ctx = await formatSecurityEngineApproveNFT({
    type: 'transaction',
    actionData,
    requireData,
    chainId: 'eth',
    isTestnet: false,
    provider: formatProvider,
  });
  expect(ctx).toMatchSnapshot();
});
