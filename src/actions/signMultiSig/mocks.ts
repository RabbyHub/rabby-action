export const parseTxData = {
  action: {
    type: 'sign_multisig',
    data: {
      multisig_id: '0xb5d05de17c00aed6c465b6bbba01d5edae59e19c',
    },
  },
  log_id: 6458791,
} as any;

export const txData = {
  types: {
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
    SafeTx: [
      {
        name: 'to',
        type: 'address',
      },
      {
        name: 'value',
        type: 'uint256',
      },
      {
        name: 'data',
        type: 'bytes',
      },
      {
        name: 'operation',
        type: 'uint8',
      },
      {
        name: 'safeTxGas',
        type: 'uint256',
      },
      {
        name: 'baseGas',
        type: 'uint256',
      },
      {
        name: 'gasPrice',
        type: 'uint256',
      },
      {
        name: 'gasToken',
        type: 'address',
      },
      {
        name: 'refundReceiver',
        type: 'address',
      },
      {
        name: 'nonce',
        type: 'uint256',
      },
    ],
  },
  primaryType: 'SafeTx',
  domain: {
    chainId: 8453,
    verifyingContract: '0xb5d05de17c00aed6c465b6bbba01d5edae59e19c',
  },
  message: {
    baseGas: '0',
    data: '0x0d582f13000000000000000000000000e7aa3e00a47c3c1d54b4a1eece3935b89ac16ac20000000000000000000000000000000000000000000000000000000000000002',
    gasPrice: '0',
    gasToken: '0x0000000000000000000000000000000000000000',
    nonce: '0',
    operation: '0',
    refundReceiver: '0x0000000000000000000000000000000000000000',
    safeTxGas: '0',
    to: '0xb5d05de17c00aed6c465b6bbba01d5edae59e19c',
    value: '0',
  },
};
