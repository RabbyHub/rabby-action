export const parseTxData = {
  action: {
    type: 'permit1_approve_token',
    data: {
      spender: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
      token: {
        id: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        chain: 'eth',
        name: 'USD Coin',
        symbol: 'USDC',
        display_symbol: null,
        optimized_symbol: 'USDC',
        decimals: 6,
        logo_url:
          'https://static.debank.com/image/eth_token/logo_url/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48/fffcd27b9efff5a86ab942084c05924d.png',
        protocol_id: '',
        price: 0.9996001599360256,
        price_24h_change: 0.0,
        credit_score: 1285824.482281159,
        is_verified: true,
        is_scam: false,
        is_suspicious: false,
        is_core: true,
        is_wallet: true,
        time_at: 1533324504.0,
        amount: 25.0,
        raw_amount: '25000000',
      },
    },
    expire_at: 1800000000,
  },
  log_id: 6517698,
} as any;

export const txData = {
  types: {
    EIP712Domain: [
      {
        name: 'name',
        type: 'string',
      },
      {
        name: 'version',
        type: 'string',
      },
      {
        name: 'chainId',
        type: 'uint256',
      },
      {
        name: 'verifyingContract',
        type: 'address',
      },
    ],
    Permit: [
      {
        name: 'owner',
        type: 'address',
      },
      {
        name: 'spender',
        type: 'address',
      },
      {
        name: 'value',
        type: 'uint256',
      },
      {
        name: 'nonce',
        type: 'uint256',
      },
      {
        name: 'deadline',
        type: 'uint256',
      },
    ],
  },
  primaryType: 'Permit',
  domain: {
    name: 'USD Coin',
    version: '2',
    verifyingContract: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    chainId: 1,
  },
  message: {
    owner: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85',
    spender: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
    value: '25000000',
    nonce: 5,
    deadline: 1800000000,
  },
};
