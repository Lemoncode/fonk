import {
  FieldValidationFunctionSync,
  createDefaultValidationResult,
  FieldValidationFunctionAsync,
  FieldValidatorArgs,
  RecordValidatorArgs,
  RecordValidationFunctionSync,
  RecordValidationFunctionAsync,
} from '../model';
import {
  convertFieldValidationToAsyncIfNeeded,
  convertRecordValidationToAsyncIfNeeded,
} from './mapper-helpers';

describe('mapper-helpers', () => {
  describe('convertFieldValidationToAsyncIfNeeded', () => {
    it('should return a function that returns a promise with default validation result when it feeds validation equals undefined', done => {
      // Arrange
      const validation: FieldValidationFunctionSync = void 0;

      // Act
      const result = convertFieldValidationToAsyncIfNeeded(validation);

      // Assert
      expect(result).toBeInstanceOf(Function);
      const fieldValidatorArgs: FieldValidatorArgs = {
        value: 'value',
      };
      const promise = result(fieldValidatorArgs);
      expect(promise).toBeInstanceOf(Promise);
      promise.then(validationResult => {
        expect(validationResult).toEqual(createDefaultValidationResult());
        done();
      });
    });

    it('should return a function that returns a promise with default validation result when it feeds validation equals null', done => {
      // Arrange
      const validation: FieldValidationFunctionSync = null;

      // Act
      const result = convertFieldValidationToAsyncIfNeeded(validation);

      // Assert
      expect(result).toBeInstanceOf(Function);
      const fieldValidatorArgs: FieldValidatorArgs = {
        value: 'value',
      };
      const promise = result(fieldValidatorArgs);
      expect(promise).toBeInstanceOf(Promise);
      promise.then(validationResult => {
        expect(validationResult).toEqual(createDefaultValidationResult());
        done();
      });
    });

    it('should return a function that returns a promise with provided validation result when it feeds validation equals sync function', done => {
      // Arrange
      const validation: FieldValidationFunctionSync = () => ({
        key: 'test key',
        message: 'test message',
        type: 'test type',
        succeeded: true,
      });

      // Act
      const result = convertFieldValidationToAsyncIfNeeded(validation);

      // Assert
      expect(result).toBeInstanceOf(Function);
      const fieldValidatorArgs: FieldValidatorArgs = {
        value: 'value',
      };
      const promise = result(fieldValidatorArgs);
      expect(promise).toBeInstanceOf(Promise);
      promise.then(validationResult => {
        expect(validationResult).toEqual({
          key: 'test key',
          message: 'test message',
          type: 'test type',
          succeeded: true,
        });
        done();
      });
    });

    it('should return a function that returns a promise with provided validation result when it feeds validation equals async function', done => {
      // Arrange
      const validation: FieldValidationFunctionAsync = () =>
        Promise.resolve({
          key: 'test key',
          message: 'test message',
          type: 'test type',
          succeeded: true,
        });

      // Act
      const result = convertFieldValidationToAsyncIfNeeded(validation);

      // Assert
      expect(result).toBeInstanceOf(Function);
      const fieldValidatorArgs: FieldValidatorArgs = {
        value: 'value',
      };
      const promise = result(fieldValidatorArgs);
      expect(promise).toBeInstanceOf(Promise);
      promise.then(validationResult => {
        expect(validationResult).toEqual({
          key: 'test key',
          message: 'test message',
          type: 'test type',
          succeeded: true,
        });
        done();
      });
    });
  });

  describe('convertRecordValidationToAsyncIfNeeded', () => {
    it('should return a function that returns a promise with default validation result when it feeds validation equals undefined', done => {
      // Arrange
      const validation: RecordValidationFunctionSync = void 0;

      // Act
      const result = convertRecordValidationToAsyncIfNeeded(validation);

      // Assert
      expect(result).toBeInstanceOf(Function);
      const recordValidatorArgs: RecordValidatorArgs = {
        values: 'test value',
      };
      const promise = result(recordValidatorArgs);
      expect(promise).toBeInstanceOf(Promise);
      promise.then(validationResult => {
        expect(validationResult).toEqual(createDefaultValidationResult());
        done();
      });
    });

    it('should return a function that returns a promise with default validation result when it feeds validation equals null', done => {
      // Arrange
      const validation: RecordValidationFunctionSync = null;

      // Act
      const result = convertRecordValidationToAsyncIfNeeded(validation);

      // Assert
      expect(result).toBeInstanceOf(Function);
      const recordValidatorArgs: RecordValidatorArgs = {
        values: 'test value',
      };
      const promise = result(recordValidatorArgs);
      expect(promise).toBeInstanceOf(Promise);
      promise.then(validationResult => {
        expect(validationResult).toEqual(createDefaultValidationResult());
        done();
      });
    });

    it('should return a function that returns a promise with provided validation result when it feeds validation equals sync function', done => {
      // Arrange
      const validation: RecordValidationFunctionSync = () => ({
        key: 'test key',
        message: 'test message',
        type: 'test type',
        succeeded: true,
      });

      // Act
      const result = convertRecordValidationToAsyncIfNeeded(validation);

      // Assert
      expect(result).toBeInstanceOf(Function);
      const recordValidatorArgs: RecordValidatorArgs = {
        values: 'test value',
      };
      const promise = result(recordValidatorArgs);
      expect(promise).toBeInstanceOf(Promise);
      promise.then(validationResult => {
        expect(validationResult).toEqual({
          key: 'test key',
          message: 'test message',
          type: 'test type',
          succeeded: true,
        });
        done();
      });
    });

    it('should return a function that returns a promise with provided validation result when it feeds validation equals async function', done => {
      // Arrange
      const validation: RecordValidationFunctionAsync = () =>
        Promise.resolve({
          key: 'test key',
          message: 'test message',
          type: 'test type',
          succeeded: true,
        });

      // Act
      const result = convertRecordValidationToAsyncIfNeeded(validation);

      // Assert
      expect(result).toBeInstanceOf(Function);
      const recordValidatorArgs: RecordValidatorArgs = {
        values: 'test value',
      };
      const promise = result(recordValidatorArgs);
      expect(promise).toBeInstanceOf(Promise);
      promise.then(validationResult => {
        expect(validationResult).toEqual({
          key: 'test key',
          message: 'test message',
          type: 'test type',
          succeeded: true,
        });
        done();
      });
    });
  });
});
