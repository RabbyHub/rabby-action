export const parseTxData = {
  action: {
    type: 'sell_nft_order',
    data: {
      pay_nft: {
        id: '2374a8d8f35ed510c74ad7838f06a322',
        contract_id: '0xf494d8c3a421b6175cb1d89ea70715e1932637a9',
        inner_id: '1',
        chain: 'matic',
        symbol: 'PLANT',
        name: '#1',
        description: null,
        content_type: null,
        content: '',
        thumbnail_url: '',
        total_supply: 420,
        attributes: [],
        detail_url:
          'https://opensea.io/assets/0xf494d8c3a421b6175cb1d89ea70715e1932637a9/1',
        collection_id: 'matic:0xf494d8c3a421b6175cb1d89ea70715e1932637a9',
        is_erc1155: true,
        is_erc721: false,
        pay_token: null,
        collection: {
          id: 'matic:0xf494d8c3a421b6175cb1d89ea70715e1932637a9',
          chain: 'matic',
          name: 'PLANT.z - BLOOMER',
          description: null,
          logo_url: '',
          is_verified: true,
          credit_score: null,
          is_scam: true,
          is_suspicious: false,
          is_core: false,
          floor_price: 0.0,
        },
        amount: 90,
      },
      receive_token: {
        id: 'matic',
        chain: 'matic',
        name: 'MATIC',
        symbol: 'MATIC',
        display_symbol: null,
        optimized_symbol: 'MATIC',
        decimals: 18,
        logo_url:
          'https://static.debank.com/image/matic_token/logo_url/matic/6f5a6b6f0732a7a235131bd7804d357c.png',
        protocol_id: '',
        price: 0.525,
        price_24h_change: -0.06766116142781037,
        credit_score: 100000000.0,
        is_verified: true,
        is_scam: false,
        is_suspicious: false,
        is_core: true,
        is_wallet: true,
        time_at: null,
        amount: 41.454,
        raw_amount: '41454000000000000000',
      },
      receiver: '0xfac07fa759cae79cf85fa4f7c947ace0a2d5ed8c',
      takers: [],
      expire_at: 452312848583266388373324160190187140051835877600158453286538399315143056087,
    },
  },
  log_id: 6517750,
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
    ERC1155SellOrder: [
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
  },
  primaryType: 'ERC1155SellOrder',
  domain: {
    chainId: 137,
    name: 'ElementEx',
    verifyingContract: '0xeaf5453b329eb38be159a872a6ce91c9a8fb0260',
    version: '1.0.0',
  },
  message: {
    erc1155Token: '0xf494d8c3a421b6175cb1d89ea70715e1932637a9',
    erc1155TokenAmount: '90',
    erc1155TokenId: '1',
    erc20Token: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    erc20TokenAmount: '41454000000000000000',
    expiry:
      '452312848583266388373324160190187140051835877600158453286538399315143056087',
    fees: [
      {
        amount: '846000000000000000',
        feeData: '0x',
        recipient: '0xd207842d66b715df6ea08cf52f025b9e2ed28788',
      },
    ],
    hashNonce: '0',
    maker: '0xfac07fa759cae79cf85fa4f7c947ace0a2d5ed8c',
    nonce: '1',
    taker: '0x0000000000000000000000000000000000000000',
  },
};
