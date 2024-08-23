import {
  apiProvider,
  CHAIN_ID,
  formatProvider,
  SENDER,
  walletProvider,
} from '../../../__mocks__';
import { ParsedTransactionActionData } from '../../types';
import { parseTxData, preExecData, txData } from './mocks';
import { parseActionApproveNFTCollection } from './parseAction';
import { fetchDataApproveNFTCollection } from './fetchData';
import { formatSecurityEngineApproveNFTCollection } from './formatSecurityEngine';

test('ApproveNFTCollection', async () => {
  const actionData = (await parseActionApproveNFTCollection({
    type: 'transaction',
    data: parseTxData['action'],
    balanceChange: preExecData.balance_change,
    tx: txData,
    preExecVersion: preExecData.pre_exec_version,
    gasUsed: preExecData.gas.gas_used,
  })) as ParsedTransactionActionData;
  expect(actionData).toMatchSnapshot('parseActionApproveNFTCollection');

  const requireData = await fetchDataApproveNFTCollection({
    type: 'transaction',
    actionData,
    contractCall: parseTxData.contract_call,
    chainId: CHAIN_ID,
    sender: SENDER,
    walletProvider,
    tx: txData,
    apiProvider,
  });
  expect(requireData).toMatchSnapshot('fetchDataApproveNFTCollection');

  const ctx = await formatSecurityEngineApproveNFTCollection({
    type: 'transaction',
    actionData,
    requireData,
    chainId: CHAIN_ID,
    isTestnet: false,
    provider: formatProvider,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEngineApproveNFTCollection');
});
