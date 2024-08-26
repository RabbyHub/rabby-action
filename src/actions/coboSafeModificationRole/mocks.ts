export const parseTxData = {
  action: {
    type: 'submit_safe_role_modification',
    data: {
      multisig_id: '0xc30fa458dd05dc162cf0a542794e9e9152aa8293',
      desc: "You're managing the Safe Role (333)",
      brand: {
        name: 'Cobo Argus',
        logo_url:
          'https://static.debank.com/image/project/logo_url/cobo/9dfd569ee11a8fbf7f981a41f012ed64.png',
      },
    },
  },
  log_id: 6577916,
} as any;

export const txData = {
  types: {
    SafeTx: [
      {
        type: 'address',
        name: 'to',
      },
      {
        type: 'uint256',
        name: 'value',
      },
      {
        type: 'bytes',
        name: 'data',
      },
      {
        type: 'uint8',
        name: 'operation',
      },
      {
        type: 'uint256',
        name: 'safeTxGas',
      },
      {
        type: 'uint256',
        name: 'baseGas',
      },
      {
        type: 'uint256',
        name: 'gasPrice',
      },
      {
        type: 'address',
        name: 'gasToken',
      },
      {
        type: 'address',
        name: 'refundReceiver',
      },
      {
        type: 'uint256',
        name: 'nonce',
      },
    ],
    EIP712Domain: [
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
  primaryType: 'SafeTx',
  domain: {
    chainId: '56',
    verifyingContract: '0xc30fa458dd05dc162cf0a542794e9e9152aa8293',
  },
  message: {
    to: '0xa238cbeb142c10ef7ad8442c6d1f9e89e07e7761',
    value: '0',
    data: '0x8d80ff0a000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000b900026e389361592b371f3032929fd80eded119505f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000645e7c67db00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000001333333000000000000000000000000000000000000000000000000000000000000000000000000',
    operation: '1',
    safeTxGas: '0',
    baseGas: '0',
    gasPrice: '0',
    gasToken: '0x0000000000000000000000000000000000000000',
    refundReceiver: '0x0000000000000000000000000000000000000000',
    nonce: '1',
  },
};
