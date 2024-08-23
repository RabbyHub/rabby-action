import { CHAINS } from '@debank/common';

export const walletProvider = {
  findChain: () => CHAINS.ETH,
  ALIAS_ADDRESS: {
    '0x7559e1bbe06e94aeed8000d5671ed424397d25b5': 'Rabby Gas Top Up',
    '0x1f1f2bf8942861e6194fda1c0a9f13921c0cf117': 'Rabby Gas Top Up',
    '0x76dd65529dc6c073c1e0af2a5ecc78434bdbf7d9': 'Free Gas',
  },
  hasPrivateKeyInWallet: jest.fn().mockReturnValue('Simple Key Pair'),
  hasAddress: jest.fn().mockReturnValue(true),
  getWhitelist: jest.fn().mockReturnValue([]),
  isWhitelistEnabled: jest.fn().mockReturnValue(false),
  getPendingTxsByNonce: jest.fn().mockReturnValue([]),
};
