import {
  ValidationSchema,
  FieldValidationFunctionSyncAsync,
  ValidationResult,
  RecordValidationResult,
  FormValidationResult,
} from '../src/model';
import { FormValidation } from '../src/form-validation';

export type ValidationSchema = ValidationSchema;

export function createFormValidation(
  validationSchema: ValidationSchema
): FormValidation;

export function createDefaultValidationResult(): ValidationResult;

export function createDefaultRecordValidationResult(): RecordValidationResult;

export function createDefaultFormValidationResult(): FormValidationResult;

interface FieldValidator {
  validator: FieldValidationFunctionSyncAsync;
  setErrorMessage: (message: string | string[]) => void;
}

export namespace Validators {
  export const required: FieldValidator;
  export const email: FieldValidator;
  export const pattern: FieldValidator;
  export const minLength: FieldValidator;
  export const maxLength: FieldValidator;
}
