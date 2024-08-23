export const parseTxData = {
  action: {
    type: 'sell_nft_list_order',
    data: {
      pay_nft_list: [
        {
          id: '56213abc1200ffb1c59acda9eb7d770c',
          contract_id: '0x83a79fb0a10a6fe6d4d46bff3cf0ffff75e9549e',
          inner_id: '393',
          chain: 'eth',
          symbol: 'MPW',
          name: 'Metaplaces World',
          description:
            'Metaplaces World is a collection of Metaverse lands NFTs where you can build your Metaplaces houses, offices and commerces. There are various types of Metaplaces world land, each with their own environment. Combine multiple land NFTs to generate a larger plot of land and unlock bigger commercial buildings.',
          content_type: 'image_url',
          content:
            'https://static.debank.com/image/eth_nft/local_url/7390b0cd9b797b428c1461a547f4a8c5/5f72f558c3196fe087a8ac1b0d7c7859.png',
          thumbnail_url:
            'https://static.debank.com/image/eth_nft/thumbnail_url/7390b0cd9b797b428c1461a547f4a8c5/5f72f558c3196fe087a8ac1b0d7c7859.png',
          total_supply: 1,
          attributes: [],
          detail_url:
            'https://opensea.io/assets/0x83a79fb0a10a6fe6d4d46bff3cf0ffff75e9549e/393',
          collection_id: 'eth:0x83a79fb0a10a6fe6d4d46bff3cf0ffff75e9549e',
          is_erc1155: false,
          is_erc721: true,
          pay_token: null,
          collection: {
            id: 'eth:0x83a79fb0a10a6fe6d4d46bff3cf0ffff75e9549e',
            chain: 'eth',
            name: 'Metaplaces World',
            description: null,
            logo_url:
              'https://static.debank.com/image/nft_collection/logo_url/metaplaces-world/c5a6675dfd6e670c9a5bb3c53527733e.png',
            is_verified: true,
            credit_score: null,
            is_scam: false,
            is_suspicious: false,
            is_core: true,
            floor_price: 0.045,
          },
          amount: 1,
        },
        {
          id: 'f7c01b53d0949167da53827248ecd09f',
          contract_id: '0x83a79fb0a10a6fe6d4d46bff3cf0ffff75e9549e',
          inner_id: '24',
          chain: 'eth',
          symbol: 'MPW',
          name: 'Metaplaces World 24',
          description:
            'Metaplaces World is a collection of Metaverse lands NFTs where you can build your Metaplaces houses, offices and commerces. There are various types of Metaplaces world land, each with their own environment. Combine multiple land NFTs to generate a larger plot of land and unlock bigger commercial buildings.',
          content_type: 'image_url',
          content:
            'https://static.debank.com/image/eth_nft/local_url/046a213f3f5442d0d7f57a3bb6cc0bdf/d3927e7a6938b2187fa6c9edc5efe84f.png',
          thumbnail_url:
            'https://static.debank.com/image/eth_nft/thumbnail_url/046a213f3f5442d0d7f57a3bb6cc0bdf/d3927e7a6938b2187fa6c9edc5efe84f.png',
          total_supply: 1,
          attributes: [
            {
              trait_type: 'type',
              value: 'Sand',
            },
            {
              trait_type: 'x',
              value: '153',
            },
            {
              trait_type: 'y',
              value: '62',
            },
          ],
          detail_url:
            'https://opensea.io/assets/0x83a79fb0a10a6fe6d4d46bff3cf0ffff75e9549e/24',
          collection_id: 'eth:0x83a79fb0a10a6fe6d4d46bff3cf0ffff75e9549e',
          is_erc1155: false,
          is_erc721: true,
          pay_token: null,
          collection: {
            id: 'eth:0x83a79fb0a10a6fe6d4d46bff3cf0ffff75e9549e',
            chain: 'eth',
            name: 'Metaplaces World',
            description: null,
            logo_url:
              'https://static.debank.com/image/nft_collection/logo_url/metaplaces-world/c5a6675dfd6e670c9a5bb3c53527733e.png',
            is_verified: true,
            credit_score: null,
            is_scam: false,
            is_suspicious: false,
            is_core: true,
            floor_price: 0.045,
          },
          amount: 1,
        },
      ],
      receive_token: {
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
        price: 2672.1,
        price_24h_change: 0.018695187981392587,
        credit_score: 100000000.0,
        is_verified: true,
        is_scam: false,
        is_suspicious: false,
        is_core: true,
        is_wallet: true,
        time_at: 1483200000.0,
        amount: 0.08145,
        raw_amount: '81450000000000000',
      },
      receiver: '0xcb1605ed17f6145db16e26e1d8adfe8f4b175377',
      takers: [],
      expire_at: 1727002657,
    },
    is_asset_changed: true,
    is_involving_privacy: false,
  },
  log_id: 6348205,
} as any;

export const txData = {
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
    BulkOrder: [
      {
        name: 'tree',
        type: 'OrderComponents[2]',
      },
    ],
    ConsiderationItem: [
      {
        name: 'itemType',
        type: 'uint8',
      },
      {
        name: 'token',
        type: 'address',
      },
      {
        name: 'identifierOrCriteria',
        type: 'uint256',
      },
      {
        name: 'startAmount',
        type: 'uint256',
      },
      {
        name: 'endAmount',
        type: 'uint256',
      },
      {
        name: 'recipient',
        type: 'address',
      },
    ],
    OfferItem: [
      {
        name: 'itemType',
        type: 'uint8',
      },
      {
        name: 'token',
        type: 'address',
      },
      {
        name: 'identifierOrCriteria',
        type: 'uint256',
      },
      {
        name: 'startAmount',
        type: 'uint256',
      },
      {
        name: 'endAmount',
        type: 'uint256',
      },
    ],
    OrderComponents: [
      {
        name: 'offerer',
        type: 'address',
      },
      {
        name: 'zone',
        type: 'address',
      },
      {
        name: 'offer',
        type: 'OfferItem[]',
      },
      {
        name: 'consideration',
        type: 'ConsiderationItem[]',
      },
      {
        name: 'orderType',
        type: 'uint8',
      },
      {
        name: 'startTime',
        type: 'uint256',
      },
      {
        name: 'endTime',
        type: 'uint256',
      },
      {
        name: 'zoneHash',
        type: 'bytes32',
      },
      {
        name: 'salt',
        type: 'uint256',
      },
      {
        name: 'conduitKey',
        type: 'bytes32',
      },
      {
        name: 'counter',
        type: 'uint256',
      },
    ],
  },
  primaryType: 'BulkOrder',
  domain: {
    chainId: 1,
    name: 'Seaport',
    verifyingContract: '0x0000000000000068f116a894984e2db1123eb395',
    version: '1.6',
  },
  message: {
    tree: [
      {
        conduitKey:
          '0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000',
        consideration: [
          {
            endAmount: '40725000000000000',
            identifierOrCriteria: '0',
            itemType: '0',
            recipient: '0xcb1605ed17f6145db16e26e1d8adfe8f4b175377',
            startAmount: '40725000000000000',
            token: '0x0000000000000000000000000000000000000000',
          },
          {
            endAmount: '1125000000000000',
            identifierOrCriteria: '0',
            itemType: '0',
            recipient: '0x0000a26b00c1f0df003000390027140000faa719',
            startAmount: '1125000000000000',
            token: '0x0000000000000000000000000000000000000000',
          },
          {
            endAmount: '3150000000000000',
            identifierOrCriteria: '0',
            itemType: '0',
            recipient: '0x7b6eddf37a46a4e2a4a1625f1baf65215ea98dba',
            startAmount: '3150000000000000',
            token: '0x0000000000000000000000000000000000000000',
          },
        ],
        counter: '0',
        endTime: '1727002657',
        offer: [
          {
            endAmount: '1',
            identifierOrCriteria: '393',
            itemType: '2',
            startAmount: '1',
            token: '0x83a79fb0a10a6fe6d4d46bff3cf0ffff75e9549e',
          },
        ],
        offerer: '0xcb1605ed17f6145db16e26e1d8adfe8f4b175377',
        orderType: '0',
        salt: '24446860302761739304752683030156737591518664810215442929804234547000804262148',
        startTime: '1724324377',
        totalOriginalConsiderationItems: '3',
        zone: '0x004c00500000ad104d7dbd00e3ae0a5c00560c00',
        zoneHash:
          '0x0000000000000000000000000000000000000000000000000000000000000000',
      },
      {
        conduitKey:
          '0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000',
        consideration: [
          {
            endAmount: '40725000000000000',
            identifierOrCriteria: '0',
            itemType: '0',
            recipient: '0xcb1605ed17f6145db16e26e1d8adfe8f4b175377',
            startAmount: '40725000000000000',
            token: '0x0000000000000000000000000000000000000000',
          },
          {
            endAmount: '1125000000000000',
            identifierOrCriteria: '0',
            itemType: '0',
            recipient: '0x0000a26b00c1f0df003000390027140000faa719',
            startAmount: '1125000000000000',
            token: '0x0000000000000000000000000000000000000000',
          },
          {
            endAmount: '3150000000000000',
            identifierOrCriteria: '0',
            itemType: '0',
            recipient: '0x7b6eddf37a46a4e2a4a1625f1baf65215ea98dba',
            startAmount: '3150000000000000',
            token: '0x0000000000000000000000000000000000000000',
          },
        ],
        counter: '0',
        endTime: '1727002657',
        offer: [
          {
            endAmount: '1',
            identifierOrCriteria: '24',
            itemType: '2',
            startAmount: '1',
            token: '0x83a79fb0a10a6fe6d4d46bff3cf0ffff75e9549e',
          },
        ],
        offerer: '0xcb1605ed17f6145db16e26e1d8adfe8f4b175377',
        orderType: '0',
        salt: '24446860302761739304752683030156737591518664810215442929818224223112297886615',
        startTime: '1724324377',
        totalOriginalConsiderationItems: '3',
        zone: '0x004c00500000ad104d7dbd00e3ae0a5c00560c00',
        zoneHash:
          '0x0000000000000000000000000000000000000000000000000000000000000000',
      },
    ],
  },
};
