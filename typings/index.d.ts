import { DefaultFieldIdType, DefaultRecordIdType } from './common';
import { ValidationSchema } from './validation-schema';
import {
  FieldValidationFunctionSync,
  FieldValidationFunctionAsync,
  FieldValidationFunctionSyncAsync,
} from './field-validator';
import {
  RecordValidationFunctionSync,
  RecordValidationFunctionAsync,
} from './record-validator';
import {
  ValidationResult,
  RecordValidationResult,
  FormValidationResult,
} from './result';

export {
  ValidationSchema,
  FieldValidationFunctionSync,
  FieldValidationFunctionAsync,
  RecordValidationFunctionSync,
  RecordValidationFunctionAsync,
  ValidationResult,
  RecordValidationResult,
  FormValidationResult,
};

/**
 * Main function to create an instance of FormValidation. We could use `validateField`, `validateRecord` and/or `validateForm` to fire validations.
 * `updateValidationSchema`: to update validation schema after create form validation instance.
 *
 * **Arguments**
 * - ValidationSchema
 *
 * **Returns**
 *  - FormValidation instance.
 */
export declare function createFormValidation<
  F extends DefaultFieldIdType = string,
  R extends DefaultRecordIdType = string
>(validationSchema: ValidationSchema<F, R>): FormValidation<F, R>;

export interface FormValidation<
  F extends DefaultFieldIdType = string,
  R extends DefaultRecordIdType = string
> {
  validateField: (
    fieldId: F,
    value: any,
    values?: any
  ) => Promise<ValidationResult | Record<F, ValidationResult>>;
  validateRecord: (values: any) => Promise<RecordValidationResult<R>>;
  validateForm: (values: any) => Promise<FormValidationResult<F, R>>;
  updateValidationSchema(validationSchema: ValidationSchema<F, R>): void;
}

/**
 * Function that returns a ValidationResult object with default values
 */
export declare function createDefaultValidationResult(): ValidationResult;

/**
 * Function that returns a RecordValidationResult object with default values
 */
export declare function createDefaultRecordValidationResult(): RecordValidationResult;

/**
 * Function that returns a FormValidationResult object with default values
 */
export declare function createDefaultFormValidationResult(): FormValidationResult;

/**
 * Defined Validators
 *
 * **Properties**
 * - validator: Field validation function (sync or async)
 * - setErrorMessage: Error message's globally update for all validator instances
 */
export namespace Validators {
  export const required: FieldValidator;
  export const email: FieldValidator;
  export const pattern: FieldValidator;
  export const minLength: FieldValidator;
  export const maxLength: FieldValidator;
  export const array: {
    validator: FieldValidationFunctionSyncAsync;
  };
}

interface FieldValidator {
  validator: FieldValidationFunctionSyncAsync;
  setErrorMessage: (message: string | string[]) => void;
}

/**
 * Function that returns the parsed message when it needs to interpolate customArgs in the custom error message.
 */
export declare function parseMessageWithCustomArgs(
  message: string,
  customArgs: any
): string;
