import { SENDER, ORIGIN } from '../../../__mocks__';
import { parseTxData, text } from './mocks';
import { parseActionVerifyAddress } from './parseAction';
import { formatSecurityEngineVerifyAddress } from './formatSecurityEngine';
import { parseTextAction } from '../../utils/parseTextAction';

/**
 * https://metamask.github.io/test-dapp/#siwe
 * Sign In With Ethereum
 * - [Sign In With Ethereum] button
 */
test('AssetOrder -> Text', async () => {
  const actionData = parseTextAction(parseActionVerifyAddress)({
    type: 'text',
    data: parseTxData['action'],
    text,
    sender: SENDER,
  });
  expect(actionData).toMatchSnapshot('parseActionVerifyAddress');

  const ctx = await formatSecurityEngineVerifyAddress({
    type: 'text',
    actionData,
    origin: ORIGIN,
  });
  expect(ctx).toMatchSnapshot('formatSecurityEngineVerifyAddress');
});
