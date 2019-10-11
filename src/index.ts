import { createFormValidation } from './form-validation';
import Validators, { parseMessageWithCustomArgs } from './validators';
import {
  createDefaultValidationResult,
  createDefaultRecordValidationResult,
  createDefaultFormValidationResult,
} from './model';
import {
  validateField,
  validateRecord,
  validateForm,
} from './validation-engine';
import {
  mapToInternalFieldValidationSchema,
  mapToInternalRecordValidationSchema,
} from './mappers';

export {
  createFormValidation,
  Validators,
  parseMessageWithCustomArgs,
  createDefaultValidationResult,
  createDefaultRecordValidationResult,
  createDefaultFormValidationResult,
};

export const FormValidationExtended = {
  validateField,
  validateRecord,
  validateForm,
  mapToInternalFieldValidationSchema,
  mapToInternalRecordValidationSchema,
};
