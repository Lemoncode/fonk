import {
  ValidationSchema,
  FieldValidationFunctionSync,
  FieldValidationFunctionAsync,
  RecordValidationFunctionSync,
  RecordValidationFunctionAsync,
  ValidationResult,
  RecordValidationResult,
  FormValidationResult,
  FieldValidationFunctionSyncAsync,
} from './model';

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
 *
 * **Arguments**
 * - ValidationSchema
 *
 * **Returns**
 *  - FormValidation instance.
 */
export function createFormValidation(
  validationSchema: ValidationSchema
): FormValidation;

interface FormValidation {
  validateField: (
    fieldId: string,
    value: any,
    values?: any
  ) => Promise<ValidationResult>;
  validateRecord: (values: any) => Promise<RecordValidationResult>;
  validateForm: (values: any) => Promise<FormValidationResult>;
}

/**
 * Function that returns a ValidationResult object with default values
 */
export function createDefaultValidationResult(): ValidationResult;

/**
 * Function that returns a RecordValidationResult object with default values
 */
export function createDefaultRecordValidationResult(): RecordValidationResult;

/**
 * Function that returns a FormValidationResult object with default values
 */
export function createDefaultFormValidationResult(): FormValidationResult;

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
}

interface FieldValidator {
  validator: FieldValidationFunctionSyncAsync;
  setErrorMessage: (message: string | string[]) => void;
}
