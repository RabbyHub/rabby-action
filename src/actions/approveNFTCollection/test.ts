import {
  apiProvider,
  formatProvider,
  walletProvider,
} from '../../../__mocks__';
import { ParsedTransactionActionData } from '../../types';
import { parseTxData, preExecData, txData } from './mocks';
import { parseActionApproveNFTCollection } from './parseAction';
import { fetchDataApproveNFTCollection } from './fetchData';
import { formatSecurityEngineApproveNFTCollection } from './formatSecurityEngine';

test.concurrent('ApproveNFTCollection', async () => {
  const actionData = (await parseActionApproveNFTCollection({
    type: 'transaction',
    data: parseTxData['action'],
    balanceChange: preExecData.balance_change,
    tx: txData,
    preExecVersion: preExecData.pre_exec_version,
    gasUsed: preExecData.gas.gas_used,
  })) as ParsedTransactionActionData;
  expect(actionData).toMatchSnapshot();

  const requireData = await fetchDataApproveNFTCollection({
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

  const ctx = await formatSecurityEngineApproveNFTCollection({
    type: 'transaction',
    actionData,
    requireData,
    chainId: 'eth',
    isTestnet: false,
    provider: formatProvider,
  });
  expect(ctx).toMatchSnapshot();
});
