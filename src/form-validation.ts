import { ValidationEngine } from './validation-engine';
import {
  ValidationSchema,
  RecordValidationSchema,
  FieldsValidationSchema,
  FieldValidation,
  ValidationResult,
  FormValidationResult,
  FullFieldValidationAsync,
  FullRecordValidationAsync,
} from './model';
import { isFunction } from './helper';
import {
  convertFieldValidationToAsyncIfNeeded,
  convertRecordValidationToAsyncIfNeeded,
} from './mappers';

export class FormValidation {
  private validationEngine: ValidationEngine;

  constructor(validationSchema: ValidationSchema) {
    this.validationEngine = new ValidationEngine();
    this.setupValidationSchema(validationSchema);
  }

  public validateField(
    fieldId: string,
    value: any,
    values?: any
  ): Promise<ValidationResult> {
    return this.validationEngine.validateField(fieldId, value, values);
  }

  public validateForm(values: any): Promise<FormValidationResult> {
    return this.validationEngine.validateForm(values);
  }

  private setupValidationSchema(validationSchema: ValidationSchema) {
    if (validationSchema && typeof validationSchema === 'object') {
      const { record, fields } = validationSchema;

      if (record && record instanceof Array) {
        this.addRecordValidations(record);
      }
      if (fields && typeof fields === 'object') {
        this.addAllFieldsValidations(fields);
      }
    } else {
      console.error('ValidationSchema must be a valid object');
    }
  }

  private addRecordValidations(
    recordValidationSchemaCollection: RecordValidationSchema[]
  ) {
    recordValidationSchemaCollection.forEach(
      (recordValidation: RecordValidationSchema) => {
        this.addRecordValidation(recordValidation);
      }
    );
  }

  private addRecordValidation(recordValidation: RecordValidationSchema) {
    let recordValidationSchemaFullAsync: FullRecordValidationAsync = null;

    if (isFunction(recordValidation)) {
      recordValidationSchemaFullAsync = {
        validation: convertRecordValidationToAsyncIfNeeded(recordValidation),
        message: void 0,
      };
    } else {
      recordValidationSchemaFullAsync = {
        validation: convertRecordValidationToAsyncIfNeeded(
          recordValidation.validation
        ),
        message: recordValidation.message,
      };
    }

    this.validationEngine.addRecordValidation(recordValidationSchemaFullAsync);
  }

  private addAllFieldsValidations(fields: FieldsValidationSchema) {
    for (const field in fields) {
      this.addFieldValidations(field, fields[field]);
    }
  }

  private addFieldValidations(
    field: string,
    fieldValidations: FieldValidation[]
  ) {
    if (fieldValidations instanceof Array) {
      fieldValidations.forEach(fieldValidation => {
        this.addFieldValidation(field, fieldValidation);
      });
    }
  }

  private addFieldValidation(field: string, fieldValidation: FieldValidation) {
    let validationFullAsync: FullFieldValidationAsync = null;

    if (isFunction(fieldValidation)) {
      validationFullAsync = {
        validator: convertFieldValidationToAsyncIfNeeded(fieldValidation),
        message: void 0,
        customArgs: void 0,
      };
    } else {
      validationFullAsync = {
        validator: convertFieldValidationToAsyncIfNeeded(
          fieldValidation.validator
        ),
        customArgs: fieldValidation.customArgs,
        message: fieldValidation.message,
      };
    }

    this.validationEngine.addFieldValidation(field, validationFullAsync);
  }
}

export const createFormValidation = (formValidationSchema: ValidationSchema) =>
  new FormValidation(formValidationSchema);
