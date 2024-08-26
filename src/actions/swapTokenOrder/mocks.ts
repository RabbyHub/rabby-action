export const parseTxData = {
  action: {
    type: 'swap_token_order',
    data: {
      pay_token: {
        id: '0x912ce59144191c1204e64559fe8253a0e49e6548',
        chain: 'arb',
        name: 'Arbitrum',
        symbol: 'ARB',
        display_symbol: null,
        optimized_symbol: 'ARB',
        decimals: 18,
        logo_url:
          'https://static.debank.com/image/arb_token/logo_url/0x912ce59144191c1204e64559fe8253a0e49e6548/7623afc27299327fdb0b090fd67e8ff4.png',
        protocol_id: 'arb_arbitrum',
        price: 0.6011,
        price_24h_change: -0.010046113306982863,
        credit_score: 8236236.111377676,
        is_verified: true,
        is_scam: false,
        is_suspicious: false,
        is_core: true,
        is_wallet: true,
        time_at: 1678968508.0,
        amount: 0.09469771869076055,
        raw_amount: '94697718690760550',
      },
      takers: [],
      receive_token: {
        id: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
        chain: 'arb',
        name: 'USD Coin (Arb1)',
        symbol: 'USDC',
        display_symbol: 'USDC(Bridged)',
        optimized_symbol: 'USDC(Bridged)',
        decimals: 6,
        logo_url:
          'https://static.debank.com/image/avax_token/logo_url/0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664/c1503ade9d53497fe93ca9f2723c56a1.png',
        protocol_id: 'arb_tracer',
        price: 0.9997000899730081,
        price_24h_change: 9.997000899729147e-5,
        credit_score: 7004316.5478356965,
        is_verified: true,
        is_scam: false,
        is_suspicious: false,
        is_core: true,
        is_wallet: true,
        time_at: 1623868379.0,
        amount: 0.05078,
        raw_amount: '50780',
      },
      receiver: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85',
      expire_at: 1724650677,
    },
  },
  log_id: 6489664,
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
    SingleOrder: [
      {
        name: 'partner_id',
        type: 'uint64',
      },
      {
        name: 'expiry',
        type: 'uint256',
      },
      {
        name: 'taker_address',
        type: 'address',
      },
      {
        name: 'maker_address',
        type: 'address',
      },
      {
        name: 'maker_nonce',
        type: 'uint256',
      },
      {
        name: 'taker_token',
        type: 'address',
      },
      {
        name: 'maker_token',
        type: 'address',
      },
      {
        name: 'taker_amount',
        type: 'uint256',
      },
      {
        name: 'maker_amount',
        type: 'uint256',
      },
      {
        name: 'receiver',
        type: 'address',
      },
      {
        name: 'packed_commands',
        type: 'uint256',
      },
    ],
  },
  primaryType: 'SingleOrder',
  domain: {
    name: 'BebopSettlement',
    version: '2',
    chainId: 42161,
    verifyingContract: '0xbbbbbbb520d69a9775e85b458c58c648259fad5f',
  },
  message: {
    partner_id: '0',
    expiry: '1724650677',
    taker_address: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85',
    maker_address: '0x51c72848c68a965f66fa7a88855f9f7784502a7f',
    maker_nonce: '1721755371476',
    taker_token: '0x912ce59144191c1204e64559fe8253a0e49e6548',
    maker_token: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
    taker_amount: '94697718690760550',
    maker_amount: '50780',
    receiver: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85',
    packed_commands: '4',
  },
};
