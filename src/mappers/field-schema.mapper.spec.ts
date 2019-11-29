import { mapToInternalFieldValidationSchema } from './field-schema.mapper';
import {
  FieldValidationSchema,
  FieldValidationFunctionSync,
  InternalFieldValidationSchema,
  FieldValidationFunctionAsync,
  FullFieldValidation,
} from '../model';

describe('field-schema.mapper specs', () => {
  it('spec #1: should return empty object when it feeds fieldValidationSchema equals undefined', () => {
    // Arrange
    const fieldValidationSchema: FieldValidationSchema = void 0;

    // Act
    const result = mapToInternalFieldValidationSchema(fieldValidationSchema);

    // Assert
    expect(result).toEqual({});
  });

  it('spec #2: should return empty object when it feeds fieldValidationSchema equals null', () => {
    // Arrange
    const fieldValidationSchema: FieldValidationSchema = null;

    // Act
    const result = mapToInternalFieldValidationSchema(fieldValidationSchema);

    // Assert
    expect(result).toEqual({});
  });

  it('spec #3: should return empty object when it feeds fieldValidationSchema equals empty object', () => {
    // Arrange
    const fieldValidationSchema: FieldValidationSchema = {};

    // Act
    const result = mapToInternalFieldValidationSchema(fieldValidationSchema);

    // Assert
    expect(result).toEqual({});
  });

  it('spec #4: should return InternalFieldValidationSchema when it feeds fieldValidationSchema with one FieldValidationFunctionSync', done => {
    // Arrange
    const validator: FieldValidationFunctionSync = () => ({
      succeeded: true,
      message: 'test message',
      type: 'test type',
    });

    const fieldValidationSchema: FieldValidationSchema = {
      fieldId: [validator],
    };

    // Act
    const result = mapToInternalFieldValidationSchema(fieldValidationSchema);

    // Assert
    const expectedResult: InternalFieldValidationSchema = {
      fieldId: [
        {
          validator: expect.any(Function),
          customArgs: void 0,
          message: void 0,
        },
      ],
    };
    expect(result).toEqual(expectedResult);
    result['fieldId'][0].validator(null).then(validationResult => {
      expect(validationResult).toEqual({
        succeeded: true,
        message: 'test message',
        type: 'test type',
      });
      done();
    });
  });

  it('spec #5: should return InternalFieldValidationSchema when it feeds fieldValidationSchema with two FieldValidationFunctionSync', done => {
    // Arrange
    const validator1: FieldValidationFunctionSync = () => ({
      succeeded: true,
      message: 'test message 1',
      type: 'test type 1',
    });
    const validator2: FieldValidationFunctionSync = () => ({
      succeeded: false,
      message: 'test message 2',
      type: 'test type 2',
    });

    const fieldValidationSchema: FieldValidationSchema = {
      fieldId: [validator1, validator2],
    };

    // Act
    const result = mapToInternalFieldValidationSchema(fieldValidationSchema);

    // Assert
    const expectedResult: InternalFieldValidationSchema = {
      fieldId: [
        {
          validator: expect.any(Function),
          customArgs: void 0,
          message: void 0,
        },
        {
          validator: expect.any(Function),
          customArgs: void 0,
          message: void 0,
        },
      ],
    };
    expect(result).toEqual(expectedResult);
    Promise.all([
      result['fieldId'][0].validator(null),
      result['fieldId'][1].validator(null),
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

  it('spec #6: should return InternalFieldValidationSchema when it feeds fieldValidationSchema with two fields with one FieldValidationFunctionSync', done => {
    // Arrange
    const validator1: FieldValidationFunctionSync = () => ({
      succeeded: true,
      message: 'test message 1',
      type: 'test type 1',
    });
    const validator2: FieldValidationFunctionSync = () => ({
      succeeded: false,
      message: 'test message 2',
      type: 'test type 2',
    });

    const fieldValidationSchema: FieldValidationSchema = {
      fieldId1: [validator1],
      fieldId2: [validator2],
    };

    // Act
    const result = mapToInternalFieldValidationSchema(fieldValidationSchema);

    // Assert
    const expectedResult: InternalFieldValidationSchema = {
      fieldId1: [
        {
          validator: expect.any(Function),
          customArgs: void 0,
          message: void 0,
        },
      ],
      fieldId2: [
        {
          validator: expect.any(Function),
          customArgs: void 0,
          message: void 0,
        },
      ],
    };
    expect(result).toEqual(expectedResult);
    Promise.all([
      result['fieldId1'][0].validator(null),
      result['fieldId2'][0].validator(null),
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

  it('spec #7: should return InternalFieldValidationSchema when it feeds fieldValidationSchema with one FieldValidationFunctionAsync', done => {
    // Arrange
    const validator: FieldValidationFunctionAsync = () =>
      Promise.resolve({
        succeeded: true,
        message: 'test message',
        type: 'test type',
      });

    const fieldValidationSchema: FieldValidationSchema = {
      fieldId: [validator],
    };

    // Act
    const result = mapToInternalFieldValidationSchema(fieldValidationSchema);

    // Assert
    const expectedResult: InternalFieldValidationSchema = {
      fieldId: [
        {
          validator: expect.any(Function),
          customArgs: void 0,
          message: void 0,
        },
      ],
    };
    expect(result).toEqual(expectedResult);
    result['fieldId'][0].validator(null).then(validationResult => {
      expect(validationResult).toEqual({
        succeeded: true,
        message: 'test message',
        type: 'test type',
      });
      done();
    });
  });

  it('spec #8: should return InternalFieldValidationSchema when it feeds fieldValidationSchema with two FieldValidationFunctionAsync', done => {
    // Arrange
    const validator1: FieldValidationFunctionAsync = () =>
      Promise.resolve({
        succeeded: true,
        message: 'test message 1',
        type: 'test type 1',
      });
    const validator2: FieldValidationFunctionAsync = () =>
      Promise.resolve({
        succeeded: false,
        message: 'test message 2',
        type: 'test type 2',
      });

    const fieldValidationSchema: FieldValidationSchema = {
      fieldId: [validator1, validator2],
    };

    // Act
    const result = mapToInternalFieldValidationSchema(fieldValidationSchema);

    // Assert
    const expectedResult: InternalFieldValidationSchema = {
      fieldId: [
        {
          validator: expect.any(Function),
          customArgs: void 0,
          message: void 0,
        },
        {
          validator: expect.any(Function),
          customArgs: void 0,
          message: void 0,
        },
      ],
    };
    expect(result).toEqual(expectedResult);
    Promise.all([
      result['fieldId'][0].validator(null),
      result['fieldId'][1].validator(null),
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

  it('spec #9: should return InternalFieldValidationSchema when it feeds fieldValidationSchema with two fields with one FieldValidationFunctionAsync', done => {
    // Arrange
    const validator1: FieldValidationFunctionAsync = () =>
      Promise.resolve({
        succeeded: true,
        message: 'test message 1',
        type: 'test type 1',
      });
    const validator2: FieldValidationFunctionAsync = () =>
      Promise.resolve({
        succeeded: false,
        message: 'test message 2',
        type: 'test type 2',
      });

    const fieldValidationSchema: FieldValidationSchema = {
      fieldId1: [validator1],
      fieldId2: [validator2],
    };

    // Act
    const result = mapToInternalFieldValidationSchema(fieldValidationSchema);

    // Assert
    const expectedResult: InternalFieldValidationSchema = {
      fieldId1: [
        {
          validator: expect.any(Function),
          customArgs: void 0,
          message: void 0,
        },
      ],
      fieldId2: [
        {
          validator: expect.any(Function),
          customArgs: void 0,
          message: void 0,
        },
      ],
    };
    expect(result).toEqual(expectedResult);
    Promise.all([
      result['fieldId1'][0].validator(null),
      result['fieldId2'][0].validator(null),
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

  it('spec #10: should return InternalFieldValidationSchema when it feeds fieldValidationSchema with one FullFieldValidation and sync validator', done => {
    // Arrange
    const validator: FieldValidationFunctionSync = () => ({
      succeeded: true,
      message: 'test message',
      type: 'test type',
    });

    const fullFieldValidation: FullFieldValidation = {
      validator,
      customArgs: { arg: 1 },
      message: 'updated message',
    };

    const fieldValidationSchema: FieldValidationSchema = {
      fieldId: [fullFieldValidation],
    };

    // Act
    const result = mapToInternalFieldValidationSchema(fieldValidationSchema);

    // Assert
    const expectedResult: InternalFieldValidationSchema = {
      fieldId: [
        {
          validator: expect.any(Function),
          customArgs: { arg: 1 },
          message: 'updated message',
        },
      ],
    };
    expect(result).toEqual(expectedResult);
    result['fieldId'][0].validator(null).then(validationResult => {
      expect(validationResult).toEqual({
        succeeded: true,
        message: 'test message',
        type: 'test type',
      });
      done();
    });
  });

  it('spec #11: should return InternalFieldValidationSchema when it feeds fieldValidationSchema with two FullFieldValidation and sync validator', done => {
    // Arrange
    const validator1: FieldValidationFunctionSync = () => ({
      succeeded: true,
      message: 'test message 1',
      type: 'test type 1',
    });

    const fullFieldValidation1: FullFieldValidation = {
      validator: validator1,
      customArgs: { arg: 1 },
      message: 'updated message 1',
    };

    const validator2: FieldValidationFunctionSync = () => ({
      succeeded: false,
      message: 'test message 2',
      type: 'test type 2',
    });

    const fullFieldValidation2: FullFieldValidation = {
      validator: validator2,
      customArgs: { arg: 2 },
      message: 'updated message 2',
    };

    const fieldValidationSchema: FieldValidationSchema = {
      fieldId: [fullFieldValidation1, fullFieldValidation2],
    };

    // Act
    const result = mapToInternalFieldValidationSchema(fieldValidationSchema);

    // Assert
    const expectedResult: InternalFieldValidationSchema = {
      fieldId: [
        {
          validator: expect.any(Function),
          customArgs: { arg: 1 },
          message: 'updated message 1',
        },
        {
          validator: expect.any(Function),
          customArgs: { arg: 2 },
          message: 'updated message 2',
        },
      ],
    };
    expect(result).toEqual(expectedResult);
    Promise.all([
      result['fieldId'][0].validator(null),
      result['fieldId'][1].validator(null),
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

  it('spec #12: should return InternalFieldValidationSchema when it feeds fieldValidationSchema with two fields with one FullFieldValidation and sync validator', done => {
    // Arrange
    const validator1: FieldValidationFunctionSync = () => ({
      succeeded: true,
      message: 'test message 1',
      type: 'test type 1',
    });

    const fullFieldValidation1: FullFieldValidation = {
      validator: validator1,
      customArgs: { arg: 1 },
      message: 'updated message 1',
    };

    const validator2: FieldValidationFunctionSync = () => ({
      succeeded: false,
      message: 'test message 2',
      type: 'test type 2',
    });

    const fullFieldValidation2: FullFieldValidation = {
      validator: validator2,
      customArgs: { arg: 2 },
      message: 'updated message 2',
    };

    const fieldValidationSchema: FieldValidationSchema = {
      fieldId1: [fullFieldValidation1],
      fieldId2: [fullFieldValidation2],
    };

    // Act
    const result = mapToInternalFieldValidationSchema(fieldValidationSchema);

    // Assert
    const expectedResult: InternalFieldValidationSchema = {
      fieldId1: [
        {
          validator: expect.any(Function),
          customArgs: { arg: 1 },
          message: 'updated message 1',
        },
      ],
      fieldId2: [
        {
          validator: expect.any(Function),
          customArgs: { arg: 2 },
          message: 'updated message 2',
        },
      ],
    };
    expect(result).toEqual(expectedResult);
    Promise.all([
      result['fieldId1'][0].validator(null),
      result['fieldId2'][0].validator(null),
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

  it('spec #13: should return InternalFieldValidationSchema when it feeds fieldValidationSchema with one FullFieldValidation and async validator', done => {
    // Arrange
    const validator: FieldValidationFunctionAsync = () =>
      Promise.resolve({
        succeeded: true,
        message: 'test message',
        type: 'test type',
      });

    const fullFieldValidation: FullFieldValidation = {
      validator,
      customArgs: { arg: 1 },
      message: 'updated message',
    };

    const fieldValidationSchema: FieldValidationSchema = {
      fieldId: [fullFieldValidation],
    };

    // Act
    const result = mapToInternalFieldValidationSchema(fieldValidationSchema);

    // Assert
    const expectedResult: InternalFieldValidationSchema = {
      fieldId: [
        {
          validator: expect.any(Function),
          customArgs: { arg: 1 },
          message: 'updated message',
        },
      ],
    };
    expect(result).toEqual(expectedResult);
    result['fieldId'][0].validator(null).then(validationResult => {
      expect(validationResult).toEqual({
        succeeded: true,
        message: 'test message',
        type: 'test type',
      });
      done();
    });
  });

  it('spec #14: should return InternalFieldValidationSchema when it feeds fieldValidationSchema with two FullFieldValidation and async validator', done => {
    // Arrange
    const validator1: FieldValidationFunctionAsync = () =>
      Promise.resolve({
        succeeded: true,
        message: 'test message 1',
        type: 'test type 1',
      });

    const fullFieldValidation1: FullFieldValidation = {
      validator: validator1,
      customArgs: { arg: 1 },
      message: 'updated message 1',
    };

    const validator2: FieldValidationFunctionAsync = () =>
      Promise.resolve({
        succeeded: false,
        message: 'test message 2',
        type: 'test type 2',
      });

    const fullFieldValidation2: FullFieldValidation = {
      validator: validator2,
      customArgs: { arg: 2 },
      message: 'updated message 2',
    };

    const fieldValidationSchema: FieldValidationSchema = {
      fieldId: [fullFieldValidation1, fullFieldValidation2],
    };

    // Act
    const result = mapToInternalFieldValidationSchema(fieldValidationSchema);

    // Assert
    const expectedResult: InternalFieldValidationSchema = {
      fieldId: [
        {
          validator: expect.any(Function),
          customArgs: { arg: 1 },
          message: 'updated message 1',
        },
        {
          validator: expect.any(Function),
          customArgs: { arg: 2 },
          message: 'updated message 2',
        },
      ],
    };
    expect(result).toEqual(expectedResult);
    Promise.all([
      result['fieldId'][0].validator(null),
      result['fieldId'][1].validator(null),
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

  it('spec #15: should return InternalFieldValidationSchema when it feeds fieldValidationSchema with two fields with one FullFieldValidation and async validator', done => {
    // Arrange
    const validator1: FieldValidationFunctionAsync = () =>
      Promise.resolve({
        succeeded: true,
        message: 'test message 1',
        type: 'test type 1',
      });

    const fullFieldValidation1: FullFieldValidation = {
      validator: validator1,
      customArgs: { arg: 1 },
      message: 'updated message 1',
    };
    const validator2: FieldValidationFunctionAsync = () =>
      Promise.resolve({
        succeeded: false,
        message: 'test message 2',
        type: 'test type 2',
      });

    const fullFieldValidation2: FullFieldValidation = {
      validator: validator2,
      customArgs: { arg: 2 },
      message: 'updated message 2',
    };

    const fieldValidationSchema: FieldValidationSchema = {
      fieldId1: [fullFieldValidation1],
      fieldId2: [fullFieldValidation2],
    };

    // Act
    const result = mapToInternalFieldValidationSchema(fieldValidationSchema);

    // Assert
    const expectedResult: InternalFieldValidationSchema = {
      fieldId1: [
        {
          validator: expect.any(Function),
          customArgs: { arg: 1 },
          message: 'updated message 1',
        },
      ],
      fieldId2: [
        {
          validator: expect.any(Function),
          customArgs: { arg: 2 },
          message: 'updated message 2',
        },
      ],
    };
    expect(result).toEqual(expectedResult);
    Promise.all([
      result['fieldId1'][0].validator(null),
      result['fieldId2'][0].validator(null),
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

  it('spec #16: should return InternalFieldValidationSchema when it feeds fieldValidationSchema with two fields with one FullFieldValidation and the another one with validator object', done => {
    // Arrange
    const validator1: FieldValidationFunctionAsync = () =>
      Promise.resolve({
        succeeded: true,
        message: 'test message 1',
        type: 'test type 1',
      });

    const fullFieldValidation1: FullFieldValidation = {
      validator: validator1,
      customArgs: { arg: 1 },
      message: 'updated message 1',
    };
    const validator2 = {
      validator: () =>
        Promise.resolve({
          succeeded: false,
          message: 'test message 2',
          type: 'test type 2',
        }),
    };

    const fullFieldValidation2: FullFieldValidation = {
      validator: validator2,
      customArgs: { arg: 2 },
      message: 'updated message 2',
    };

    const fieldValidationSchema: FieldValidationSchema = {
      fieldId1: [fullFieldValidation1],
      fieldId2: [fullFieldValidation2],
    };

    // Act
    const result = mapToInternalFieldValidationSchema(fieldValidationSchema);

    // Assert
    const expectedResult: InternalFieldValidationSchema = {
      fieldId1: [
        {
          validator: expect.any(Function),
          customArgs: { arg: 1 },
          message: 'updated message 1',
        },
      ],
      fieldId2: [
        {
          validator: expect.any(Function),
          customArgs: { arg: 2 },
          message: 'updated message 2',
        },
      ],
    };
    expect(result).toEqual(expectedResult);
    Promise.all([
      result['fieldId1'][0].validator(null),
      result['fieldId2'][0].validator(null),
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
