import {
  apiProvider,
  formatProvider,
  walletProvider,
  SENDER,
  ETH_CHAIN_ID,
  ORIGIN,
} from '../../../__mocks__';
import {
  parseTxDataTypedData,
  parseTxDataTypedDataWithAction,
  txDataTypedData,
  txDataTypedDataWithAction,
} from './mocks';
import { parseActionCommon } from './parseAction';
import { fetchDataCommon } from './fetchData';
import { formatSecurityEngineCommon } from './formatSecurityEngine';
import { parseTypedDataAction } from '../../utils/parseTypedDataAction';
import {
  parseAction,
  fetchActionRequiredData,
  formatSecurityEngineContext,
} from '../..';

/**
 * https://metamask.github.io/test-dapp/#signTypedDataV4
 * Sign Typed Data V4
 * [Sign] button
 */
test.each([
  [
    parseTypedDataAction(parseActionCommon),
    fetchDataCommon,
    formatSecurityEngineCommon,
  ],
  [parseAction, fetchActionRequiredData, formatSecurityEngineContext],
])('Common -> TypedData', async (_parseAction, _fetchData, _format) => {
  const actionData = _parseAction({
    type: 'typed_data',
    data: parseTxDataTypedData['action'],
    typedData: txDataTypedData,
    sender: SENDER,
  });
  expect(actionData).toMatchSnapshot('parseActionCommon');

  const requireData = await _fetchData({
    type: 'typed_data',
    actionData,
    chainId: ETH_CHAIN_ID,
    walletProvider,
    apiProvider,
    sender: SENDER,
  });
  expect(requireData).toMatchSnapshot('fetchDataCommon');

  const ctx = await _format({
    type: 'typed_data',
    actionData,
    requireData,
    chainId: ETH_CHAIN_ID,
    isTestnet: false,
    provider: formatProvider,
    origin: ORIGIN,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEngineCommon');
});

/**
 * send
 *  ```json
    {
      "method": "eth_signTypedData_v4",
      "params": [
        "0x341a1fbd51825e5a107db54ccb3166deba145479",
        "{\"types\":{\"ClobAuth\":[{\"name\":\"address\",\"type\":\"address\"},{\"name\":\"timestamp\",\"type\":\"string\"},{\"name\":\"nonce\",\"type\":\"uint256\"},{\"name\":\"message\",\"type\":\"string\"}],\"EIP712Domain\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"version\",\"type\":\"string\"},{\"name\":\"chainId\",\"type\":\"uint256\"}]},\"domain\":{\"name\":\"ClobAuthDomain\",\"version\":\"1\",\"chainId\":\"137\"},\"primaryType\":\"ClobAuth\",\"message\":{\"address\":\"0x341a1fbd51825e5a107db54ccb3166deba145479\",\"timestamp\":\"1724848671\",\"nonce\":\"0\",\"message\":\"This message attests that I control the given wallet\"}}"
      ]
    }
  ```
 */
test.each([
  [
    parseTypedDataAction(parseActionCommon),
    fetchDataCommon,
    formatSecurityEngineCommon,
  ],
  [parseAction, fetchActionRequiredData, formatSecurityEngineContext],
])(
  'Common -> TypedData -> with action',
  async (_parseAction, _fetchData, _format) => {
    const actionData = _parseAction({
      type: 'typed_data',
      data: parseTxDataTypedDataWithAction['action'],
      typedData: txDataTypedDataWithAction,
      sender: SENDER,
    });
    expect(actionData).toMatchSnapshot('parseActionCommon');

    const requireData = await _fetchData({
      type: 'typed_data',
      actionData,
      chainId: ETH_CHAIN_ID,
      walletProvider,
      apiProvider,
      sender: SENDER,
    });
    expect(requireData).toMatchSnapshot('fetchDataCommon');

    const ctx = await _format({
      type: 'typed_data',
      actionData,
      requireData,
      chainId: ETH_CHAIN_ID,
      isTestnet: false,
      provider: formatProvider,
      origin: ORIGIN,
    });
    expect(ctx).toMatchSnapshot('formatSecurityEngineCommon');
  }
);
