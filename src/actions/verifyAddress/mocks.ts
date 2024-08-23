export const parseTxData = {
  action: {
    type: 'verify_address',
    data: {
      user: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85',
      allow_origins: ['https://metamask.github.io'],
      protocol: null,
      desc: 'You are verifying address on metamask.github.io',
    },
    is_asset_changed: false,
    is_involving_privacy: true,
  },
  log_id: 23739932,
} as any;

export const text = `metamask.github.io wants you to sign in with your Ethereum account:
0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85

I accept the MetaMask Terms of Service: https://community.metamask.io/tos

URI: https://metamask.github.io
Version: 1
Chain ID: 1
Nonce: 32891757
Issued At: 2021-09-30T16:25:24.000Z`;
