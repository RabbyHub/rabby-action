export const apiProvider = {
  getContractInfo: jest.fn().mockReturnValue({
    id: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
    credit: {
      value: 2915593.386963269,
      rank_at: 65,
    },
    is_token: false,
    token_approval_exposure: 660231230.9361362,
    top_nft_approval_exposure: 0,
    spend_usd_value: 20000000000,
    top_nft_spend_usd_value: 0,
    create_at: 1591388241.0,
    name: '',
    protocol: {
      id: 'uniswap2',
      name: 'Uniswap V2',
      logo_url:
        'https://static.debank.com/image/project/logo_url/uniswap2/87a541b3b83b041c8d12119e5a0d19f0.png',
    },
    is_danger: {
      auto: null,
      edit: false,
    },
  }),
  addrDesc: jest.fn().mockReturnValue({
    desc: {
      id: '0x5853ed4f26a3fcea565b3fbc698bb19cdf6deb85',
      name: null,
      is_spam: false,
      is_danger: null,
      is_scam: null,
      is_restricted: null,
      cex: {},
      protocol: {},
      contract: {},
      born_at: 1564655163,
      used_chains: [
        'ftm',
        'eth',
        'dfk',
        'celo',
        'dbk',
        'core',
        'movr',
        'nova',
        'zeta',
        'opbnb',
        'op',
        'avax',
        'hmy',
        'mode',
        'cfx',
        'scrl',
        'dym',
        'btt',
        'canto',
        'linea',
        'mtr',
        'tenet',
        'pls',
        'rsk',
        'fsn',
        'platon',
        'sbch',
        'taiko',
        'zora',
        'aurora',
        'astar',
        'kava',
        'rose',
        'beam',
        'matic',
        'sei',
        'mnt',
        'zklink',
        'lyx',
        'karak',
        'arb',
        'blast',
        'base',
        'klay',
        'tlos',
        'ckb',
        'fuse',
        'xdai',
        'pze',
        'doge',
        'wan',
        'mobm',
        'kcc',
        'oas',
        'shib',
        'xlayer',
        'mada',
        'era',
        'etc',
        'metis',
        'ron',
        'step',
        'sx',
        'zkfair',
        'sgb',
        'boba',
        'brise',
        'kroma',
        'flr',
        'bsc',
        'iotx',
        'cro',
        'aze',
      ],
      usd_value: 4418.154405584272,
      tags: [],
      thirdparty_names: {},
    },
  }),
  hasInteraction: jest.fn().mockReturnValue({ has_interaction: true }),
  getToken: jest.fn().mockReturnValue({}),
  hasTransfer: jest.fn().mockReturnValue({}),
  depositCexSupport: jest.fn().mockReturnValue({}),
  isTokenContract: jest.fn().mockReturnValue({}),
  addrUsedChainList: jest.fn().mockReturnValue({}),
  checkSpoofing: jest.fn().mockReturnValue({}),
};
