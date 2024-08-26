export const preExecData = {
  abi: {
    func: 'lockdown',
    params: [
      [
        [
          '0x3Ed9AcAac7Bd974eB83a8eA6432a239e3C829D5D',
          '0xCb1355ff08Ab38bBCE60111F1bb2B784bE25D7e8',
        ],
      ],
    ],
  },
  abi_str:
    '{\n    "func": "lockdown",\n    "params": [\n        [\n            [\n                "0x3Ed9AcAac7Bd974eB83a8eA6432a239e3C829D5D",\n                "0xCb1355ff08Ab38bBCE60111F1bb2B784bE25D7e8"\n            ]\n        ]\n    ]\n}',
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
    gas_used: 29934,
    gas_limit: 30284,
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
    price: 2754.92,
    price_24h_change: -0.0012727444140662619,
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
  trace_id: '2bf3cf60c0924b71b4946811aacd4b51',
} as any;

export const parseTxData = {
  action: {
    type: 'permit2_revoke_token',
    data: {
      permit2_id: '0x000000000022d473030f116ddee9f6b43ac78ba3',
      spender: '0xcb1355ff08ab38bbce60111f1bb2b784be25d7e8',
      token: {
        id: '0x3ed9acaac7bd974eb83a8ea6432a239e3c829d5d',
        chain: 'op',
        name: 'LERNITAS',
        symbol: '2192',
        display_symbol: null,
        optimized_symbol: '2192',
        decimals: 18,
        logo_url:
          'https://static.debank.com/image/op_token/logo_url/0x3ed9acaac7bd974eb83a8ea6432a239e3c829d5d/8ffb8993b60549af7892249c5c71718b.png',
        protocol_id: '',
        price: 0.0003226293045306369,
        price_24h_change: -0.0014572830105502455,
        credit_score: 39233.563306539145,
        is_verified: true,
        is_scam: false,
        is_suspicious: false,
        is_core: true,
        is_wallet: true,
        time_at: 1710476809.0,
        permit2_allowance_amount: 1.157920892373162e59,
        permit2_allowance_raw_amount:
          '115792089237316195423570985008687907853269984665640564039457584007913129639935',
      },
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
  log_id: 87836166,
} as any;

export const txData = {
  chainId: 10,
  from: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85',
  to: '0x000000000022d473030f116ddee9f6b43ac78ba3',
  value: '0x0',
  data: '0xcc53287f000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000010000000000000000000000003ed9acaac7bd974eb83a8ea6432a239e3c829d5d000000000000000000000000cb1355ff08ab38bbce60111f1bb2b784be25d7e8',
  gas: '0x0',
  maxFeePerGas: '0x10be54',
  maxPriorityFeePerGas: '0x10be54',
  nonce: '0x2af',
};
