export const preExecData = {
  abi: {
    func: 'approve',
    params: ['0x0000000000000000000000000000000000000000', 967011],
  },
  abi_str:
    '{\n    "func": "approve",\n    "params": [\n        "0x0000000000000000000000000000000000000000",\n        967011\n    ]\n}',
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
    gas_used: 36498,
    gas_limit: 36861,
    gas_ratio: 1.3,
  },
  is_gnosis: false,
  native_token: {
    id: 'bsc',
    chain: 'bsc',
    name: 'BNB',
    symbol: 'BNB',
    display_symbol: null,
    optimized_symbol: 'BNB',
    decimals: 18,
    logo_url:
      'https://static.debank.com/image/coin/logo_url/bnb/9784283a36f23a58982fc964574ea530.png',
    protocol_id: '',
    price: 572.3,
    price_24h_change: -0.012935494998275269,
    credit_score: 100000000.0,
    is_verified: true,
    is_scam: false,
    is_suspicious: false,
    is_core: true,
    is_wallet: true,
    time_at: 1598630400.0,
    amount: 0.001906764804008079,
  },
  pre_exec_version: 'v2',
  pre_exec: {
    success: true,
    error: null,
  },
  type_cancel_single_nft_approval: {
    spender: '0x0000000000000000000000000000000000000000',
    spender_protocol_name: null,
    spender_protocol_logo_url: '',
    token_symbol: '#967011',
    is_nft: true,
    nft: {
      id: 'ee42db89591137175614c8e00ce012e0',
      contract_id: '0x46a15b0b27311cedf172ab29e4f4766fbe7f4364',
      inner_id: '967011',
      chain: 'bsc',
      symbol: 'PCS-V3-POS',
      name: '#967011',
      description: null,
      content_type: null,
      content: '',
      thumbnail_url: '',
      total_supply: 1,
      attributes: [],
      detail_url:
        'https://opensea.io/assets/0x46a15b0b27311cedf172ab29e4f4766fbe7f4364/967011',
      collection_id: 'bsc:0x46a15b0b27311cedf172ab29e4f4766fbe7f4364',
      is_erc1155: false,
      is_erc721: true,
      pay_token: null,
      collection: {
        id: 'bsc:0x46a15b0b27311cedf172ab29e4f4766fbe7f4364',
        chain: 'bsc',
        name: 'Pancake V3 Positions NFT-V1',
        description: null,
        logo_url: '',
        is_verified: true,
        credit_score: 743486.6457284187,
        is_scam: false,
        is_suspicious: false,
        is_core: false,
        floor_price: 0.0,
      },
    },
  },
  trace_id: '4126526c695b4e5ea62ce42fa382aa9c',
} as any;

export const parseTxData = {
  action: {
    type: 'revoke_nft',
    data: {
      spender: '0x000000eed287174a06550eabe6a00074255cab34',
      nft: {
        id: 'ee42db89591137175614c8e00ce012e0',
        contract_id: '0x46a15b0b27311cedf172ab29e4f4766fbe7f4364',
        inner_id: '967011',
        chain: 'bsc',
        symbol: 'PCS-V3-POS',
        name: '#967011',
        description: null,
        content_type: null,
        content: '',
        thumbnail_url: '',
        total_supply: 1,
        attributes: [],
        detail_url:
          'https://opensea.io/assets/0x46a15b0b27311cedf172ab29e4f4766fbe7f4364/967011',
        collection_id: 'bsc:0x46a15b0b27311cedf172ab29e4f4766fbe7f4364',
        is_erc1155: false,
        is_erc721: true,
        pay_token: null,
        collection: {
          id: 'bsc:0x46a15b0b27311cedf172ab29e4f4766fbe7f4364',
          chain: 'bsc',
          name: 'Pancake V3 Positions NFT-V1',
          description: null,
          logo_url: '',
          is_verified: true,
          credit_score: 743486.6457284187,
          is_scam: false,
          is_suspicious: false,
          is_core: false,
          floor_price: 0.0,
        },
      },
    },
  },
  contract_call: {
    func: 'approve',
    contract: {
      id: '0x46a15b0b27311cedf172ab29e4f4766fbe7f4364',
      protocol: {
        name: 'PancakeSwap V3',
        logo_url:
          'https://static.debank.com/image/project/logo_url/bsc_pancakeswap3/d575f1697e05d43c237e3986dae3e8bb.png',
      },
    },
  },
  log_id: 87920905,
} as any;

export const txData = {
  chainId: 56,
  data: '0x095ea7b3000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ec163',
  from: '0x99bf13b64758d1c71dcb8a16897edae9e8c12039',
  gas: '0x0',
  gasPrice: '0x3b9aca00',
  nonce: '0x1bd',
  to: '0x46a15b0b27311cedf172ab29e4f4766fbe7f4364',
  value: '0x0',
};
