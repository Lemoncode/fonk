export interface LengthArgs {
  length: number;
}

export function parseLengthParams(
  customParams: LengthArgs,
  errorMessage: string
) {
  const length =
    customParams.length === null ? NaN : Number(customParams.length);
  if (isNaN(length)) {
    throw new Error(errorMessage);
  }

  return length;
}

export function isLengthValid(
  value: any,
  length: number,
  validatorFn: (value: string, length: number) => boolean
): boolean {
  // Don't try to validate non string values
  return typeof value === 'string' ? validatorFn(value, length) : true;
}
