import {
  ValidationResult,
  FormValidationResult,
  FieldsValidationSchema,
  RecordValidationFunction,
  createDefaultValidationResult,
  RecordValidationFunctionSyncAsync,
  isSyncValidationResult,
  FieldValidationFunctionSyncAsync,
  FieldValidationFunction,
  FieldValidation,
  RecordValidationSchema,
} from './model';

import { isUndefinedOrNull } from './helper';

import {
  fireAllFieldsValidations,
  fireSingleFieldValidations,
  fireRecordValidations,
} from './validation-dispatcher';
import { buildFormValidationResult } from './form-validation-summary-builder';

export class ValidationEngine {
  private validationsPerField: FieldsValidationSchema = {};
  private validationsGlobalForm: RecordValidationSchema[] = [];
  private asyncValidationInProgressCount = 0;

  addFieldValidation(
    key: string,
    validation: FieldValidationFunctionSyncAsync,
    customParams: any = {},
    errorMessage?: string
  ) {
    const asyncValidationFn = this.convertFieldValidationToAsyncIfNeeded(
      validation
    );

    if (!this.isFieldKeyMappingDefined(key)) {
      this.validationsPerField[key] = [];
    }

    const fieldValidation: FieldValidation = {
      validator: asyncValidationFn,
      customArgs: customParams,
    };

    if (errorMessage) {
      fieldValidation.message = errorMessage;
    }

    this.validationsPerField[key].push(fieldValidation);
  }

  // TODO: Should it be moved to model?
  convertFieldValidationToAsyncIfNeeded(
    validation: FieldValidationFunctionSyncAsync
  ): FieldValidationFunction {
    // Sugar we admit both flavors syncrhonous and asynchronous validators
    return (
      value: any,
      values: any,
      customParams?: object,
      message?: string
    ): Promise<ValidationResult> => {
      const result = validation(value, values, customParams, message);

      if (isSyncValidationResult(result)) {
        return Promise.resolve(result as ValidationResult);
      } else {
        return result as Promise<ValidationResult>;
      }
    };
  }

  addRecordValidation(
    validation: RecordValidationFunctionSyncAsync,
    message?: string
  ): void {
    // Sugar we admit both flavors syncrhonous and asynchronous validators
    const validationAsync = this.convertRecordValidationToAsyncIfNeeded(
      validation
    );

    this.validationsGlobalForm.push({ validation: validationAsync, message });
  }

  // TODO: Should this be moved to model ?
  convertRecordValidationToAsyncIfNeeded(
    validation: RecordValidationFunctionSyncAsync
  ): RecordValidationFunction {
    return (
      values: any,
      message?: string | string[]
    ): Promise<ValidationResult> => {
      const result = validation(values, message);

      if (isSyncValidationResult(result)) {
        return Promise.resolve(result as ValidationResult);
      } else {
        return result as Promise<ValidationResult>;
      }
    };
  }

  public isValidationInProgress() {
    return this.asyncValidationInProgressCount > 0;
  }

  public validateForm(values: any): Promise<FormValidationResult> {
    const allValidations = this.fireFieldAndRecordValidations(values);
    return this.buildValidationResults(allValidations);
  }

  validateField(
    values: any,
    key: string,
    value: any
  ): Promise<ValidationResult> {
    this.asyncValidationInProgressCount++;
    const asyncValidationPromise = this.fireFieldValidations(
      values,
      key,
      value
    );

    // TODO: de we need to add some additional check in the promise
    // e.g. fail or something like that?
    asyncValidationPromise.then(() => this.asyncValidationInProgressCount--);

    return asyncValidationPromise;
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

  private buildValidationResults = (
    validations: Promise<ValidationResult>[]
  ): Promise<FormValidationResult> => {
    this.asyncValidationInProgressCount++;
    return new Promise<FormValidationResult>((resolve, reject) => {
      // Once all the single field validations have been resolved
      // resolve the fullFormValidatePromise
      // TODO: Finally issue race condition unit tests
      Promise.all(validations)
        .then((fieldValidationResults: ValidationResult[]) => {
          this.asyncValidationInProgressCount--;
          const formValidationResult = buildFormValidationResult(
            fieldValidationResults
          );
          resolve(formValidationResult);
        })
        .catch(result => {
          this.asyncValidationInProgressCount--;
          // Build failed validation Result
          const errorInformation = `Uncontrolled error when validating full form, check custom validations code`;
          console.log(errorInformation);
          reject(result);
        });
    });
  };

  public fireFieldValidations = (
    values: any,
    key: string,
    value: any
  ): Promise<ValidationResult> => {
    this.asyncValidationInProgressCount++;

    const fieldValidationResultPromise = new Promise<ValidationResult>(
      (resolve, reject) => {
        if (!this.isFieldKeyMappingDefined(key)) {
          this.asyncValidationInProgressCount--;
          resolve(createDefaultValidationResult());
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
              const errorInformation = `Validation Exception, field: ${key}`;
              console.log(errorInformation);
              reject(result);
            });
        }
      }
    );

    return fieldValidationResultPromise;
  };

  private validateGlobalFormValidations(
    values: any
  ): Promise<ValidationResult>[] {
    let globalFieldResultValidations: Promise<ValidationResult>[] = [];

    if (this.validationsGlobalForm.length > 0) {
      const recordValidationResultsPromises = fireRecordValidations(
        values,
        this.validationsGlobalForm
      );
      globalFieldResultValidations = [...recordValidationResultsPromises];
    }

    return globalFieldResultValidations;
  }

  isFieldKeyMappingDefined(key: string): boolean {
    return !isUndefinedOrNull(this.validationsPerField[key]);
  }
}
