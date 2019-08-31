import { mapToInternalRecordValidationSchema } from './record-schema.mapper';
import {
  RecordValidationSchema,
  RecordValidationFunctionSync,
  InternalRecordValidationSchema,
  RecordValidationFunctionAsync,
  FullRecordValidation,
} from '../model';

describe('record-schema.mapper specs', () => {
  it('spec #1: should return empty object when it feeds recordValidationSchema equals undefined', () => {
    // Arrange
    const recordValidationSchema: RecordValidationSchema = void 0;

    // Act
    const result = mapToInternalRecordValidationSchema(recordValidationSchema);

    // Assert
    expect(result).toEqual({});
  });

  it('spec #2: should return empty object when it feeds recordValidationSchema equals null', () => {
    // Arrange
    const recordValidationSchema: RecordValidationSchema = null;

    // Act
    const result = mapToInternalRecordValidationSchema(recordValidationSchema);

    // Assert
    expect(result).toEqual({});
  });

  it('spec #3: should return empty object when it feeds recordValidationSchema equals empty object', () => {
    // Arrange
    const recordValidationSchema: RecordValidationSchema = {};

    // Act
    const result = mapToInternalRecordValidationSchema(recordValidationSchema);

    // Assert
    expect(result).toEqual({});
  });

  it('spec #4: should return InternalRecordValidationSchema when it feeds recordValidationSchema with one RecordValidationFunctionSync', done => {
    // Arrange
    const validator: RecordValidationFunctionSync = () => ({
      succeeded: true,
      message: 'test message',
      type: 'test type',
    });

    const recordValidationSchema: RecordValidationSchema = {
      recordId: [validator],
    };

    // Act
    const result = mapToInternalRecordValidationSchema(recordValidationSchema);

    // Assert
    const expectedResult: InternalRecordValidationSchema = {
      recordId: [
        {
          validator: expect.any(Function),
          message: void 0,
        },
      ],
    };
    expect(result).toEqual(expectedResult);
    result['recordId'][0].validator(null).then(validationResult => {
      expect(validationResult).toEqual({
        succeeded: true,
        message: 'test message',
        type: 'test type',
      });
      done();
    });
  });

  it('spec #5: should return InternalRecordValidationSchema when it feeds recordValidationSchema with two RecordValidationFunctionSync', done => {
    // Arrange
    const validator1: RecordValidationFunctionSync = () => ({
      succeeded: true,
      message: 'test message 1',
      type: 'test type 1',
    });
    const validator2: RecordValidationFunctionSync = () => ({
      succeeded: false,
      message: 'test message 2',
      type: 'test type 2',
    });

    const recordValidationSchema: RecordValidationSchema = {
      recordId: [validator1, validator2],
    };

    // Act
    const result = mapToInternalRecordValidationSchema(recordValidationSchema);

    // Assert
    const expectedResult: InternalRecordValidationSchema = {
      recordId: [
        {
          validator: expect.any(Function),
          message: void 0,
        },
        {
          validator: expect.any(Function),
          message: void 0,
        },
      ],
    };
    expect(result).toEqual(expectedResult);
    Promise.all([
      result['recordId'][0].validator(null),
      result['recordId'][1].validator(null),
    ]).then(validationResults => {
      expect(validationResults[0]).toEqual({
        succeeded: true,
        message: 'test message 1',
        type: 'test type 1',
      });
      expect(validationResults[1]).toEqual({
        succeeded: false,
        message: 'test message 2',
        type: 'test type 2',
      });
      done();
    });
  });

  it('spec #6: should return InternalRecordValidationSchema when it feeds recordValidationSchema with two records with one RecordValidationFunctionSync', done => {
    // Arrange
    const validator1: RecordValidationFunctionSync = () => ({
      succeeded: true,
      message: 'test message 1',
      type: 'test type 1',
    });
    const validator2: RecordValidationFunctionSync = () => ({
      succeeded: false,
      message: 'test message 2',
      type: 'test type 2',
    });

    const recordValidationSchema: RecordValidationSchema = {
      recordId1: [validator1],
      recordId2: [validator2],
    };

    // Act
    const result = mapToInternalRecordValidationSchema(recordValidationSchema);

    // Assert
    const expectedResult: InternalRecordValidationSchema = {
      recordId1: [
        {
          validator: expect.any(Function),
          message: void 0,
        },
      ],
      recordId2: [
        {
          validator: expect.any(Function),
          message: void 0,
        },
      ],
    };
    expect(result).toEqual(expectedResult);
    Promise.all([
      result['recordId1'][0].validator(null),
      result['recordId2'][0].validator(null),
    ]).then(validationResults => {
      expect(validationResults[0]).toEqual({
        succeeded: true,
        message: 'test message 1',
        type: 'test type 1',
      });
      expect(validationResults[1]).toEqual({
        succeeded: false,
        message: 'test message 2',
        type: 'test type 2',
      });
      done();
    });
  });

  it('spec #7: should return InternalRecordValidationSchema when it feeds recordValidationSchema with one RecordValidationFunctionAsync', done => {
    // Arrange
    const validator: RecordValidationFunctionAsync = () =>
      Promise.resolve({
        succeeded: true,
        message: 'test message',
        type: 'test type',
      });

    const recordValidationSchema: RecordValidationSchema = {
      recordId: [validator],
    };

    // Act
    const result = mapToInternalRecordValidationSchema(recordValidationSchema);

    // Assert
    const expectedResult: InternalRecordValidationSchema = {
      recordId: [
        {
          validator: expect.any(Function),
          message: void 0,
        },
      ],
    };
    expect(result).toEqual(expectedResult);
    result['recordId'][0].validator(null).then(validationResult => {
      expect(validationResult).toEqual({
        succeeded: true,
        message: 'test message',
        type: 'test type',
      });
      done();
    });
  });

  it('spec #8: should return InternalRecordValidationSchema when it feeds recordValidationSchema with two RecordValidationFunctionAsync', done => {
    // Arrange
    const validator1: RecordValidationFunctionAsync = () =>
      Promise.resolve({
        succeeded: true,
        message: 'test message 1',
        type: 'test type 1',
      });
    const validator2: RecordValidationFunctionAsync = () =>
      Promise.resolve({
        succeeded: false,
        message: 'test message 2',
        type: 'test type 2',
      });

    const recordValidationSchema: RecordValidationSchema = {
      recordId: [validator1, validator2],
    };

    // Act
    const result = mapToInternalRecordValidationSchema(recordValidationSchema);

    // Assert
    const expectedResult: InternalRecordValidationSchema = {
      recordId: [
        {
          validator: expect.any(Function),
          message: void 0,
        },
        {
          validator: expect.any(Function),
          message: void 0,
        },
      ],
    };
    expect(result).toEqual(expectedResult);
    Promise.all([
      result['recordId'][0].validator(null),
      result['recordId'][1].validator(null),
    ]).then(validationResults => {
      expect(validationResults[0]).toEqual({
        succeeded: true,
        message: 'test message 1',
        type: 'test type 1',
      });
      expect(validationResults[1]).toEqual({
        succeeded: false,
        message: 'test message 2',
        type: 'test type 2',
      });
      done();
    });
  });

  it('spec #9: should return InternalRecordValidationSchema when it feeds recordValidationSchema with two records with one RecordValidationFunctionAsync', done => {
    // Arrange
    const validator1: RecordValidationFunctionAsync = () =>
      Promise.resolve({
        succeeded: true,
        message: 'test message 1',
        type: 'test type 1',
      });
    const validator2: RecordValidationFunctionAsync = () =>
      Promise.resolve({
        succeeded: false,
        message: 'test message 2',
        type: 'test type 2',
      });

    const recordValidationSchema: RecordValidationSchema = {
      recordId1: [validator1],
      recordId2: [validator2],
    };

    // Act
    const result = mapToInternalRecordValidationSchema(recordValidationSchema);

    // Assert
    const expectedResult: InternalRecordValidationSchema = {
      recordId1: [
        {
          validator: expect.any(Function),
          message: void 0,
        },
      ],
      recordId2: [
        {
          validator: expect.any(Function),
          message: void 0,
        },
      ],
    };
    expect(result).toEqual(expectedResult);
    Promise.all([
      result['recordId1'][0].validator(null),
      result['recordId2'][0].validator(null),
    ]).then(validationResults => {
      expect(validationResults[0]).toEqual({
        succeeded: true,
        message: 'test message 1',
        type: 'test type 1',
      });
      expect(validationResults[1]).toEqual({
        succeeded: false,
        message: 'test message 2',
        type: 'test type 2',
      });
      done();
    });
  });

  it('spec #10: should return InternalRecordValidationSchema when it feeds recordValidationSchema with one FullRecordValidation and sync validator', done => {
    // Arrange
    const validator: RecordValidationFunctionSync = () => ({
      succeeded: true,
      message: 'test message',
      type: 'test type',
    });

    const fullRecordValidation: FullRecordValidation = {
      validator,
      message: 'updated message',
    };

    const recordValidationSchema: RecordValidationSchema = {
      recordId: [fullRecordValidation],
    };

    // Act
    const result = mapToInternalRecordValidationSchema(recordValidationSchema);

    // Assert
    const expectedResult: InternalRecordValidationSchema = {
      recordId: [
        {
          validator: expect.any(Function),
          message: 'updated message',
        },
      ],
    };
    expect(result).toEqual(expectedResult);
    result['recordId'][0].validator(null).then(validationResult => {
      expect(validationResult).toEqual({
        succeeded: true,
        message: 'test message',
        type: 'test type',
      });
      done();
    });
  });

  it('spec #11: should return InternalRecordValidationSchema when it feeds recordValidationSchema with two FullRecordValidation and sync validator', done => {
    // Arrange
    const validator1: RecordValidationFunctionSync = () => ({
      succeeded: true,
      message: 'test message 1',
      type: 'test type 1',
    });

    const fullRecordValidation1: FullRecordValidation = {
      validator: validator1,
      message: 'updated message 1',
    };

    const validator2: RecordValidationFunctionSync = () => ({
      succeeded: false,
      message: 'test message 2',
      type: 'test type 2',
    });

    const fullRecordValidation2: FullRecordValidation = {
      validator: validator2,
      message: 'updated message 2',
    };

    const recordValidationSchema: RecordValidationSchema = {
      recordId: [fullRecordValidation1, fullRecordValidation2],
    };

    // Act
    const result = mapToInternalRecordValidationSchema(recordValidationSchema);

    // Assert
    const expectedResult: InternalRecordValidationSchema = {
      recordId: [
        {
          validator: expect.any(Function),
          message: 'updated message 1',
        },
        {
          validator: expect.any(Function),
          message: 'updated message 2',
        },
      ],
    };
    expect(result).toEqual(expectedResult);
    Promise.all([
      result['recordId'][0].validator(null),
      result['recordId'][1].validator(null),
    ]).then(validationResults => {
      expect(validationResults[0]).toEqual({
        succeeded: true,
        message: 'test message 1',
        type: 'test type 1',
      });
      expect(validationResults[1]).toEqual({
        succeeded: false,
        message: 'test message 2',
        type: 'test type 2',
      });
      done();
    });
  });

  it('spec #12: should return InternalRecordValidationSchema when it feeds recordValidationSchema with two records with one FullRecordValidation and sync validator', done => {
    // Arrange
    const validator1: RecordValidationFunctionSync = () => ({
      succeeded: true,
      message: 'test message 1',
      type: 'test type 1',
    });

    const fullRecordValidation1: FullRecordValidation = {
      validator: validator1,
      message: 'updated message 1',
    };

    const validator2: RecordValidationFunctionSync = () => ({
      succeeded: false,
      message: 'test message 2',
      type: 'test type 2',
    });

    const fullRecordValidation2: FullRecordValidation = {
      validator: validator2,
      message: 'updated message 2',
    };

    const recordValidationSchema: RecordValidationSchema = {
      recordId1: [fullRecordValidation1],
      recordId2: [fullRecordValidation2],
    };

    // Act
    const result = mapToInternalRecordValidationSchema(recordValidationSchema);

    // Assert
    const expectedResult: InternalRecordValidationSchema = {
      recordId1: [
        {
          validator: expect.any(Function),
          message: 'updated message 1',
        },
      ],
      recordId2: [
        {
          validator: expect.any(Function),
          message: 'updated message 2',
        },
      ],
    };
    expect(result).toEqual(expectedResult);
    Promise.all([
      result['recordId1'][0].validator(null),
      result['recordId2'][0].validator(null),
    ]).then(validationResults => {
      expect(validationResults[0]).toEqual({
        succeeded: true,
        message: 'test message 1',
        type: 'test type 1',
      });
      expect(validationResults[1]).toEqual({
        succeeded: false,
        message: 'test message 2',
        type: 'test type 2',
      });
      done();
    });
  });

  it('spec #13: should return InternalRecordValidationSchema when it feeds recordValidationSchema with one FullRecordValidation and async validator', done => {
    // Arrange
    const validator: RecordValidationFunctionAsync = () =>
      Promise.resolve({
        succeeded: true,
        message: 'test message',
        type: 'test type',
      });

    const fullRecordValidation: FullRecordValidation = {
      validator,
      message: 'updated message',
    };

    const recordValidationSchema: RecordValidationSchema = {
      recordId: [fullRecordValidation],
    };

    // Act
    const result = mapToInternalRecordValidationSchema(recordValidationSchema);

    // Assert
    const expectedResult: InternalRecordValidationSchema = {
      recordId: [
        {
          validator: expect.any(Function),
          message: 'updated message',
        },
      ],
    };
    expect(result).toEqual(expectedResult);
    result['recordId'][0].validator(null).then(validationResult => {
      expect(validationResult).toEqual({
        succeeded: true,
        message: 'test message',
        type: 'test type',
      });
      done();
    });
  });

  it('spec #14: should return InternalRecordValidationSchema when it feeds recordValidationSchema with two FullRecordValidation and async validator', done => {
    // Arrange
    const validator1: RecordValidationFunctionAsync = () =>
      Promise.resolve({
        succeeded: true,
        message: 'test message 1',
        type: 'test type 1',
      });

    const fullRecordValidation1: FullRecordValidation = {
      validator: validator1,
      message: 'updated message 1',
    };

    const validator2: RecordValidationFunctionAsync = () =>
      Promise.resolve({
        succeeded: false,
        message: 'test message 2',
        type: 'test type 2',
      });

    const fullRecordValidation2: FullRecordValidation = {
      validator: validator2,
      message: 'updated message 2',
    };

    const recordValidationSchema: RecordValidationSchema = {
      recordId: [fullRecordValidation1, fullRecordValidation2],
    };

    // Act
    const result = mapToInternalRecordValidationSchema(recordValidationSchema);

    // Assert
    const expectedResult: InternalRecordValidationSchema = {
      recordId: [
        {
          validator: expect.any(Function),
          message: 'updated message 1',
        },
        {
          validator: expect.any(Function),
          message: 'updated message 2',
        },
      ],
    };
    expect(result).toEqual(expectedResult);
    Promise.all([
      result['recordId'][0].validator(null),
      result['recordId'][1].validator(null),
    ]).then(validationResults => {
      expect(validationResults[0]).toEqual({
        succeeded: true,
        message: 'test message 1',
        type: 'test type 1',
      });
      expect(validationResults[1]).toEqual({
        succeeded: false,
        message: 'test message 2',
        type: 'test type 2',
      });
      done();
    });
  });

  it('spec #15: should return InternalRecordValidationSchema when it feeds recordValidationSchema with two records with one FullRecordValidation and async validator', done => {
    // Arrange
    const validator1: RecordValidationFunctionAsync = () =>
      Promise.resolve({
        succeeded: true,
        message: 'test message 1',
        type: 'test type 1',
      });

    const fullRecordValidation1: FullRecordValidation = {
      validator: validator1,
      message: 'updated message 1',
    };
    const validator2: RecordValidationFunctionAsync = () =>
      Promise.resolve({
        succeeded: false,
        message: 'test message 2',
        type: 'test type 2',
      });

    const fullRecordValidation2: FullRecordValidation = {
      validator: validator2,
      message: 'updated message 2',
    };

    const recordValidationSchema: RecordValidationSchema = {
      recordId1: [fullRecordValidation1],
      recordId2: [fullRecordValidation2],
    };

    // Act
    const result = mapToInternalRecordValidationSchema(recordValidationSchema);

    // Assert
    const expectedResult: InternalRecordValidationSchema = {
      recordId1: [
        {
          validator: expect.any(Function),
          message: 'updated message 1',
        },
      ],
      recordId2: [
        {
          validator: expect.any(Function),
          message: 'updated message 2',
        },
      ],
    };
    expect(result).toEqual(expectedResult);
    Promise.all([
      result['recordId1'][0].validator(null),
      result['recordId2'][0].validator(null),
    ]).then(validationResults => {
      expect(validationResults[0]).toEqual({
        succeeded: true,
        message: 'test message 1',
        type: 'test type 1',
      });
      expect(validationResults[1]).toEqual({
        succeeded: false,
        message: 'test message 2',
        type: 'test type 2',
      });
      done();
    });
  });
});
