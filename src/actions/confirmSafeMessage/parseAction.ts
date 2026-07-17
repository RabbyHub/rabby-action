import { ConfirmSafeMessageActions } from '@rabby-wallet/rabby-api/dist/types';
import { PartialParseAction } from '../../types';

export const parseActionConfirmSafeMessage: PartialParseAction<'typed_data'> = (
  options
) => {
  const { data } = options;

  if (data?.type !== 'confirm_safe_message') {
    return {};
  }
  return {
    confirmSafeMessage: data.data as ConfirmSafeMessageActions,
  };
};
