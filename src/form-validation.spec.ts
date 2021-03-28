import { createFormValidation, FormValidation } from './form-validation';
import {
  ValidationSchema,
  ValidationResult,
  FieldValidationFunctionSync,
  RecordValidationFunctionAsync,
  RecordValidationFunctionSync,
  FieldValidatorArgs,
  FormValidationResult,
} from './model';
import Validators from './validators';

describe('FormValidation', () => {
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

  describe(`validateField`, () => {
    it(`spec #1:should execute a field validation (sync and using function in schema) and fail when
    adding a field validation in the schema on a given field
    firing a validation for that given field
    `, (done) => {
      // Arrange
      const mockValidationFn = jest.fn().mockReturnValue({
        type: 'MY_TYPE',
        succeeded: false,
        message: 'mymessage',
      });

      const validationSchema: ValidationSchema = {
        field: {
          username: [mockValidationFn],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateField('username', 'whatever');

      // Assert
      result.then((validationResult) => {
        expect(validationResult.succeeded).toBe(false);
        expect(validationResult.type).toBe('MY_TYPE');
        expect(validationResult.message).toBe('mymessage');
        expect(mockValidationFn).toHaveBeenCalled();
        done();
      });
    });

    it(`spec #2: should execute a field validation (async and using function in schema) and fail when
    adding a field validation in the schema on a given field
    firing a validation for that given field (include as well custom message override)
    `, (done) => {
      // Arrange
      const mockValidationFn = jest.fn().mockResolvedValue({
        type: 'MY_TYPE',
        succeeded: false,
        message: 'mymessage',
      });

      const validationSchema: ValidationSchema = {
        field: {
          username: [mockValidationFn],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateField('username', 'whatever');

      // Assert
      result.then((validationResult) => {
        expect(validationResult.succeeded).toBe(false);
        expect(validationResult.type).toBe('MY_TYPE');
        expect(validationResult.message).toBe('mymessage');
        expect(mockValidationFn).toHaveBeenCalled();
        done();
      });
    });

    it(`spec #3: should execute a field validation (defined as FullValidator, sync function in schema) and fail when
    adding a field validation in the schema on a given field
    firing a validation for that given field
    `, (done) => {
      // Arrange
      const mockValidationFn = jest.fn(
        ({ message }): ValidationResult => ({
          type: 'MY_TYPE',
          succeeded: false,
          message: message ? (message as string) : 'mymessage',
        })
      );

      const validationSchema: ValidationSchema = {
        field: {
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
      result.then((validationResult) => {
        expect(validationResult.succeeded).toBe(false);
        expect(validationResult.type).toBe('MY_TYPE');
        expect(validationResult.message).toBe('myoverriddenmessage');
        expect(mockValidationFn).toHaveBeenCalled();
        done();
      });
    });

    it(`spec #4: should execute a field validation (defined as FullValidator, async function in schema) and fail when
    adding a field validation in the schema on a given field
    firing a validation for that given field
    `, (done) => {
      // Arrange
      const mockValidationFn = jest.fn(
        ({ message }): Promise<ValidationResult> =>
          Promise.resolve<ValidationResult>({
            type: 'MY_TYPE',
            succeeded: false,
            message: message ? (message as string) : 'mymessage',
          })
      );

      const validationSchema: ValidationSchema = {
        field: {
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
      result.then((validationResult) => {
        expect(validationResult.succeeded).toBe(false);
        expect(validationResult.type).toBe('MY_TYPE');
        expect(validationResult.message).toBe('myoverriddenmessage');
        expect(mockValidationFn).toHaveBeenCalled();
        done();
      });
    });

    it(`spec #5: should execute a field validation (defined as FullValidator, async function in schema) and fail when
    adding a field validation in the schema, using all possible args
    `, (done) => {
      // Arrange
      const mockValidationFn = jest.fn(
        ({
          value,
          message,
          customArgs,
          values,
        }: FieldValidatorArgs): Promise<ValidationResult> =>
          Promise.resolve<ValidationResult>({
            type: 'MY_TYPE',
            succeeded: false,
            message: `${value} ${message} ${customArgs} ${values}`,
          })
      );

      const validationSchema: ValidationSchema = {
        field: {
          username: [
            {
              validator: mockValidationFn,
              customArgs: 'custom-arg',
              message: 'myoverriddenmessage',
            },
          ],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateField(
        'username',
        'whatever',
        'test-values'
      );

      // Assert
      result.then((validationResult) => {
        expect(validationResult.succeeded).toBe(false);
        expect(validationResult.type).toBe('MY_TYPE');
        expect(validationResult.message).toBe(
          'whatever myoverriddenmessage custom-arg test-values'
        );
        expect(mockValidationFn).toHaveBeenCalled();
        done();
      });
    });

    it(`spec #6:should execute a field validation (sync and using full schema) passing
      custom args and failed when customArgs.fail === true
      `, (done) => {
      // Arrange
      const validator: FieldValidationFunctionSync = jest.fn(
        ({ customArgs }): ValidationResult => {
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
        }
      );

      const validationSchema: ValidationSchema = {
        field: {
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
      result.then((validationResult) => {
        expect(validationResult.succeeded).toBe(false);
        expect(validationResult.type).toBe('MY_TYPE');
        expect(validationResult.message).toBe('received custom args fail true');
        expect(validator).toHaveBeenCalled();
        done();
      });
    });

    it(`spec #7:should execute a field validation (sync and using full schema) passing
      custom args and succeeded when customArgs.fail === false
      `, (done) => {
      // Arrange
      const validator: FieldValidationFunctionSync = jest.fn(
        ({ customArgs }): ValidationResult => {
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
        }
      );

      const validationSchema: ValidationSchema = {
        field: {
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
      result.then((validationResult) => {
        expect(validationResult.succeeded).toBe(true);
        expect(validator).toHaveBeenCalled();
        done();
      });
    });

    it(`spec #8:should return succeed validation result
    when adding two validators to a given field and both succeed
`, (done) => {
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
        field: {
          username: [mockValidationFn1, mockValidationFn2],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateField('username', 'whatever');

      // Assert
      result.then((validationResult) => {
        expect(validationResult.succeeded).toBeTruthy();
        expect(mockValidationFn1).toHaveBeenCalled();
        expect(mockValidationFn2).toHaveBeenCalled();
        done();
      });
    });

    it(`spec #9:should execute first validations for a given field and failed
when adding two validators to a given field and first fails
`, (done) => {
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
        field: {
          username: [mockValidationFn1, mockValidationFn2],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateField('username', 'whatever');

      // Assert
      result.then((validationResult) => {
        expect(validationResult.succeeded).toBe(false);
        expect(validationResult.type).toBe('MY_VALIDATOR_A');
        expect(mockValidationFn1).toHaveBeenCalled();
        expect(mockValidationFn2).not.toHaveBeenCalled();
        done();
      });
    });

    it(`spec #10:should execute two validations for a given field and failed
when adding two validators to a given field and second fails
`, (done) => {
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
        field: {
          username: [mockValidationFn1, mockValidationFn2],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateField('username', 'whatever');

      // Assert
      result.then((validationResult) => {
        expect(validationResult.succeeded).toBe(false);
        expect(validationResult.type).toBe('MY_VALIDATOR_B');
        expect(mockValidationFn1).toHaveBeenCalled();
        expect(mockValidationFn2).toHaveBeenCalled();
        done();
      });
    });

    it(`spec #11:should execute first validation for a given field and failed
when adding two validators to a given field fails and second fails
`, (done) => {
      // Arrange
      const mockValidationFn1 = jest.fn().mockReturnValue({
        type: 'MY_VALIDATOR_A',
        succeeded: false,
        message: 'mymessageA',
      });

      const mockValidationFn2 = jest.fn().mockReturnValue({
        type: 'MY_VALIDATOR_B',
        succeeded: false,
        message: 'mymessageB',
      });

      const validationSchema: ValidationSchema = {
        field: {
          username: [mockValidationFn1, mockValidationFn2],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateField('username', 'whatever');

      // Assert
      result.then((validationResult) => {
        expect(validationResult.succeeded).toBe(false);
        expect(validationResult.type).toBe('MY_VALIDATOR_A');
        expect(mockValidationFn1).toHaveBeenCalled();
        expect(mockValidationFn2).not.toHaveBeenCalled();
        done();
      });
    });

    it(`spec #12:should execute validation for a given field and failed
when adding one validator to a given nested field
`, (done) => {
      // Arrange
      const mockValidationFn = jest.fn().mockReturnValue({
        type: 'MY_VALIDATOR_A',
        succeeded: false,
        message: 'mymessageA',
      });

      const validationSchema: ValidationSchema = {
        field: {
          'nested.field': [mockValidationFn],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateField('nested.field', 'whatever');

      // Assert
      result.then((validationResult) => {
        expect(validationResult.succeeded).toBe(false);
        expect(validationResult.type).toBe('MY_VALIDATOR_A');
        expect(mockValidationFn).toHaveBeenCalled();
        done();
      });
    });

    it(`spec #13:should execute validation for a given field and failed
when adding one validator to a given nested field with kebap case
`, (done) => {
      // Arrange
      const mockValidationFn = jest.fn().mockReturnValue({
        type: 'MY_VALIDATOR_A',
        succeeded: false,
        message: 'mymessageA',
      });

      const validationSchema: ValidationSchema = {
        field: {
          'this-is-a-nested.field': [mockValidationFn],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateField(
        'this-is-a-nested.field',
        'whatever'
      );

      // Assert
      result.then((validationResult) => {
        expect(validationResult.succeeded).toBe(false);
        expect(validationResult.type).toBe('MY_VALIDATOR_A');
        expect(mockValidationFn).toHaveBeenCalled();
        done();
      });
    });

    it(`spec #14:should execute validation for a given field and failed
when adding one validator with validator as object
`, (done) => {
      // Arrange
      const mockValidationFn = jest.fn().mockReturnValue({
        type: 'MY_VALIDATOR_A',
        succeeded: false,
        message: 'mymessageA',
      });

      const validationSchema: ValidationSchema = {
        field: {
          myField: [
            {
              validator: { validator: mockValidationFn },
            },
          ],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateField('myField', 'whatever');

      // Assert
      result.then((validationResult) => {
        expect(validationResult.succeeded).toBe(false);
        expect(validationResult.type).toBe('MY_VALIDATOR_A');
        expect(mockValidationFn).toHaveBeenCalled();
        done();
      });
    });

    it(`spec #15: should execute required validation for a given field and failed
when adding validator using array nested fieldId`, (done) => {
      // Arrange

      const validationSchema: ValidationSchema = {
        field: {
          'products[0].name': [Validators.required],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateField('products[0].name', '');

      // Assert
      result.then((validationResult) => {
        const expectedResult: ValidationResult = {
          type: 'REQUIRED',
          succeeded: false,
          message: 'Please fill in this mandatory field.',
        };
        expect(validationResult).toEqual(expectedResult);
        done();
      });
    });

    it(`spec #16: should execute array validation for a given field equal "products[0].name" and failed
when adding one array validator using nested fieldId`, (done) => {
      // Arrange

      const validationSchema: ValidationSchema = {
        field: {
          products: [
            {
              validator: Validators.array,
              customArgs: {
                field: {
                  name: [Validators.required],
                  quantity: [Validators.required],
                  price: [Validators.required],
                },
              },
            },
          ],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateField('products[0].name', '');

      // Assert
      result.then((validationResult) => {
        const expectedResult: ValidationResult = {
          type: 'REQUIRED',
          succeeded: false,
          message: 'Please fill in this mandatory field.',
        };
        expect(validationResult).toEqual(expectedResult);
        done();
      });
    });

    it(`spec #17: should execute array validation for a given field equal "products[0].name" and failed
when adding one array validator using nested fieldId`, (done) => {
      // Arrange

      const validationSchema: ValidationSchema = {
        field: {
          products: [
            {
              validator: Validators.array,
              customArgs: {
                field: {
                  name: [Validators.required],
                  quantity: [Validators.required],
                  price: [Validators.required],
                },
              },
            },
          ],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateField('products[1].name', '');

      // Assert
      result.then((validationResult) => {
        const expectedResult: ValidationResult = {
          type: 'REQUIRED',
          succeeded: false,
          message: 'Please fill in this mandatory field.',
        };
        expect(validationResult).toEqual(expectedResult);
        done();
      });
    });

    it(`spec #18: should execute array validation for a given field and failed
when adding one array validator using base fieldId`, (done) => {
      // Arrange

      const validationSchema: ValidationSchema = {
        field: {
          products: [
            {
              validator: Validators.array,
              customArgs: {
                field: {
                  name: [Validators.required],
                  quantity: [Validators.required],
                  price: [Validators.required],
                },
              },
            },
          ],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateField('products', [
        {
          name: '',
          quantity: null,
          price: null,
        },
      ]);

      // Assert
      result.then((validationResult) => {
        const expectedResult: { [key: string]: ValidationResult } = {
          'products[0].name': {
            type: 'REQUIRED',
            succeeded: false,
            message: 'Please fill in this mandatory field.',
          },
          'products[0].quantity': {
            type: 'REQUIRED',
            succeeded: false,
            message: 'Please fill in this mandatory field.',
          },
          'products[0].price': {
            type: 'REQUIRED',
            succeeded: false,
            message: 'Please fill in this mandatory field.',
          },
        };
        expect(validationResult).toEqual(expectedResult);
        done();
      });
    });
  });

  describe('validateRecords', () => {
    it(`#Spec 1: should failed form validation
    when adding a record validation that fails (sync flavour function)
    `, (done) => {
      // Arrange
      const mockValidationFn: RecordValidationFunctionSync = jest
        .fn()
        .mockReturnValue({
          type: '',
          succeeded: false,
          message: 'mymessageA',
        });

      const validationSchema: ValidationSchema = {
        record: {
          MY_RECORD_VALIDATION: [mockValidationFn],
        },
      };

      const values = {};

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateRecord(values);

      // Assert
      result.then((validationResult) => {
        expect(mockValidationFn).toHaveBeenCalled();
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.recordErrors).toEqual({
          MY_RECORD_VALIDATION: {
            type: '',
            succeeded: false,
            message: 'mymessageA',
          },
        });
        done();
      });
    });

    it(`#Spec 2: should failed form validation
    when adding a record validation that fails (async flavour function)
    `, (done) => {
      // Arrange
      const mockValidationFn: RecordValidationFunctionSync = jest
        .fn()
        .mockResolvedValue({
          type: '',
          succeeded: false,
          message: 'mymessageA',
        });

      const validationSchema: ValidationSchema = {
        record: {
          MY_RECORD_VALIDATION: [mockValidationFn],
        },
      };

      const values = {};

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateRecord(values);

      // Assert
      result.then((validationResult) => {
        expect(mockValidationFn).toHaveBeenCalled();
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.recordErrors).toEqual({
          MY_RECORD_VALIDATION: {
            type: '',
            succeeded: false,
            message: 'mymessageA',
          },
        });
        done();
      });
    });

    it(`#Spec 3: should failed form validation
    when adding a record validation that fails (fullRecordValidationSchema entry, async validator)
    `, (done) => {
      // Arrange
      const validationFn: RecordValidationFunctionAsync = jest.fn(
        ({ message }) =>
          Promise.resolve<ValidationResult>({
            type: '',
            succeeded: false,
            message: message ? (message as string) : 'mymessageA',
          })
      );

      const validationSchema: ValidationSchema = {
        record: {
          MY_RECORD_VALIDATION: [
            { validator: validationFn, message: 'My custom message' },
          ],
        },
      };

      const values = {};

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateRecord(values);

      // Assert
      result.then((validationResult) => {
        expect(validationFn).toHaveBeenCalled();
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.recordErrors).toEqual({
          MY_RECORD_VALIDATION: {
            type: '',
            succeeded: false,
            message: 'My custom message',
          },
        });
        done();
      });
    });

    it(`#Spec 4: should failed form validation
    when adding a record validation that fails (fullRecordValidationSchema entry, sync validator)
    `, (done) => {
      // Arrange
      const validationFn: RecordValidationFunctionSync = jest.fn(
        ({ message }) => ({
          type: '',
          succeeded: false,
          message: message ? (message as string) : 'mymessageA',
        })
      );

      const validationSchema: ValidationSchema = {
        record: {
          MY_RECORD_VALIDATION: [
            { validator: validationFn, message: 'My custom message' },
          ],
        },
      };

      const values = {};

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateRecord(values);

      // Assert
      result.then((validationResult) => {
        expect(validationFn).toHaveBeenCalled();
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.recordErrors).toEqual({
          MY_RECORD_VALIDATION: {
            type: '',
            succeeded: false,
            message: 'My custom message',
          },
        });
        done();
      });
    });

    it(`#Spec 5: should failed form validation, and return back one validationResult on forms
    when adding one record with two validation first fails, second succeeds
    `, (done) => {
      // Arrange
      const validationFn1: RecordValidationFunctionSync = jest.fn(
        ({ message }) => ({
          type: '',
          succeeded: false,
          message: message ? (message as string) : 'mymessageA',
        })
      );

      const validationFn2: RecordValidationFunctionSync = jest.fn(
        ({ message }) => ({
          type: '',
          succeeded: true,
          message: message ? (message as string) : 'mymessageB',
        })
      );

      const validationSchema: ValidationSchema = {
        record: {
          MY_RECORD_VALIDATION: [validationFn1, validationFn2],
        },
      };

      const values = {};

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateRecord(values);

      // Assert
      result.then((validationResult) => {
        expect(validationFn1).toHaveBeenCalled();
        expect(validationFn2).not.toHaveBeenCalled();
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.recordErrors).toEqual({
          MY_RECORD_VALIDATION: {
            type: '',
            succeeded: false,
            message: 'mymessageA',
          },
        });
        done();
      });
    });

    it(`#Spec 6: should failed form validation, and return back one validationResult on forms
    when adding one record with two validation first succeeds, second fails
    `, (done) => {
      // Arrange
      const validationFn1: RecordValidationFunctionSync = jest.fn(
        ({ message }) => ({
          type: '',
          succeeded: true,
          message: message ? (message as string) : 'mymessageA',
        })
      );

      const validationFn2: RecordValidationFunctionSync = jest.fn(
        ({ message }) => ({
          type: '',
          succeeded: false,
          message: message ? (message as string) : 'mymessageB',
        })
      );

      const validationSchema: ValidationSchema = {
        record: {
          MY_RECORD_VALIDATION: [validationFn1, validationFn2],
        },
      };

      const values = {};

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateRecord(values);

      // Assert
      result.then((validationResult) => {
        expect(validationFn1).toHaveBeenCalled();
        expect(validationFn2).toHaveBeenCalled();
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.recordErrors).toEqual({
          MY_RECORD_VALIDATION: {
            type: '',
            succeeded: false,
            message: 'mymessageB',
          },
        });
        done();
      });
    });

    it(`#Spec 7: should failed form validation, and return back one validationResult on forms
    when adding one record with two validation first fails, second fails
    `, (done) => {
      // Arrange
      const validationFn1: RecordValidationFunctionSync = jest.fn(
        ({ message }) => ({
          type: '',
          succeeded: false,
          message: message ? (message as string) : 'mymessageA',
        })
      );

      const validationFn2: RecordValidationFunctionSync = jest.fn(
        ({ message }) => ({
          type: '',
          succeeded: false,
          message: message ? (message as string) : 'mymessageB',
        })
      );

      const validationSchema: ValidationSchema = {
        record: {
          MY_RECORD_VALIDATION: [validationFn1, validationFn2],
        },
      };

      const values = {};

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateRecord(values);

      // Assert
      result.then((validationResult) => {
        expect(validationFn1).toHaveBeenCalled();
        expect(validationFn2).not.toHaveBeenCalled();
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.recordErrors).toEqual({
          MY_RECORD_VALIDATION: {
            type: '',
            succeeded: false,
            message: 'mymessageA',
          },
        });
        done();
      });
    });

    it(`#Spec 8: should succed form validation, and return back one validationResult on forms
    when adding one record with two validation first and second succeded
    `, (done) => {
      // Arrange
      const validationFn1: RecordValidationFunctionSync = jest.fn(
        ({ message }) => ({
          type: '',
          succeeded: true,
          message: message ? (message as string) : 'mymessageA',
        })
      );

      const validationFn2: RecordValidationFunctionSync = jest.fn(
        ({ message }) => ({
          type: '',
          succeeded: true,
          message: message ? (message as string) : 'mymessageB',
        })
      );

      const validationSchema: ValidationSchema = {
        record: {
          MY_RECORD_VALIDATION: [validationFn1, validationFn2],
        },
      };

      const values = {};

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateRecord(values);

      // Assert
      result.then((validationResult) => {
        expect(validationFn1).toHaveBeenCalled();
        expect(validationFn2).toHaveBeenCalled();
        expect(validationResult.succeeded).toBeTruthy();
        expect(validationResult.recordErrors).toEqual({
          MY_RECORD_VALIDATION: {
            type: '',
            succeeded: true,
            message: 'mymessageB',
          },
        });
        done();
      });
    });

    it(`#Spec 9: should fail form validation, and return back two validationResult on forms
    when adding two record with one validation first and second fails
    `, (done) => {
      // Arrange
      const validationFn1: RecordValidationFunctionSync = jest.fn(
        ({ message }) => ({
          type: '',
          succeeded: false,
          message: message ? (message as string) : 'mymessageA',
        })
      );

      const validationFn2: RecordValidationFunctionSync = jest.fn(
        ({ message }) => ({
          type: '',
          succeeded: false,
          message: message ? (message as string) : 'mymessageB',
        })
      );

      const validationSchema: ValidationSchema = {
        record: {
          MY_RECORD_VALIDATION1: [validationFn1],
          MY_RECORD_VALIDATION2: [validationFn2],
        },
      };

      const values = {};

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateRecord(values);

      // Assert
      result.then((validationResult) => {
        expect(validationFn1).toHaveBeenCalled();
        expect(validationFn2).toHaveBeenCalled();
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.recordErrors).toEqual({
          MY_RECORD_VALIDATION1: {
            type: '',
            succeeded: false,
            message: 'mymessageA',
          },
          MY_RECORD_VALIDATION2: {
            type: '',
            succeeded: false,
            message: 'mymessageB',
          },
        });
        done();
      });
    });

    it(`#Spec 10: should fail form validation, and return back one validationResult on forms
    when adding one record with one validation as validator object
    `, (done) => {
      // Arrange
      const validationFn: RecordValidationFunctionSync = jest.fn(
        ({ message }) => ({
          type: '',
          succeeded: false,
          message: message ? (message as string) : 'mymessageA',
        })
      );

      const validationSchema: ValidationSchema = {
        record: {
          MY_RECORD_VALIDATION: [
            {
              validator: { validator: validationFn },
            },
          ],
        },
      };

      const values = {};

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateRecord(values);

      // Assert
      result.then((validationResult) => {
        expect(validationFn).toHaveBeenCalled();
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.recordErrors).toEqual({
          MY_RECORD_VALIDATION: {
            type: '',
            succeeded: false,
            message: 'mymessageA',
          },
        });
        done();
      });
    });
  });

  describe(`validateForm`, () => {
    it(`#Spec 1: should failed form validation
    when adding a record validation that fails (sync flavour function)
    `, (done) => {
      // Arrange
      const mockValidationFn: RecordValidationFunctionSync = jest
        .fn()
        .mockReturnValue({
          type: '',
          succeeded: false,
          message: 'mymessageA',
        });

      const validationSchema: ValidationSchema = {
        record: {
          MY_RECORD_VALIDATION: [mockValidationFn],
        },
      };

      const values = {};

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateForm(values);

      // Assert
      result.then((validationResult) => {
        expect(mockValidationFn).toHaveBeenCalled();
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.fieldErrors).toEqual({});
        expect(validationResult.recordErrors).toEqual({
          MY_RECORD_VALIDATION: {
            type: '',
            succeeded: false,
            message: 'mymessageA',
          },
        });
        done();
      });
    });

    it(`#Spec 2: should failed form validation
    when adding a record validation that fails (async flavour function)
    `, (done) => {
      // Arrange
      const mockValidationFn: RecordValidationFunctionSync = jest
        .fn()
        .mockResolvedValue({
          type: '',
          succeeded: false,
          message: 'mymessageA',
        });

      const validationSchema: ValidationSchema = {
        record: {
          MY_RECORD_VALIDATION: [mockValidationFn],
        },
      };

      const values = {};

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateForm(values);

      // Assert
      result.then((validationResult) => {
        expect(mockValidationFn).toHaveBeenCalled();
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.fieldErrors).toEqual({});
        expect(validationResult.recordErrors).toEqual({
          MY_RECORD_VALIDATION: {
            type: '',
            succeeded: false,
            message: 'mymessageA',
          },
        });
        done();
      });
    });

    it(`#Spec 3: should failed form validation
    when adding a record validation that fails (fullRecordValidationSchema entry, async validator)
    `, (done) => {
      // Arrange
      const validationFn: RecordValidationFunctionAsync = jest.fn(
        ({ message }) =>
          Promise.resolve<ValidationResult>({
            type: '',
            succeeded: false,
            message: message ? (message as string) : 'mymessageA',
          })
      );

      const validationSchema: ValidationSchema = {
        record: {
          MY_RECORD_VALIDATION: [
            { validator: validationFn, message: 'My custom message' },
          ],
        },
      };

      const values = {};

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateForm(values);

      // Assert
      result.then((validationResult) => {
        expect(validationFn).toHaveBeenCalled();
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.fieldErrors).toEqual({});
        expect(validationResult.recordErrors).toEqual({
          MY_RECORD_VALIDATION: {
            type: '',
            succeeded: false,
            message: 'My custom message',
          },
        });
        done();
      });
    });

    it(`#Spec 4: should failed form validation
    when adding a record validation that fails (fullRecordValidationSchema entry, sync validator)
    `, (done) => {
      // Arrange
      const validationFn: RecordValidationFunctionSync = jest.fn(
        ({ message }) => ({
          type: '',
          succeeded: false,
          message: message ? (message as string) : 'mymessageA',
        })
      );

      const validationSchema: ValidationSchema = {
        record: {
          MY_RECORD_VALIDATION: [
            { validator: validationFn, message: 'My custom message' },
          ],
        },
      };

      const values = {};

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateForm(values);

      // Assert
      result.then((validationResult) => {
        expect(validationFn).toHaveBeenCalled();
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.fieldErrors).toEqual({});
        expect(validationResult.recordErrors).toEqual({
          MY_RECORD_VALIDATION: {
            type: '',
            succeeded: false,
            message: 'My custom message',
          },
        });
        done();
      });
    });

    it(`#Spec 5: should failed form validation, and return back one validationResult on forms
    when adding one record with two validation first fails, second succeeds
    `, (done) => {
      // Arrange
      const validationFn1: RecordValidationFunctionSync = jest.fn(
        ({ message }) => ({
          type: '',
          succeeded: false,
          message: message ? (message as string) : 'mymessageA',
        })
      );

      const validationFn2: RecordValidationFunctionSync = jest.fn(
        ({ message }) => ({
          type: '',
          succeeded: true,
          message: message ? (message as string) : 'mymessageB',
        })
      );

      const validationSchema: ValidationSchema = {
        record: {
          MY_RECORD_VALIDATION: [validationFn1, validationFn2],
        },
      };

      const values = {};

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateForm(values);

      // Assert
      result.then((validationResult) => {
        expect(validationFn1).toHaveBeenCalled();
        expect(validationFn2).not.toHaveBeenCalled();
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.fieldErrors).toEqual({});
        expect(validationResult.recordErrors).toEqual({
          MY_RECORD_VALIDATION: {
            type: '',
            succeeded: false,
            message: 'mymessageA',
          },
        });
        done();
      });
    });

    it(`#Spec 6: should failed form validation, and return back one validationResult on forms
    when adding one record with two validation first succeeds, second fails
    `, (done) => {
      // Arrange
      const validationFn1: RecordValidationFunctionSync = jest.fn(
        ({ message }) => ({
          type: '',
          succeeded: true,
          message: message ? (message as string) : 'mymessageA',
        })
      );

      const validationFn2: RecordValidationFunctionSync = jest.fn(
        ({ message }) => ({
          type: '',
          succeeded: false,
          message: message ? (message as string) : 'mymessageB',
        })
      );

      const validationSchema: ValidationSchema = {
        record: {
          MY_RECORD_VALIDATION: [validationFn1, validationFn2],
        },
      };

      const values = {};

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateForm(values);

      // Assert
      result.then((validationResult) => {
        expect(validationFn1).toHaveBeenCalled();
        expect(validationFn2).toHaveBeenCalled();
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.fieldErrors).toEqual({});
        expect(validationResult.recordErrors).toEqual({
          MY_RECORD_VALIDATION: {
            type: '',
            succeeded: false,
            message: 'mymessageB',
          },
        });
        done();
      });
    });

    it(`#Spec 7: should failed form validation, and return back one validationResult on forms
    when adding one record with two validation first fails, second fails
    `, (done) => {
      // Arrange
      const validationFn1: RecordValidationFunctionSync = jest.fn(
        ({ message }) => ({
          type: '',
          succeeded: false,
          message: message ? (message as string) : 'mymessageA',
        })
      );

      const validationFn2: RecordValidationFunctionSync = jest.fn(
        ({ message }) => ({
          type: '',
          succeeded: false,
          message: message ? (message as string) : 'mymessageB',
        })
      );

      const validationSchema: ValidationSchema = {
        record: {
          MY_RECORD_VALIDATION: [validationFn1, validationFn2],
        },
      };

      const values = {};

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateForm(values);

      // Assert
      result.then((validationResult) => {
        expect(validationFn1).toHaveBeenCalled();
        expect(validationFn2).not.toHaveBeenCalled();
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.fieldErrors).toEqual({});
        expect(validationResult.recordErrors).toEqual({
          MY_RECORD_VALIDATION: {
            type: '',
            succeeded: false,
            message: 'mymessageA',
          },
        });
        done();
      });
    });

    it(`#Spec 8: should succed form validation, and return back one validationResult on forms
    when adding one record with two validation first and second succeded
    `, (done) => {
      // Arrange
      const validationFn1: RecordValidationFunctionSync = jest.fn(
        ({ message }) => ({
          type: '',
          succeeded: true,
          message: message ? (message as string) : 'mymessageA',
        })
      );

      const validationFn2: RecordValidationFunctionSync = jest.fn(
        ({ message }) => ({
          type: '',
          succeeded: true,
          message: message ? (message as string) : 'mymessageB',
        })
      );

      const validationSchema: ValidationSchema = {
        record: {
          MY_RECORD_VALIDATION: [validationFn1, validationFn2],
        },
      };

      const values = {};

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateForm(values);

      // Assert
      result.then((validationResult) => {
        expect(validationFn1).toHaveBeenCalled();
        expect(validationFn2).toHaveBeenCalled();
        expect(validationResult.succeeded).toBeTruthy();
        expect(validationResult.fieldErrors).toEqual({});
        expect(validationResult.recordErrors).toEqual({
          MY_RECORD_VALIDATION: {
            type: '',
            succeeded: true,
            message: 'mymessageB',
          },
        });
        done();
      });
    });

    it(`#Spec 9: should fail form validation, and return back two validationResult on forms
    when adding two record with one validation first and second fails
    `, (done) => {
      // Arrange
      const validationFn1: RecordValidationFunctionSync = jest.fn(
        ({ message }) => ({
          type: '',
          succeeded: false,
          message: message ? (message as string) : 'mymessageA',
        })
      );

      const validationFn2: RecordValidationFunctionSync = jest.fn(
        ({ message }) => ({
          type: '',
          succeeded: false,
          message: message ? (message as string) : 'mymessageB',
        })
      );

      const validationSchema: ValidationSchema = {
        record: {
          MY_RECORD_VALIDATION1: [validationFn1],
          MY_RECORD_VALIDATION2: [validationFn2],
        },
      };

      const values = {};

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateForm(values);

      // Assert
      result.then((validationResult) => {
        expect(validationFn1).toHaveBeenCalled();
        expect(validationFn2).toHaveBeenCalled();
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.fieldErrors).toEqual({});
        expect(validationResult.recordErrors).toEqual({
          MY_RECORD_VALIDATION1: {
            type: '',
            succeeded: false,
            message: 'mymessageA',
          },
          MY_RECORD_VALIDATION2: {
            type: '',
            succeeded: false,
            message: 'mymessageB',
          },
        });
        done();
      });
    });

    it(`#Spec 10: should failed form validation, and return back a field validation result
    a form validation result
    when adding one field validation that fails and record validation that fails
    `, (done) => {
      // Arrange
      const myFieldValidation: FieldValidationFunctionSync = jest.fn(
        (fieldValidatorArgs) => ({
          type: 'MY_TYPE',
          succeeded: false,
          message: 'mymessageA',
        })
      );

      const myRecordValidation: RecordValidationFunctionSync = jest.fn(
        ({ message }) => ({
          type: '',
          succeeded: false,
          message: message ? (message as string) : 'mymessageB',
        })
      );

      const validationSchema: ValidationSchema = {
        field: {
          username: [myFieldValidation],
        },
        record: {
          MY_RECORD_VALIDATION: [myRecordValidation],
        },
      };

      const values = {};

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateForm(values);

      // Assert
      result.then((validationResult) => {
        expect(myFieldValidation).toHaveBeenCalled();
        expect(myRecordValidation).toHaveBeenCalled();
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.fieldErrors).toEqual({
          username: {
            type: 'MY_TYPE',
            succeeded: false,
            message: 'mymessageA',
          },
        });
        expect(validationResult.recordErrors).toEqual({
          MY_RECORD_VALIDATION: {
            type: '',
            succeeded: false,
            message: 'mymessageB',
          },
        });
        done();
      });
    });

    it(`#Spec 11: should failed form validation, and return back a one field validation result and one record validation result
    when adding one field validation that succeeds and record validation that fails
    `, (done) => {
      // Arrange
      const myFieldValidation: FieldValidationFunctionSync = jest.fn(
        (fieldValidatorArgs) => ({
          type: 'MY_TYPE',
          succeeded: true,
          message: 'mymessageA',
        })
      );

      const myRecordValidation: RecordValidationFunctionSync = jest.fn(
        ({ message }) => ({
          type: '',
          succeeded: false,
          message: message ? (message as string) : 'mymessageB',
        })
      );

      const validationSchema: ValidationSchema = {
        field: {
          username: [myFieldValidation],
        },
        record: {
          MY_RECORD_VALIDATION: [myRecordValidation],
        },
      };

      const values = {};

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateForm(values);

      // Assert
      result.then((validationResult) => {
        expect(myFieldValidation).toHaveBeenCalled();
        expect(myRecordValidation).toHaveBeenCalled();
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.fieldErrors).toEqual({
          username: {
            type: 'MY_TYPE',
            succeeded: true,
            message: 'mymessageA',
          },
        });
        expect(validationResult.recordErrors).toEqual({
          MY_RECORD_VALIDATION: {
            type: '',
            succeeded: false,
            message: 'mymessageB',
          },
        });
        done();
      });
    });

    it(`#Spec 12: should failed form validation, and return back a field validation result
    and zero form validation result
    when adding one field validation that fails and record validation that succeeds
    `, (done) => {
      // Arrange
      const myFieldValidation: FieldValidationFunctionSync = jest.fn(
        (fieldValidatorArgs) => ({
          type: 'MY_TYPE',
          succeeded: false,
          message: 'mymessageA',
        })
      );

      const myRecordValidation: RecordValidationFunctionSync = jest.fn(
        ({ message }) => ({
          type: '',
          succeeded: true,
          message: message ? (message as string) : 'mymessageB',
        })
      );

      const validationSchema: ValidationSchema = {
        field: {
          username: [myFieldValidation],
        },
        record: {
          MY_RECORD_VALIDATION: [myRecordValidation],
        },
      };

      const values = {};

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateForm(values);

      // Assert
      result.then((validationResult) => {
        expect(myFieldValidation).toHaveBeenCalled();
        expect(myRecordValidation).toHaveBeenCalled();
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.fieldErrors).toEqual({
          username: {
            type: 'MY_TYPE',
            succeeded: false,
            message: 'mymessageA',
          },
        });
        expect(validationResult.recordErrors).toEqual({
          MY_RECORD_VALIDATION: {
            type: '',
            succeeded: true,
            message: 'mymessageB',
          },
        });
        done();
      });
    });

    it(`#Spec 13: should succeed form validation, and return back one field validation result
    and one record validation result
    when adding one field validation that succeeds and record validation that succeeds
    `, (done) => {
      // Arrange
      const myFieldValidation: FieldValidationFunctionSync = jest.fn(
        (fieldValidatorArgs) => ({
          type: 'MY_TYPE',
          succeeded: true,
          message: 'mymessageA',
        })
      );

      const myRecordValidation: RecordValidationFunctionSync = jest.fn(
        ({ message }) => ({
          type: '',
          succeeded: true,
          message: message ? (message as string) : 'mymessageB',
        })
      );

      const validationSchema: ValidationSchema = {
        field: {
          username: [myFieldValidation],
        },
        record: {
          MY_RECORD_VALIDATION: [myRecordValidation],
        },
      };

      const values = { username: 'test-value' };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateForm(values);

      // Assert
      result.then((validationResult) => {
        expect(myFieldValidation).toHaveBeenCalled();
        expect(myRecordValidation).toHaveBeenCalled();
        expect(validationResult.succeeded).toBeTruthy();
        expect(validationResult.fieldErrors).toEqual({
          username: {
            type: 'MY_TYPE',
            succeeded: true,
            message: 'mymessageA',
          },
        });
        expect(validationResult.recordErrors).toEqual({
          MY_RECORD_VALIDATION: {
            type: '',
            succeeded: true,
            message: 'mymessageB',
          },
        });
        done();
      });
    });

    it(`#Spec 14: should fail form validation, and return one field validation result
    and form validation result
    when adding two fields validation that succeed with nested fields
    `, (done) => {
      // Arrange
      const myFieldValidation1: FieldValidationFunctionSync = jest.fn(
        (fieldValidatorArgs) => ({
          type: 'MY_TYPE_A',
          succeeded: true,
          message: 'mymessageA',
        })
      );
      const myFieldValidation2: FieldValidationFunctionSync = jest.fn(
        (fieldValidatorArgs) => ({
          type: 'MY_TYPE_B',
          succeeded: true,
          message: 'mymessageB',
        })
      );

      const validationSchema: ValidationSchema = {
        field: {
          'nested.field1': [myFieldValidation1],
          'nested.field2': [myFieldValidation2],
        },
      };

      const values = {};

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateForm(values);

      // Assert
      result.then((validationResult) => {
        expect(myFieldValidation1).toHaveBeenCalled();
        expect(myFieldValidation2).toHaveBeenCalled();
        expect(validationResult.succeeded).toBeTruthy();
        expect(validationResult.fieldErrors).toEqual({
          'nested.field1': {
            type: 'MY_TYPE_A',
            succeeded: true,
            message: 'mymessageA',
          },
          'nested.field2': {
            type: 'MY_TYPE_B',
            succeeded: true,
            message: 'mymessageB',
          },
        });
        expect(validationResult.recordErrors).toEqual({});
        done();
      });
    });

    it(`spec #15:should execute a validateForm with field (sync and using function in schema) and fail when
    adding a field validation in the schema on a given field
    firing a validation for that given field
    `, (done) => {
      // Arrange
      const mockValidationFn = jest.fn().mockReturnValue({
        type: 'MY_TYPE',
        succeeded: false,
        message: 'mymessage',
      });

      const validationSchema: ValidationSchema = {
        field: {
          username: [mockValidationFn],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const values = {};
      const result = formValidation.validateForm(values);

      // Assert
      result.then((validationResult) => {
        expect(mockValidationFn).toHaveBeenCalled();
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.fieldErrors).toEqual({
          username: {
            type: 'MY_TYPE',
            succeeded: false,
            message: 'mymessage',
          },
        });
        expect(validationResult.recordErrors).toEqual({});
        done();
      });
    });

    it(`spec #16: should execute a validateForm with field (async and using function in schema) and fail when
    adding a field validation in the schema on a given field
    firing a validation for that given field (include as well custom message override)
    `, (done) => {
      // Arrange
      const mockValidationFn = jest.fn().mockResolvedValue({
        type: 'MY_TYPE',
        succeeded: false,
        message: 'mymessage',
      });

      const validationSchema: ValidationSchema = {
        field: {
          username: [mockValidationFn],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const values = {};
      const result = formValidation.validateForm(values);

      // Assert
      result.then((validationResult) => {
        expect(mockValidationFn).toHaveBeenCalled();
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.fieldErrors).toEqual({
          username: {
            type: 'MY_TYPE',
            succeeded: false,
            message: 'mymessage',
          },
        });
        expect(validationResult.recordErrors).toEqual({});
        done();
      });
    });

    it(`spec #17: should execute a validateForm with field (defined as FullValidator, sync function in schema) and fail when
    adding a field validation in the schema on a given field
    firing a validation for that given field
    `, (done) => {
      // Arrange
      const mockValidationFn = jest.fn(
        ({ message }): ValidationResult => ({
          type: 'MY_TYPE',
          succeeded: false,
          message: message ? (message as string) : 'mymessage',
        })
      );

      const validationSchema: ValidationSchema = {
        field: {
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
      const values = {};
      const result = formValidation.validateForm(values);

      // Assert
      result.then((validationResult) => {
        expect(mockValidationFn).toHaveBeenCalled();
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.fieldErrors).toEqual({
          username: {
            type: 'MY_TYPE',
            succeeded: false,
            message: 'myoverriddenmessage',
          },
        });
        expect(validationResult.recordErrors).toEqual({});
        done();
      });
    });

    it(`spec #18: should execute a validateForm with field (defined as FullValidator, async function in schema) and fail when
    adding a field validation in the schema on a given field
    firing a validation for that given field
    `, (done) => {
      // Arrange
      const mockValidationFn = jest.fn(
        ({ message }): Promise<ValidationResult> =>
          Promise.resolve<ValidationResult>({
            type: 'MY_TYPE',
            succeeded: false,
            message: message ? (message as string) : 'mymessage',
          })
      );

      const validationSchema: ValidationSchema = {
        field: {
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
      const values = {};
      const result = formValidation.validateForm(values);

      // Assert
      result.then((validationResult) => {
        expect(mockValidationFn).toHaveBeenCalled();
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.fieldErrors).toEqual({
          username: {
            type: 'MY_TYPE',
            succeeded: false,
            message: 'myoverriddenmessage',
          },
        });
        expect(validationResult.recordErrors).toEqual({});
        done();
      });
    });

    it(`spec #19: should execute a validateForm with field (defined as FullValidator, async function in schema) and fail when
    adding a field validation in the schema, using all possible args
    `, (done) => {
      // Arrange
      const mockValidationFn = jest.fn(
        ({
          value,
          message,
          customArgs,
          values,
        }: FieldValidatorArgs): Promise<ValidationResult> =>
          Promise.resolve<ValidationResult>({
            type: 'MY_TYPE',
            succeeded: false,
            message: `${value} ${message} ${customArgs} ${JSON.stringify(
              values
            )}`,
          })
      );

      const validationSchema: ValidationSchema = {
        field: {
          username: [
            {
              validator: mockValidationFn,
              customArgs: 'custom-arg',
              message: 'myoverriddenmessage',
            },
          ],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const values = { username: 'whatever' };
      const result = formValidation.validateForm(values);

      // Assert
      result.then((validationResult) => {
        expect(mockValidationFn).toHaveBeenCalled();
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.fieldErrors).toEqual({
          username: {
            type: 'MY_TYPE',
            succeeded: false,
            message:
              'whatever myoverriddenmessage custom-arg {"username":"whatever"}',
          },
        });
        expect(validationResult.recordErrors).toEqual({});
        done();
      });
    });

    it(`spec #20:should execute a validateForm with field (sync and using full schema) passing
      custom args and failed when customArgs.fail === true
      `, (done) => {
      // Arrange
      const mockValidationFn: FieldValidationFunctionSync = jest.fn(
        ({ customArgs }): ValidationResult => {
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
        }
      );

      const validationSchema: ValidationSchema = {
        field: {
          username: [
            {
              validator: mockValidationFn,
              customArgs: { fail: true },
            },
          ],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const values = {};
      const result = formValidation.validateForm(values);

      // Assert
      result.then((validationResult) => {
        expect(mockValidationFn).toHaveBeenCalled();
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.fieldErrors).toEqual({
          username: {
            type: 'MY_TYPE',
            succeeded: false,
            message: 'received custom args fail true',
          },
        });
        expect(validationResult.recordErrors).toEqual({});
        done();
      });
    });

    it(`spec #21:should execute a validateForm with field (sync and using full schema) passing
      custom args and succeeded when customArgs.fail === false
      `, (done) => {
      // Arrange
      const mockValidationFn: FieldValidationFunctionSync = jest.fn(
        ({ customArgs }): ValidationResult => {
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
        }
      );

      const validationSchema: ValidationSchema = {
        field: {
          username: [
            {
              validator: mockValidationFn,
              customArgs: { fail: false },
            },
          ],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const values = {};
      const result = formValidation.validateForm(values);

      // Assert
      result.then((validationResult) => {
        expect(mockValidationFn).toHaveBeenCalled();
        expect(validationResult.succeeded).toBeTruthy();
        expect(validationResult.fieldErrors).toEqual({
          username: {
            type: 'MY_TYPE',
            succeeded: true,
            message: 'received custom args fail false',
          },
        });
        expect(validationResult.recordErrors).toEqual({});
        done();
      });
    });

    it(`spec #22:should return succeed validateForm with field
    when adding two validators to a given field and both succeed
`, (done) => {
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
        field: {
          username: [mockValidationFn1, mockValidationFn2],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const values = {};
      const result = formValidation.validateForm(values);

      // Assert
      result.then((validationResult) => {
        expect(mockValidationFn1).toHaveBeenCalled();
        expect(mockValidationFn2).toHaveBeenCalled();
        expect(validationResult.succeeded).toBeTruthy();
        expect(validationResult.fieldErrors).toEqual({
          username: {
            type: 'MY_VALIDATOR_B',
            succeeded: true,
            message: 'mymessage',
          },
        });
        expect(validationResult.recordErrors).toEqual({});
        done();
      });
    });

    it(`spec #23:should execute first validations for a given field and failed validateForm with field
when adding two validators to a given field and first fails
`, (done) => {
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
        field: {
          username: [mockValidationFn1, mockValidationFn2],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const values = {};
      const result = formValidation.validateForm(values);

      // Assert
      result.then((validationResult) => {
        expect(mockValidationFn1).toHaveBeenCalled();
        expect(mockValidationFn2).not.toHaveBeenCalled();
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.fieldErrors).toEqual({
          username: {
            type: 'MY_VALIDATOR_A',
            succeeded: false,
            message: 'mymessageA',
          },
        });
        expect(validationResult.recordErrors).toEqual({});
        done();
      });
    });

    it(`spec #24:should execute two validations for a given field and failed validateForm with field
when adding two validators to a given field and second fails
`, (done) => {
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
        field: {
          username: [mockValidationFn1, mockValidationFn2],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const values = {};
      const result = formValidation.validateForm(values);

      // Assert
      result.then((validationResult) => {
        expect(mockValidationFn1).toHaveBeenCalled();
        expect(mockValidationFn2).toHaveBeenCalled();
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.fieldErrors).toEqual({
          username: {
            type: 'MY_VALIDATOR_B',
            succeeded: false,
            message: 'mymessageB',
          },
        });
        expect(validationResult.recordErrors).toEqual({});
        done();
      });
    });

    it(`spec #25:should execute first validation for a given field and failed validateForm with field
when adding two validators to a given field fails and second fails
`, (done) => {
      // Arrange
      const mockValidationFn1 = jest.fn().mockReturnValue({
        type: 'MY_VALIDATOR_A',
        succeeded: false,
        message: 'mymessageA',
      });

      const mockValidationFn2 = jest.fn().mockReturnValue({
        type: 'MY_VALIDATOR_B',
        succeeded: false,
        message: 'mymessageB',
      });

      const validationSchema: ValidationSchema = {
        field: {
          username: [mockValidationFn1, mockValidationFn2],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const values = {};
      const result = formValidation.validateForm(values);

      // Assert
      result.then((validationResult) => {
        expect(mockValidationFn1).toHaveBeenCalled();
        expect(mockValidationFn2).not.toHaveBeenCalled();
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.fieldErrors).toEqual({
          username: {
            type: 'MY_VALIDATOR_A',
            succeeded: false,
            message: 'mymessageA',
          },
        });
        expect(validationResult.recordErrors).toEqual({});
        done();
      });
    });

    it(`#Spec 26: should fail form validation, and return one field validation result
    and form validation result
    when adding two fields validation that succeed with nested fields with kebap case
    `, (done) => {
      // Arrange
      const myFieldValidation1: FieldValidationFunctionSync = jest.fn(
        ({ value }) => ({
          type: 'MY_TYPE_A',
          succeeded: true,
          message: `mymessageA ${value}`,
        })
      );
      const myFieldValidation2: FieldValidationFunctionSync = jest.fn(
        ({ value }) => ({
          type: 'MY_TYPE_B',
          succeeded: true,
          message: `mymessageB ${value}`,
        })
      );

      const validationSchema: ValidationSchema = {
        field: {
          'this-is-a-nested.field1': [myFieldValidation1],
          'nested.field-2': [myFieldValidation2],
        },
      };

      const values = {
        'this-is-a-nested': {
          field1: 'value1',
        },
        nested: {
          'field-2': 'value2',
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateForm(values);

      // Assert
      result.then((validationResult) => {
        expect(myFieldValidation1).toHaveBeenCalled();
        expect(myFieldValidation2).toHaveBeenCalled();
        expect(validationResult.succeeded).toBeTruthy();
        expect(validationResult.fieldErrors).toEqual({
          'this-is-a-nested.field1': {
            type: 'MY_TYPE_A',
            succeeded: true,
            message: 'mymessageA value1',
          },
          'nested.field-2': {
            type: 'MY_TYPE_B',
            succeeded: true,
            message: 'mymessageB value2',
          },
        });
        expect(validationResult.recordErrors).toEqual({});
        done();
      });
    });

    it(`#Spec 27: should fail form validation, and return one field validation result
    and form validation result
    when adding one field validation with validator as object
    `, (done) => {
      // Arrange
      const myFieldValidation: FieldValidationFunctionSync = jest.fn(
        ({ value }) => ({
          type: 'MY_TYPE_A',
          succeeded: false,
          message: `mymessageA ${value}`,
        })
      );

      const validationSchema: ValidationSchema = {
        field: {
          myField: [
            {
              validator: { validator: myFieldValidation },
            },
          ],
        },
      };

      const values = {
        myField: 'value1',
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = formValidation.validateForm(values);

      // Assert
      result.then((validationResult) => {
        expect(myFieldValidation).toHaveBeenCalled();
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.fieldErrors).toEqual({
          myField: {
            type: 'MY_TYPE_A',
            succeeded: false,
            message: 'mymessageA value1',
          },
        });
        expect(validationResult.recordErrors).toEqual({});
        done();
      });
    });
  });

  describe('updateValidationSchema', () => {
    it(`spec #1: should update validation schema when it feeds new validationSchema with one new field to validate`, async () => {
      // Arrange
      const values = {
        field1: '',
        field2: '',
      };

      const mockValidationFn = () => ({
        type: 'MY_TYPE',
        succeeded: false,
        message: 'mymessage',
      });

      const validationSchema: ValidationSchema = {
        field: {
          field1: [mockValidationFn],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result1 = await formValidation.validateForm(values);

      const newValidationSchema: ValidationSchema = {
        ...validationSchema,
        field: {
          ...validationSchema.field,
          field2: [mockValidationFn],
        },
      };
      formValidation.updateValidationSchema(newValidationSchema);
      const result2 = await formValidation.validateForm(values);

      // Assert
      expect(result1).toEqual({
        succeeded: false,
        fieldErrors: {
          field1: {
            type: 'MY_TYPE',
            succeeded: false,
            message: 'mymessage',
          },
        },
        recordErrors: {},
      } as FormValidationResult);

      expect(result2).toEqual({
        succeeded: false,
        fieldErrors: {
          field1: {
            type: 'MY_TYPE',
            succeeded: false,
            message: 'mymessage',
          },
          field2: {
            type: 'MY_TYPE',
            succeeded: false,
            message: 'mymessage',
          },
        },
        recordErrors: {},
      } as FormValidationResult);
    });

    it(`spec #2: should update validation schema when it feeds new validationSchema removing one field to validate`, async () => {
      // Arrange
      const values = {
        field1: '',
        field2: '',
      };

      const mockValidationFn = () => ({
        type: 'MY_TYPE',
        succeeded: false,
        message: 'mymessage',
      });

      const validationSchema: ValidationSchema = {
        field: {
          field1: [mockValidationFn],
          field2: [mockValidationFn],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result1 = await formValidation.validateForm(values);

      const newValidationSchema: ValidationSchema = {
        ...validationSchema,
        field: {
          field1: [mockValidationFn],
        },
      };
      formValidation.updateValidationSchema(newValidationSchema);
      const result2 = await formValidation.validateForm(values);

      // Assert
      expect(result1).toEqual({
        succeeded: false,
        fieldErrors: {
          field1: {
            type: 'MY_TYPE',
            succeeded: false,
            message: 'mymessage',
          },
          field2: {
            type: 'MY_TYPE',
            succeeded: false,
            message: 'mymessage',
          },
        },
        recordErrors: {},
      } as FormValidationResult);

      expect(result2).toEqual({
        succeeded: false,
        fieldErrors: {
          field1: {
            type: 'MY_TYPE',
            succeeded: false,
            message: 'mymessage',
          },
        },
        recordErrors: {},
      } as FormValidationResult);
    });

    it(`spec #3: should update validation schema when it feeds new validationSchema updating one field, adding new validator`, async () => {
      // Arrange
      const values = {
        field1: '',
        field2: '',
      };

      const mockValidationFn1 = () => ({
        type: 'MY_TYPE_1',
        succeeded: true,
        message: 'mymessage1',
      });

      const mockValidationFn2 = () => ({
        type: 'MY_TYPE_2',
        succeeded: false,
        message: 'mymessage2',
      });

      const validationSchema: ValidationSchema = {
        field: {
          field1: [mockValidationFn1],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result1 = await formValidation.validateForm(values);

      const newValidationSchema: ValidationSchema = {
        ...validationSchema,
        field: {
          field1: [...validationSchema.field.field1, mockValidationFn2],
        },
      };
      formValidation.updateValidationSchema(newValidationSchema);
      const result2 = await formValidation.validateForm(values);

      // Assert
      expect(result1).toEqual({
        succeeded: true,
        fieldErrors: {
          field1: {
            type: 'MY_TYPE_1',
            succeeded: true,
            message: 'mymessage1',
          },
        },
        recordErrors: {},
      } as FormValidationResult);

      expect(result2).toEqual({
        succeeded: false,
        fieldErrors: {
          field1: {
            type: 'MY_TYPE_2',
            succeeded: false,
            message: 'mymessage2',
          },
        },
        recordErrors: {},
      } as FormValidationResult);
    });

    it(`spec #4: should update validation schema when it feeds new validationSchema updating one field, removing validator`, async () => {
      // Arrange
      const values = {
        field1: '',
        field2: '',
      };

      const mockValidationFn1 = () => ({
        type: 'MY_TYPE_1',
        succeeded: true,
        message: 'mymessage1',
      });

      const mockValidationFn2 = () => ({
        type: 'MY_TYPE_2',
        succeeded: false,
        message: 'mymessage2',
      });

      const validationSchema: ValidationSchema = {
        field: {
          field1: [mockValidationFn1, mockValidationFn2],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result1 = await formValidation.validateForm(values);

      const newValidationSchema: ValidationSchema = {
        ...validationSchema,
        field: {
          field1: [mockValidationFn1],
        },
      };
      formValidation.updateValidationSchema(newValidationSchema);
      const result2 = await formValidation.validateForm(values);

      // Assert
      expect(result1).toEqual({
        succeeded: false,
        fieldErrors: {
          field1: {
            type: 'MY_TYPE_2',
            succeeded: false,
            message: 'mymessage2',
          },
        },
        recordErrors: {},
      } as FormValidationResult);

      expect(result2).toEqual({
        succeeded: true,
        fieldErrors: {
          field1: {
            type: 'MY_TYPE_1',
            succeeded: true,
            message: 'mymessage1',
          },
        },
        recordErrors: {},
      } as FormValidationResult);
    });

    it(`spec #5: should update validation schema when it feeds new validationSchema updating one field, updating error message`, async () => {
      // Arrange
      const values = {
        field1: '',
        field2: '',
      };

      const mockValidationFn: FieldValidationFunctionSync = ({ message }) => ({
        type: 'MY_TYPE_1',
        succeeded: true,
        message: message ? (message as string) : 'mymessage1',
      });

      const validationSchema: ValidationSchema = {
        field: {
          field1: [mockValidationFn],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result1 = await formValidation.validateForm(values);

      const newValidationSchema: ValidationSchema = {
        ...validationSchema,
        field: {
          field1: [
            {
              validator: mockValidationFn,
              message: 'updated error message',
            },
          ],
        },
      };
      formValidation.updateValidationSchema(newValidationSchema);
      const result2 = await formValidation.validateForm(values);

      // Assert
      expect(result1).toEqual({
        succeeded: true,
        fieldErrors: {
          field1: {
            type: 'MY_TYPE_1',
            succeeded: true,
            message: 'mymessage1',
          },
        },
        recordErrors: {},
      } as FormValidationResult);

      expect(result2).toEqual({
        succeeded: true,
        fieldErrors: {
          field1: {
            type: 'MY_TYPE_1',
            succeeded: true,
            message: 'updated error message',
          },
        },
        recordErrors: {},
      } as FormValidationResult);
    });

    it(`spec #6: should update validation schema when it feeds new validationSchema with one new record to validate`, async () => {
      // Arrange
      const values = {
        field1: '',
        field2: '',
      };

      const mockValidationFn = () => ({
        type: 'MY_TYPE',
        succeeded: false,
        message: 'mymessage',
      });

      const validationSchema: ValidationSchema = {
        record: {
          record1: [mockValidationFn],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result1 = await formValidation.validateForm(values);

      const newValidationSchema: ValidationSchema = {
        ...validationSchema,
        record: {
          ...validationSchema.record,
          record2: [mockValidationFn],
        },
      };
      formValidation.updateValidationSchema(newValidationSchema);
      const result2 = await formValidation.validateForm(values);

      // Assert
      expect(result1).toEqual({
        succeeded: false,
        recordErrors: {
          record1: {
            type: 'MY_TYPE',
            succeeded: false,
            message: 'mymessage',
          },
        },
        fieldErrors: {},
      } as FormValidationResult);

      expect(result2).toEqual({
        succeeded: false,
        recordErrors: {
          record1: {
            type: 'MY_TYPE',
            succeeded: false,
            message: 'mymessage',
          },
          record2: {
            type: 'MY_TYPE',
            succeeded: false,
            message: 'mymessage',
          },
        },
        fieldErrors: {},
      } as FormValidationResult);
    });

    it(`spec #7: should update validation schema when it feeds new validationSchema removing one record to validate`, async () => {
      // Arrange
      const values = {
        record1: '',
        record2: '',
      };

      const mockValidationFn = () => ({
        type: 'MY_TYPE',
        succeeded: false,
        message: 'mymessage',
      });

      const validationSchema: ValidationSchema = {
        record: {
          record1: [mockValidationFn],
          record2: [mockValidationFn],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result1 = await formValidation.validateForm(values);

      const newValidationSchema: ValidationSchema = {
        ...validationSchema,
        record: {
          record1: [mockValidationFn],
        },
      };
      formValidation.updateValidationSchema(newValidationSchema);
      const result2 = await formValidation.validateForm(values);

      // Assert
      expect(result1).toEqual({
        succeeded: false,
        recordErrors: {
          record1: {
            type: 'MY_TYPE',
            succeeded: false,
            message: 'mymessage',
          },
          record2: {
            type: 'MY_TYPE',
            succeeded: false,
            message: 'mymessage',
          },
        },
        fieldErrors: {},
      } as FormValidationResult);

      expect(result2).toEqual({
        succeeded: false,
        recordErrors: {
          record1: {
            type: 'MY_TYPE',
            succeeded: false,
            message: 'mymessage',
          },
        },
        fieldErrors: {},
      } as FormValidationResult);
    });

    it(`spec #8: should update validation schema when it feeds new validationSchema updating one record, adding new validator`, async () => {
      // Arrange
      const values = {
        record1: '',
        record2: '',
      };

      const mockValidationFn1 = () => ({
        type: 'MY_TYPE_1',
        succeeded: true,
        message: 'mymessage1',
      });

      const mockValidationFn2 = () => ({
        type: 'MY_TYPE_2',
        succeeded: false,
        message: 'mymessage2',
      });

      const validationSchema: ValidationSchema = {
        record: {
          record1: [mockValidationFn1],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result1 = await formValidation.validateForm(values);

      const newValidationSchema: ValidationSchema = {
        ...validationSchema,
        record: {
          record1: [...validationSchema.record.record1, mockValidationFn2],
        },
      };
      formValidation.updateValidationSchema(newValidationSchema);
      const result2 = await formValidation.validateForm(values);

      // Assert
      expect(result1).toEqual({
        succeeded: true,
        recordErrors: {
          record1: {
            type: 'MY_TYPE_1',
            succeeded: true,
            message: 'mymessage1',
          },
        },
        fieldErrors: {},
      } as FormValidationResult);

      expect(result2).toEqual({
        succeeded: false,
        recordErrors: {
          record1: {
            type: 'MY_TYPE_2',
            succeeded: false,
            message: 'mymessage2',
          },
        },
        fieldErrors: {},
      } as FormValidationResult);
    });

    it(`spec #9: should update validation schema when it feeds new validationSchema updating one record, removing validator`, async () => {
      // Arrange
      const values = {
        record1: '',
        record2: '',
      };

      const mockValidationFn1 = () => ({
        type: 'MY_TYPE_1',
        succeeded: true,
        message: 'mymessage1',
      });

      const mockValidationFn2 = () => ({
        type: 'MY_TYPE_2',
        succeeded: false,
        message: 'mymessage2',
      });

      const validationSchema: ValidationSchema = {
        record: {
          record1: [mockValidationFn1, mockValidationFn2],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result1 = await formValidation.validateForm(values);

      const newValidationSchema: ValidationSchema = {
        ...validationSchema,
        record: {
          record1: [mockValidationFn1],
        },
      };
      formValidation.updateValidationSchema(newValidationSchema);
      const result2 = await formValidation.validateForm(values);

      // Assert
      expect(result1).toEqual({
        succeeded: false,
        recordErrors: {
          record1: {
            type: 'MY_TYPE_2',
            succeeded: false,
            message: 'mymessage2',
          },
        },
        fieldErrors: {},
      } as FormValidationResult);

      expect(result2).toEqual({
        succeeded: true,
        recordErrors: {
          record1: {
            type: 'MY_TYPE_1',
            succeeded: true,
            message: 'mymessage1',
          },
        },
        fieldErrors: {},
      } as FormValidationResult);
    });

    it(`spec #10: should update validation schema when it feeds new validationSchema updating one record, updating error message`, async () => {
      // Arrange
      const values = {
        record1: '',
        record2: '',
      };

      const mockValidationFn: RecordValidationFunctionSync = ({ message }) => ({
        type: 'MY_TYPE_1',
        succeeded: true,
        message: message ? (message as string) : 'mymessage1',
      });

      const validationSchema: ValidationSchema = {
        record: {
          record1: [mockValidationFn],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result1 = await formValidation.validateForm(values);

      const newValidationSchema: ValidationSchema = {
        ...validationSchema,
        record: {
          record1: [
            {
              validator: mockValidationFn,
              message: 'updated error message',
            },
          ],
        },
      };
      formValidation.updateValidationSchema(newValidationSchema);
      const result2 = await formValidation.validateForm(values);

      // Assert
      expect(result1).toEqual({
        succeeded: true,
        recordErrors: {
          record1: {
            type: 'MY_TYPE_1',
            succeeded: true,
            message: 'mymessage1',
          },
        },
        fieldErrors: {},
      } as FormValidationResult);

      expect(result2).toEqual({
        succeeded: true,
        recordErrors: {
          record1: {
            type: 'MY_TYPE_1',
            succeeded: true,
            message: 'updated error message',
          },
        },
        fieldErrors: {},
      } as FormValidationResult);
    });
  });
});
