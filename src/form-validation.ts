import { ValidationEngine } from './validation-engine';
import {
  ValidationSchema,
  RecordValidationSchema,
  FieldsValidationSchema,
  FieldValidation,
  ValidationResult,
  FormValidationResult,
  RecordValidationFull,
  FullFieldValidation,
} from './model';
import { isFunction } from './helper';

export class FormValidation {
  private validationEngine: ValidationEngine;

  constructor(validationSchema: ValidationSchema) {
    this.validationEngine = new ValidationEngine();
    this.setupValidationSchema(validationSchema);
  }

  // TODO: review parameters order, baseFormValidation validateField has fieldId, value, values
  // the engine validateField has a different order, IMHO it should be always: fieldId, value, values
  // since values is options.
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
    let recordValidationSchemaFull: RecordValidationFull = null;

    if (isFunction(recordValidation)) {
      recordValidationSchemaFull = {
        validation: recordValidation,
        message: void 0,
      };
      //this.validationEngine.addRecordValidation(recordValidation);
    } else {
      recordValidationSchemaFull = recordValidation;
      /*this.validationEngine.addRecordValidation(
        recordValidation.validation,
        recordValidation.message
      );*/
    }

    this.validationEngine.addRecordValidation(recordValidationSchemaFull);
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
    let validationFull: FullFieldValidation = null;

    if (isFunction(fieldValidation)) {
      validationFull = {
        validator: fieldValidation,
        message: void 0,
        customArgs: void 0,
      };
    } else {
      validationFull = fieldValidation;
    }

    this.validationEngine.addFieldValidation(field, validationFull);
  }
}

export const createFormValidation = (formValidationSchema: ValidationSchema) =>
  new FormValidation(formValidationSchema);
