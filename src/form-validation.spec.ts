import { createFormValidation, FormValidation } from './form-validation';
import {
  ValidationSchema,
  ValidationResult,
  FieldValidationFunctionSync,
  FieldValidationFunctionSyncAsync,
  FieldValidation,
  RecordValidationFunctionAsync,
  RecordValidationFunctionSync,
} from './model';
import { doesNotReject } from 'assert';
import { promises } from 'fs';

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
    it(`spec #2:should execute a field validation (sync and using function in schema) and fail when
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

    it(`spec #3: should execute a field validation (async and using function in schema) and fail when
    adding a field validation in the schema on a given field
    firing a validation for that given field (include as well custom message override)
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

    it(`spec #4: should execute a field validation (defined as FullValidator, sync function in schema) and fail when
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
          message: message ? (message as string) : 'mymessage',
        })
      );

      const validationSchema: ValidationSchema = {
        fields: {
          username: [
            {
              validator: mockValidationFn,
              message: 'myoverriddenmessage',
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
        expect(validationResult.message).toBe('myoverriddenmessage');
        expect(mockValidationFn).toHaveBeenCalled();
        done();
      });
    });

    it(`spec #5: should execute a field validation (defined as FullValidator, async function in schema) and fail when
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
        ): Promise<ValidationResult> =>
          Promise.resolve<ValidationResult>({
            type: 'MY_TYPE',
            succeeded: false,
            message: message ? (message as string) : 'mymessage',
          })
      );

      const validationSchema: ValidationSchema = {
        fields: {
          username: [
            {
              validator: mockValidationFn,
              message: 'myoverriddenmessage',
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
        expect(validationResult.message).toBe('myoverriddenmessage');
        expect(mockValidationFn).toHaveBeenCalled();
        done();
      });
    });

    it(`spec #6: should execute a field validation (defined as FullValidator, async function in schema) and fail when
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
        ): Promise<ValidationResult> =>
          Promise.resolve<ValidationResult>({
            type: 'MY_TYPE',
            succeeded: false,
            message: message ? (message as string) : 'mymessage',
          })
      );

      const validationSchema: ValidationSchema = {
        fields: {
          username: [
            {
              validator: mockValidationFn,
              message: 'myoverriddenmessage',
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
        expect(validationResult.message).toBe('myoverriddenmessage');
        expect(mockValidationFn).toHaveBeenCalled();
        done();
      });
    });

    it(`spec #7:should execute a field validation (sync and using full schema) passing
      custom args and failed when customArgs.fail === true
      `, done => {
      // Arrange
      const validator: FieldValidationFunctionSync = (
        value,
        values,
        customArgs
      ): ValidationResult => {
        if (customArgs.fail) {
          return {
            type: 'MY_TYPE',
            succeeded: false,
            message: 'received custom args fail true',
          };
        } else {
          return {
            type: 'MY_TYPE',
            succeeded: true,
            message: 'received custom args fail false',
          };
        }
      };

      const validationSchema: ValidationSchema = {
        fields: {
          username: [
            {
              validator: validator,
              customArgs: { fail: true },
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
        expect(validationResult.message).toBe('received custom args fail true');
        done();
      });
    });

    it(`spec #8:should execute a field validation (sync and using full schema) passing
      custom args and succeeded when customArgs.fail === false
      `, done => {
      // Arrange
      const validator: FieldValidationFunctionSync = (
        value,
        values,
        customArgs
      ): ValidationResult => {
        if (customArgs.fail) {
          return {
            type: 'MY_TYPE',
            succeeded: false,
            message: 'received custom args fail true',
          };
        } else {
          return {
            type: 'MY_TYPE',
            succeeded: true,
            message: 'received custom args fail false',
          };
        }
      };

      const validationSchema: ValidationSchema = {
        fields: {
          username: [
            {
              validator: validator,
              customArgs: { fail: false },
            },
          ],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateField('username', 'whatever');

      // Assert
      result.then(validationResult => {
        expect(validationResult.succeeded).toBe(true);
        done();
      });
    });

    it(`spec #9:should execute two validations for a given field and succeed
    when adding two validators to a given field and both succeed
`, done => {
      // Arrange
      const mockValidationFn1 = jest.fn().mockReturnValue({
        type: 'MY_VALIDATOR_A',
        succeeded: true,
        message: 'mymessage',
      });

      const mockValidationFn2 = jest.fn().mockReturnValue({
        type: 'MY_VALIDATOR_B',
        succeeded: true,
        message: 'mymessage',
      });

      const validationSchema: ValidationSchema = {
        fields: {
          username: [mockValidationFn1, mockValidationFn2],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateField('username', 'whatever');

      // Assert
      result.then(validationResult => {
        expect(validationResult.succeeded).toBe(true);
        done();
      });
    });

    it(`spec #10:should execute two validations for a given field and failed
when adding two validators to a given field and first fails
`, done => {
      // Arrange
      const mockValidationFn1 = jest.fn().mockReturnValue({
        type: 'MY_VALIDATOR_A',
        succeeded: false,
        message: 'mymessageA',
      });

      const mockValidationFn2 = jest.fn().mockReturnValue({
        type: 'MY_VALIDATOR_B',
        succeeded: true,
        message: 'mymessageB',
      });

      const validationSchema: ValidationSchema = {
        fields: {
          username: [mockValidationFn1, mockValidationFn2],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateField('username', 'whatever');

      // Assert
      result.then(validationResult => {
        expect(validationResult.succeeded).toBe(false);
        expect(validationResult.type).toBe('MY_VALIDATOR_A');
        done();
      });
    });

    it(`spec #11:should execute two validations for a given field and failed
when adding two validators to a given field and second fails
`, done => {
      // Arrange
      const mockValidationFn1 = jest.fn().mockReturnValue({
        type: 'MY_VALIDATOR_A',
        succeeded: true,
        message: 'mymessageA',
      });

      const mockValidationFn2 = jest.fn().mockReturnValue({
        type: 'MY_VALIDATOR_B',
        succeeded: false,
        message: 'mymessageB',
      });

      const validationSchema: ValidationSchema = {
        fields: {
          username: [mockValidationFn1, mockValidationFn2],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateField('username', 'whatever');

      // Assert
      result.then(validationResult => {
        expect(validationResult.succeeded).toBe(false);
        expect(validationResult.type).toBe('MY_VALIDATOR_B');
        done();
      });
    });
  });

  describe(`FormValidations`, () => {
    it(`#Spec 1: should failed form validation 
    when adding a record validation that fails (sync flavour function)
    `, done => {
      // Arrange
      const mockValidationFn: RecordValidationFunctionSync = jest
        .fn()
        .mockReturnValue({
          type: '',
          succeeded: false,
          message: 'mymessageA',
        });

      const validationSchema: ValidationSchema = {
        record: [mockValidationFn],
      };

      const values = {};

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateForm(values);

      // Assert
      result.then(validationResult => {
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.recordErrors.length).toBe(1);
        done();
      });
    });

    it(`#Spec 2: should failed form validation 
    when adding a record validation that fails (async flavour function)
    `, done => {
      // Arrange
      const mockValidationFn: RecordValidationFunctionSync = jest
        .fn()
        .mockResolvedValue({
          type: '',
          succeeded: false,
          message: 'mymessageA',
        });

      const validationSchema: ValidationSchema = {
        record: [mockValidationFn],
      };

      const values = {};

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateForm(values);

      // Assert
      result.then(validationResult => {
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.recordErrors.length).toBe(1);
        done();
      });
    });

    it(`#Spec 3: should failed form validation 
    when adding a record validation that fails (fullRecordValidationSchema entry,
      async validator)
    `, done => {
      // Arrange
      const validationFn: RecordValidationFunctionAsync = (values, message) =>
        Promise.resolve<ValidationResult>({
          type: '',
          succeeded: false,
          message: message ? (message as string) : 'mymessageA',
        });

      const validationSchema: ValidationSchema = {
        record: [
          {
            validation: validationFn,
            message: 'My custom message',
          },
        ],
      };

      const values = {};

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateForm(values);

      // Assert
      result.then(validationResult => {
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.recordErrors.length).toBe(1);
        expect(validationResult.recordErrors[0].message).toBe(
          'My custom message'
        );
        done();
      });
    });

    it(`#Spec 4: should failed form validation 
    when adding a record validation that fails (fullRecordValidationSchema entry,
      sync validator)
    `, done => {
      // Arrange
      const validationFn: RecordValidationFunctionSync = (values, message) => ({
        type: '',
        succeeded: false,
        message: message ? (message as string) : 'mymessageA',
      });

      const validationSchema: ValidationSchema = {
        record: [
          {
            validation: validationFn,
            message: 'My custom message',
          },
        ],
      };

      const values = {};

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateForm(values);

      // Assert
      result.then(validationResult => {
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.recordErrors.length).toBe(1);
        expect(validationResult.recordErrors[0].message).toBe(
          'My custom message'
        );
        done();
      });
    });

    // Test here all fields togehter
    // Create a form validation check is fired
    // Combine both field and form
    // Create two form validations check both executed
    // on succeed
    // first fail second succeeded
    // secondf succeeds
  });
});
