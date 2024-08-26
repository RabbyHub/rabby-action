export const preExecData = {
  abi: {
    func: 'lockdown',
    params: [
      [
        [
          '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05',
          '0xb555edF5dcF85f42cEeF1f3630a52A108E55A654',
        ],
        [
          '0x4200000000000000000000000000000000000042',
          '0xb555edF5dcF85f42cEeF1f3630a52A108E55A654',
        ],
      ],
    ],
  },
  abi_str:
    '{\n    "func": "lockdown",\n    "params": [\n        [\n            [\n                "0x3c8B650257cFb5f272f799F5e2b4e65093a11a05",\n                "0xb555edF5dcF85f42cEeF1f3630a52A108E55A654"\n            ],\n            [\n                "0x4200000000000000000000000000000000000042",\n                "0xb555edF5dcF85f42cEeF1f3630a52A108E55A654"\n            ]\n        ]\n    ]\n}',
  balance_change: {
    success: true,
    error: null,
    send_token_list: [],
    receive_token_list: [],
    send_nft_list: [],
    receive_nft_list: [],
    usd_value_change: 0,
  },
  gas: {
    success: true,
    error: null,
    gas_used: 37671,
    gas_limit: 38036,
    gas_ratio: 1.3,
  },
  is_gnosis: false,
  native_token: {
    id: 'op',
    chain: 'op',
    name: 'ETH',
    symbol: 'ETH',
    display_symbol: null,
    optimized_symbol: 'ETH',
    decimals: 18,
    logo_url:
      'https://static.debank.com/image/coin/logo_url/eth/6443cdccced33e204d90cb723c632917.png',
    protocol_id: '',
    price: 2751.35,
    price_24h_change: -0.0025124352857578964,
    credit_score: 100000000.0,
    is_verified: true,
    is_scam: false,
    is_suspicious: false,
    is_core: true,
    is_wallet: true,
    time_at: null,
    amount: 0.002308487339975003,
  },
  pre_exec_version: 'v2',
  pre_exec: {
    success: true,
    error: null,
  },
  type_call: {
    action: 'lockdown',
    contract: '0x000000000022d473030f116ddee9f6b43ac78ba3',
    contract_protocol_name: 'Uniswap Permit2',
    contract_protocol_logo_url:
      'https://static.debank.com/image/project/logo_url/uniswap_permit2/092f33a7b1ec78093261022e63770b2f.png',
  },
  trace_id: '57c2501517b847db97ede60dbbc98fb0',
} as any;

export const parseTxData = {
  action: {
    type: 'permit2_batch_revoke_token',
    data: {
      permit2_id: '0x000000000022d473030f116ddee9f6b43ac78ba3',
      revoke_list: [
        {
          token: {
            id: '0x3c8b650257cfb5f272f799f5e2b4e65093a11a05',
            chain: 'op',
            name: 'Velodrome',
            symbol: 'VELO',
            display_symbol: null,
            optimized_symbol: 'VELO',
            decimals: 18,
            logo_url:
              'https://static.debank.com/image/project/logo_url/op_velodrome/91c9c0f782ba8b2faf88e29b31e724fc.png',
            protocol_id: 'op_velodrome',
            price: 0.10609585476131557,
            price_24h_change: -0.003991533267935655,
            credit_score: 298224.0352079521,
            is_verified: true,
            is_scam: false,
            is_suspicious: false,
            is_core: true,
            is_wallet: true,
            time_at: 1654113683.0,
          },
          spender: '0xb555edf5dcf85f42ceef1f3630a52a108e55a654',
        },
        {
          token: {
            id: '0x4200000000000000000000000000000000000042',
            chain: 'op',
            name: 'Optimism',
            symbol: 'OP',
            display_symbol: null,
            optimized_symbol: 'OP',
            decimals: 18,
            logo_url:
              'https://static.debank.com/image/op_token/logo_url/0x4200000000000000000000000000000000000042/029a56df18f88f4123120fdcb6bea40b.png',
            protocol_id: 'op_optimism',
            price: 1.5451,
            price_24h_change: -0.012336998210176486,
            credit_score: 5436111.140508605,
            is_verified: true,
            is_scam: false,
            is_suspicious: false,
            is_core: true,
            is_wallet: true,
            time_at: null,
          },
          spender: '0xb555edf5dcf85f42ceef1f3630a52a108e55a654',
        },
      ],
    },
  },
  contract_call: {
    func: 'lockdown',
    contract: {
      id: '0x000000000022d473030f116ddee9f6b43ac78ba3',
      protocol: {
        name: 'Uniswap Permit2',
        logo_url:
          'https://static.debank.com/image/project/logo_url/uniswap_permit2/092f33a7b1ec78093261022e63770b2f.png',
      },
    },
  },
  log_id: 87922380,
} as any;

export const txData = {
  chainId: 10,
  from: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85',
  to: '0x000000000022d473030f116ddee9f6b43ac78ba3',
  value: '0x0',
  data: '0xcc53287f000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000003c8b650257cfb5f272f799f5e2b4e65093a11a05000000000000000000000000b555edf5dcf85f42ceef1f3630a52a108e55a6540000000000000000000000004200000000000000000000000000000000000042000000000000000000000000b555edf5dcf85f42ceef1f3630a52a108e55a654',
  gas: '0x0',
  maxFeePerGas: '0x10b74c',
  maxPriorityFeePerGas: '0x10b74c',
  nonce: '0x2af',
};
