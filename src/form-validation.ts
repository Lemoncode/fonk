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
} from './mappers';
import {
  validateField,
  validateRecords,
  validateForm,
} from './validation-engine';

export class FormValidation {
  private fieldSchema: InternalFieldValidationSchema = {};
  private recordSchema: InternalRecordValidationSchema = {};

  constructor(validationSchema: ValidationSchema) {
    this.setupValidationSchema(validationSchema);
  }

  private setupValidationSchema(validationSchema: ValidationSchema) {
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
  }

  public validateField(
    fieldId: string,
    value: any,
    values?: any
  ): Promise<ValidationResult> {
    return validateField(fieldId, value, values, this.fieldSchema).then(
      ({ key, ...validationResult }) => ({ ...validationResult })
    );
  }

  public validateRecords(values?: any): Promise<RecordValidationResult> {
    return validateRecords(values, this.recordSchema);
  }

  public validateForm(values: any): Promise<FormValidationResult> {
    return validateForm(values, this.fieldSchema, this.recordSchema);
  }
}

export const createFormValidation = (validationSchema: ValidationSchema) =>
  new FormValidation(validationSchema);
