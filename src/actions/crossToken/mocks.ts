export const preExecData = {
  abi: {
    func: 'startBridgeTokensViaAcross',
    params: [
      [
        '0c3ff3e6c34ec8f863b2a51c58a8b0c04588df54223e6361c499cbe200c748ac',
        'across',
        'jumper.exchange',
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
        '0xae4b6d8c72232c52c504EEcE54C36886A65F155D',
        51006968766545504,
        8453,
        false,
        false,
      ],
      [
        161173835136642,
        1724644331,
        '',
        115792089237316195423570985008687907853269984665640564039457584007913129639935,
      ],
    ],
  },
  abi_str:
    '{\n    "func": "startBridgeTokensViaAcross",\n    "params": [\n        [\n            "0c3ff3e6c34ec8f863b2a51c58a8b0c04588df54223e6361c499cbe200c748ac",\n            "across",\n            "jumper.exchange",\n            "0x0000000000000000000000000000000000000000",\n            "0x0000000000000000000000000000000000000000",\n            "0xae4b6d8c72232c52c504EEcE54C36886A65F155D",\n            51006968766545504,\n            8453,\n            false,\n            false\n        ],\n        [\n            161173835136642,\n            1724644331,\n            "",\n            115792089237316195423570985008687907853269984665640564039457584007913129639935\n        ]\n    ]\n}',
  balance_change: {
    success: false,
    error: {
      code: 2001,
      msg: 'Insufficient mode balance for transfer',
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
      msg: 'Insufficient mode balance for transfer',
    },
    gas_used: 0,
    gas_limit: 0,
    gas_ratio: 1.3,
  },
  is_gnosis: false,
  native_token: {
    id: 'mode',
    chain: 'mode',
    name: 'ETH',
    symbol: 'ETH',
    display_symbol: null,
    optimized_symbol: 'ETH',
    decimals: 18,
    logo_url:
      'https://static.debank.com/image/coin/logo_url/eth/6443cdccced33e204d90cb723c632917.png',
    protocol_id: '',
    price: 2748.25,
    price_24h_change: -0.006700906104185704,
    credit_score: 100000000.0,
    is_verified: true,
    is_scam: false,
    is_suspicious: false,
    is_core: true,
    is_wallet: true,
    time_at: null,
    amount: 2.0689566152e-8,
  },
  pre_exec_version: 'v2',
  pre_exec: {
    success: false,
    error: {
      code: 2001,
      msg: 'Insufficient mode balance for transfer',
    },
  },
  type_call: {
    action: 'startBridgeTokensViaAcross',
    contract: '0x1231deb6f5749ef6ce6943a275a1d3e7486f4eae',
    contract_protocol_name: 'LI.FI',
    contract_protocol_logo_url:
      'https://static.debank.com/image/project/logo_url/lifiprotocol/22262cb8c3879421c841c1e1e8c468ee.png',
  },
  trace_id: '1d87680cf7e54ecca072c23e46a7d8a4',
} as any;

export const parseTxData = {
  action: {
    type: 'cross_token',
    data: {
      pay_token: {
        id: 'mode',
        chain: 'mode',
        name: 'ETH',
        symbol: 'ETH',
        display_symbol: null,
        optimized_symbol: 'ETH',
        decimals: 18,
        logo_url:
          'https://static.debank.com/image/coin/logo_url/eth/6443cdccced33e204d90cb723c632917.png',
        protocol_id: '',
        price: 2748.25,
        price_24h_change: -0.006700906104185704,
        credit_score: 100000000.0,
        is_verified: true,
        is_scam: false,
        is_suspicious: false,
        is_core: true,
        is_wallet: true,
        time_at: null,
        amount: 0.0510069687665455,
        raw_amount: '51006968766545500',
      },
      receive_token: {
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
        price: 2748.25,
        price_24h_change: -0.006700906104185704,
        credit_score: 100000000.0,
        is_verified: true,
        is_scam: false,
        is_suspicious: false,
        is_core: true,
        is_wallet: true,
        time_at: null,
        min_amount: 0.05100696876654551,
        min_raw_amount: '51006968766545504',
      },
      receiver: '0xae4b6d8c72232c52c504eece54c36886a65f155d',
    },
    is_asset_changed: true,
    is_involving_privacy: false,
  },
  contract_call: {
    func: 'startBridgeTokensViaAcross',
    contract: {
      id: '0x1231deb6f5749ef6ce6943a275a1d3e7486f4eae',
      protocol: {
        name: 'LI.FI',
        logo_url:
          'https://static.debank.com/image/project/logo_url/lifiprotocol/22262cb8c3879421c841c1e1e8c468ee.png',
      },
    },
  },
  log_id: 88005737,
} as any;

export const txData = {
  chainId: 34443,
  from: '0x5853eD4f26A3fceA565b3FBC698bb19cdF6DEB85',
  to: '0x1231deb6f5749ef6ce6943a275a1d3e7486f4eae',
  value: '0xb536915e663e5c',
  data: '0x1fd8010c000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000002000c3ff3e6c34ec8f863b2a51c58a8b0c04588df54223e6361c499cbe200c748ac0000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000018000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ae4b6d8c72232c52c504eece54c36886a65f155d00000000000000000000000000000000000000000000000000b536915e663e6000000000000000000000000000000000000000000000000000000000000021050000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000066163726f73730000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f6a756d7065722e65786368616e67650000000000000000000000000000000000000000000000000000000000000000000000000000000000000092963530be820000000000000000000000000000000000000000000000000000000066cbfbeb0000000000000000000000000000000000000000000000000000000000000080ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000000000000d00dfeeddeadbeef8932eb23bad9bddb5cf81426f78279a53c6c3b71',
  gas: '0x0',
  maxFeePerGas: '0x124f80',
  maxPriorityFeePerGas: '0x124f80',
  nonce: '0x1',
};
