import { createFormValidation, FormValidation } from './form-validation';
import {
  ValidationSchema,
  ValidationResult,
  FieldValidationFunctionSync,
  FieldValidationFunctionSyncAsync,
} from './model';

describe('createFormValidation', () => {
  it(`spec #1: should return an instance of FormValidation
  when calling createFormValidation
  `, () => {
    // Arrange
    const validationSchema: ValidationSchema = {};

    // Act
    const formValidation = createFormValidation(validationSchema);

    // Assert
    expect(formValidation).toBeInstanceOf(FormValidation);
  });

  describe(`FieldValidations`, () => {
    it(`should execute a field validation (sync and using function in schema) and fail when
    adding a field validation in the schema on a given field
    firing a validation for that given field
    `, done => {
      // Arrange

      const mockValidationFn = jest.fn().mockReturnValue({
        type: 'MY_TYPE',
        succeeded: false,
        message: 'mymessage',
      });

      const validationSchema: ValidationSchema = {
        fields: {
          username: [mockValidationFn],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateField('username', 'whatever');

      // Assert
      result.then(validationResult => {
        expect(validationResult.succeeded).toBe(false);
        expect(validationResult.type).toBe('MY_TYPE');
        expect(validationResult.message).toBe('mymessage');
        expect(mockValidationFn).toHaveBeenCalled();
        done();
      });
    });

    it(`should execute a field validation (async and using function in schema) and fail when
    adding a field validation in the schema on a given field
    firing a validation for that given field
    `, done => {
      // Arrange
      const mockValidationFn = jest.fn(
        (
          value: any,
          values?: any,
          customArgs?: object,
          message?: string | string[]
        ): ValidationResult => ({
          type: 'MY_TYPE',
          succeeded: false,
          message: 'mymessage',
        })
      );

      const validationSchema: ValidationSchema = {
        fields: {
          username: [mockValidationFn],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateField('username', 'whatever');

      // Assert
      result.then(validationResult => {
        expect(validationResult.succeeded).toBe(false);
        expect(validationResult.type).toBe('MY_TYPE');
        expect(validationResult.message).toBe('mymessage');
        expect(mockValidationFn).toHaveBeenCalled();
        done();
      });
    });

    it(`should execute a field validation (sync and using full fied schema) and fail when
    adding a field validation in the schema on a given field
    firing a validation for that given field
    `, done => {
      // Arrange
      const validationFn: FieldValidationFunctionSync = (
        value: any,
        values?: any,
        customArgs?: object,
        message?: string | string[]
      ): ValidationResult => ({
        type: 'MY_TYPE',
        succeeded: false,
        message: message ? (message as string) : 'mymessage',
      });

      const customArgs = { a: 'foo' };

      const validationSchema: ValidationSchema = {
        fields: {
          username: [
            {
              validator: validationFn,
              message: 'myOverridden message',
            },
          ],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateField('username', 'whatever');

      // Assert
      result.then(validationResult => {
        expect(validationResult.succeeded).toBe(false);
        expect(validationResult.type).toBe('MY_TYPE');
        expect(validationResult.message).toBe('myOverridden message');
        done();
      });
    });

    it(`should execute a field validation and success when
    adding a field validation in the schema on a given field
    firing a validation for that given field that succeeds
`, () => {});

    it(`should execute a field validation and display custom message when
    adding a field validation in the schema on a given field (including custom message)
    firing a validation for that given field that fails
`, () => {});

    it(`should not execute a field validation and succeed when
    adding a field validation in the schema on a given field
    firing a validation for another field that fails
`, () => {});

    it(`should execute two validations for a given field
    adding a two field succeed validations for in the schema on a given field
    firing validation for that field
`, () => {});
  });

  describe(`FormValidations`, () => {
    // Test here all fields togehter
    // Create a form validation check is fired
    // Combine both field and form
    // Create two form validations check both executed
    // on succeed
    // first fail second succeeded
    // secondf succeeds
  });
});
