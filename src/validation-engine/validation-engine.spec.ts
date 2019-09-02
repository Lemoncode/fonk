import {
  InternalFieldValidationSchema,
  createDefaultInternalValidationResult,
  FieldValidationFunctionAsync,
  InternalValidationResult,
  RecordValidationResult,
  createDefaultRecordValidationResult,
  InternalRecordValidationSchema,
  RecordValidationFunctionAsync,
} from '../model';
import {
  validateField,
  validateRecord,
  validateForm,
} from './validation-engine';

describe('validation-engine specs', () => {
  describe('validateField', () => {
    it('spec #1: should return promise default InternalValidationResult when it feeds fieldId and schema equals undefined', done => {
      // Arrange
      const fieldId: string = void 0;
      const value: string = void 0;
      const values: string = void 0;
      const schema: InternalFieldValidationSchema = void 0;

      // Act
      const promise = validateField(fieldId, value, values, schema);

      // Assert
      promise.then(result => {
        expect(result).toEqual(createDefaultInternalValidationResult());
        done();
      });
    });

    it('spec #2: should return promise default InternalValidationResult when it feeds fieldId and schema equals null', done => {
      // Arrange
      const fieldId: string = null;
      const value: string = null;
      const values: string = null;
      const schema: InternalFieldValidationSchema = null;

      // Act
      const promise = validateField(fieldId, value, values, schema);

      // Assert
      promise.then(result => {
        expect(result).toEqual(createDefaultInternalValidationResult());
        done();
      });
    });

    it('spec #3: should return promise default InternalValidationResult when it feeds fieldId equals undefined and schema equals defined', done => {
      // Arrange
      const fieldId: string = void 0;
      const value: string = null;
      const values: string = null;
      const validator: FieldValidationFunctionAsync = jest
        .fn()
        .mockImplementation(
          (): Promise<InternalValidationResult> =>
            Promise.resolve({
              key: '',
              type: '',
              succeeded: true,
              message: '',
            })
        );
      const schema: InternalFieldValidationSchema = {
        myField: [
          {
            validator,
            message: void 0,
            customArgs: void 0,
          },
        ],
      };

      // Act
      const promise = validateField(fieldId, value, values, schema);

      // Assert
      promise.then(result => {
        expect(result).toEqual(createDefaultInternalValidationResult());
        done();
      });
    });

    it('spec #4: should return promise default InternalValidationResult when it feeds fieldId equals null and schema equals defined', done => {
      // Arrange
      const fieldId: string = null;
      const value: string = null;
      const values: string = null;
      const validator: FieldValidationFunctionAsync = jest
        .fn()
        .mockImplementation(
          (): Promise<InternalValidationResult> =>
            Promise.resolve({
              key: '',
              type: '',
              succeeded: true,
              message: '',
            })
        );
      const schema: InternalFieldValidationSchema = {
        myField: [
          {
            validator,
            message: void 0,
            customArgs: void 0,
          },
        ],
      };

      // Act
      const promise = validateField(fieldId, value, values, schema);

      // Assert
      promise.then(result => {
        expect(result).toEqual(createDefaultInternalValidationResult());
        done();
      });
    });

    it('spec #5: should return promise default InternalValidationResult when it feeds fieldId equals otherField and schema equals defined', done => {
      // Arrange
      const fieldId: string = 'otherField';
      const value: string = null;
      const values: string = null;
      const validator: FieldValidationFunctionAsync = jest
        .fn()
        .mockImplementation(
          (): Promise<InternalValidationResult> =>
            Promise.resolve({
              key: '',
              type: '',
              succeeded: true,
              message: '',
            })
        );
      const schema: InternalFieldValidationSchema = {
        myField: [
          {
            validator,
            message: void 0,
            customArgs: void 0,
          },
        ],
      };

      // Act
      const promise = validateField(fieldId, value, values, schema);

      // Assert
      promise.then(result => {
        expect(result).toEqual(createDefaultInternalValidationResult());
        done();
      });
    });

    it('spec #6: should return promise with InternalValidationResult when it feeds fieldId equals myField and schema equals defined with one validator and message and customArgs equals undefined', done => {
      // Arrange
      const fieldId: string = 'myField';
      const value: string = void 0;
      const values: string = void 0;
      const validator: FieldValidationFunctionAsync = jest
        .fn()
        .mockImplementation(
          ({
            value,
            values,
            message,
            customArgs,
          }): Promise<InternalValidationResult> =>
            Promise.resolve({
              key: '',
              type: 'test type',
              succeeded: true,
              message: `test message, ${value}, ${values}, ${message}, ${customArgs}`,
            })
        );
      const schema: InternalFieldValidationSchema = {
        myField: [
          {
            validator,
            message: void 0,
            customArgs: void 0,
          },
        ],
      };

      // Act
      const promise = validateField(fieldId, value, values, schema);

      // Assert
      promise.then(result => {
        expect(result).toEqual({
          key: 'myField',
          type: 'test type',
          succeeded: true,
          message: 'test message, undefined, undefined, undefined, undefined',
        });
        done();
      });
    });

    it('spec #7: should return promise with InternalValidationResult when it feeds fieldId equals myField and schema equals defined with one validator and value, values, message and customArgs equals null', done => {
      // Arrange
      const fieldId: string = 'myField';
      const value: string = null;
      const values: string = null;
      const validator: FieldValidationFunctionAsync = jest
        .fn()
        .mockImplementation(
          ({
            value,
            values,
            message,
            customArgs,
          }): Promise<InternalValidationResult> =>
            Promise.resolve({
              key: '',
              type: 'test type',
              succeeded: true,
              message: `test message, ${value}, ${values}, ${message}, ${customArgs}`,
            })
        );
      const schema: InternalFieldValidationSchema = {
        myField: [
          {
            validator,
            message: null,
            customArgs: null,
          },
        ],
      };

      // Act
      const promise = validateField(fieldId, value, values, schema);

      // Assert
      promise.then(result => {
        expect(result).toEqual({
          key: 'myField',
          type: 'test type',
          succeeded: true,
          message: 'test message, null, null, null, null',
        });
        done();
      });
    });

    it('spec #8: should return promise with InternalValidationResult when it feeds fieldId equals myField and schema equals defined with one validator and value, values, message and customArgs defined', done => {
      // Arrange
      const fieldId: string = 'myField';
      const value: string = 'test value';
      const values: string = 'test values';
      const validator: FieldValidationFunctionAsync = jest
        .fn()
        .mockImplementation(
          ({
            value,
            values,
            message,
            customArgs,
          }): Promise<InternalValidationResult> =>
            Promise.resolve({
              key: '',
              type: 'test type',
              succeeded: true,
              message: `test message, ${value}, ${values}, ${message}, ${customArgs}`,
            })
        );
      const schema: InternalFieldValidationSchema = {
        myField: [
          {
            validator,
            message: 'custom message',
            customArgs: 'test customArgs',
          },
        ],
      };

      // Act
      const promise = validateField(fieldId, value, values, schema);

      // Assert
      promise.then(result => {
        expect(result).toEqual({
          key: 'myField',
          type: 'test type',
          succeeded: true,
          message:
            'test message, test value, test values, custom message, test customArgs',
        });
        done();
      });
    });

    it('spec #9: should return promise with InternalValidationResult when it feeds fieldId equals myField and schema equals defined with two validators with succeded equals true', done => {
      // Arrange
      const fieldId: string = 'myField';
      const value: string = null;
      const values: string = null;
      const validator1: FieldValidationFunctionAsync = jest
        .fn()
        .mockImplementation(
          (): Promise<InternalValidationResult> =>
            Promise.resolve({
              key: '',
              type: 'test type 1',
              succeeded: true,
              message: 'test message 1',
            })
        );
      const validator2: FieldValidationFunctionAsync = jest
        .fn()
        .mockImplementation(
          (): Promise<InternalValidationResult> =>
            Promise.resolve({
              key: '',
              type: 'test type 2',
              succeeded: true,
              message: 'test message 2',
            })
        );
      const schema: InternalFieldValidationSchema = {
        myField: [
          {
            validator: validator1,
          },
          {
            validator: validator2,
          },
        ],
      };

      // Act
      const promise = validateField(fieldId, value, values, schema);

      // Assert
      promise.then(result => {
        expect(result).toEqual({
          key: 'myField',
          type: 'test type 2',
          succeeded: true,
          message: 'test message 2',
        });
        expect(validator1).toHaveBeenCalled();
        expect(validator2).toHaveBeenCalled();
        done();
      });
    });

    it('spec #10: should return promise with InternalValidationResult when it feeds fieldId equals myField and schema equals defined with two validators with first succeded equals true and second succeede equals false', done => {
      // Arrange
      const fieldId: string = 'myField';
      const value: string = null;
      const values: string = null;
      const validator1: FieldValidationFunctionAsync = jest
        .fn()
        .mockImplementation(
          (): Promise<InternalValidationResult> =>
            Promise.resolve({
              key: '',
              type: 'test type 1',
              succeeded: true,
              message: 'test message 1',
            })
        );
      const validator2: FieldValidationFunctionAsync = jest
        .fn()
        .mockImplementation(
          (): Promise<InternalValidationResult> =>
            Promise.resolve({
              key: '',
              type: 'test type 2',
              succeeded: false,
              message: 'test message 2',
            })
        );
      const schema: InternalFieldValidationSchema = {
        myField: [
          {
            validator: validator1,
          },
          {
            validator: validator2,
          },
        ],
      };

      // Act
      const promise = validateField(fieldId, value, values, schema);

      // Assert
      promise.then(result => {
        expect(result).toEqual({
          key: 'myField',
          type: 'test type 2',
          succeeded: false,
          message: 'test message 2',
        });
        expect(validator1).toHaveBeenCalled();
        expect(validator2).toHaveBeenCalled();
        done();
      });
    });

    it('spec #11: should return promise with InternalValidationResult when it feeds fieldId equals myField and schema equals defined with two validators with first succeded equals false and second succeede equals true', done => {
      // Arrange
      const fieldId: string = 'myField';
      const value: string = null;
      const values: string = null;
      const validator1: FieldValidationFunctionAsync = jest
        .fn()
        .mockImplementation(
          (): Promise<InternalValidationResult> =>
            Promise.resolve({
              key: '',
              type: 'test type 1',
              succeeded: false,
              message: 'test message 1',
            })
        );
      const validator2: FieldValidationFunctionAsync = jest
        .fn()
        .mockImplementation(
          (): Promise<InternalValidationResult> =>
            Promise.resolve({
              key: '',
              type: 'test type 2',
              succeeded: true,
              message: 'test message 2',
            })
        );
      const schema: InternalFieldValidationSchema = {
        myField: [
          {
            validator: validator1,
          },
          {
            validator: validator2,
          },
        ],
      };

      // Act
      const promise = validateField(fieldId, value, values, schema);

      // Assert
      promise.then(result => {
        expect(result).toEqual({
          key: 'myField',
          type: 'test type 1',
          succeeded: false,
          message: 'test message 1',
        });
        expect(validator1).toHaveBeenCalled();
        expect(validator2).not.toHaveBeenCalled();
        done();
      });
    });

    it('spec #12: should return promise with InternalValidationResult when it feeds fieldId equals myField and schema equals defined with two validators with first succeded equals false and second succeede equals false', done => {
      // Arrange
      const fieldId: string = 'myField';
      const value: string = null;
      const values: string = null;
      const validator1: FieldValidationFunctionAsync = jest
        .fn()
        .mockImplementation(
          (): Promise<InternalValidationResult> =>
            Promise.resolve({
              key: '',
              type: 'test type 1',
              succeeded: false,
              message: 'test message 1',
            })
        );
      const validator2: FieldValidationFunctionAsync = jest
        .fn()
        .mockImplementation(
          (): Promise<InternalValidationResult> =>
            Promise.resolve({
              key: '',
              type: 'test type 2',
              succeeded: false,
              message: 'test message 2',
            })
        );
      const schema: InternalFieldValidationSchema = {
        myField: [
          {
            validator: validator1,
          },
          {
            validator: validator2,
          },
        ],
      };

      // Act
      const promise = validateField(fieldId, value, values, schema);

      // Assert
      promise.then(result => {
        expect(result).toEqual({
          key: 'myField',
          type: 'test type 1',
          succeeded: false,
          message: 'test message 1',
        });
        expect(validator1).toHaveBeenCalled();
        expect(validator2).not.toHaveBeenCalled();
        done();
      });
    });

    it('spec #13: should return promise with InternalValidationResult when it feeds fieldId equals nested.field and schema equals defined with two validators with first succeded equals false and second succeede equals false', done => {
      // Arrange
      const fieldId: string = 'nested.field';
      const value: string = null;
      const values: string = null;
      const validator1: FieldValidationFunctionAsync = jest
        .fn()
        .mockImplementation(
          (): Promise<InternalValidationResult> =>
            Promise.resolve({
              key: '',
              type: 'test type 1',
              succeeded: false,
              message: 'test message 1',
            })
        );
      const validator2: FieldValidationFunctionAsync = jest
        .fn()
        .mockImplementation(
          (): Promise<InternalValidationResult> =>
            Promise.resolve({
              key: '',
              type: 'test type 2',
              succeeded: false,
              message: 'test message 2',
            })
        );
      const schema: InternalFieldValidationSchema = {
        'nested.field': [
          {
            validator: validator1,
          },
          {
            validator: validator2,
          },
        ],
      };

      // Act
      const promise = validateField(fieldId, value, values, schema);

      // Assert
      promise.then(result => {
        expect(result).toEqual({
          key: 'nested.field',
          type: 'test type 1',
          succeeded: false,
          message: 'test message 1',
        });
        expect(validator1).toHaveBeenCalled();
        expect(validator2).not.toHaveBeenCalled();
        done();
      });
    });

    it('spec #14: should call console.error when it feeds fieldId equals myField and schema equals defined with one validator that throw an error', done => {
      // Arrange
      const fieldId: string = 'myField';
      const value: string = null;
      const values: string = null;
      const validator: FieldValidationFunctionAsync = jest
        .fn()
        .mockImplementation(
          (): Promise<InternalValidationResult> =>
            Promise.reject('Test validator error')
        );
      const schema: InternalFieldValidationSchema = {
        myField: [
          {
            validator,
          },
        ],
      };

      const consoleErrorStub = jest
        .spyOn(global.console, 'error')
        .mockImplementation(() => {});

      // Act
      const promise = validateField(fieldId, value, values, schema);

      // Assert
      promise.catch(result => {
        expect(result).toEqual('Test validator error');
        expect(validator).toHaveBeenCalled();
        expect(consoleErrorStub).toHaveBeenCalledWith(
          'Validation Exception, field: myField'
        );
        done();
      });
    });
  });

  describe('validateRecord', () => {
    it('spec #1: should return promise default RecordValidationResult when it feeds values equals undefined and schema equals defined', done => {
      // Arrange
      const values: string = void 0;
      const validator: RecordValidationFunctionAsync = jest
        .fn()
        .mockImplementation(
          (): Promise<InternalValidationResult> =>
            Promise.resolve({
              key: '',
              type: '',
              succeeded: true,
              message: '',
            })
        );
      const schema: InternalRecordValidationSchema = {
        myRecord: [
          {
            validator,
            message: void 0,
          },
        ],
      };

      // Act
      const promise = validateRecord(values, schema);

      // Assert
      promise.then(result => {
        expect(result).toEqual({
          succeeded: true,
          recordErrors: {
            myRecord: {
              type: '',
              succeeded: true,
              message: '',
            },
          },
        });
        done();
      });
    });

    it('spec #2: should return promise default RecordValidationResult when it feeds values equals null and schema equals defined', done => {
      // Arrange
      const values: string = null;
      const validator: RecordValidationFunctionAsync = jest
        .fn()
        .mockImplementation(
          (): Promise<InternalValidationResult> =>
            Promise.resolve({
              key: '',
              type: '',
              succeeded: true,
              message: '',
            })
        );
      const schema: InternalRecordValidationSchema = {
        myRecord: [
          {
            validator,
            message: void 0,
          },
        ],
      };

      // Act
      const promise = validateRecord(values, schema);

      // Assert
      promise.then(result => {
        expect(result).toEqual({
          succeeded: true,
          recordErrors: {
            myRecord: {
              type: '',
              succeeded: true,
              message: '',
            },
          },
        });
        done();
      });
    });

    it('spec #3: should return promise default RecordValidationResult when it feeds values equals null and schema equals defined', done => {
      // Arrange
      const values: string = null;
      const validator: RecordValidationFunctionAsync = jest
        .fn()
        .mockImplementation(
          (): Promise<InternalValidationResult> =>
            Promise.resolve({
              key: '',
              type: '',
              succeeded: true,
              message: '',
            })
        );
      const schema: InternalRecordValidationSchema = {
        myRecord: [
          {
            validator,
            message: void 0,
          },
        ],
      };

      // Act
      const promise = validateRecord(values, schema);

      // Assert
      promise.then(result => {
        expect(result).toEqual({
          succeeded: true,
          recordErrors: {
            myRecord: {
              type: '',
              succeeded: true,
              message: '',
            },
          },
        });
        done();
      });
    });

    it('spec #4: should return promise with RecordValidationResult when it feeds schema equals defined with one validator, values and message equals undefined', done => {
      // Arrange
      const values: string = void 0;
      const validator: RecordValidationFunctionAsync = jest
        .fn()
        .mockImplementation(
          ({ values, message }): Promise<InternalValidationResult> =>
            Promise.resolve({
              key: '',
              type: 'test type',
              succeeded: true,
              message: `test message, ${values}, ${message}`,
            })
        );
      const schema: InternalRecordValidationSchema = {
        myRecord: [
          {
            validator,
            message: void 0,
          },
        ],
      };

      // Act
      const promise = validateRecord(values, schema);

      // Assert
      promise.then(result => {
        expect(result).toEqual({
          succeeded: true,
          recordErrors: {
            myRecord: {
              type: 'test type',
              succeeded: true,
              message: 'test message, undefined, undefined',
            },
          },
        });
        expect(validator).toHaveBeenCalled();
        done();
      });
    });

    it('spec #5: should return promise with RecordValidationResult when it feeds schema equals defined with one validator, values and message equals null', done => {
      // Arrange
      const values: string = null;
      const validator: RecordValidationFunctionAsync = jest
        .fn()
        .mockImplementation(
          ({ values, message }): Promise<InternalValidationResult> =>
            Promise.resolve({
              key: '',
              type: 'test type',
              succeeded: true,
              message: `test message, ${values}, ${message}`,
            })
        );
      const schema: InternalRecordValidationSchema = {
        myRecord: [
          {
            validator,
            message: null,
          },
        ],
      };

      // Act
      const promise = validateRecord(values, schema);

      // Assert
      promise.then(result => {
        expect(result).toEqual({
          succeeded: true,
          recordErrors: {
            myRecord: {
              type: 'test type',
              succeeded: true,
              message: 'test message, null, null',
            },
          },
        });
        expect(validator).toHaveBeenCalled();
        done();
      });
    });

    it('spec #6: should return promise with RecordValidationResult when it feeds schema equals defined with one validator and values, message defined', done => {
      // Arrange
      const values: string = 'test values';
      const validator: RecordValidationFunctionAsync = jest
        .fn()
        .mockImplementation(
          ({ values, message }): Promise<InternalValidationResult> =>
            Promise.resolve({
              key: '',
              type: 'test type',
              succeeded: true,
              message: `test message, ${values}, ${message}`,
            })
        );
      const schema: InternalRecordValidationSchema = {
        myRecord: [
          {
            validator,
            message: 'custom message',
          },
        ],
      };

      // Act
      const promise = validateRecord(values, schema);

      // Assert
      promise.then(result => {
        expect(result).toEqual({
          succeeded: true,
          recordErrors: {
            myRecord: {
              type: 'test type',
              succeeded: true,
              message: 'test message, test values, custom message',
            },
          },
        });
        expect(validator).toHaveBeenCalled();
        done();
      });
    });

    it('spec #7: should return promise with RecordValidationResult when it feeds schema equals defined with two validators with succeded equals true', done => {
      // Arrange
      const values: string = null;
      const validator1: RecordValidationFunctionAsync = jest
        .fn()
        .mockImplementation(
          (): Promise<InternalValidationResult> =>
            Promise.resolve({
              key: '',
              type: 'test type 1',
              succeeded: true,
              message: 'test message 1',
            })
        );
      const validator2: RecordValidationFunctionAsync = jest
        .fn()
        .mockImplementation(
          (): Promise<InternalValidationResult> =>
            Promise.resolve({
              key: '',
              type: 'test type 2',
              succeeded: true,
              message: 'test message 2',
            })
        );
      const schema: InternalRecordValidationSchema = {
        myRecord: [
          {
            validator: validator1,
          },
          {
            validator: validator2,
          },
        ],
      };

      // Act
      const promise = validateRecord(values, schema);

      // Assert
      promise.then(result => {
        expect(result).toEqual({
          succeeded: true,
          recordErrors: {
            myRecord: {
              type: 'test type 2',
              succeeded: true,
              message: 'test message 2',
            },
          },
        });
        expect(validator1).toHaveBeenCalled();
        expect(validator2).toHaveBeenCalled();
        done();
      });
    });

    it('spec #8: should return promise with RecordValidationResult when it feeds schema equals defined with two validators with first succeded equals true and second succeede equals false', done => {
      // Arrange
      const values: string = null;
      const validator1: RecordValidationFunctionAsync = jest
        .fn()
        .mockImplementation(
          (): Promise<InternalValidationResult> =>
            Promise.resolve({
              key: '',
              type: 'test type 1',
              succeeded: true,
              message: 'test message 1',
            })
        );
      const validator2: RecordValidationFunctionAsync = jest
        .fn()
        .mockImplementation(
          (): Promise<InternalValidationResult> =>
            Promise.resolve({
              key: '',
              type: 'test type 2',
              succeeded: false,
              message: 'test message 2',
            })
        );
      const schema: InternalRecordValidationSchema = {
        myRecord: [
          {
            validator: validator1,
          },
          {
            validator: validator2,
          },
        ],
      };

      // Act
      const promise = validateRecord(values, schema);

      // Assert
      promise.then(result => {
        expect(result).toEqual({
          succeeded: false,
          recordErrors: {
            myRecord: {
              type: 'test type 2',
              succeeded: false,
              message: 'test message 2',
            },
          },
        });
        expect(validator1).toHaveBeenCalled();
        expect(validator2).toHaveBeenCalled();
        done();
      });
    });

    it('spec #9: should return promise with RecordValidationResult when it feeds schema equals defined with two validators with first succeded equals false and second succeede equals true', done => {
      // Arrange
      const values: string = null;
      const validator1: RecordValidationFunctionAsync = jest
        .fn()
        .mockImplementation(
          (): Promise<InternalValidationResult> =>
            Promise.resolve({
              key: '',
              type: 'test type 1',
              succeeded: false,
              message: 'test message 1',
            })
        );
      const validator2: RecordValidationFunctionAsync = jest
        .fn()
        .mockImplementation(
          (): Promise<InternalValidationResult> =>
            Promise.resolve({
              key: '',
              type: 'test type 2',
              succeeded: true,
              message: 'test message 2',
            })
        );
      const schema: InternalRecordValidationSchema = {
        myRecord: [
          {
            validator: validator1,
          },
          {
            validator: validator2,
          },
        ],
      };

      // Act
      const promise = validateRecord(values, schema);

      // Assert
      promise.then(result => {
        expect(result).toEqual({
          succeeded: false,
          recordErrors: {
            myRecord: {
              type: 'test type 1',
              succeeded: false,
              message: 'test message 1',
            },
          },
        });
        expect(validator1).toHaveBeenCalled();
        expect(validator2).not.toHaveBeenCalled();
        done();
      });
    });

    it('spec #10: should return promise with RecordValidationResult when it feeds schema equals defined with two validators with first succeded equals false and second succeede equals false', done => {
      // Arrange
      const values: string = null;
      const validator1: RecordValidationFunctionAsync = jest
        .fn()
        .mockImplementation(
          (): Promise<InternalValidationResult> =>
            Promise.resolve({
              key: '',
              type: 'test type 1',
              succeeded: false,
              message: 'test message 1',
            })
        );
      const validator2: RecordValidationFunctionAsync = jest
        .fn()
        .mockImplementation(
          (): Promise<InternalValidationResult> =>
            Promise.resolve({
              key: '',
              type: 'test type 2',
              succeeded: false,
              message: 'test message 2',
            })
        );
      const schema: InternalRecordValidationSchema = {
        myRecord: [
          {
            validator: validator1,
          },
          {
            validator: validator2,
          },
        ],
      };

      // Act
      const promise = validateRecord(values, schema);

      // Assert
      promise.then(result => {
        expect(result).toEqual({
          succeeded: false,
          recordErrors: {
            myRecord: {
              type: 'test type 1',
              succeeded: false,
              message: 'test message 1',
            },
          },
        });
        expect(validator1).toHaveBeenCalled();
        expect(validator2).not.toHaveBeenCalled();
        done();
      });
    });

    it('spec #11: should call console.error when it feeds schema equals defined with one validator that throw an error', done => {
      // Arrange
      const values: string = null;
      const validator: RecordValidationFunctionAsync = jest
        .fn()
        .mockImplementation(
          (): Promise<RecordValidationResult> =>
            Promise.reject('Test validator error')
        );
      const schema: InternalRecordValidationSchema = {
        myRecord: [
          {
            validator,
          },
        ],
      };

      const consoleErrorStub = jest
        .spyOn(global.console, 'error')
        .mockImplementation(() => {});

      // Act
      const promise = validateRecord(values, schema);

      // Assert
      promise.catch(result => {
        expect(result).toEqual('Test validator error');
        expect(validator).toHaveBeenCalled();
        expect(consoleErrorStub.mock.calls).toEqual([
          ['Validation Exception, record: myRecord'],
          ['Uncontrolled error validating records'],
        ]);
        done();
      });
    });
  });
});
