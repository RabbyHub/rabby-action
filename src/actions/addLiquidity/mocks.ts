export const preExecData = {
  abi: {
    func: 'mint',
    params: [
      [
        '0x18Bc5bcC660cf2B9cE3cd51a404aFe1a0cBD3C22',
        '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
        10,
        -4970,
        -4960,
        2955759909,
        885199302,
        2940981110,
        880773306,
        '0xE2866F2291B5c5bafD2858B9247f93745108A523',
        1754366820,
        0,
      ],
    ],
  },
  abi_str:
    '{\n    "func": "mint",\n    "params": [\n        [\n            "0x18Bc5bcC660cf2B9cE3cd51a404aFe1a0cBD3C22",\n            "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",\n            10,\n            -4970,\n            -4960,\n            2955759909,\n            885199302,\n            2940981110,\n            880773306,\n            "0xE2866F2291B5c5bafD2858B9247f93745108A523",\n            1754366820,\n            0\n        ]\n    ]\n}',
  balance_change: {
    success: false,
    error: {
      code: 1002,
      msg: 'execution reverted: execution reverted',
    },
    send_token_list: [],
    receive_token_list: [],
    send_nft_list: [],
    receive_nft_list: [],
    usd_value_change: 0,
  },
  gas: {
    success: true,
    error: null,
    gas_used: 29320,
    gas_limit: 0,
    gas_ratio: 1.3,
  },
  is_gnosis: false,
  native_token: {
    id: 'base',
    chain: 'base',
    name: 'ETH',
    symbol: 'ETH',
    display_symbol: null,
    optimized_symbol: 'ETH',
    decimals: 18,
    logo_url:
      'https://static.debank.com/image/coin/logo_url/eth/6443cdccced33e204d90cb723c632917.png',
    protocol_id: '',
    price: 3629.55,
    price_24h_change: 0.018385589869839923,
    credit_score: 46503412.60907772,
    is_verified: true,
    is_scam: false,
    is_suspicious: null,
    is_core: true,
    is_wallet: true,
    time_at: null,
    low_credit_score: false,
    amount: 1e-5,
  },
  pre_exec_version: 'v2',
  pre_exec: {
    success: false,
    error: {
      code: 1002,
      msg: 'execution reverted: execution reverted',
    },
  },
  type_call: {
    action: 'mint',
    contract: '0x827922686190790b37229fd06084350e74485b72',
    contract_protocol_name: 'Aerodrome V3',
    contract_protocol_logo_url:
      'https://static.debank.com/image/project/logo_url/base_aerodrome/f02d753bc321dc8ba480f0424a686482.png',
  },
  trace_id: '663ae6c6c0ac4b1aa5651fadba316de2',
} as any;

export const parseTxData = {
  action: { type: 'cancel_tx' },
  contract_call: null,
  log_id: 441860918,
} as any;

export const txData = {
  chainId: 42161,
  from: '0x4686fd7c0bc5d06346d416808916ba1dbd3f2336',
  to: '0x4686fd7c0bc5d06346d416808916ba1dbd3f2336',
  value: '0x0',
  data: '0x',
  gas: '0x0',
  maxFeePerGas: '0xb71b00',
  maxPriorityFeePerGas: '0xb71b00',
  nonce: '0x4',
};
