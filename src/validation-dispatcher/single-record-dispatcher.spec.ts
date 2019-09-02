import { fireSingleRecordValidations } from './single-record-dispatcher';
import {
  RecordValidatorArgs,
  RecordValidationFunctionAsync,
  InternalRecordValidation,
} from '../model';

describe('single-record-dispatcher', () => {
  describe('fireSingleRecordValidations', () => {
    it(`
        Spec #1
        When passing vm equals undefined, value equals undefined and internalRecordValidations equals undefined
        should return succeeded RecordValidationResult
      `, done => {
      //Arrange
      const values = undefined;
      const internalRecordValidations: InternalRecordValidation[] = undefined;

      //Act
      const recordValidationResultPromise = fireSingleRecordValidations(
        values,
        internalRecordValidations
      );

      // Assert
      recordValidationResultPromise.then(recordValidationResult => {
        expect(recordValidationResult.succeeded).toBeTruthy();
        done();
      });
    });

    it(`
        Spec #2
        When passing vm equals undefined, value equals undefined and internalRecordValidations equals null
        should return succeeded RecordValidationResult
      `, done => {
      //Arrange
      const values = undefined;
      const internalRecordValidations: InternalRecordValidation[] = null;

      //Act
      const recordValidationResultPromise = fireSingleRecordValidations(
        values,
        internalRecordValidations
      );

      // Assert
      recordValidationResultPromise.then(recordValidationResult => {
        expect(recordValidationResult.succeeded).toBeTruthy();
        done();
      });
    });

    it(`
        Spec #2.1
        When passing vm equals undefined, value equals undefined and internalRecordValidations is an empty array
        should return succeeded RecordValidationResult and calls to successful validation function
      `, done => {
      //Arrange
      const values = undefined;
      const internalRecordValidations: InternalRecordValidation[] = null;

      //Act
      const recordValidationResultPromise = fireSingleRecordValidations(
        values,
        internalRecordValidations
      );

      // Assert
      recordValidationResultPromise.then(recordValidationResult => {
        expect(recordValidationResult.succeeded).toBeTruthy();
        done();
      });
    });

    it(`
    Spec #6
    When passing vm equals undefined, value equals undefined and internalRecordValidations equals array with one item
        equals failed validation function
        should return succeeded false RecordValidationResult and calls to successful validation function
        just passing full validation info async
      `, done => {
      //Arrange
      const values = undefined;

      const validationFn = jest.fn().mockResolvedValue({
        errorMessage: '',
        succeeded: false,
        type: '',
        key: '',
      });

      const fullValidation: InternalRecordValidation = {
        validator: validationFn,
        message: 'myError',
      };

      const internalRecordValidations: InternalRecordValidation[] = [
        fullValidation,
      ];

      //Act
      const recordValidationResultPromise = fireSingleRecordValidations(
        values,
        internalRecordValidations
      );

      // Assert
      recordValidationResultPromise.then(recordValidationResult => {
        expect(recordValidationResult.succeeded).toBeFalsy();
        expect(validationFn).toBeCalled();
        done();
      });
    });

    it(`
    Spec #7
      When passing vm equals undefined, value equals undefined and internalRecordValidations equals array with two items
      first equals failed validation function
      second equals failed validation function
      should return failed RecordValidationResult and calls only to first validation function
    `, done => {
      //Arrange
      const values = undefined;

      const validationFn1 = jest.fn().mockResolvedValue({
        errorMessage: '',
        succeeded: false,
        type: '',
        key: '',
      });

      const validationFn2 = jest.fn().mockResolvedValue({
        errorMessage: '',
        succeeded: false,
        type: '',
        key: '',
      });

      const fullRecordValidationAsync1: InternalRecordValidation = {
        validator: validationFn1,
      };

      const fullRecordValidationAsync2: InternalRecordValidation = {
        validator: validationFn2,
      };

      const internalRecordValidations: InternalRecordValidation[] = [
        fullRecordValidationAsync1,
        fullRecordValidationAsync2,
      ];

      // Act
      const recordValidationResultPromise = fireSingleRecordValidations(
        values,
        internalRecordValidations
      );

      // Assert
      recordValidationResultPromise.then(recordValidationResult => {
        expect(recordValidationResult.succeeded).toBeFalsy();
        expect(validationFn1).toBeCalled();
        expect(validationFn2).not.toBeCalled();
        done();
      });
    });

    it(`
    Spec #8
      When passing vm equals undefined, value equals undefined and internalRecordValidations equals array with two items
      first equals failed validation function
      second equals success validation function
      should return failed RecordValidationResult and calls only to first validation function
    `, done => {
      //Arrange
      const values = undefined;

      const validationFn1 = jest.fn().mockResolvedValue({
        errorMessage: '',
        succeeded: false,
        type: '',
        key: '',
      });

      const validationFn2 = jest.fn().mockResolvedValue({
        errorMessage: '',
        succeeded: true,
        type: '',
        key: '',
      });

      const fullRecordValidationAsync1: InternalRecordValidation = {
        validator: validationFn1,
      };

      const fullRecordValidationAsync2: InternalRecordValidation = {
        validator: validationFn2,
      };

      const internalRecordValidations: InternalRecordValidation[] = [
        fullRecordValidationAsync1,
        fullRecordValidationAsync2,
      ];

      // Act
      const recordValidationResultPromise = fireSingleRecordValidations(
        values,
        internalRecordValidations
      );

      // Assert
      recordValidationResultPromise.then(recordValidationResult => {
        expect(recordValidationResult.succeeded).toBeFalsy();
        expect(validationFn1).toBeCalled();
        expect(validationFn2).not.toBeCalled();
        done();
      });
    });

    it(`
    Spec #9
      When passing vm equals undefined, value equals undefined and internalRecordValidations equals array with two items
      first equals success validation function
      second equals failed validation function
      should return failed RecordValidationResult and calls only to first validation function
    `, done => {
      //Arrange
      const values = undefined;

      const validationFn1 = jest.fn().mockResolvedValue({
        errorMessage: '',
        succeeded: true,
        type: '',
        key: '',
      });

      const validationFn2 = jest.fn().mockResolvedValue({
        errorMessage: '',
        succeeded: false,
        type: '',
        key: '',
      });

      const fullRecordValidationAsync1: InternalRecordValidation = {
        validator: validationFn1,
      };

      const fullRecordValidationAsync2: InternalRecordValidation = {
        validator: validationFn2,
      };

      const internalRecordValidations: InternalRecordValidation[] = [
        fullRecordValidationAsync1,
        fullRecordValidationAsync2,
      ];

      // Act
      const recordValidationResultPromise = fireSingleRecordValidations(
        values,
        internalRecordValidations
      );

      // Assert
      recordValidationResultPromise.then(recordValidationResult => {
        expect(recordValidationResult.succeeded).toBeFalsy();
        expect(validationFn1).toBeCalled();
        expect(validationFn2).toBeCalled();
        done();
      });
    });

    it(`
    Spec #10
      When passing vm equals undefined, value equals undefined and internalRecordValidations equals array with two items
      first equals success validation function
      second equals success validation function
      should return success RecordValidationResult and calls only to first validation function
    `, done => {
      //Arrange
      const values = undefined;

      const validationFn1 = jest.fn().mockResolvedValue({
        errorMessage: '',
        succeeded: true,
        type: '',
        key: '',
      });

      const validationFn2 = jest.fn().mockResolvedValue({
        errorMessage: '',
        succeeded: true,
        type: '',
        key: '',
      });

      const fullRecordValidationAsync1: InternalRecordValidation = {
        validator: validationFn1,
      };

      const fullRecordValidationAsync2: InternalRecordValidation = {
        validator: validationFn2,
      };

      const internalRecordValidations: InternalRecordValidation[] = [
        fullRecordValidationAsync1,
        fullRecordValidationAsync2,
      ];

      // Act
      const recordValidationResultPromise = fireSingleRecordValidations(
        values,
        internalRecordValidations
      );

      // Assert
      recordValidationResultPromise.then(recordValidationResult => {
        expect(recordValidationResult.succeeded).toBeTruthy();
        expect(validationFn1).toBeCalled();
        expect(validationFn2).toBeCalled();
        done();
      });
    });

    // TODO: Review this, should just skip that faulty validator and just show warning/error in console?
    it(`
    Spec #11
      When passing vm equals undefined, value equals undefined and internalRecordValidations equals array with one items
      but returning undefined in the validator (wrong behavior)
      should return succeeded RecordValidationResult and calls to validation functions
      console.error should be called
    `, done => {
      //Arrange
      const values = undefined;
      const errorStub = jest
        .spyOn(global.console, 'error')
        .mockImplementation(() => {});

      const validationFn1 = jest.fn().mockResolvedValue(void 0);

      const fullRecordValidationAsync1: InternalRecordValidation = {
        validator: validationFn1,
      };

      const internalRecordValidations: InternalRecordValidation[] = [
        fullRecordValidationAsync1,
      ];

      // Act
      const recordValidationResultPromise = fireSingleRecordValidations(
        values,
        internalRecordValidations
      );

      // Assert
      recordValidationResultPromise.then(recordValidationResult => {
        expect(recordValidationResult.succeeded).toBeTruthy();
        expect(validationFn1).toBeCalled();
        expect(errorStub).toHaveBeenCalled();
        done();
      });
    });

    // TODO: Review this, should just skip that faulty validator and just show warning/error in console?
    it(`
    Spec #12
      When passing vm equals undefined, value equals undefined and internalRecordValidations equals array with one item
      but returning null in the validator (wrong behavior)
      should return succeded RecordValidationResult and calls to validation functions
    `, done => {
      //Arrange
      const values = undefined;

      const validationFn1 = jest.fn().mockResolvedValue(null);

      const fullRecordValidationAsync1: InternalRecordValidation = {
        validator: validationFn1,
      };

      const internalRecordValidations: InternalRecordValidation[] = [
        fullRecordValidationAsync1,
      ];

      const errorStub = jest
        .spyOn(global.console, 'error')
        .mockImplementation(() => {});

      // Act
      const recordValidationResultPromise = fireSingleRecordValidations(
        values,
        internalRecordValidations
      );

      // Assert
      recordValidationResultPromise.then(recordValidationResult => {
        expect(recordValidationResult.succeeded).toBeTruthy();
        expect(validationFn1).toBeCalled();
        expect(errorStub).toHaveBeenCalled();
        done();
      });
    });

    // Original Spec 12 (lc-form) check if assert makes sense
    it(`
    Spec #13
      When passing vm equals undefined, value equals undefined and internalRecordValidations equals array with one item
      equals validation function resolving a recordValidationResult equals ""
      should return succeded RecordValidationResult and calls to validation functions and should display a console.error
    `, done => {
      //Arrange
      const values = undefined;

      const validationFn1 = jest.fn().mockResolvedValue('');

      const fullRecordValidationAsync1: InternalRecordValidation = {
        validator: validationFn1,
      };

      const internalRecordValidations: InternalRecordValidation[] = [
        fullRecordValidationAsync1,
      ];

      const errorStub = jest
        .spyOn(global.console, 'error')
        .mockImplementation(() => {});

      // Act
      const recordValidationResultPromise = fireSingleRecordValidations(
        values,
        internalRecordValidations
      );

      // Assert
      recordValidationResultPromise.then(recordValidationResult => {
        expect(recordValidationResult.succeeded).toBeTruthy();
        expect(validationFn1).toBeCalled();
        expect(errorStub).toHaveBeenCalled();
        done();
      });
    });

    it(`
    Spec #13.1
      When passing vm equals undefined, value equals undefined and internalRecordValidations equals array with one item
      equals validation function resolving a recordValidationResult equals "error"
      should return succeded RecordValidationResult and calls to validation functions, and it should display
      a console.error
    `, done => {
      //Arrange
      const values = undefined;

      const validationFn1 = jest.fn().mockResolvedValue('error');

      const fullRecordValidationAsync1: InternalRecordValidation = {
        validator: validationFn1,
      };

      const internalRecordValidations: InternalRecordValidation[] = [
        fullRecordValidationAsync1,
      ];

      const errorStub = jest
        .spyOn(global.console, 'error')
        .mockImplementation(() => {});

      // Act
      const recordValidationResultPromise = fireSingleRecordValidations(
        values,
        internalRecordValidations
      );

      // Assert
      recordValidationResultPromise.then(recordValidationResult => {
        expect(recordValidationResult.succeeded).toBeTruthy();
        expect(validationFn1).toBeCalled();
        expect(errorStub).toHaveBeenCalled();
        done();
      });
    });

    it(`
    Spec #14.
      When passing vm equals undefined, value equals undefined and internalRecordValidations equals array with two items
      first equals validation function resolving a recordValidationResult equals undefined
      second equals successful validation function
      should return succeded RecordValidationResult and calls to validation functions, and it should display
      a console.error
    `, done => {
      //Arrange
      const values = undefined;

      const validationFn1 = jest.fn().mockResolvedValue(void 0);
      const validationFn2 = jest.fn().mockResolvedValue({
        errorMessage: '',
        succeeded: true,
        type: '',
        key: '',
      });

      const fullRecordValidationAsync1: InternalRecordValidation = {
        validator: validationFn1,
      };

      const fullRecordValidationAsync2: InternalRecordValidation = {
        validator: validationFn2,
      };

      const internalRecordValidations: InternalRecordValidation[] = [
        fullRecordValidationAsync1,
        fullRecordValidationAsync2,
      ];

      const errorStub = jest
        .spyOn(global.console, 'error')
        .mockImplementation(() => {});

      // Act
      const recordValidationResultPromise = fireSingleRecordValidations(
        values,
        internalRecordValidations
      );

      // Assert
      recordValidationResultPromise.then(recordValidationResult => {
        expect(recordValidationResult.succeeded).toBeTruthy();
        expect(validationFn1).toBeCalled();
        expect(validationFn2).toBeCalled();
        expect(errorStub).toHaveBeenCalled();
        done();
      });
    });

    it(`
    Spec #15.
      When passing vm equals undefined, value equals undefined and internalRecordValidations equals array with two items
      first equals validation function resolving a recordValidationResult equals undefined
      second equals failed validation function
      should return failed RecordValidationResult and calls to validation functions, and it should display
      a console.error
    `, done => {
      //Arrange
      const values = undefined;

      const validationFn1 = jest.fn().mockResolvedValue(void 0);
      const validationFn2 = jest.fn().mockResolvedValue({
        errorMessage: '',
        succeeded: false,
        type: '',
        key: '',
      });

      const fullRecordValidationAsync1: InternalRecordValidation = {
        validator: validationFn1,
      };

      const fullRecordValidationAsync2: InternalRecordValidation = {
        validator: validationFn2,
      };

      const internalRecordValidations: InternalRecordValidation[] = [
        fullRecordValidationAsync1,
        fullRecordValidationAsync2,
      ];

      const errorStub = jest
        .spyOn(global.console, 'error')
        .mockImplementation(() => {});

      // Act
      const recordValidationResultPromise = fireSingleRecordValidations(
        values,
        internalRecordValidations
      );

      // Assert
      recordValidationResultPromise.then(recordValidationResult => {
        expect(recordValidationResult.succeeded).toBeFalsy();
        expect(validationFn1).toBeCalled();
        expect(validationFn2).toBeCalled();
        expect(errorStub).toHaveBeenCalled();
        done();
      });
    });

    it(`
    Spec #16.
      When passing values equals undefined, value equals undefined and internalRecordValidations equals array with two items
      first equals failed validation function
      second equals validation function resolving a recordValidationResult equals undefined
      should return failed RecordValidationResult (no console error since faulty validation is not
        executed)
    `, done => {
      //Arrange
      const values = undefined;

      const validationFn1 = jest.fn().mockResolvedValue({
        errorMessage: '',
        succeeded: false,
        type: '',
        key: '',
      });
      const validationFn2 = jest.fn().mockResolvedValue(void 0);

      const fullRecordValidationAsync1: InternalRecordValidation = {
        validator: validationFn1,
      };

      const fullRecordValidationAsync2: InternalRecordValidation = {
        validator: validationFn2,
      };

      const internalRecordValidations: InternalRecordValidation[] = [
        fullRecordValidationAsync1,
        fullRecordValidationAsync2,
      ];

      // Act
      const recordValidationResultPromise = fireSingleRecordValidations(
        values,
        internalRecordValidations
      );

      // Assert
      recordValidationResultPromise.then(recordValidationResult => {
        expect(recordValidationResult.succeeded).toBeFalsy();
        expect(validationFn1).toBeCalled();
        expect(validationFn2).not.toBeCalled();
        done();
      });
    });

    it(`
    Spec #17.
      When passing vm equals undefined, value equals undefined and internalRecordValidations equals array with two items
      first equals successful validation function
      second equals validation function resolving a recordValidationResult equals undefined
      should return succeeded RecordValidationResult and console error warning about faulty validator in form
    `, done => {
      //Arrange
      const values = undefined;

      const validationFn1 = jest.fn().mockResolvedValue({
        errorMessage: '',
        succeeded: true,
        type: '',
        key: '',
      });
      const validationFn2 = jest.fn().mockResolvedValue(void 0);

      const fullRecordValidationAsync1: InternalRecordValidation = {
        validator: validationFn1,
      };

      const fullRecordValidationAsync2: InternalRecordValidation = {
        validator: validationFn2,
      };

      const internalRecordValidations: InternalRecordValidation[] = [
        fullRecordValidationAsync1,
        fullRecordValidationAsync2,
      ];

      const errorStub = jest
        .spyOn(global.console, 'error')
        .mockImplementation(() => {});

      // Act
      const recordValidationResultPromise = fireSingleRecordValidations(
        values,
        internalRecordValidations
      );

      // Assert
      recordValidationResultPromise.then(recordValidationResult => {
        expect(recordValidationResult.succeeded).toBeTruthy();
        expect(validationFn1).toBeCalled();
        expect(validationFn2).toBeCalled();
        expect(errorStub).toHaveBeenCalled();
        done();
      });
    });

    it(`
    Spec #18.1
      should resolve first validation when it feeds 5 validations and first failed
    `, done => {
      //Arrange
      const values = { a: 'foo', b: 'bar' };

      const createValidationFn = (key, succeeded, timeout) =>
        jest.fn().mockImplementation(
          () =>
            new Promise(resolve =>
              setTimeout(
                () =>
                  resolve({
                    errorMessage: '',
                    succeeded,
                    type: '',
                    key,
                  }),
                timeout
              )
            )
        );

      const validationFn1 = createValidationFn('key1', false, 100);
      const validationFn2 = createValidationFn('key2', true, 50);
      const validationFn3 = createValidationFn('key3', true, 25);
      const validationFn4 = createValidationFn('key4', true, 30);
      const validationFn5 = createValidationFn('key5', true, 50);

      const fullRecordValidationAsync1: InternalRecordValidation = {
        validator: validationFn1,
      };

      const fullRecordValidationAsync2: InternalRecordValidation = {
        validator: validationFn2,
      };

      const fullRecordValidationAsync3: InternalRecordValidation = {
        validator: validationFn3,
      };
      const fullRecordValidationAsync4: InternalRecordValidation = {
        validator: validationFn4,
      };
      const fullRecordValidationAsync5: InternalRecordValidation = {
        validator: validationFn5,
      };

      const internalRecordValidations: InternalRecordValidation[] = [
        fullRecordValidationAsync1,
        fullRecordValidationAsync2,
        fullRecordValidationAsync3,
        fullRecordValidationAsync4,
        fullRecordValidationAsync5,
      ];

      // Act
      const result = fireSingleRecordValidations(
        values,
        internalRecordValidations
      );

      // Assert
      result.then(validationResult => {
        expect(validationResult.key).toEqual('key1');
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationFn1).toHaveBeenCalled();
        expect(validationFn2).not.toHaveBeenCalled();
        expect(validationFn3).not.toHaveBeenCalled();
        expect(validationFn4).not.toHaveBeenCalled();
        expect(validationFn5).not.toHaveBeenCalled();

        done();
      });
    });

    it(`
    Spec #18.2
      should resolve third validation when it feeds 5 validations and third, fourth and fifth failed
    `, done => {
      //Arrange
      const values = { a: 'foo', b: 'bar' };

      const createValidationFn = (key, succeeded, timeout) =>
        jest.fn().mockImplementation(
          () =>
            new Promise(resolve =>
              setTimeout(
                () =>
                  resolve({
                    errorMessage: '',
                    succeeded,
                    type: '',
                    key,
                  }),
                timeout
              )
            )
        );

      const validationFn1 = createValidationFn('key1', true, 100);
      const validationFn2 = createValidationFn('key2', true, 50);
      const validationFn3 = createValidationFn('key3', false, 20);
      const validationFn4 = createValidationFn('key4', false, 30);
      const validationFn5 = createValidationFn('key5', false, 50);

      const fullRecordValidationAsync1: InternalRecordValidation = {
        validator: validationFn1,
      };

      const fullRecordValidationAsync2: InternalRecordValidation = {
        validator: validationFn2,
      };

      const fullRecordValidationAsync3: InternalRecordValidation = {
        validator: validationFn3,
      };
      const fullRecordValidationAsync4: InternalRecordValidation = {
        validator: validationFn4,
      };
      const fullRecordValidationAsync5: InternalRecordValidation = {
        validator: validationFn5,
      };

      const internalRecordValidations: InternalRecordValidation[] = [
        fullRecordValidationAsync1,
        fullRecordValidationAsync2,
        fullRecordValidationAsync3,
        fullRecordValidationAsync4,
        fullRecordValidationAsync5,
      ];

      // Act
      const result = fireSingleRecordValidations(
        values,
        internalRecordValidations
      );

      // Assert
      result.then(validationResult => {
        expect(validationResult.key).toEqual('key3');
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationFn1).toHaveBeenCalled();
        expect(validationFn2).toHaveBeenCalled();
        expect(validationFn3).toHaveBeenCalled();
        expect(validationFn4).not.toHaveBeenCalled();
        expect(validationFn5).not.toHaveBeenCalled();

        done();
      });
    });

    it(`
    Spec #18.3
      should resolve fifth validation when it feeds 5 validations fifth failed
    `, done => {
      //Arrange
      const values = { a: 'foo', b: 'bar' };

      const createValidationFn = (key, succeeded, timeout) =>
        jest.fn().mockImplementation(
          () =>
            new Promise(resolve =>
              setTimeout(
                () =>
                  resolve({
                    errorMessage: '',
                    succeeded,
                    type: '',
                    key,
                  }),
                timeout
              )
            )
        );

      const validationFn1 = createValidationFn('key1', true, 100);
      const validationFn2 = createValidationFn('key2', true, 50);
      const validationFn3 = createValidationFn('key3', true, 25);
      const validationFn4 = createValidationFn('key4', true, 30);
      const validationFn5 = createValidationFn('key5', false, 50);

      const fullRecordValidationAsync1: InternalRecordValidation = {
        validator: validationFn1,
      };

      const fullRecordValidationAsync2: InternalRecordValidation = {
        validator: validationFn2,
      };

      const fullRecordValidationAsync3: InternalRecordValidation = {
        validator: validationFn3,
      };
      const fullRecordValidationAsync4: InternalRecordValidation = {
        validator: validationFn4,
      };
      const fullRecordValidationAsync5: InternalRecordValidation = {
        validator: validationFn5,
      };

      const internalRecordValidations: InternalRecordValidation[] = [
        fullRecordValidationAsync1,
        fullRecordValidationAsync2,
        fullRecordValidationAsync3,
        fullRecordValidationAsync4,
        fullRecordValidationAsync5,
      ];

      // Act
      const result = fireSingleRecordValidations(
        values,
        internalRecordValidations
      );

      // Assert
      result.then(validationResult => {
        expect(validationResult.key).toEqual('key5');
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationFn1).toHaveBeenCalled();
        expect(validationFn2).toHaveBeenCalled();
        expect(validationFn3).toHaveBeenCalled();
        expect(validationFn4).toHaveBeenCalled();
        expect(validationFn5).toHaveBeenCalled();

        done();
      });
    });

    it(`
    Spec #18.4
      should resolve fifth validation when it feeds 5 successfully validations
    `, done => {
      //Arrange
      const values = { a: 'foo', b: 'bar' };

      const createValidationFn = (key, succeeded, timeout) =>
        jest.fn().mockImplementation(
          () =>
            new Promise(resolve =>
              setTimeout(
                () =>
                  resolve({
                    errorMessage: '',
                    succeeded,
                    type: '',
                    key,
                  }),
                timeout
              )
            )
        );

      const validationFn1 = createValidationFn('key1', true, 100);
      const validationFn2 = createValidationFn('key2', true, 50);
      const validationFn3 = createValidationFn('key3', true, 25);
      const validationFn4 = createValidationFn('key4', true, 30);
      const validationFn5 = createValidationFn('key5', true, 50);

      const fullRecordValidationAsync1: InternalRecordValidation = {
        validator: validationFn1,
      };

      const fullRecordValidationAsync2: InternalRecordValidation = {
        validator: validationFn2,
      };

      const fullRecordValidationAsync3: InternalRecordValidation = {
        validator: validationFn3,
      };
      const fullRecordValidationAsync4: InternalRecordValidation = {
        validator: validationFn4,
      };
      const fullRecordValidationAsync5: InternalRecordValidation = {
        validator: validationFn5,
      };

      const internalRecordValidations: InternalRecordValidation[] = [
        fullRecordValidationAsync1,
        fullRecordValidationAsync2,
        fullRecordValidationAsync3,
        fullRecordValidationAsync4,
        fullRecordValidationAsync5,
      ];

      // Act
      const result = fireSingleRecordValidations(
        values,
        internalRecordValidations
      );

      // Assert
      result.then(validationResult => {
        expect(validationResult.key).toEqual('key5');
        expect(validationResult.succeeded).toBeTruthy();
        expect(validationFn1).toHaveBeenCalled();
        expect(validationFn2).toHaveBeenCalled();
        expect(validationFn3).toHaveBeenCalled();
        expect(validationFn4).toHaveBeenCalled();
        expect(validationFn5).toHaveBeenCalled();

        done();
      });
    });
  });
});
