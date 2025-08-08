import {
  ParseAction,
  ParseActionParameters,
  ParsedActionData,
  ParseTextActionParameters,
  ParseTransactionActionParameters,
  ParseTypedDataActionParameters,
} from './types';
import { parseActionSwapLimitPay } from './actions/swapLimitPay/parseAction';
import { parseActionMultiSwap } from './actions/multiSwap/parseAction';
import { parseActionTransferOwner } from './actions/transferOwner/parseAction';
import { parseActionAddLiquidity } from './actions/addLiquidity/parseAction';
import { parseActionSend } from './actions/send/parseAction';
import { parseActionApproveNFT } from './actions/approveNFT/parseAction';
import { parseActionApproveNFTCollection } from './actions/approveNFTCollection/parseAction';
import { parseActionApproveToken } from './actions/approveToken/parseAction';
import { parseActionAssetOrder } from './actions/assetOrder/parseAction';
import { parseActionCancelTx } from './actions/cancelTx/parseAction';
import { parseActionCommon } from './actions/common/parseAction';
import { parseActionContractCall } from './actions/contractCall/parseAction';
import { parseActionCrossSwapToken } from './actions/crossSwapToken/parseAction';
import { parseActionCrossToken } from './actions/crossToken/parseAction';
import { parseActionDeployContract } from './actions/deployContract/parseAction';
import { parseActionPushMultiSig } from './actions/pushMultiSig/parseAction';
import { parseActionRevokeNFT } from './actions/revokeNFT/parseAction';
import { parseActionRevokeNFTCollection } from './actions/revokeNFTCollection/parseAction';
import { parseActionRevokePermit2 } from './actions/revokePermit2/parseAction';
import { parseActionRevokeToken } from './actions/revokeToken/parseAction';
import { parseActionSendNFT } from './actions/sendNFT/parseAction';
import { parseActionSwap } from './actions/swap/parseAction';
import { parseActionUnwrapToken } from './actions/unwrapToken/parseAction';
import { parseActionWrapToken } from './actions/wrapToken/parseAction';
import { parseActionPermit2BatchRevokeToken } from './actions/permit2BatchRevokeToken/parseAction';
import { parseActionBatchPermit2 } from './actions/batchPermit2/parseAction';
import { parseActionBatchSellNFT } from './actions/batchSellNFT/parseAction';
import { parseActionBuyNFT } from './actions/buyNFT/parseAction';
import { parseActionCoboSafeCreate } from './actions/coboSafeCreate/parseAction';
import { parseActionCoboSafeModificationDelegatedAddress } from './actions/coboSafeModificationDelegatedAddress/parseAction';
import { parseActionCoboSafeModificationRole } from './actions/coboSafeModificationRole/parseAction';
import { parseActionCoboSafeModificationTokenApproval } from './actions/coboSafeModificationTokenApproval/parseAction';
import { parseActionCreateKey } from './actions/createKey/parseAction';
import { parseActionPermit } from './actions/permit/parseAction';
import { parseActionPermit2 } from './actions/permit2/parseAction';
import { parseActionRevokePermit } from './actions/revokePermit/parseAction';
import { parseActionSellNFT } from './actions/sellNFT/parseAction';
import { parseActionSignMultiSig } from './actions/signMultiSig/parseAction';
import { parseActionSwapTokenOrder } from './actions/swapTokenOrder/parseAction';
import { parseActionVerifyAddress } from './actions/verifyAddress/parseAction';
import { parseTypedDataAction } from './utils/parseTypedDataAction';
import { parseTextAction } from './utils/parseTextAction';

export function parseAction(
  options: ParseTypedDataActionParameters
): ParsedActionData<'typed_data'>;
export function parseAction(
  options: ParseTransactionActionParameters
): ParsedActionData<'transaction'>;
export function parseAction(
  options: ParseTextActionParameters
): ParsedActionData<'text'>;
export function parseAction(options: ParseActionParameters): ParsedActionData {
  const result: ReturnType<ParseAction>[] = [];

  if (options.type === 'transaction') {
    result.push(
      parseActionApproveNFT(options),
      parseActionApproveNFTCollection(options),
      parseActionApproveToken(options),
      parseActionAssetOrder(options),
      parseActionCancelTx(options),
      parseActionCommon(options),
      parseActionCrossSwapToken(options),
      parseActionCrossToken(options),
      parseActionDeployContract(options),
      parseActionPushMultiSig(options),
      parseActionRevokeNFT(options),
      parseActionRevokeNFTCollection(options),
      parseActionRevokePermit2(options),
      parseActionRevokeToken(options),
      parseActionSend(options),
      parseActionSendNFT(options),
      parseActionSwap(options),
      parseActionUnwrapToken(options),
      parseActionWrapToken(options),
      parseActionPermit2BatchRevokeToken(options),
      parseActionTransferOwner(options),
      parseActionSwapLimitPay(options),
      parseActionMultiSwap(options),
      parseActionAddLiquidity(options)
    );
  }

  if (options.type === 'typed_data') {
    result.push(
      // tx actions
      parseTypedDataAction(parseActionCommon)(options),
      parseTypedDataAction(parseActionAssetOrder)(options),
      parseTypedDataAction(parseActionSend)(options),
      parseTypedDataAction(parseActionApproveNFT)(options),
      parseTypedDataAction(parseActionApproveNFTCollection)(options),
      parseTypedDataAction(parseActionApproveToken)(options),
      parseTypedDataAction(parseActionCancelTx)(options),
      parseTypedDataAction(parseActionCrossSwapToken)(options),
      parseTypedDataAction(parseActionCrossToken)(options),
      parseTypedDataAction(parseActionDeployContract)(options),
      parseTypedDataAction(parseActionPushMultiSig)(options),
      parseTypedDataAction(parseActionRevokeNFT)(options),
      parseTypedDataAction(parseActionRevokeNFTCollection)(options),
      parseTypedDataAction(parseActionRevokePermit2)(options),
      parseTypedDataAction(parseActionRevokeToken)(options),
      parseTypedDataAction(parseActionSendNFT)(options),
      parseTypedDataAction(parseActionSwap)(options),
      parseTypedDataAction(parseActionUnwrapToken)(options),
      parseTypedDataAction(parseActionWrapToken)(options),
      parseTypedDataAction(parseActionPermit2BatchRevokeToken)(options),
      parseTypedDataAction(parseActionTransferOwner)(options),
      parseTypedDataAction(parseActionSwapLimitPay)(options),
      parseTypedDataAction(parseActionMultiSwap)(options),
      parseTypedDataAction(parseActionAddLiquidity)(options),

      // typed data actions
      parseTypedDataAction(parseActionCreateKey)(options),
      parseTypedDataAction(parseActionVerifyAddress)(options),
      parseTypedDataAction(parseActionSellNFT)(options),
      parseTypedDataAction(parseActionBatchSellNFT)(options),
      parseTypedDataAction(parseActionSignMultiSig)(options),
      parseTypedDataAction(parseActionBuyNFT)(options),
      parseTypedDataAction(parseActionPermit)(options),
      parseTypedDataAction(parseActionPermit2)(options),
      parseTypedDataAction(parseActionBatchPermit2)(options),
      parseTypedDataAction(parseActionSwapTokenOrder)(options),
      parseTypedDataAction(parseActionCoboSafeCreate)(options),
      parseTypedDataAction(parseActionCoboSafeModificationDelegatedAddress)(
        options
      ),
      parseTypedDataAction(parseActionCoboSafeModificationRole)(options),
      parseTypedDataAction(parseActionCoboSafeModificationTokenApproval)(
        options
      ),
      parseTypedDataAction(parseActionRevokePermit)(options)
    );
  }

  if (options.type === 'text') {
    result.push(
      // tx actions
      parseTextAction(parseActionCommon)(options),
      parseTextAction(parseActionAssetOrder)(options),
      parseTextAction(parseActionSend)(options),
      parseTextAction(parseActionApproveNFT)(options),
      parseTextAction(parseActionApproveNFTCollection)(options),
      parseTextAction(parseActionApproveToken)(options),
      parseTextAction(parseActionCancelTx)(options),
      parseTextAction(parseActionCrossSwapToken)(options),
      parseTextAction(parseActionCrossToken)(options),
      parseTextAction(parseActionDeployContract)(options),
      parseTextAction(parseActionPushMultiSig)(options),
      parseTextAction(parseActionRevokeNFT)(options),
      parseTextAction(parseActionRevokeNFTCollection)(options),
      parseTextAction(parseActionRevokePermit2)(options),
      parseTextAction(parseActionRevokeToken)(options),
      parseTextAction(parseActionSendNFT)(options),
      parseTextAction(parseActionSwap)(options),
      parseTextAction(parseActionUnwrapToken)(options),
      parseTextAction(parseActionWrapToken)(options),
      parseTextAction(parseActionPermit2BatchRevokeToken)(options),
      parseTextAction(parseActionAddLiquidity)(options),

      // text actions
      parseTextAction(parseActionCreateKey)(options),
      parseTextAction(parseActionVerifyAddress)(options)
    );
  }

  const action = result.reduce((acc, val) => ({ ...acc, ...val }), {});

  // filter out typedData or text keys
  const actionKeys = Object.keys(action).filter(
    (key) =>
      !['sender', 'actionType', 'brand', 'contractId', 'chainId'].includes(key)
  );

  if (actionKeys.length > 1) {
    console.error(
      'parseAction: more than one action found',
      Object.keys(action)
    );
  }

  if (actionKeys.length === 0) {
    if (options.type === 'typed_data') {
      const typedDataAction = action as ParsedActionData<'typed_data'>;

      if (typedDataAction.chainId && typedDataAction.contractId) {
        return parseTypedDataAction(parseActionContractCall)(options);
      }
      return parseTypedDataAction((r) => r)(options);
    } else if (options.type === 'transaction') {
      return parseActionContractCall(options);
    } else if (options.type === 'text') {
      return parseTextAction(parseActionContractCall)(options);
    }
    return {};
  }

  return action;
}
