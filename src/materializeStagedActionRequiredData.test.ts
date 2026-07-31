import { materializeStagedActionRequiredData } from './materializeStagedActionRequiredData';

test('keeps staged order receiver state out of legacy swap-token-order data', async () => {
  await expect(
    materializeStagedActionRequiredData({
      kind: 'swapTokenOrder',
      securityData: {
        id: '0xcontract',
        sender: '0xsender',
        receiverInWallet: true,
      },
      displayData: Promise.resolve({
        protocol: null,
        bornAt: 1,
        rank: null,
        hasInteraction: false,
      }),
    })
  ).resolves.toEqual({
    status: 'ready',
    requiredData: {
      id: '0xcontract',
      sender: '0xsender',
      protocol: null,
      bornAt: 1,
      rank: null,
      unexpectedAddr: null,
      receiverInWallet: false,
      hasInteraction: false,
    },
  });
});
