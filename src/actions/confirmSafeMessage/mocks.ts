export const parseTxData = {
  action: {
    type: 'confirm_safe_message',
    data: {
      multisig_id: '0x89f4a8e75da4b985bae9798162073fe5c037e9dd',
    },
  },
  log_id: 10317007,
} as any;

export const txData = {
  types: {
    SafeMessage: [
      {
        name: 'message',
        type: 'bytes',
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
  primaryType: 'SafeMessage',
  domain: {
    chainId: '0x1',
    verifyingContract: '0x89f4a8e75da4b985bae9798162073fe5c037e9dd',
  },
  message: {
    message:
      '0x2bf01edd92e8a198c95b799831abdae4f93a2428674d06dcf39b4a3e80b38a09',
  },
};
