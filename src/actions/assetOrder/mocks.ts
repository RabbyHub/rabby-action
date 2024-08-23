export const parseTxData = {
  action: {
    type: 'swap_order',
    data: {
      pay_token_list: [],
      pay_nft_list: [
        {
          id: '7c5af5024c052918572be745b49c0465',
          contract_id: '0x922dc160f2ab743312a6bb19dd5152c1d3ecca33',
          inner_id: '176',
          chain: 'eth',
          symbol: 'DUCKIE',
          name: 'Duckie #176',
          description: '',
          content_type: 'image_url',
          content:
            'https://static.debank.com/image/eth_nft/local_url/7c5af5024c052918572be745b49c0465/2809cbb2f39f6aab801977c51e371c67.png',
          thumbnail_url:
            'https://static.debank.com/image/eth_nft/thumbnail_url/7c5af5024c052918572be745b49c0465/2809cbb2f39f6aab801977c51e371c67.png',
          total_supply: 1,
          attributes: [
            {
              trait_type: 'Background',
              value: 'Blue',
            },
            {
              trait_type: 'Type',
              value: 'Yellow',
            },
            {
              trait_type: 'Eyes',
              value: 'Superhero Blue',
            },
            {
              trait_type: 'Face',
              value: 'Mole',
            },
            {
              trait_type: 'Body',
              value: 'Black Suit Turtle Neck',
            },
          ],
          detail_url:
            'https://opensea.io/assets/0x922dc160f2ab743312a6bb19dd5152c1d3ecca33/176',
          collection_id: 'eth:0x922dc160f2ab743312a6bb19dd5152c1d3ecca33',
          is_erc1155: false,
          is_erc721: true,
          pay_token: null,
          collection: {
            id: 'eth:0x922dc160f2ab743312a6bb19dd5152c1d3ecca33',
            chain: 'eth',
            name: 'Crypto Duckies (on-chain)',
            description: null,
            logo_url:
              'https://static.debank.com/image/nft_collection/logo_url/crypto-duckies-v2/253d45dec8bdb8386542c6e64a83be09.png',
            is_verified: true,
            credit_score: 0.0,
            is_scam: false,
            is_suspicious: false,
            is_core: true,
            floor_price: 0.0099,
          },
          amount: 1,
        },
      ],
      takers: [],
      receive_token_list: [
        {
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
          price: 2637.79,
          price_24h_change: 0.011791104888667183,
          credit_score: 100000000.0,
          is_verified: true,
          is_scam: false,
          is_suspicious: false,
          is_core: true,
          is_wallet: true,
          time_at: 1483200000.0,
          amount: 0.0,
          raw_amount: '0',
        },
      ],
      receive_nft_list: [],
      receiver: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85',
      expire_at: 1661170320,
    },
  },
  log_id: 6377924,
} as any;

export const txData = {
  types: {
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
  },
  primaryType: 'OrderComponents',
  domain: {
    name: 'Seaport',
    version: '1.1',
    chainId: '1',
    verifyingContract: '0x00000000006c3852cbef3e08e8df289169ede581',
  },
  message: {
    offerer: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85',
    zone: '0x004c00500000ad104d7dbd00e3ae0a5c00560c00',
    offer: [
      {
        itemType: '2',
        token: '0x922dc160f2ab743312a6bb19dd5152c1d3ecca33',
        identifierOrCriteria: '176',
        startAmount: '1',
        endAmount: '1',
      },
    ],
    consideration: [
      {
        itemType: '0',
        token: '0x0000000000000000000000000000000000000000',
        identifierOrCriteria: '0',
        startAmount: '0',
        endAmount: '0',
        recipient: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85',
      },
      {
        itemType: '0',
        token: '0x0000000000000000000000000000000000000000',
        identifierOrCriteria: '0',
        startAmount: '25000000000000000',
        endAmount: '25000000000000000',
        recipient: '0x8de9c5a032463c561423387a9648c5c7bcc5bc90',
      },
      {
        itemType: '0',
        token: '0x0000000000000000000000000000000000000000',
        identifierOrCriteria: '0',
        startAmount: '50000000000000000',
        endAmount: '50000000000000000',
        recipient: '0x5c6139cd9ff1170197f13935c58f825b422c744c',
      },
    ],
    orderType: '3',
    startTime: '1660565524',
    endTime: '1661170320',
    zoneHash:
      '0x3000000000000000000000000000000000000000000000000000000000000000',
    salt: '5965482869793190759363249887602871532',
    conduitKey:
      '0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000',
    counter: '0',
  },
};
