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
  private validationsGlobalForm: RecordValidationFunction[] = [];
  private asyncValidationInProgressCount = 0;

  // TODO, in new api we are adding an optional parameter
  // to customize the error message (string array)
  //
  // TODO: Chain pattern applied here, check why it is useful
  addFieldValidation(
    key: string,
    validation: FieldValidationFunctionSyncAsync,
    customParams: any = {},
    errorMessage?: string
  ): ValidationEngine {
    const asyncValidationFn = this.convertFieldValidationToAsyncIfNeeded(
      validation
    );

    if (!this.isFieldKeyMappingDefined(key)) {
      this.validationsPerField[key] = [];
    }

    this.validationsPerField[key].push({
      validator: asyncValidationFn,
      customArgs: customParams,
      errorMessage: errorMessage,
    });
    return this;
  }

  // TODO: Should it be moved to model?
  convertFieldValidationToAsyncIfNeeded(
    validation: FieldValidationFunctionSyncAsync
  ): FieldValidationFunction {
    // Sugar we admit both flavors syncrhonous and asynchronous validators
    return (values: any): Promise<ValidationResult> => {
      const result = validation(values);

      if (isSyncValidationResult(result)) {
        return Promise.resolve(result as ValidationResult);
      } else {
        return result as Promise<ValidationResult>;
      }
    };
  }

  addFormValidation(validation: RecordValidationFunctionSyncAsync): void {
    // Sugar we admit both flavors syncrhonous and asynchronous validators
    const validationAsync = this.convertFormValidationToAsyncIfNeeded(
      validation
    );

    this.validationsGlobalForm.push(validationAsync);
  }

  // TODO: Should this be moved to model ?
  convertFormValidationToAsyncIfNeeded(
    validation: RecordValidationFunctionSyncAsync
  ): RecordValidationFunction {
    return (values: any): Promise<ValidationResult> => {
      const result = validation(values);

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
              const errorInformation = `Validation Exception, field: ${key} validation fn Index: ${key}`;
              console.log(errorInformation);
              reject(result);
            });
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
