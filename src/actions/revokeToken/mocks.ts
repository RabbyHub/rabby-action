export const preExecData = {
  abi: {
    func: 'approve',
    params: ['0x816f722424B49Cf1275cc86DA9840Fbd5a6167e9', 0],
  },
  abi_str:
    '{\n    "func": "approve",\n    "params": [\n        "0x816f722424B49Cf1275cc86DA9840Fbd5a6167e9",\n        0\n    ]\n}',
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
    gas_used: 37606,
    gas_limit: 43492,
    gas_ratio: 1.3,
  },
  is_gnosis: false,
  native_token: {
    id: 'arb',
    chain: 'arb',
    name: 'ETH',
    symbol: 'ETH',
    display_symbol: null,
    optimized_symbol: 'ETH',
    decimals: 18,
    logo_url:
      'https://static.debank.com/image/coin/logo_url/eth/6443cdccced33e204d90cb723c632917.png',
    protocol_id: '',
    price: 2752.79,
    price_24h_change: -0.0023605601525843664,
    credit_score: 100000000.0,
    is_verified: true,
    is_scam: false,
    is_suspicious: false,
    is_core: true,
    is_wallet: true,
    time_at: 1622131200.0,
    amount: 8.941029391638e-6,
  },
  pre_exec_version: 'v2',
  pre_exec: {
    success: true,
    error: null,
  },
  type_cancel_token_approval: {
    spender: '0x816f722424b49cf1275cc86da9840fbd5a6167e9',
    spender_protocol_name: 'Orderly Bridge',
    spender_protocol_logo_url:
      'https://static.debank.com/image/project/logo_url/arb_orderly/a3d0c1dd679b7db6db038f405816f67d.png',
    token_symbol: 'USDC',
    is_nft: false,
    nft: null,
  },
  trace_id: '65512bb8b45f4efab9424f798c0548b3',
} as any;

export const parseTxData = {
  action: {
    type: 'revoke_token',
    data: {
      spender: '0x816f722424b49cf1275cc86da9840fbd5a6167e9',
      token: {
        id: '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
        chain: 'arb',
        name: 'USD Coin',
        symbol: 'USDC',
        display_symbol: null,
        optimized_symbol: 'USDC',
        decimals: 6,
        logo_url:
          'https://static.debank.com/image/arb_token/logo_url/0xaf88d065e77c8cc2239327c5edb3a432268e5831/fffcd27b9efff5a86ab942084c05924d.png',
        protocol_id: '',
        price: 0.9996001599360256,
        price_24h_change: 0.0,
        credit_score: 13584005.874952497,
        is_verified: true,
        is_scam: false,
        is_suspicious: false,
        is_core: true,
        is_wallet: true,
        time_at: 1667248932.0,
        amount: 0,
        raw_amount: '0',
      },
    },
  },
  contract_call: {
    func: 'approve',
    contract: {
      id: '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
      protocol: null,
    },
  },
  log_id: 87892138,
} as any;

export const txData = {
  chainId: 42161,
  data: '0x095ea7b3000000000000000000000000816f722424b49cf1275cc86da9840fbd5a6167e90000000000000000000000000000000000000000000000000000000000000000',
  from: '0x99bf13b64758d1c71dcb8a16897edae9e8c12039',
  gas: '',
  gasPrice: '0xc65d40',
  nonce: '0x103',
  to: '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
  value: '0x0',
};
