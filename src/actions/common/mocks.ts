export const parseTxDataTransaction = {
  action: null,
  contract_call: {
    func: '',
    contract: {
      id: '0x1111111254eeb25477b68fb85ed929f73a960582',
      protocol: {
        name: '1inch',
        logo_url:
          'https://static.debank.com/image/project/logo_url/1inch2/a4fcc0d0e8daddd0313ad14172e11aff.png',
      },
    },
  },
  log_id: 85289937,
} as any;

export const preExecDataTransaction = {
  abi: null,
  abi_str: null,
  balance_change: {
    success: false,
    error: {
      code: 2001,
      msg: 'Insufficient eth balance for transfer',
    },
    send_token_list: [],
    receive_token_list: [],
    send_nft_list: [],
    receive_nft_list: [],
    usd_value_change: 0,
  },
  gas: {
    success: false,
    error: {
      code: 2001,
      msg: 'Insufficient eth balance for transfer',
    },
    gas_used: 0,
    gas_limit: 0,
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
    price: 2673.69,
    price_24h_change: 0.01441362825814783,
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
    success: false,
    error: {
      code: 2001,
      msg: 'Insufficient eth balance for transfer',
    },
  },
  type_call: {
    action: null,
    contract: '0x1111111254eeb25477b68fb85ed929f73a960582',
    contract_protocol_name: '1inch',
    contract_protocol_logo_url:
      'https://static.debank.com/image/project/logo_url/1inch2/a4fcc0d0e8daddd0313ad14172e11aff.png',
  },
  trace_id: '05df2a845e2b413c84dc15d78222be94',
} as any;

export const txDataTransaction = {
  chainId: 1,
  from: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85',
  to: '0x1111111254eeb25477b68fb85ed929f73a960582',
  value: '0x165cd59da18c9eb',
  data: '0xf6ed415b',
  gas: '0x0',
  maxFeePerGas: '0x3b9aca00',
  maxPriorityFeePerGas: '0x3b9aca00',
  nonce: '0x1691',
};

export const parseTxDataTypedData = { action: null, log_id: 6260972 };

export const txDataTypedData = {
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
    Test: [
      {
        name: 'no_risk',
        type: 'string',
      },
    ],
  },
  primaryType: 'Test',
  domain: {
    name: 'Test',
    version: '1',
    chainId: 1,
    verifyingContract: '0xcccccccccccccccccccccccccccccccccccccccc',
  },
  message: {
    no_risk: 'no_risk',
  },
};
