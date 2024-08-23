export const parseTxData = {
  action: {
    type: 'buy_nft_order',
    data: {
      pay_token: {
        id: '0xe5d7c2a44ffddf6b295a15c148167daaaf5cf34f',
        chain: 'linea',
        name: 'Wrapped Ether',
        symbol: 'WETH',
        display_symbol: null,
        optimized_symbol: 'WETH',
        decimals: 18,
        logo_url:
          'https://static.debank.com/image/linea_token/logo_url/0xe5d7c2a44ffddf6b295a15c148167daaaf5cf34f/61844453e63cf81301f845d7864236f6.png',
        protocol_id: '',
        price: 2675.64,
        price_24h_change: 0.021644608507438115,
        credit_score: 8253462.108345555,
        is_verified: true,
        is_scam: false,
        is_suspicious: false,
        is_core: true,
        is_wallet: true,
        time_at: 1689349594.0,
        amount: 0.0183064,
        raw_amount: '18306400000000000',
      },
      receive_nft: {
        id: '9fb8de84306e2d372edcf8f25f058d00',
        contract_id: '0x0872ec4426103482a50f26ffc32acefcec61b3c9',
        inner_id: '4',
        chain: 'linea',
        symbol: 'VOYAGE',
        name: 'Linea Voyage - Delta Edition',
        description:
          'The Delta Edition represents the inception of the network, the moment of instantiation of the testnet and activation of the community effort, sending waves of energy throughout the network, and setting into motion the potential to come.',
        content_type: 'image_url',
        content:
          'https://static.debank.com/image/linea_nft/local_url/9fb8de84306e2d372edcf8f25f058d00/8ee5c720e5801d2b4b610d426934b8f0.png',
        thumbnail_url:
          'https://static.debank.com/image/linea_nft/thumbnail_url/9fb8de84306e2d372edcf8f25f058d00/8ee5c720e5801d2b4b610d426934b8f0.png',
        total_supply: 1,
        attributes: [
          {
            trait_type: 'Tier',
            value: '4',
          },
        ],
        detail_url:
          'https://opensea.io/assets/0x0872ec4426103482a50f26ffc32acefcec61b3c9/4',
        collection_id: 'linea:0x0872ec4426103482a50f26ffc32acefcec61b3c9',
        is_erc1155: true,
        is_erc721: false,
        pay_token: {
          id: 'linea',
          amount: 0.005,
          time_at: 1724391665.0,
          date_at: '2024-08-23',
        },
        usd_price: 13.3782,
        collection: {
          id: 'linea:0x0872ec4426103482a50f26ffc32acefcec61b3c9',
          chain: 'linea',
          name: 'Linea Voyage',
          description: null,
          logo_url:
            'https://static.debank.com/image/linea_nft/thumbnail_url/ed919ba151a0ca09b8d861f0b250d736/67be4a0b1fe20c7e7d9ff5c844fec95c.png',
          is_verified: true,
          credit_score: 82225.96052432296,
          is_scam: false,
          is_suspicious: false,
          is_core: true,
          floor_price: 0.0,
        },
        amount: 4,
      },
      receiver: '0xc24a6988496b4d9b3c7ce42c5f865c2f634f184c',
      takers: [],
      expire_at: 452312848583266388373324160190187140051835877600158453286537246700531674443,
    },
  },
  log_id: 6378429,
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
    ERC1155BuyOrder: [
      {
        name: 'maker',
        type: 'address',
      },
      {
        name: 'taker',
        type: 'address',
      },
      {
        name: 'expiry',
        type: 'uint256',
      },
      {
        name: 'nonce',
        type: 'uint256',
      },
      {
        name: 'erc20Token',
        type: 'address',
      },
      {
        name: 'erc20TokenAmount',
        type: 'uint256',
      },
      {
        name: 'fees',
        type: 'Fee[]',
      },
      {
        name: 'erc1155Token',
        type: 'address',
      },
      {
        name: 'erc1155TokenId',
        type: 'uint256',
      },
      {
        name: 'erc1155TokenProperties',
        type: 'Property[]',
      },
      {
        name: 'erc1155TokenAmount',
        type: 'uint128',
      },
      {
        name: 'hashNonce',
        type: 'uint256',
      },
    ],
    Fee: [
      {
        name: 'recipient',
        type: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
      },
      {
        name: 'feeData',
        type: 'bytes',
      },
    ],
    Property: [
      {
        name: 'propertyValidator',
        type: 'address',
      },
      {
        name: 'propertyData',
        type: 'bytes',
      },
    ],
  },
  primaryType: 'ERC1155BuyOrder',
  domain: {
    chainId: 59144,
    name: 'ElementEx',
    verifyingContract: '0x0cab6977a9c70e04458b740476b498b214019641',
    version: '1.0.0',
  },
  message: {
    erc1155Token: '0x0872ec4426103482a50f26ffc32acefcec61b3c9',
    erc1155TokenAmount: '4',
    erc1155TokenId: '4',
    erc1155TokenProperties: [],
    erc20Token: '0xe5d7c2a44ffddf6b295a15c148167daaaf5cf34f',
    erc20TokenAmount: '18306400000000000',
    expiry:
      '452312848583266388373324160190187140051835877600158453286537246700531674443',
    fees: [
      {
        amount: '373600000000000',
        feeData: '0x',
        recipient: '0x7538262ae993ca117a0e481f908209137a46268e',
      },
    ],
    hashNonce: '0',
    maker: '0xc24a6988496b4d9b3c7ce42c5f865c2f634f184c',
    nonce: '33147',
    taker: '0x0000000000000000000000000000000000000000',
  },
};
