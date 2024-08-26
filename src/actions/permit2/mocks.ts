export const parseTxData = {
  action: {
    type: 'permit2_approve_token',
    data: {
      permit2_id: '0x000000000022d473030f116ddee9f6b43ac78ba3',
      spender: '0xef1c6e67703c7bd7107eed8303fbe6ec2554bf6b',
      token: {
        id: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        chain: 'eth',
        name: 'Tether USD',
        symbol: 'USDT',
        display_symbol: '',
        optimized_symbol: 'USDT',
        decimals: 6,
        logo_url:
          'https://static.debank.com/image/coin/logo_url/usdt/23af7472292cb41dc39b3f1146ead0fe.png',
        protocol_id: '',
        price: 1.00037,
        price_24h_change: 7.997680672612944e-5,
        credit_score: 1143577.2678722953,
        is_verified: true,
        is_scam: false,
        is_suspicious: false,
        is_core: true,
        is_wallet: true,
        time_at: 1511829681.0,
        amount: 1.461501637330903e42,
        raw_amount: '1461501637330902918203684832716283019655932542975',
        permit2_allowance_amount: 1.157920892373162e71,
        permit2_allowance_raw_amount:
          '115792089237316195423570985008687907853269984665640564039457584007913129639935',
      },
      expire_at: 1680793842,
    },
    expire_at: 1678203642,
  },
  log_id: 6488761,
} as any;

export const txData = {
  types: {
    PermitSingle: [
      {
        name: 'details',
        type: 'PermitDetails',
      },
      {
        name: 'spender',
        type: 'address',
      },
      {
        name: 'sigDeadline',
        type: 'uint256',
      },
    ],
    PermitDetails: [
      {
        name: 'token',
        type: 'address',
      },
      {
        name: 'amount',
        type: 'uint160',
      },
      {
        name: 'expiration',
        type: 'uint48',
      },
      {
        name: 'nonce',
        type: 'uint48',
      },
    ],
    EIP712Domain: [
      {
        name: 'name',
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
  },
  primaryType: 'PermitSingle',
  domain: {
    name: 'Permit2',
    chainId: '1',
    verifyingContract: '0x000000000022d473030f116ddee9f6b43ac78ba3',
  },
  message: {
    details: {
      token: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      amount: '1461501637330902918203684832716283019655932542975',
      expiration: '1680793842',
      nonce: '0',
    },
    spender: '0xef1c6e67703c7bd7107eed8303fbe6ec2554bf6b',
    sigDeadline: '1678203642',
  },
};
