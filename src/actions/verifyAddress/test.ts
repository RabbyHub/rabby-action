import { SENDER, ORIGIN, formatProvider } from '../../../__mocks__';
import { parseTxData, text } from './mocks';
import { parseActionVerifyAddress } from './parseAction';
import { formatSecurityEngineVerifyAddress } from './formatSecurityEngine';
import { parseTextAction } from '../../utils/parseTextAction';
import { parseAction, formatSecurityEngineContext } from '../..';

/**
 * https://metamask.github.io/test-dapp/#siwe
 * Sign In With Ethereum
 * - [Sign In With Ethereum] button
 */
test.each([
  [
    parseTextAction(parseActionVerifyAddress),
    formatSecurityEngineVerifyAddress,
  ],
  [parseAction, formatSecurityEngineContext],
])('VerifyAddress -> Text', async (_parseAction, _format) => {
  const actionData = _parseAction({
    type: 'text',
    data: parseTxData['action'],
    text,
    sender: SENDER,
  });
  expect(actionData).toMatchSnapshot('parseActionVerifyAddress');

  const ctx = await _format({
    type: 'text',
    actionData,
    origin: ORIGIN,
    provider: formatProvider,
    isTestnet: false,
    chainId: 'eth',
    requireData: null,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEngineVerifyAddress');
});
