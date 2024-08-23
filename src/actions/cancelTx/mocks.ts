export const preExecData = {
  abi: null,
  abi_str: null,
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
    gas_used: 21000,
    gas_limit: 21000,
    gas_ratio: 1.3,
  },
  is_gnosis: false,
  native_token: {
    id: 'eth',
    chain: 'eth',
    name: 'ETH',
    symbol: 'ETH',
    display_symbol: null,
    optimized_symbol: 'ETH',
    decimals: 18,
    logo_url:
      'https://static.debank.com/image/coin/logo_url/eth/6443cdccced33e204d90cb723c632917.png',
    protocol_id: '',
    price: 2683.8,
    price_24h_change: 0.022289342479632213,
    credit_score: 100000000.0,
    is_verified: true,
    is_scam: false,
    is_suspicious: false,
    is_core: true,
    is_wallet: true,
    time_at: 1483200000.0,
    amount: 0.00336741278341931,
  },
  pre_exec_version: 'v2',
  pre_exec: {
    success: true,
    error: null,
  },
  type_cancel_tx: {},
  trace_id: '60184ce4e78b444e9d55e8201ac883e2',
} as any;

export const parseTxData = {
  action: { type: 'cancel_tx' },
  contract_call: null,
  log_id: 85276307,
} as any;

export const txData = {
  chainId: 1,
  from: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85',
  to: '0x5853eD4f26A3fceA565b3FBC698bb19cdF6DEB85',
  value: '0x0',
  data: '0x',
  gas: '0x5208',
  maxFeePerGas: '0x4190ab00',
  maxPriorityFeePerGas: '0x4190ab00',
  nonce: '0x1691',
};
