import {
  InternalFieldValidationSchema,
  InternalRecordValidationSchema,
} from '../model';
import {
  fireAllFieldsValidations,
  fireAllRecordsValidations,
} from './all-validations-dispatcher';

describe('all-validations-dispatcher specs', () => {
  describe('fireAllFieldsValidations', () => {
    it('spec #1: should does not call to validateField function when it feeds fieldIds equals empty array', () => {
      // Arrange
      const fieldIds = [];
      const values = void 0;
      const schema: InternalFieldValidationSchema = void 0;
      const validateField = jest.fn();

      // Act
      fireAllFieldsValidations(fieldIds, values, schema, validateField);

      // Assert
      expect(validateField).not.toHaveBeenCalled();
    });

    it('spec #2: should calls to validateField function with myField, undefined, undefined and schema when it feeds fieldIds equals with one item and values equals undefined', () => {
      // Arrange
      const fieldIds = ['myField'];
      const values = void 0;
      const schema: InternalFieldValidationSchema = {};
      const validateField = jest.fn();

      // Act
      fireAllFieldsValidations(fieldIds, values, schema, validateField);

      // Assert
      expect(validateField).toHaveBeenCalledWith(
        'myField',
        undefined,
        undefined,
        schema
      );
    });

    it('spec #3: should calls to validateField function with myField, undefined, null and schema when it feeds fieldIds equals with one item and values equals null', () => {
      // Arrange
      const fieldIds = ['myField'];
      const values = null;
      const schema: InternalFieldValidationSchema = {};
      const validateField = jest.fn();

      // Act
      fireAllFieldsValidations(fieldIds, values, schema, validateField);

      // Assert
      expect(validateField).toHaveBeenCalledWith(
        'myField',
        undefined,
        null,
        schema
      );
    });

    it('spec #4: should calls to validateField function with myField, "test value", values and schema when it feeds fieldIds equals with one item and values equals defined', () => {
      // Arrange
      const fieldIds = ['myField'];
      const values = { myField: 'test value' };
      const schema: InternalFieldValidationSchema = {};
      const validateField = jest.fn();

      // Act
      fireAllFieldsValidations(fieldIds, values, schema, validateField);

      // Assert
      expect(validateField).toHaveBeenCalledWith(
        'myField',
        'test value',
        values,
        schema
      );
    });

    it('spec #5: should calls to validateField function with nested.field, "test value", values and schema when it feeds fieldIds equals with one item nested field and values equals defined', () => {
      // Arrange
      const fieldIds = ['nested.field'];
      const values = { nested: { field: 'test value' } };
      const schema: InternalFieldValidationSchema = {};
      const validateField = jest.fn();

      // Act
      fireAllFieldsValidations(fieldIds, values, schema, validateField);

      // Assert
      expect(validateField).toHaveBeenCalledWith(
        'nested.field',
        'test value',
        values,
        schema
      );
    });

    it('spec #6: should calls two times to validateField function when it feeds fieldIds equals with two items nested fields and values equals defined', () => {
      // Arrange
      const fieldIds = ['nested.field1', 'my-second-nested.field2'];
      const values = {
        nested: { field1: 'test value 1' },
        'my-second-nested': { field2: 'test value 2' },
      };
      const schema: InternalFieldValidationSchema = {};
      const validateField = jest.fn();

      // Act
      fireAllFieldsValidations(fieldIds, values, schema, validateField);

      // Assert
      expect(validateField).toHaveBeenNthCalledWith(
        1,
        'nested.field1',
        'test value 1',
        values,
        schema
      );
      expect(validateField).toHaveBeenNthCalledWith(
        2,
        'my-second-nested.field2',
        'test value 2',
        values,
        schema
      );
    });
  });

  describe('fireAllRecordsValidations', () => {
    it('spec #1: should does not call to validateRecord function when it feeds recordIds equals empty array', () => {
      // Arrange
      const recordIds = [];
      const values = void 0;
      const schema: InternalRecordValidationSchema = void 0;
      const validateRecord = jest.fn();

      // Act
      fireAllRecordsValidations(recordIds, values, schema, validateRecord);

      // Assert
      expect(validateRecord).not.toHaveBeenCalled();
    });

    it('spec #2: should calls to validateRecord function with myRecord, undefined and schema when it feeds recordIds equals with one item and values equals undefined', () => {
      // Arrange
      const recordIds = ['myRecord'];
      const values = void 0;
      const schema: InternalRecordValidationSchema = {};
      const validateRecord = jest.fn();

      // Act
      fireAllRecordsValidations(recordIds, values, schema, validateRecord);

      // Assert
      expect(validateRecord).toHaveBeenCalledWith(
        'myRecord',
        undefined,
        schema
      );
    });

    it('spec #3: should calls to validateRecord function with myRecord, null and schema when it feeds recordIds equals with one item and values equals null', () => {
      // Arrange
      const recordIds = ['myRecord'];
      const values = null;
      const schema: InternalRecordValidationSchema = {};
      const validateRecord = jest.fn();

      // Act
      fireAllRecordsValidations(recordIds, values, schema, validateRecord);

      // Assert
      expect(validateRecord).toHaveBeenCalledWith('myRecord', null, schema);
    });

    it('spec #4: should calls to validateRecord function with myRecord, values and schema when it feeds recordIds equals with one item and values equals defined', () => {
      // Arrange
      const recordIds = ['myRecord'];
      const values = { myRecord: 'test value' };
      const schema: InternalRecordValidationSchema = {};
      const validateRecord = jest.fn();

      // Act
      fireAllRecordsValidations(recordIds, values, schema, validateRecord);

      // Assert
      expect(validateRecord).toHaveBeenCalledWith('myRecord', values, schema);
    });

    it('spec #5: should calls to validateRecord function with nested.field, values and schema when it feeds recordIds equals with one item nested field and values equals defined', () => {
      // Arrange
      const recordIds = ['nested.field'];
      const values = { nested: { field: 'test value' } };
      const schema: InternalRecordValidationSchema = {};
      const validateRecord = jest.fn();

      // Act
      fireAllRecordsValidations(recordIds, values, schema, validateRecord);

      // Assert
      expect(validateRecord).toHaveBeenCalledWith(
        'nested.field',
        values,
        schema
      );
    });

    it('spec #6: should calls two times to validateRecord function when it feeds recordIds equals with two items nested fields and values equals defined', () => {
      // Arrange
      const recordIds = ['nested.field1', 'my-second-nested.field2'];
      const values = {
        nested: { field1: 'test value 1' },
        'my-second-nested': { field2: 'test value 2' },
      };
      const schema: InternalRecordValidationSchema = {};
      const validateRecord = jest.fn();

      // Act
      fireAllRecordsValidations(recordIds, values, schema, validateRecord);

      // Assert
      expect(validateRecord).toHaveBeenNthCalledWith(
        1,
        'nested.field1',
        values,
        schema
      );
      expect(validateRecord).toHaveBeenNthCalledWith(
        2,
        'my-second-nested.field2',
        values,
        schema
      );
    });
  });
});
