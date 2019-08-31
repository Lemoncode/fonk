import { fireRecordValidations } from './tmp-record-dispatcher';
import { FullRecordValidationAsync } from '../model';

describe(`fireRecordValidations`, () => {
  it(`Should return empty array of responsed
      when array of record validations is empty`, () => {
    // Arrange
    const values = null;
    const validations = [];

    // Act
    const result = fireRecordValidations(values, validations);

    // Assert
    expect(result).toBeDefined;
    expect(result.length).toBe(0);
  });

  it(`Should return an array containing one element + validation result succeeded
      when injecting one record validation, and validation succeed`, done => {
    // Arrange
    const values = null;
    const validations: FullRecordValidationAsync[] = [
      {
        validation: values =>
          Promise.resolve({
            type: 'myrecordvalidation1',
            succeeded: true,
            message: '',
          }),
      },
    ];

    // Act
    const result = fireRecordValidations(values, validations);

    // Assert
    expect(result).toBeDefined;
    expect(result.length).toBe(1);

    Promise.all(result).then(result => {
      expect(result[0].succeeded).toBeTruthy();
      expect(result[0].type).toBe('myrecordvalidation1');
      done();
    });
  });

  it(`Should return an array containing one element + validation result failed
      when injecting one record validation, and validation failed`, done => {
    // Arrange
    const values = null;
    const validations: FullRecordValidationAsync[] = [
      {
        validation: values =>
          Promise.resolve({
            type: 'myrecordvalidation1',
            succeeded: false,
            message: '',
          }),
      },
    ];

    // Act
    const result = fireRecordValidations(values, validations);

    // Assert
    expect(result).toBeDefined;
    expect(result.length).toBe(1);

    Promise.all(result).then(result => {
      expect(result[0].succeeded).toBeFalsy();
      expect(result[0].type).toBe('myrecordvalidation1');
      done();
    });
  });

  it(`Should return an array containing two element + validation result succeeded on both
      when injecting two record validation, and both succeed`, done => {
    // Arrange
    const values = null;
    const validations: FullRecordValidationAsync[] = [
      {
        validation: values =>
          Promise.resolve({
            type: 'myrecordvalidation1',
            succeeded: true,
            message: '',
          }),
      },
      {
        validation: values =>
          Promise.resolve({
            type: 'myrecordvalidation2',
            succeeded: true,
            message: '',
          }),
      },
    ];

    // Act
    const result = fireRecordValidations(values, validations);

    // Assert
    expect(result).toBeDefined;
    expect(result.length).toBe(2);

    Promise.all(result).then(result => {
      expect(result[0].succeeded).toBeTruthy();
      expect(result[0].type).toBe('myrecordvalidation1');
      expect(result[1].succeeded).toBeTruthy();
      expect(result[1].type).toBe('myrecordvalidation2');
      done();
    });
  });

  it(`Should return an array containing two element + validation result failed on both
      when injecting two record validation, and both failed`, done => {
    // Arrange
    const values = null;
    const validations: FullRecordValidationAsync[] = [
      {
        validation: values =>
          Promise.resolve({
            type: 'myrecordvalidation1',
            succeeded: false,
            message: '',
          }),
      },
      {
        validation: values =>
          Promise.resolve({
            type: 'myrecordvalidation2',
            succeeded: false,
            message: '',
          }),
      },
    ];

    // Act
    const result = fireRecordValidations(values, validations);

    // Assert
    expect(result).toBeDefined;
    expect(result.length).toBe(2);

    Promise.all(result).then(result => {
      expect(result[0].succeeded).toBeFalsy();
      expect(result[0].type).toBe('myrecordvalidation1');
      expect(result[1].succeeded).toBeFalsy();
      expect(result[1].type).toBe('myrecordvalidation2');
      done();
    });
  });

  it(`Should return an array containing two element + first validation result succeeded and sencond failed
      when injecting two record validation, and first succeeded second failed`, done => {
    // Arrange
    const values = null;
    const validations: FullRecordValidationAsync[] = [
      {
        validation: values =>
          Promise.resolve({
            type: 'myrecordvalidation1',
            succeeded: true,
            message: '',
          }),
      },
      {
        validation: values =>
          Promise.resolve({
            type: 'myrecordvalidation2',
            succeeded: false,
            message: '',
          }),
      },
    ];

    // Act
    const result = fireRecordValidations(values, validations);

    // Assert
    expect(result).toBeDefined;
    expect(result.length).toBe(2);

    Promise.all(result).then(result => {
      expect(result[0].succeeded).toBeTruthy();
      expect(result[0].type).toBe('myrecordvalidation1');
      expect(result[1].succeeded).toBeFalsy();
      expect(result[1].type).toBe('myrecordvalidation2');
      done();
    });
  });
  it(`Should return an array containing two element + first validation result failed and sencond succeeded
      when injecting two record validation, and first failed second succeeded`, done => {
    // Arrange
    const values = null;
    const validations: FullRecordValidationAsync[] = [
      {
        validation: values =>
          Promise.resolve({
            type: 'myrecordvalidation1',
            succeeded: false,
            message: '',
          }),
      },
      {
        validation: values =>
          Promise.resolve({
            type: 'myrecordvalidation2',
            succeeded: true,
            message: '',
          }),
      },
    ];

    // Act
    const result = fireRecordValidations(values, validations);

    // Assert
    expect(result).toBeDefined;
    expect(result.length).toBe(2);

    Promise.all(result).then(result => {
      expect(result[0].succeeded).toBeFalsy();
      expect(result[0].type).toBe('myrecordvalidation1');
      expect(result[1].succeeded).toBeTruthy();
      expect(result[1].type).toBe('myrecordvalidation2');
      done();
    });
  });

  it(`Should return an array containing two element + first validation result succeeded and sencond failed
      when injecting two record validation, and first succeeded second failed`, done => {
    // Arrange
    const values = null;
    const validations: FullRecordValidationAsync[] = [
      {
        validation: values =>
          Promise.resolve({
            type: 'myrecordvalidation1',
            succeeded: true,
            message: '',
          }),
      },
      {
        validation: values =>
          Promise.resolve({
            type: 'myrecordvalidation2',
            succeeded: false,
            message: '',
          }),
      },
    ];

    // Act
    const result = fireRecordValidations(values, validations);

    // Assert
    expect(result).toBeDefined;
    expect(result.length).toBe(2);

    Promise.all(result).then(result => {
      expect(result[0].succeeded).toBeTruthy();
      expect(result[0].type).toBe('myrecordvalidation1');
      expect(result[1].succeeded).toBeFalsy();
      expect(result[1].type).toBe('myrecordvalidation2');
      done();
    });
  });

  it(`Should return an empty array plus console error
      when one of the validators is null`, () => {
    // Arrange
    const values = null;
    const validations: FullRecordValidationAsync[] = [
      {
        validation: values =>
          Promise.resolve({
            type: 'myrecordvalidation1',
            succeeded: false,
            message: '',
          }),
      },
      {
        validation: null,
      },
    ];

    const errorStub = jest
      .spyOn(global.console, 'error')
      .mockImplementation(() => {});

    // Act
    const result = fireRecordValidations(values, validations);

    // Assert
    expect(result).toBeDefined;
    expect(result.length).toBe(0);
    expect(errorStub).toHaveBeenCalled();
  });

  it(`Should return an empty array plus console error
      when one of the validators is undefined`, () => {
    // Arrange
    const values = null;
    const validations: FullRecordValidationAsync[] = [
      {
        validation: values =>
          Promise.resolve({
            type: 'myrecordvalidation1',
            succeeded: false,
            message: '',
          }),
      },
      {
        validation: void 0,
      },
    ];

    const errorStub = jest
      .spyOn(global.console, 'error')
      .mockImplementation(() => {});

    // Act
    const result = fireRecordValidations(values, validations);

    // Assert
    expect(result).toBeDefined;
    expect(result.length).toBe(0);
    expect(errorStub).toHaveBeenCalled();
  });
});
