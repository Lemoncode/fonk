import {
  ValidationResult,
  FormValidationResult,
  FieldsValidationSchema,
  RecordValidationFunction,
} from './model';

import { isUndefinedOrNull } from './helper';

import {
  fireAllFieldsValidations,
  fireSingleFieldValidations,
  fireRecordValidations,
} from './validation-dispatcher';
import { buildFormValidationResult } from './form-validation-summary-builder';

export class ValidationEngine {
  private validationsPerField: FieldsValidationSchema = null;
  private validationsGlobalForm: RecordValidationFunction[] = [];
  private asyncValidationInProgressCount = 0;

  public validateForm(values: any): Promise<FormValidationResult> {
    const allValidations = this.fireFieldAndRecordValidations(values);
    return this.buildValidationResults(allValidations);
  }

  private fireFieldAndRecordValidations = (
    values: any
  ): Promise<ValidationResult>[] => {
    let fieldValidationResults: Promise<
      ValidationResult
    >[] = fireAllFieldsValidations(
      values,
      Object.keys(this.validationsPerField),
      this.fireFieldValidations
    );

    // Now global form validations
    if (this.validationsGlobalForm.length > 0) {
      fieldValidationResults = [
        ...fieldValidationResults,
        ...this.validateGlobalFormValidations(values),
      ];
    }
    return fieldValidationResults;
  };

  buildValidationResults = (
    validations: Promise<ValidationResult>[]
  ): Promise<FormValidationResult> => {
    this.asyncValidationInProgressCount++;
    return new Promise<FormValidationResult>((resolve, reject) => {
      // Once all the single field validations have been resolved
      // resolve the fullFormValidatePromise
      Promise.all(validations)
        .then((fieldValidationResults: ValidationResult[]) => {
          const formValidationResult = buildFormValidationResult(
            fieldValidationResults
          );
          resolve(formValidationResult);
        })
        .catch(result => {
          // Build failed validation Result
          const errorInformation = `Uncontrolled error when validating full form, check custom validations code`;
          console.log(errorInformation);
          reject(result);
        });
    });
  };

  fireFieldValidations = (
    values: any,
    key: string,
    value: any
  ): Promise<ValidationResult> => {
    this.asyncValidationInProgressCount++;

    const fieldValidationResultPromise = new Promise<ValidationResult>(
      (resolve, reject) => {
        // TODO: this should be encapsulated into two separate functions
        if (!this.isFieldKeyMappingDefined(key)) {
          this.asyncValidationInProgressCount--;
          resolve();
        } else {
          fireSingleFieldValidations(
            values,
            value,
            this.validationsPerField[key]
          )
            .then((fieldValidationResult: ValidationResult) => {
              this.asyncValidationInProgressCount--;
              if (fieldValidationResult) {
                fieldValidationResult.key = key;
              }
              resolve(fieldValidationResult);
            })
            .catch(result => {
              this.asyncValidationInProgressCount--;
              // Build failed validation Result
              const errorInformation = `Validation Exception, field: ${key} validation fn Index: ${key}`;
              console.log(errorInformation);
              reject(result);
            })
            .finally(() => this.asyncValidationInProgressCount--);
        }
      }
    );

    return fieldValidationResultPromise;
  };

  // TODO: check async count in progress
  // Maybe is something we don't have to keep control of?
  private validateGlobalFormValidations(
    values: any
  ): Promise<ValidationResult>[] {
    let globalFieldResultValidations: Promise<ValidationResult>[] = [];

    if (this.validationsGlobalForm.length > 0) {
      const fieldValidationResultsPromises = fireRecordValidations(
        values,
        this.validationsGlobalForm
      );
      globalFieldResultValidations = [...fieldValidationResultsPromises];
    }

    return globalFieldResultValidations;
  }

  isFieldKeyMappingDefined(key: string): boolean {
    return !isUndefinedOrNull(this.validationsPerField[key]);
  }
}
