export const preExecData = {
  abi: {
    func: 'approve',
    params: ['0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', 745],
  },
  abi_str:
    '{\n    "func": "approve",\n    "params": [\n        "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",\n        745\n    ]\n}',
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
    gas_used: 48759,
    gas_limit: 49146,
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
    price: 2632.17,
    price_24h_change: 0.020513635693958674,
    credit_score: 100000000.0,
    is_verified: true,
    is_scam: false,
    is_suspicious: false,
    is_core: true,
    is_wallet: true,
    time_at: 1483200000.0,
    amount: 0.00147682999416643,
  },
  pre_exec_version: 'v2',
  pre_exec: {
    success: true,
    error: null,
  },
  type_single_nft_approval: {
    spender: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
    spender_protocol_name: 'Uniswap V2',
    spender_protocol_logo_url:
      'https://static.debank.com/image/project/logo_url/uniswap2/87a541b3b83b041c8d12119e5a0d19f0.png',
    token_symbol: 'Metascapes #745',
    token_amount: 1,
    is_infinity: false,
    is_nft: true,
    nft: {
      id: '12ce1dbcf984dd9174065edc9531a09b',
      contract_id: '0x75d639e5e52b4ea5426f2fb46959b9c3099b729a',
      inner_id: '745',
      chain: 'eth',
      symbol: 'MTSCPS',
      name: 'Metascapes #745',
      description:
        '2555 hand-picked AI landscape images of a unique collaboration between Cath Simard, Ryan Newburn, Iurie Belegurschi and Artificial Intelligence, bridging the natural and the supernatural.\n\nhttps://metascapes.sloika.xyz/',
      content_type: 'image_url',
      content:
        'https://static.debank.com/image/eth_nft/local_url/12ce1dbcf984dd9174065edc9531a09b/47202001ef73e7586c53412c3bc72629.png',
      thumbnail_url:
        'https://static.debank.com/image/eth_nft/thumbnail_url/12ce1dbcf984dd9174065edc9531a09b/e5a971f66038f0159ac918b0faacd49e.png',
      total_supply: 1,
      attributes: [
        {
          trait_type: 'Type',
          value: 'Image',
        },
      ],
      detail_url:
        'https://opensea.io/assets/0x75d639e5e52b4ea5426f2fb46959b9c3099b729a/745',
      collection_id: 'eth:0x75d639e5e52b4ea5426f2fb46959b9c3099b729a',
      is_erc1155: false,
      is_erc721: true,
      pay_token: {
        id: 'eth',
        amount: 0.099,
        time_at: 1678369547.0,
        date_at: '2023-03-09',
      },
      usd_price: 151.69176000000002,
      collection: {
        id: 'eth:0x75d639e5e52b4ea5426f2fb46959b9c3099b729a',
        chain: 'eth',
        name: 'The Metascapes',
        description: null,
        logo_url:
          'https://static.debank.com/image/nft_collection/logo_url/the-metascapes/065c2cd129c3c0023c6cb3ea2051be4a.png',
        is_verified: true,
        credit_score: 216.306447552488,
        is_scam: false,
        is_suspicious: false,
        is_core: true,
        floor_price: 0.0243,
      },
    },
    token: {
      raw_amount: 1,
      raw_amount_hex_str: '0x1',
      is_infinity: false,
    },
  },
  trace_id: '182385710d964fdaba026f2a76a6dc36',
} as any;

export const parseTxData = {
  action: {
    type: 'approve_nft',
    data: {
      spender: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
      nft: {
        id: '12ce1dbcf984dd9174065edc9531a09b',
        contract_id: '0x75d639e5e52b4ea5426f2fb46959b9c3099b729a',
        inner_id: '745',
        chain: 'eth',
        symbol: 'MTSCPS',
        name: 'Metascapes #745',
        description:
          '2555 hand-picked AI landscape images of a unique collaboration between Cath Simard, Ryan Newburn, Iurie Belegurschi and Artificial Intelligence, bridging the natural and the supernatural.\n\nhttps://metascapes.sloika.xyz/',
        content_type: 'image_url',
        content:
          'https://static.debank.com/image/eth_nft/local_url/12ce1dbcf984dd9174065edc9531a09b/47202001ef73e7586c53412c3bc72629.png',
        thumbnail_url:
          'https://static.debank.com/image/eth_nft/thumbnail_url/12ce1dbcf984dd9174065edc9531a09b/e5a971f66038f0159ac918b0faacd49e.png',
        total_supply: 1,
        attributes: [
          {
            trait_type: 'Type',
            value: 'Image',
          },
        ],
        detail_url:
          'https://opensea.io/assets/0x75d639e5e52b4ea5426f2fb46959b9c3099b729a/745',
        collection_id: 'eth:0x75d639e5e52b4ea5426f2fb46959b9c3099b729a',
        is_erc1155: false,
        is_erc721: true,
        pay_token: {
          id: 'eth',
          amount: 0.099,
          time_at: 1678369547.0,
          date_at: '2023-03-09',
        },
        usd_price: 151.69176000000002,
        collection: {
          id: 'eth:0x75d639e5e52b4ea5426f2fb46959b9c3099b729a',
          chain: 'eth',
          name: 'The Metascapes',
          description: null,
          logo_url:
            'https://static.debank.com/image/nft_collection/logo_url/the-metascapes/065c2cd129c3c0023c6cb3ea2051be4a.png',
          is_verified: true,
          credit_score: 216.306447552488,
          is_scam: false,
          is_suspicious: false,
          is_core: true,
          floor_price: 0.0243,
        },
      },
    },
  },
  contract_call: {
    func: 'approve',
    contract: {
      id: '0x75d639e5e52b4ea5426f2fb46959b9c3099b729a',
      protocol: null,
    },
  },
  log_id: 84523037,
} as any;

export const txData = {
  chainId: 1,
  data: '0x095ea7b30000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488d00000000000000000000000000000000000000000000000000000000000002e9',
  from: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85',
  gas: '',
  maxFeePerGas: '0x4190ab00',
  maxPriorityFeePerGas: '0x4190ab00',
  nonce: '0x168f',
  to: '0x75d639e5e52b4ea5426f2fb46959b9c3099b729a',
  value: '0x0',
};
