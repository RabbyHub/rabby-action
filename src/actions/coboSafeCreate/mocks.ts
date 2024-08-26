export const parseTxData = {
  action: {
    type: 'create_cobo_safe',
    data: {
      multisig_id: '0x20823bb02947c741a5cc2f1ccfd8293c4a8d08b3',
      desc: "You'll create a new Cobo Safe",
      brand: {
        name: 'Cobo Argus',
        logo_url:
          'https://static.debank.com/image/project/logo_url/cobo/9dfd569ee11a8fbf7f981a41f012ed64.png',
      },
    },
  },
  log_id: 6577167,
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
    verifyingContract: '0x20823bb02947c741a5cc2f1ccfd8293c4a8d08b3',
  },
  message: {
    to: '0xa238cbeb142c10ef7ad8442c6d1f9e89e07e7761',
    value: '0',
    data: '0x8d80ff0a0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000009901106d8aa03fa8ae865250eaa3ea56c2c8489aa2480000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004446998353000000000000000000000000c0b00000e19d71fa50a9bb1fcac2ec92fac9549c20823bb02947c741a5cc2f1ccfd8293c4a8d08b332000000000000000000000000000000000000',
    operation: '1',
    safeTxGas: '0',
    baseGas: '0',
    gasPrice: '0',
    gasToken: '0x0000000000000000000000000000000000000000',
    refundReceiver: '0x0000000000000000000000000000000000000000',
    nonce: '0',
  },
};
