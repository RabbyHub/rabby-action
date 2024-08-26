export const preExecData = {
  abi: {
    func: 'safeTransferFrom',
    params: [
      '0x5853eD4f26A3fceA565b3FBC698bb19cdF6DEB85',
      '0x52DeC422AA4bAE0fB6F2b41db023dFfA9f4A1353',
      440299,
    ],
  },
  abi_str:
    '{\n    "func": "safeTransferFrom",\n    "params": [\n        "0x5853eD4f26A3fceA565b3FBC698bb19cdF6DEB85",\n        "0x52DeC422AA4bAE0fB6F2b41db023dFfA9f4A1353",\n        440299\n    ]\n}',
  balance_change: {
    success: true,
    error: null,
    send_token_list: [],
    receive_token_list: [],
    send_nft_list: [
      {
        id: '7b31129c599fee1f53b8f439c0391072',
        contract_id: '0x1195cf65f83b3a5768f3c496d3a05ad6412c64b7',
        inner_id: '440299',
        chain: 'arb',
        symbol: 'CUBE',
        name: 'Mission 200K: Arbitrum',
        description: '',
        content_type: 'image_url',
        content:
          'https://static.debank.com/image/arb_nft/local_url/7b31129c599fee1f53b8f439c0391072/f2830449700b7dc22ac04f0caf54b1f8.png',
        thumbnail_url:
          'https://static.debank.com/image/arb_nft/thumbnail_url/7b31129c599fee1f53b8f439c0391072/f2830449700b7dc22ac04f0caf54b1f8.png',
        total_supply: 1,
        attributes: [
          {
            trait_type: 'Type',
            value: 'Quest',
          },
          {
            trait_type: 'Title',
            value: 'Mission 200K: Arbitrum',
          },
          {
            trait_type: 'Community',
            value: 'Layer3',
          },
          {
            trait_type: 'Tag',
            value: 'DeFi',
          },
          {
            trait_type: 'Difficulty',
            value: 'BEGINNER',
          },
          {
            trait_type: 'Wallet Provider',
            value: 'Rabby Wallet',
          },
        ],
        detail_url:
          'https://opensea.io/assets/0x1195cf65f83b3a5768f3c496d3a05ad6412c64b7/440299',
        collection_id: 'arb:0x1195cf65f83b3a5768f3c496d3a05ad6412c64b7',
        is_erc1155: false,
        is_erc721: true,
        pay_token: null,
        collection: {
          id: 'arb:0x1195cf65f83b3a5768f3c496d3a05ad6412c64b7',
          chain: 'arb',
          name: 'Layer3 CUBE',
          description: null,
          logo_url:
            'https://static.debank.com/image/arb_nft/thumbnail_url/24b44272ad6bf55323dca1add5f520f6/7b78944a6e25d3d2eded3eb6425802a1.png',
          is_verified: true,
          credit_score: 1643474.735188378,
          is_scam: false,
          is_suspicious: false,
          is_core: true,
          floor_price: 0.0,
        },
        amount: 1,
      },
    ],
    receive_nft_list: [],
    usd_value_change: 0,
  },
  gas: {
    success: true,
    error: null,
    gas_used: 69241,
    gas_limit: 75585,
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
    price: 2753.63,
    price_24h_change: -0.004245363188289372,
    credit_score: 100000000.0,
    is_verified: true,
    is_scam: false,
    is_suspicious: false,
    is_core: true,
    is_wallet: true,
    time_at: 1622131200.0,
    amount: 0.001466057954290776,
  },
  pre_exec_version: 'v2',
  pre_exec: {
    success: true,
    error: null,
  },
  type_nft_send: {
    spender: '0x52DeC422AA4bAE0fB6F2b41db023dFfA9f4A1353',
    spender_protocol_name: null,
    spender_protocol_logo_url: '',
    token_symbol: 'Mission 200K: Arbitrum',
    token_amount: 1,
    is_infinity: false,
    is_nft: true,
    nft: {
      id: '7b31129c599fee1f53b8f439c0391072',
      contract_id: '0x1195cf65f83b3a5768f3c496d3a05ad6412c64b7',
      inner_id: '440299',
      chain: 'arb',
      symbol: 'CUBE',
      name: 'Mission 200K: Arbitrum',
      description: '',
      content_type: 'image_url',
      content:
        'https://static.debank.com/image/arb_nft/local_url/7b31129c599fee1f53b8f439c0391072/f2830449700b7dc22ac04f0caf54b1f8.png',
      thumbnail_url:
        'https://static.debank.com/image/arb_nft/thumbnail_url/7b31129c599fee1f53b8f439c0391072/f2830449700b7dc22ac04f0caf54b1f8.png',
      total_supply: 1,
      attributes: [
        {
          trait_type: 'Type',
          value: 'Quest',
        },
        {
          trait_type: 'Title',
          value: 'Mission 200K: Arbitrum',
        },
        {
          trait_type: 'Community',
          value: 'Layer3',
        },
        {
          trait_type: 'Tag',
          value: 'DeFi',
        },
        {
          trait_type: 'Difficulty',
          value: 'BEGINNER',
        },
        {
          trait_type: 'Wallet Provider',
          value: 'Rabby Wallet',
        },
      ],
      detail_url:
        'https://opensea.io/assets/0x1195cf65f83b3a5768f3c496d3a05ad6412c64b7/440299',
      collection_id: 'arb:0x1195cf65f83b3a5768f3c496d3a05ad6412c64b7',
      is_erc1155: false,
      is_erc721: true,
      pay_token: null,
      collection: {
        id: 'arb:0x1195cf65f83b3a5768f3c496d3a05ad6412c64b7',
        chain: 'arb',
        name: 'Layer3 CUBE',
        description: null,
        logo_url:
          'https://static.debank.com/image/arb_nft/thumbnail_url/24b44272ad6bf55323dca1add5f520f6/7b78944a6e25d3d2eded3eb6425802a1.png',
        is_verified: true,
        credit_score: 1643474.735188378,
        is_scam: false,
        is_suspicious: false,
        is_core: true,
        floor_price: 0.0,
      },
    },
  },
  trace_id: 'e01649fdaf9a43feb49cf907182e273d',
} as any;

export const parseTxData = {
  action: {
    type: 'send_nft',
    data: {
      to: '0x52dec422aa4bae0fb6f2b41db023dffa9f4a1353',
      nft: {
        id: '7b31129c599fee1f53b8f439c0391072',
        contract_id: '0x1195cf65f83b3a5768f3c496d3a05ad6412c64b7',
        inner_id: '440299',
        chain: 'arb',
        symbol: 'CUBE',
        name: 'Mission 200K: Arbitrum',
        description: '',
        content_type: 'image_url',
        content:
          'https://static.debank.com/image/arb_nft/local_url/7b31129c599fee1f53b8f439c0391072/f2830449700b7dc22ac04f0caf54b1f8.png',
        thumbnail_url:
          'https://static.debank.com/image/arb_nft/thumbnail_url/7b31129c599fee1f53b8f439c0391072/f2830449700b7dc22ac04f0caf54b1f8.png',
        total_supply: 1,
        attributes: [
          {
            trait_type: 'Type',
            value: 'Quest',
          },
          {
            trait_type: 'Title',
            value: 'Mission 200K: Arbitrum',
          },
          {
            trait_type: 'Community',
            value: 'Layer3',
          },
          {
            trait_type: 'Tag',
            value: 'DeFi',
          },
          {
            trait_type: 'Difficulty',
            value: 'BEGINNER',
          },
          {
            trait_type: 'Wallet Provider',
            value: 'Rabby Wallet',
          },
        ],
        detail_url:
          'https://opensea.io/assets/0x1195cf65f83b3a5768f3c496d3a05ad6412c64b7/440299',
        collection_id: 'arb:0x1195cf65f83b3a5768f3c496d3a05ad6412c64b7',
        is_erc1155: false,
        is_erc721: true,
        pay_token: null,
        collection: {
          id: 'arb:0x1195cf65f83b3a5768f3c496d3a05ad6412c64b7',
          chain: 'arb',
          name: 'Layer3 CUBE',
          description: null,
          logo_url:
            'https://static.debank.com/image/arb_nft/thumbnail_url/24b44272ad6bf55323dca1add5f520f6/7b78944a6e25d3d2eded3eb6425802a1.png',
          is_verified: true,
          credit_score: 1643474.735188378,
          is_scam: false,
          is_suspicious: false,
          is_core: true,
          floor_price: 0.0,
        },
        amount: 1,
      },
    },
    is_asset_changed: true,
    is_involving_privacy: false,
  },
  contract_call: {
    func: 'safeTransferFrom',
    contract: {
      id: '0x1195cf65f83b3a5768f3c496d3a05ad6412c64b7',
      protocol: {
        name: 'Layer3',
        logo_url:
          'https://static.debank.com/image/project/logo_url/layer3/17b9ec0fc10582671ac05d7429061b69.png',
      },
    },
  },
  log_id: 87962918,
} as any;

export const txData = {
  chainId: 42161,
  from: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85',
  to: '0x1195cf65f83b3a5768f3c496d3a05ad6412c64b7',
  value: '0x0',
  data: '0x42842e0e0000000000000000000000005853ed4f26a3fcea565b3fbc698bb19cdf6deb8500000000000000000000000052dec422aa4bae0fb6f2b41db023dffa9f4a1353000000000000000000000000000000000000000000000000000000000006b7eb',
  gas: '',
  maxFeePerGas: '0xc65d40',
  maxPriorityFeePerGas: '0xc65d40',
  nonce: '0x6e3',
};
