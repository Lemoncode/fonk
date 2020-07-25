import {
  ValidationSchema,
  ValidationResult,
  FormValidationResult,
  InternalFieldValidationSchema,
  InternalRecordValidationSchema,
  RecordValidationResult,
} from './model';
import {
  mapToInternalFieldValidationSchema,
  mapToInternalRecordValidationSchema,
  mapInternalValidationResultToValidationResult,
  mapInternalFormValidationResultToFormValidationResult,
} from './mappers';
import {
  validateField,
  validateRecord,
  validateForm,
} from './validation-engine';

export class FormValidation {
  private fieldSchema: InternalFieldValidationSchema = {};
  private recordSchema: InternalRecordValidationSchema = {};

  constructor(validationSchema: ValidationSchema) {
    this.setupValidationSchema(validationSchema);
  }

  private setupValidationSchema = (validationSchema: ValidationSchema) => {
    if (validationSchema && typeof validationSchema === 'object') {
      const { record, field } = validationSchema;

      if (field && typeof field === 'object') {
        this.fieldSchema = mapToInternalFieldValidationSchema(
          validationSchema.field
        );
      }

      if (record && typeof record === 'object') {
        this.recordSchema = mapToInternalRecordValidationSchema(
          validationSchema.record
        );
      }
    } else {
      console.error('ValidationSchema must be a valid object');
    }
  };

  public validateField = (
    fieldId: string,
    value: any,
    values?: any
  ): Promise<ValidationResult | { [fieldId: string]: ValidationResult }> =>
    validateField(fieldId, value, values, this.fieldSchema).then(
      mapInternalValidationResultToValidationResult
    );

  public validateRecord = (values: any): Promise<RecordValidationResult> =>
    validateRecord(values, this.recordSchema);

  public validateForm = (values: any): Promise<FormValidationResult> =>
    validateForm(values, this.fieldSchema, this.recordSchema).then(
      mapInternalFormValidationResultToFormValidationResult
    );

  public updateValidationSchema = (
    validationSchema: ValidationSchema
  ): void => {
    this.setupValidationSchema(validationSchema);
  };
}

export const createFormValidation = (validationSchema: ValidationSchema) =>
  new FormValidation(validationSchema);
