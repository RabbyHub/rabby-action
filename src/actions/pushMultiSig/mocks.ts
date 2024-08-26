export const preExecData = {
  abi: {
    func: 'execTransaction',
    params: [
      '0x20823BB02947C741A5cc2F1CcFd8293C4a8d08B3',
      0,
      '',
      0,
      0,
      0,
      0,
      '0x0000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000',
      '0000000000000000000000005853ed4f26a3fcea565b3fbc698bb19cdf6deb85000000000000000000000000000000000000000000000000000000000000000001',
    ],
  },
  abi_str:
    '{\n    "func": "execTransaction",\n    "params": [\n        "0x20823BB02947C741A5cc2F1CcFd8293C4a8d08B3",\n        0,\n        "",\n        0,\n        0,\n        0,\n        0,\n        "0x0000000000000000000000000000000000000000",\n        "0x0000000000000000000000000000000000000000",\n        "0000000000000000000000005853ed4f26a3fcea565b3fbc698bb19cdf6deb85000000000000000000000000000000000000000000000000000000000000000001"\n    ]\n}',
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
    gas_used: 72082,
    gas_limit: 73821,
    gas_ratio: 1.3,
  },
  is_gnosis: true,
  native_token: {
    id: 'bsc',
    chain: 'bsc',
    name: 'BNB',
    symbol: 'BNB',
    display_symbol: null,
    optimized_symbol: 'BNB',
    decimals: 18,
    logo_url:
      'https://static.debank.com/image/coin/logo_url/bnb/9784283a36f23a58982fc964574ea530.png',
    protocol_id: '',
    price: 570.4,
    price_24h_change: -0.015023312035917882,
    credit_score: 100000000.0,
    is_verified: true,
    is_scam: false,
    is_suspicious: false,
    is_core: true,
    is_wallet: true,
    time_at: 1598630400.0,
    amount: 0.00544196818468811,
  },
  pre_exec_version: 'v2',
  pre_exec: {
    success: true,
    error: null,
  },
  type_call: {
    action: 'execTransaction',
    contract: '0x20823bb02947c741a5cc2f1ccfd8293c4a8d08b3',
    contract_protocol_name: null,
    contract_protocol_logo_url: '',
  },
  gnosis: {
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
      gas_used: 27329,
      gas_limit: 0,
      gas_ratio: 1.3,
    },
    is_gnosis: false,
    native_token: null,
    pre_exec_version: 'v2',
    pre_exec: {
      success: true,
      error: null,
    },
    type_cancel_tx: {},
  },
  trace_id: 'b69a4c4288054c1a9d65a91d5e250f8f',
} as any;

export const parseTxData = {
  action: {
    type: 'push_multisig',
    data: {
      multisig_id: '0x20823bb02947c741a5cc2f1ccfd8293c4a8d08b3',
    },
  },
  contract_call: {
    func: 'execTransaction',
    contract: {
      id: '0x20823bb02947c741a5cc2f1ccfd8293c4a8d08b3',
      protocol: null,
    },
  },
  log_id: 87992080,
} as any;

export const txData = {
  chainId: 56,
  data: '0x6a76120200000000000000000000000020823bb02947c741a5cc2f1ccfd8293c4a8d08b3000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000410000000000000000000000005853ed4f26a3fcea565b3fbc698bb19cdf6deb8500000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000',
  from: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85',
  gas: '0x0',
  gasPrice: '0x3b9aca00',
  nonce: '0x126d',
  to: '0x20823bb02947c741a5cc2f1ccfd8293c4a8d08b3',
  value: '0x0',
};
