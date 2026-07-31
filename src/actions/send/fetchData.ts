import { FetchActionRequiredData, SendRequireData } from '../../types';
import { KEYRING_TYPE } from '../../utils/keyring';
import { catchTimeoutError } from '../../utils/catchTimeoutError';
import { startRequest } from '../../utils/startRequest';

type SendAction = {
  to: string;
  token: { id: string; chain: string };
};

// send, sendNFT, typedData.send
export const fetchDataSend: FetchActionRequiredData<SendAction> = async (
  options,
  likeSendAction
) => {
  const { actionData, walletProvider, apiProvider, chainId, sender } = options;
  const sendAction = likeSendAction || actionData.send;

  if (!sendAction || !chainId) {
    return {};
  }

  const result: SendRequireData = {
    eoa: null,
    cex: null,
    contract: null,
    usd_value: 0,
    protocol: null,
    hasTransfer: false,
    usedChains: [],
    isTokenContract: false,
    name: null,
    onTransferWhitelist: false,
    whitelistEnable: false,
    receiverIsSpoofing: false,
    hasReceiverPrivateKeyInWallet: false,
    hasReceiverMnemonicInWallet: false,
  };

  const addressDescriptionTask = startRequest(async () => {
    const { desc } = await apiProvider.addrDesc(sendAction.to);
    if (desc.cex?.id) {
      result.cex = {
        id: desc.cex.id,
        logo: desc.cex.logo_url,
        name: desc.cex.name,
        bornAt: desc.born_at,
        isDeposit: desc.cex.is_deposit,
      };
    }
    if (options.cex) {
      if (!result.cex) {
        result.cex = {
          id: options.cex.id,
          logo: options.cex.logo,
          name: options.cex.name,
          bornAt: desc.born_at,
          isDeposit: true,
        };
      }
      result.cex.logo = options.cex.logo;
      result.cex.name = options.cex.name;
      result.cex.id = options.cex.id;
      result.cex.isDeposit = true;
    }
    if (desc.contract && Object.keys(desc.contract).length > 0) {
      result.contract = desc.contract;
    }
    if (!result.cex && !result.contract) {
      result.eoa = {
        id: sendAction.to,
        bornAt: desc.born_at,
      };
    }
    if (desc.protocol?.[chainId]) {
      result.protocol = desc.protocol[chainId];
    }
    result.usd_value = desc.usd_value;
    result.name = desc.name;
    if (walletProvider.ALIAS_ADDRESS[sendAction.to.toLowerCase()]) {
      result.name = walletProvider.ALIAS_ADDRESS[sendAction.to.toLowerCase()];
    }

    const [cexSupport, tokenContract] = await Promise.all([
      result.cex
        ? startRequest(() =>
            apiProvider.depositCexSupport(
              sendAction.token.id,
              sendAction.token.chain,
              result.cex!.id
            )
          )
        : null,
      result.contract
        ? startRequest(() =>
            apiProvider.isTokenContract(chainId, sendAction.to)
          )
        : null,
    ]);
    if (result.cex && cexSupport) {
      result.cex.supportToken = cexSupport.support;
    }
    if (result.contract && tokenContract) {
      result.isTokenContract = tokenContract.is_token;
    }
  });

  const [
    hasPrivateKeyInWallet,
    whitelist,
    whitelistEnable,
    { has_transfer },
    usedChains,
    { is_spoofing },
  ] = await Promise.all([
    startRequest(() => walletProvider.hasPrivateKeyInWallet(sendAction.to)),
    startRequest(() => walletProvider.getWhitelist()),
    process.env.NODE_ENV !== 'test'
      ? startRequest(() => walletProvider.isWhitelistEnabled())
      : Promise.resolve(false),
    startRequest(() =>
      catchTimeoutError(
        apiProvider.hasTransfer(chainId, sender, sendAction.to),
        {
          has_transfer: false,
        }
      )
    ),
    startRequest(() => apiProvider.addrUsedChainList(sendAction.to)),
    startRequest(() =>
      apiProvider.checkSpoofing({
        from: sender,
        to: sendAction.to,
      })
    ),
    addressDescriptionTask,
  ]);

  if (hasPrivateKeyInWallet) {
    result.hasReceiverPrivateKeyInWallet =
      hasPrivateKeyInWallet === KEYRING_TYPE.SimpleKeyring;
    result.hasReceiverMnemonicInWallet =
      hasPrivateKeyInWallet === KEYRING_TYPE.HdKeyring;
  }

  result.hasTransfer = has_transfer;
  result.usedChains = usedChains;
  result.receiverIsSpoofing = is_spoofing;
  result.whitelistEnable = whitelistEnable;
  result.onTransferWhitelist = whitelist.includes(sendAction.to.toLowerCase());

  return result;
};
