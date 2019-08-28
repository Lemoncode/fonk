import { ValidationEngine } from './validation-engine';
import {
  ValidationSchema,
  RecordValidationSchema,
  FieldsValidationSchema,
  FieldValidation,
  ValidationResult,
  FormValidationResult,
} from './model';
import { isFunction } from './helper';

// TODO: consider changing this to a meaningful name FormSchemaValidator?
class FormValidation {
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
    return this.validationEngine.validateField(values, fieldId, value);
  }

  public validateForm(values: any): Promise<FormValidationResult> {
    return this.validationEngine.validateForm(values);
  }

  private setupValidationSchema(validationSchema: ValidationSchema) {
    if (validationSchema && typeof validationSchema === 'object') {
      const { global, fields } = validationSchema;

      if (global && global instanceof Array) {
        this.addRecordValidations(global);
      }
      if (fields && typeof fields === 'object') {
        this.addAllFieldsValidations(fields);
      }
    } else {
      console.error('ValidationSchema must be a valid object');
    }
  }

  // TODO: we need to introduce sugar here, we should allow:
  //   - Let the user just pass a function or the validation schema object (function plus message object)
  private addRecordValidations(
    recordValidationSchemaCollection: RecordValidationSchema[]
  ) {
    recordValidationSchemaCollection.forEach(
      (recordValidation: RecordValidationSchema) => {
        this.validationEngine.addRecordValidation(
          recordValidation.validation,
          recordValidation.message
        );
      }
    );
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
    if (isFunction(fieldValidation)) {
      this.validationEngine.addFieldValidation(
        field,
        fieldValidation,
        void 0,
        void 0
      );
    } else {
      this.validationEngine.addFieldValidation(
        field,
        fieldValidation.validator,
        fieldValidation.customArgs,
        fieldValidation.message
      );
    }
  }
}

export const createFormValidation = (formValidationSchema: ValidationSchema) =>
  new FormValidation(formValidationSchema);
