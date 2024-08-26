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
    price: 2673.0,
    price_24h_change: 0.014151838221345444,
    credit_score: 100000000.0,
    is_verified: true,
    is_scam: false,
    is_suspicious: false,
    is_core: true,
    is_wallet: true,
    time_at: null,
    amount: 0.002311643847874891,
  },
  pre_exec_version: 'v2',
  pre_exec: {
    success: true,
    error: null,
  },
  type_send: {
    to_addr: '0x0c54fccd2e384b4bb6f2e405bf5cbc15a017aafb',
    token_symbol: 'ETH',
    token_amount: 0.0,
    token: {
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
      price: 2673.0,
      price_24h_change: 0.014151838221345444,
      credit_score: 100000000.0,
      is_verified: true,
      is_scam: false,
      is_suspicious: false,
      is_core: true,
      is_wallet: true,
      time_at: null,
      raw_amount: 0,
      raw_amount_hex_str: '0x0',
    },
  },
  trace_id: '63a47da317e94374ba4e71b61148cc15',
} as any;

export const parseTxData = {
  action: {
    type: 'send_token',
    data: {
      to: '0x0c54fccd2e384b4bb6f2e405bf5cbc15a017aafb',
      token: {
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
        price: 2673.0,
        price_24h_change: 0.014151838221345444,
        credit_score: 100000000.0,
        is_verified: true,
        is_scam: false,
        is_suspicious: false,
        is_core: true,
        is_wallet: true,
        time_at: null,
        amount: 0.0,
        raw_amount: '0',
      },
    },
  },
  contract_call: null,
  log_id: 85501191,
} as any;

export const txData = {
  chainId: 10,
  from: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85',
  to: '0x0c54FcCd2e384b4BB6f2E405Bf5Cbc15a017AaFb',
  value: '0x0',
  data: '0x',
  gas: '0x5208',
  maxFeePerGas: '0x10eb40',
  maxPriorityFeePerGas: '0x10eb40',
  nonce: '0x2ae',
};

export const parseTxDataTypedData = {
  action: {
    type: null,
    title: 'zkSync PayMaster Transaction: swap',
    desc: 'zkSync PayMaster Transaction: swap',
    is_asset_changed: true,
    is_involving_privacy: false,
  },
  log_id: 6607892,
} as any;

export const txDataTypedData = {
  types: {
    Transaction: [
      {
        name: 'txType',
        type: 'uint256',
      },
      {
        name: 'from',
        type: 'uint256',
      },
      {
        name: 'to',
        type: 'uint256',
      },
      {
        name: 'gasLimit',
        type: 'uint256',
      },
      {
        name: 'gasPerPubdataByteLimit',
        type: 'uint256',
      },
      {
        name: 'maxFeePerGas',
        type: 'uint256',
      },
      {
        name: 'maxPriorityFeePerGas',
        type: 'uint256',
      },
      {
        name: 'paymaster',
        type: 'uint256',
      },
      {
        name: 'nonce',
        type: 'uint256',
      },
      {
        name: 'value',
        type: 'uint256',
      },
      {
        name: 'data',
        type: 'bytes',
      },
      {
        name: 'factoryDeps',
        type: 'bytes32[]',
      },
      {
        name: 'paymasterInput',
        type: 'bytes',
      },
    ],
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
    ],
  },
  primaryType: 'Transaction',
  domain: {
    name: 'zkSync',
    version: '2',
    chainId: '324',
  },
  message: {
    txType: '113',
    from: '504262822229410871746962142045127441644602125189',
    to: '886988409507069072993307306189959522427146252377',
    gasLimit: '10400000',
    gasPerPubdataByteLimit: '50000',
    maxFeePerGas: '45250000',
    maxPriorityFeePerGas: '45250000',
    paymaster: '374285833626810945816848840875272104714563778662',
    nonce: '54',
    value: '1773354512846000',
    data: '0xd7570e450000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000049466f0000000000000000000000000000000000000000000000000000000066cc4bdc000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000064cdb45cc8cb00000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000001800000000000000000000000007936538ace0c3859ce5fd66c009e4f94ab1b3c4500000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000005aea5775959fbc2557cc8789bc1bf90a239d9a91000000000000000000000000a93472c1b88243793e145b237b7172f1ee54783600000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a93472c1b88243793e145b237b7172f1ee54783600000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000001d17cbcf0d6d143135ae902365d2e5e2a16538d40000000000000000000000005853ed4f26a3fcea565b3fbc698bb19cdf6deb8500000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000',
    factoryDeps: [],
    paymasterInput:
      '0x949431dc000000000000000000000000493257fd37edb34451f62edf8d2a0c418852ba4c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000001918d8840ee000000000000000000000000000000000000000000000000000000000000003b0000000000000000000000007ecf4d7e0902cf3ec86959994a277bbdb6d70643000000000000000000000000000000000000000000000000000000000000271000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000417aa3b6cea0b7ad80f6e563f015d360cc8d165a0b3875dc560fa2c130b3f06dcc2f4a6859093fe1cb61050bf092abc9d7f677b48f80d79611f5ecaee84e106af51c00000000000000000000000000000000000000000000000000000000000000',
  },
};
