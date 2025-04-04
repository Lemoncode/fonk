import { RecordValidationFunctionSync } from '@lemoncode/fonk';

export const freeShippingRecordValidator: RecordValidationFunctionSync = ({
  values,
}) => {
  const succeeded = values.isPrime || values.price - values.discount > 20;

  return {
    succeeded,
    message: succeeded
      ? ''
      : 'Subscribe to prime service or total must be greater than 20USD',
    type: 'RECORD_FREE_SHIPPING',
  };
};
