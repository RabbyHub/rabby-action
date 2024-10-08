export const preExecData = {
  abi: {
    func: 'deposit',
    params: [],
  },
  abi_str: '{\n    "func": "deposit",\n    "params": []\n}',
  balance_change: {
    success: true,
    error: null,
    send_token_list: [
      {
        id: 'matic',
        chain: 'matic',
        name: 'MATIC',
        symbol: 'MATIC',
        display_symbol: null,
        optimized_symbol: 'MATIC',
        decimals: 18,
        logo_url:
          'https://static.debank.com/image/matic_token/logo_url/matic/6f5a6b6f0732a7a235131bd7804d357c.png',
        protocol_id: '',
        price: 0.5228,
        price_24h_change: -0.05221174764321961,
        credit_score: 100000000.0,
        is_verified: true,
        is_scam: false,
        is_suspicious: false,
        is_core: true,
        is_wallet: true,
        time_at: null,
        amount: 0.000192647154008608,
        usd_value: 0.00010071593211570027,
        raw_amount: '192647154008608',
      },
    ],
    receive_token_list: [
      {
        id: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
        chain: 'matic',
        name: 'Wrapped Matic',
        symbol: 'WMATIC',
        display_symbol: 'WMATIC',
        optimized_symbol: 'WMATIC',
        decimals: 18,
        logo_url:
          'https://static.debank.com/image/matic_token/logo_url/0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270/f6e604ba0324726a3d687c618aa4f163.png',
        protocol_id: 'matic_wmatic',
        price: 0.5228,
        price_24h_change: -0.05221174764321961,
        credit_score: 5562376.8888414465,
        is_verified: true,
        is_scam: false,
        is_suspicious: false,
        is_core: true,
        is_wallet: true,
        time_at: 1601030209.0,
        amount: 0.000192647154008608,
        usd_value: 0.00010071593211570027,
        raw_amount: '192647154008608',
      },
    ],
    send_nft_list: [],
    receive_nft_list: [],
    usd_value_change: 0.0,
  },
  gas: {
    success: true,
    error: null,
    gas_used: 27941,
    gas_limit: 0,
    gas_ratio: 1.3,
  },
  is_gnosis: false,
  native_token: {
    id: 'matic',
    chain: 'matic',
    name: 'MATIC',
    symbol: 'MATIC',
    display_symbol: null,
    optimized_symbol: 'MATIC',
    decimals: 18,
    logo_url:
      'https://static.debank.com/image/matic_token/logo_url/matic/6f5a6b6f0732a7a235131bd7804d357c.png',
    protocol_id: '',
    price: 0.5228,
    price_24h_change: -0.05221174764321961,
    credit_score: 100000000.0,
    is_verified: true,
    is_scam: false,
    is_suspicious: false,
    is_core: true,
    is_wallet: true,
    time_at: null,
    amount: 0.000192647154008608,
  },
  pre_exec_version: 'v2',
  pre_exec: {
    success: true,
    error: null,
  },
  type_call: {
    action: 'deposit',
    contract: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
    contract_protocol_name: 'WMATIC',
    contract_protocol_logo_url:
      'https://static.debank.com/image/project/logo_url/matic_wmatic/b725305dabbac971db3ccb62a5dac158.png',
  },
  trace_id: 'c88598ea976b4437b42974f0c9fd09c9',
} as any;

export const parseTxData = {
  action: {
    type: 'wrap_token',
    data: {
      pay_token: {
        id: 'matic',
        chain: 'matic',
        name: 'MATIC',
        symbol: 'MATIC',
        display_symbol: null,
        optimized_symbol: 'MATIC',
        decimals: 18,
        logo_url:
          'https://static.debank.com/image/matic_token/logo_url/matic/6f5a6b6f0732a7a235131bd7804d357c.png',
        protocol_id: '',
        price: 0.5228,
        price_24h_change: -0.05221174764321961,
        credit_score: 100000000.0,
        is_verified: true,
        is_scam: false,
        is_suspicious: false,
        is_core: true,
        is_wallet: true,
        time_at: null,
        amount: 0.000192647154008608,
        raw_amount: '192647154008608',
      },
      receive_token: {
        id: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
        chain: 'matic',
        name: 'Wrapped Matic',
        symbol: 'WMATIC',
        display_symbol: 'WMATIC',
        optimized_symbol: 'WMATIC',
        decimals: 18,
        logo_url:
          'https://static.debank.com/image/matic_token/logo_url/0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270/f6e604ba0324726a3d687c618aa4f163.png',
        protocol_id: 'matic_wmatic',
        price: 0.5228,
        price_24h_change: -0.05221174764321961,
        credit_score: 5562376.8888414465,
        is_verified: true,
        is_scam: false,
        is_suspicious: false,
        is_core: true,
        is_wallet: true,
        time_at: 1601030209.0,
        min_amount: 0.000192647154008608,
        min_raw_amount: '192647154008608',
      },
      receiver: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85',
    },
    is_asset_changed: true,
    is_involving_privacy: false,
  },
  contract_call: {
    func: 'deposit',
    contract: {
      id: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
      protocol: {
        name: 'WMATIC',
        logo_url:
          'https://static.debank.com/image/project/logo_url/matic_wmatic/b725305dabbac971db3ccb62a5dac158.png',
      },
    },
  },
  log_id: 87979734,
} as any;

export const txData = {
  chainId: 137,
  from: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85',
  to: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
  value: '0xaf36292e8220',
  data: '0xd0e30db0',
  gas: '',
  maxFeePerGas: '0xb68a0aa00',
  maxPriorityFeePerGas: '0xb68a0aa00',
  nonce: '0xb5e',
};
