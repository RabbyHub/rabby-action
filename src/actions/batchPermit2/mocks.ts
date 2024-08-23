export const parseTxData = {
  action: {
    type: 'permit2_approve_token_list',
    data: {
      permit2_id: '0x000000000022d473030f116ddee9f6b43ac78ba3',
      spender: '0xef1c6e67703c7bd7107eed8303fbe6ec2554bf6b',
      token_list: [
        {
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
          price: 0.9998000399920016,
          price_24h_change: 9.998000399924235e-5,
          credit_score: 18127653.217581443,
          is_verified: true,
          is_scam: false,
          is_suspicious: false,
          is_core: true,
          is_wallet: true,
          time_at: 1533324504.0,
          amount: 1.461501637330903e42,
          raw_amount: '1461501637330902918203684832716283019655932542975',
          permit2_allowance_amount: 1.157920892373162e71,
          permit2_allowance_raw_amount:
            '115792089237316195423570985008687907853269984665640564039457584007912338673734',
        },
        {
          id: '0x6b175474e89094c44da98b954eedeac495271d0f',
          chain: 'eth',
          name: 'Dai Stablecoin',
          symbol: 'DAI',
          display_symbol: '',
          optimized_symbol: 'DAI',
          decimals: 18,
          logo_url:
            'https://static.debank.com/image/eth_token/logo_url/0x6b175474e89094c44da98b954eedeac495271d0f/549c4205dbb199f1b8b03af783f35e71.png',
          protocol_id: 'makerdao',
          price: 0.9999,
          price_24h_change: 0.00010002000400078914,
          credit_score: 4828481.278011774,
          is_verified: true,
          is_scam: false,
          is_suspicious: false,
          is_core: true,
          is_wallet: true,
          time_at: 1573672677.0,
          amount: 1.461501637330903e30,
          raw_amount: '1461501637330902918203684832716283019655932542975',
          permit2_allowance_amount: 1.157920892373162e59,
          permit2_allowance_raw_amount:
            '115792089237316195423570985008687907853269984665640564039457584007913129639935',
        },
        {
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
          price: 1.0001,
          price_24h_change: -8.99829032483063e-5,
          credit_score: 15168059.802964294,
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
        {
          id: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
          chain: 'eth',
          name: 'Uniswap',
          symbol: 'UNI',
          display_symbol: null,
          optimized_symbol: 'UNI',
          decimals: 18,
          logo_url:
            'https://static.debank.com/image/eth_token/logo_url/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984/fcee0c46fc9864f48ce6a40ed1cdd135.png',
          protocol_id: 'uniswap3',
          price: 6.901031828423142,
          price_24h_change: -0.013843173669132663,
          credit_score: 932856.2496233443,
          is_verified: true,
          is_scam: false,
          is_suspicious: false,
          is_core: true,
          is_wallet: true,
          time_at: 1600107086.0,
          amount: 1.461501637330903e30,
          raw_amount: '1461501637330902918203684832716283019655932542975',
          permit2_allowance_amount: 0.0,
          permit2_allowance_raw_amount: '0',
        },
      ],
      expire_at: 1680868093,
    },
    expire_at: 1678277893,
  },
  log_id: 6318617,
} as any;

export const txData = {
  types: {
    PermitBatch: [
      {
        name: 'details',
        type: 'PermitDetails[]',
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
  primaryType: 'PermitBatch',
  domain: {
    name: 'Permit2',
    chainId: '1',
    verifyingContract: '0x000000000022d473030f116ddee9f6b43ac78ba3',
  },
  message: {
    details: [
      {
        token: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        amount: '1461501637330902918203684832716283019655932542975',
        expiration: '1680868093',
        nonce: '0',
      },
      {
        token: '0x6b175474e89094c44da98b954eedeac495271d0f',
        amount: '1461501637330902918203684832716283019655932542975',
        expiration: '1680868093',
        nonce: '0',
      },
      {
        token: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        amount: '1461501637330902918203684832716283019655932542975',
        expiration: '1680868093',
        nonce: '0',
      },
      {
        token: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
        amount: '1461501637330902918203684832716283019655932542975',
        expiration: '1680868093',
        nonce: '0',
      },
    ],
    spender: '0xef1c6e67703c7bd7107eed8303fbe6ec2554bf6b',
    sigDeadline: '1678277893',
  },
};
