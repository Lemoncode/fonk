import { fireSingleFieldValidations } from './single-field-dispatcher';
import {
  FieldValidatorArgs,
  FullFieldValidationAsync,
  FieldValidationFunctionAsync,
} from '../model';

// TODO: we could check console log errors are spit out: https://stackoverflow.com/questions/44344801/how-to-use-jest-with-jsdom-to-test-console-log
describe('single-field-dispatcher', () => {
  describe('fireSingleFieldValidations', () => {
    it(`
        Spec #1
        When passing vm equals undefined, value equals undefined and validationsPerField equals undefined
        should return succeeded FieldValidationResult
      `, done => {
      //Arrange
      const values = undefined;
      const value = undefined;
      const validationsPerField = undefined;

      //Act
      const fieldValidationResultPromise = fireSingleFieldValidations(
        values,
        value,
        validationsPerField
      );

      // Assert
      fieldValidationResultPromise.then(fieldValidationResult => {
        expect(fieldValidationResult.succeeded).toBeTruthy();
        done();
      });
    });

    it(`
        Spec #2
        When passing vm equals undefined, value equals undefined and validationsPerField equals null
        should return succeeded FieldValidationResult
      `, done => {
      //Arrange
      const values = undefined;
      const value = undefined;
      const validationsPerField = null;

      //Act
      const fieldValidationResultPromise = fireSingleFieldValidations(
        values,
        value,
        validationsPerField
      );

      // Assert
      fieldValidationResultPromise.then(fieldValidationResult => {
        expect(fieldValidationResult.succeeded).toBeTruthy();
        done();
      });
    });

    it(`
        Spec #2.1
        When passing vm equals undefined, value equals undefined and validationsPerField is an empty array
        should return succeeded FieldValidationResult and calls to successful validation function
      `, done => {
      //Arrange
      const values = undefined;
      const value = undefined;
      const validationsPerField = null;

      //Act
      const fieldValidationResultPromise = fireSingleFieldValidations(
        values,
        value,
        validationsPerField
      );

      // Assert
      fieldValidationResultPromise.then(fieldValidationResult => {
        expect(fieldValidationResult.succeeded).toBeTruthy();
        done();
      });
    });

    it(`
    Spec #6
    When passing vm equals undefined, value equals undefined and validationsPerField equals array with one item
        equals failed validation function
        should return succeeded false FieldValidationResult and calls to successful validation function
        just passing full validation info async
      `, done => {
      //Arrange
      const values = undefined;
      const value = undefined;

      const validationFn = jest.fn().mockResolvedValue({
        errorMessage: '',
        succeeded: false,
        type: '',
        key: '',
      });

      const fullValidation: FullFieldValidationAsync = {
        validator: validationFn,
        customArgs: {},
        message: 'myError',
      };

      const validationsPerField: FullFieldValidationAsync[] = [fullValidation];

      //Act
      const fieldValidationResultPromise = fireSingleFieldValidations(
        values,
        value,
        validationsPerField
      );

      // Assert
      fieldValidationResultPromise.then(fieldValidationResult => {
        expect(fieldValidationResult.succeeded).toBeFalsy();
        expect(validationFn).toBeCalled();
        done();
      });
    });

    it(`
    Spec #7
      When passing vm equals undefined, value equals undefined and validationsPerField equals array with two items
      first equals failed validation function
      second equals failed validation function
      should return failed FieldValidationResult and calls only to first validation function
    `, done => {
      //Arrange
      const values = undefined;
      const value = undefined;

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

      const fullFieldValidationAsync1: FullFieldValidationAsync = {
        validator: validationFn1,
      };

      const fullFieldValidationAsync2: FullFieldValidationAsync = {
        validator: validationFn2,
      };

      const validationsPerField: FullFieldValidationAsync[] = [
        fullFieldValidationAsync1,
        fullFieldValidationAsync2,
      ];

      // Act
      const fieldValidationResultPromise = fireSingleFieldValidations(
        values,
        value,
        validationsPerField
      );

      // Assert
      fieldValidationResultPromise.then(fieldValidationResult => {
        expect(fieldValidationResult.succeeded).toBeFalsy();
        expect(validationFn1).toBeCalled();
        expect(validationFn2).not.toBeCalled();
        done();
      });
    });

    it(`
    Spec #8
      When passing vm equals undefined, value equals undefined and validationsPerField equals array with two items
      first equals failed validation function
      second equals success validation function
      should return failed FieldValidationResult and calls only to first validation function
    `, done => {
      //Arrange
      const values = undefined;
      const value = undefined;

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

      const fullFieldValidationAsync1: FullFieldValidationAsync = {
        validator: validationFn1,
      };

      const fullFieldValidationAsync2: FullFieldValidationAsync = {
        validator: validationFn2,
      };

      const validationsPerField: FullFieldValidationAsync[] = [
        fullFieldValidationAsync1,
        fullFieldValidationAsync2,
      ];

      // Act
      const fieldValidationResultPromise = fireSingleFieldValidations(
        values,
        value,
        validationsPerField
      );

      // Assert
      fieldValidationResultPromise.then(fieldValidationResult => {
        expect(fieldValidationResult.succeeded).toBeFalsy();
        expect(validationFn1).toBeCalled();
        expect(validationFn2).not.toBeCalled();
        done();
      });
    });

    it(`
    Spec #9
      When passing vm equals undefined, value equals undefined and validationsPerField equals array with two items
      first equals success validation function
      second equals failed validation function
      should return failed FieldValidationResult and calls only to first validation function
    `, done => {
      //Arrange
      const values = undefined;
      const value = undefined;

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

      const fullFieldValidationAsync1: FullFieldValidationAsync = {
        validator: validationFn1,
      };

      const fullFieldValidationAsync2: FullFieldValidationAsync = {
        validator: validationFn2,
      };

      const validationsPerField: FullFieldValidationAsync[] = [
        fullFieldValidationAsync1,
        fullFieldValidationAsync2,
      ];

      // Act
      const fieldValidationResultPromise = fireSingleFieldValidations(
        values,
        value,
        validationsPerField
      );

      // Assert
      fieldValidationResultPromise.then(fieldValidationResult => {
        expect(fieldValidationResult.succeeded).toBeFalsy();
        expect(validationFn1).toBeCalled();
        expect(validationFn2).toBeCalled();
        done();
      });
    });

    it(`
    Spec #10
      When passing vm equals undefined, value equals undefined and validationsPerField equals array with two items
      first equals success validation function
      second equals success validation function
      should return success FieldValidationResult and calls only to first validation function
    `, done => {
      //Arrange
      const values = undefined;
      const value = undefined;

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

      const fullFieldValidationAsync1: FullFieldValidationAsync = {
        validator: validationFn1,
      };

      const fullFieldValidationAsync2: FullFieldValidationAsync = {
        validator: validationFn2,
      };

      const validationsPerField: FullFieldValidationAsync[] = [
        fullFieldValidationAsync1,
        fullFieldValidationAsync2,
      ];

      // Act
      const fieldValidationResultPromise = fireSingleFieldValidations(
        values,
        value,
        validationsPerField
      );

      // Assert
      fieldValidationResultPromise.then(fieldValidationResult => {
        expect(fieldValidationResult.succeeded).toBeTruthy();
        expect(validationFn1).toBeCalled();
        expect(validationFn2).toBeCalled();
        done();
      });
    });

    // TODO: Review this, should just skip that faulty validator and just show warning/error in console?
    it(`
    Spec #11
      When passing vm equals undefined, value equals undefined and validationsPerField equals array with one items
      but returning undefined in the validator (wrong behavior)
      should return succeeded FieldValidationResult and calls to validation functions
      console.error should be called
    `, done => {
      //Arrange
      const values = undefined;
      const value = undefined;
      const errorStub = jest
        .spyOn(global.console, 'error')
        .mockImplementation(() => {});

      const validationFn1 = jest.fn().mockResolvedValue(void 0);

      const fullFieldValidationAsync1: FullFieldValidationAsync = {
        validator: validationFn1,
      };

      const validationsPerField: FullFieldValidationAsync[] = [
        fullFieldValidationAsync1,
      ];

      // Act
      const fieldValidationResultPromise = fireSingleFieldValidations(
        values,
        value,
        validationsPerField
      );

      // Assert
      fieldValidationResultPromise.then(fieldValidationResult => {
        expect(fieldValidationResult.succeeded).toBeTruthy();
        expect(validationFn1).toBeCalled();
        expect(errorStub).toHaveBeenCalled();
        done();
      });
    });

    // TODO: Review this, should just skip that faulty validator and just show warning/error in console?
    it(`
    Spec #12
      When passing vm equals undefined, value equals undefined and validationsPerField equals array with one item
      but returning null in the validator (wrong behavior)
      should return succeded FieldValidationResult and calls to validation functions
    `, done => {
      //Arrange
      const values = undefined;
      const value = undefined;

      const validationFn1 = jest.fn().mockResolvedValue(null);

      const fullFieldValidationAsync1: FullFieldValidationAsync = {
        validator: validationFn1,
      };

      const validationsPerField: FullFieldValidationAsync[] = [
        fullFieldValidationAsync1,
      ];

      const errorStub = jest
        .spyOn(global.console, 'error')
        .mockImplementation(() => {});

      // Act
      const fieldValidationResultPromise = fireSingleFieldValidations(
        values,
        value,
        validationsPerField
      );

      // Assert
      fieldValidationResultPromise.then(fieldValidationResult => {
        expect(fieldValidationResult.succeeded).toBeTruthy();
        expect(validationFn1).toBeCalled();
        expect(errorStub).toHaveBeenCalled();
        done();
      });
    });

    // Original Spec 12 (lc-form) check if assert makes sense
    it(`
    Spec #13
      When passing vm equals undefined, value equals undefined and validationsPerField equals array with one item
      equals validation function resolving a fieldValidationResult equals ""
      should return succeded FieldValidationResult and calls to validation functions and should display a console.error
    `, done => {
      //Arrange
      const values = undefined;
      const value = undefined;

      const validationFn1 = jest.fn().mockResolvedValue('');

      const fullFieldValidationAsync1: FullFieldValidationAsync = {
        validator: validationFn1,
      };

      const validationsPerField: FullFieldValidationAsync[] = [
        fullFieldValidationAsync1,
      ];

      const errorStub = jest
        .spyOn(global.console, 'error')
        .mockImplementation(() => {});

      // Act
      const fieldValidationResultPromise = fireSingleFieldValidations(
        values,
        value,
        validationsPerField
      );

      // Assert
      fieldValidationResultPromise.then(fieldValidationResult => {
        expect(fieldValidationResult.succeeded).toBeTruthy();
        expect(validationFn1).toBeCalled();
        expect(errorStub).toHaveBeenCalled();
        done();
      });
    });

    it(`
    Spec #13.1
      When passing vm equals undefined, value equals undefined and validationsPerField equals array with one item
      equals validation function resolving a fieldValidationResult equals "error"
      should return succeded FieldValidationResult and calls to validation functions, and it should display
      a console.error
    `, done => {
      //Arrange
      const values = undefined;
      const value = undefined;

      const validationFn1 = jest.fn().mockResolvedValue('error');

      const fullFieldValidationAsync1: FullFieldValidationAsync = {
        validator: validationFn1,
      };

      const validationsPerField: FullFieldValidationAsync[] = [
        fullFieldValidationAsync1,
      ];

      const errorStub = jest
        .spyOn(global.console, 'error')
        .mockImplementation(() => {});

      // Act
      const fieldValidationResultPromise = fireSingleFieldValidations(
        values,
        value,
        validationsPerField
      );

      // Assert
      fieldValidationResultPromise.then(fieldValidationResult => {
        expect(fieldValidationResult.succeeded).toBeTruthy();
        expect(validationFn1).toBeCalled();
        expect(errorStub).toHaveBeenCalled();
        done();
      });
    });

    it(`
    Spec #14.
      When passing vm equals undefined, value equals undefined and validationsPerField equals array with two items
      first equals validation function resolving a fieldValidationResult equals undefined
      second equals successful validation function
      should return succeded FieldValidationResult and calls to validation functions, and it should display
      a console.error
    `, done => {
      //Arrange
      const values = undefined;
      const value = undefined;

      const validationFn1 = jest.fn().mockResolvedValue(void 0);
      const validationFn2 = jest.fn().mockResolvedValue({
        errorMessage: '',
        succeeded: true,
        type: '',
        key: '',
      });

      const fullFieldValidationAsync1: FullFieldValidationAsync = {
        validator: validationFn1,
      };

      const fullFieldValidationAsync2: FullFieldValidationAsync = {
        validator: validationFn2,
      };

      const validationsPerField: FullFieldValidationAsync[] = [
        fullFieldValidationAsync1,
        fullFieldValidationAsync2,
      ];

      const errorStub = jest
        .spyOn(global.console, 'error')
        .mockImplementation(() => {});

      // Act
      const fieldValidationResultPromise = fireSingleFieldValidations(
        values,
        value,
        validationsPerField
      );

      // Assert
      fieldValidationResultPromise.then(fieldValidationResult => {
        expect(fieldValidationResult.succeeded).toBeTruthy();
        expect(validationFn1).toBeCalled();
        expect(validationFn2).toBeCalled();
        expect(errorStub).toHaveBeenCalled();
        done();
      });
    });

    it(`
    Spec #15.
      When passing vm equals undefined, value equals undefined and validationsPerField equals array with two items
      first equals validation function resolving a fieldValidationResult equals undefined
      second equals failed validation function
      should return failed FieldValidationResult and calls to validation functions, and it should display
      a console.error
    `, done => {
      //Arrange
      const values = undefined;
      const value = undefined;

      const validationFn1 = jest.fn().mockResolvedValue(void 0);
      const validationFn2 = jest.fn().mockResolvedValue({
        errorMessage: '',
        succeeded: false,
        type: '',
        key: '',
      });

      const fullFieldValidationAsync1: FullFieldValidationAsync = {
        validator: validationFn1,
      };

      const fullFieldValidationAsync2: FullFieldValidationAsync = {
        validator: validationFn2,
      };

      const validationsPerField: FullFieldValidationAsync[] = [
        fullFieldValidationAsync1,
        fullFieldValidationAsync2,
      ];

      const errorStub = jest
        .spyOn(global.console, 'error')
        .mockImplementation(() => {});

      // Act
      const fieldValidationResultPromise = fireSingleFieldValidations(
        values,
        value,
        validationsPerField
      );

      // Assert
      fieldValidationResultPromise.then(fieldValidationResult => {
        expect(fieldValidationResult.succeeded).toBeFalsy();
        expect(validationFn1).toBeCalled();
        expect(validationFn2).toBeCalled();
        expect(errorStub).toHaveBeenCalled();
        done();
      });
    });

    it(`
    Spec #16.
      When passing values equals undefined, value equals undefined and validationsPerField equals array with two items
      first equals failed validation function
      second equals validation function resolving a fieldValidationResult equals undefined
      should return failed FieldValidationResult (no console error since faulty validation is not
        executed)
    `, done => {
      //Arrange
      const values = undefined;
      const value = undefined;

      const validationFn1 = jest.fn().mockResolvedValue({
        errorMessage: '',
        succeeded: false,
        type: '',
        key: '',
      });
      const validationFn2 = jest.fn().mockResolvedValue(void 0);

      const fullFieldValidationAsync1: FullFieldValidationAsync = {
        validator: validationFn1,
      };

      const fullFieldValidationAsync2: FullFieldValidationAsync = {
        validator: validationFn2,
      };

      const validationsPerField: FullFieldValidationAsync[] = [
        fullFieldValidationAsync1,
        fullFieldValidationAsync2,
      ];

      // Act
      const fieldValidationResultPromise = fireSingleFieldValidations(
        values,
        value,
        validationsPerField
      );

      // Assert
      fieldValidationResultPromise.then(fieldValidationResult => {
        expect(fieldValidationResult.succeeded).toBeFalsy();
        expect(validationFn1).toBeCalled();
        expect(validationFn2).not.toBeCalled();
        done();
      });
    });

    it(`
    Spec #17.
      When passing vm equals undefined, value equals undefined and validationsPerField equals array with two items
      first equals successful validation function
      second equals validation function resolving a fieldValidationResult equals undefined
      should return succeeded FieldValidationResult and console error warning about faulty validator in form
    `, done => {
      //Arrange
      const values = undefined;
      const value = undefined;

      const validationFn1 = jest.fn().mockResolvedValue({
        errorMessage: '',
        succeeded: true,
        type: '',
        key: '',
      });
      const validationFn2 = jest.fn().mockResolvedValue(void 0);

      const fullFieldValidationAsync1: FullFieldValidationAsync = {
        validator: validationFn1,
      };

      const fullFieldValidationAsync2: FullFieldValidationAsync = {
        validator: validationFn2,
      };

      const validationsPerField: FullFieldValidationAsync[] = [
        fullFieldValidationAsync1,
        fullFieldValidationAsync2,
      ];

      const errorStub = jest
        .spyOn(global.console, 'error')
        .mockImplementation(() => {});

      // Act
      const fieldValidationResultPromise = fireSingleFieldValidations(
        values,
        value,
        validationsPerField
      );

      // Assert
      fieldValidationResultPromise.then(fieldValidationResult => {
        expect(fieldValidationResult.succeeded).toBeTruthy();
        expect(validationFn1).toBeCalled();
        expect(validationFn2).toBeCalled();
        expect(errorStub).toHaveBeenCalled();
        done();
      });
    });

    it(`
    Spec #18.
      should pass customArgs to its proper validationFunction and succeed
    `, done => {
      //Arrange
      const values = { a: 'foo', b: 'bar' };
      const value = 'new value';

      const validationFn1: FieldValidationFunctionAsync = ({ customArgs }) =>
        Promise.resolve({
          message: '',
          succeeded: customArgs.myCheck === 1 ? true : false,
          type: '',
          key: 'test1',
        });

      const customArgs1 = { myCheck: 1 };

      const fullFieldValidationAsync1: FullFieldValidationAsync = {
        validator: validationFn1,
        customArgs: customArgs1,
        message: 'my error message',
      };

      const validationsPerField: FullFieldValidationAsync[] = [
        fullFieldValidationAsync1,
      ];

      // Act
      const fieldValidationResultPromise = fireSingleFieldValidations(
        values,
        value,
        validationsPerField
      );

      // Assert
      fieldValidationResultPromise.then(fieldValidationResult => {
        expect(fieldValidationResult.succeeded).toBeTruthy();
        done();
      });
    });

    it(`
    Spec #18.1
      should pass customArgs to its proper validationFunction and failed
    `, done => {
      //Arrange
      const values = { a: 'foo', b: 'bar' };
      const value = 'new value';

      const validationFn1: FieldValidationFunctionAsync = jest
        .fn()
        .mockImplementation(({ customArgs }) =>
          Promise.resolve({
            message: '',
            succeeded: customArgs.myCheck === 1 ? true : false,
            type: '',
            key: 'test1',
          })
        );

      const customArgs1 = { myCheck: 0 };

      const fullFieldValidationAsync1: FullFieldValidationAsync = {
        validator: validationFn1,
        customArgs: customArgs1,
        message: 'my error message',
      };

      const validationsPerField: FullFieldValidationAsync[] = [
        fullFieldValidationAsync1,
      ];

      // Act
      const fieldValidationResultPromise = fireSingleFieldValidations(
        values,
        value,
        validationsPerField
      );

      // Assert
      fieldValidationResultPromise.then(fieldValidationResult => {
        expect(fieldValidationResult.succeeded).toBeFalsy();
        expect(validationFn1).toBeCalled();
        const fieldValidatorArgs: FieldValidatorArgs = {
          value,
          values,
          customArgs: customArgs1,
          message: 'my error message',
        };
        expect(validationFn1).toBeCalledWith(fieldValidatorArgs);

        done();
      });
    });

    it(`
    Spec #19.1
      should resolve first validation when it feeds 5 validations and first failed
    `, done => {
      //Arrange
      const values = { a: 'foo', b: 'bar' };
      const value = 'new value';

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

      const fullFieldValidationAsync1: FullFieldValidationAsync = {
        validator: validationFn1,
      };

      const fullFieldValidationAsync2: FullFieldValidationAsync = {
        validator: validationFn2,
      };

      const fullFieldValidationAsync3: FullFieldValidationAsync = {
        validator: validationFn3,
      };
      const fullFieldValidationAsync4: FullFieldValidationAsync = {
        validator: validationFn4,
      };
      const fullFieldValidationAsync5: FullFieldValidationAsync = {
        validator: validationFn5,
      };

      const validationsPerField: FullFieldValidationAsync[] = [
        fullFieldValidationAsync1,
        fullFieldValidationAsync2,
        fullFieldValidationAsync3,
        fullFieldValidationAsync4,
        fullFieldValidationAsync5,
      ];

      // Act
      const result = fireSingleFieldValidations(
        values,
        value,
        validationsPerField
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
    Spec #19.2
      should resolve third validation when it feeds 5 validations and third, fourth and fifth failed
    `, done => {
      //Arrange
      const values = { a: 'foo', b: 'bar' };
      const value = 'new value';

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

      const fullFieldValidationAsync1: FullFieldValidationAsync = {
        validator: validationFn1,
      };

      const fullFieldValidationAsync2: FullFieldValidationAsync = {
        validator: validationFn2,
      };

      const fullFieldValidationAsync3: FullFieldValidationAsync = {
        validator: validationFn3,
      };
      const fullFieldValidationAsync4: FullFieldValidationAsync = {
        validator: validationFn4,
      };
      const fullFieldValidationAsync5: FullFieldValidationAsync = {
        validator: validationFn5,
      };

      const validationsPerField: FullFieldValidationAsync[] = [
        fullFieldValidationAsync1,
        fullFieldValidationAsync2,
        fullFieldValidationAsync3,
        fullFieldValidationAsync4,
        fullFieldValidationAsync5,
      ];

      // Act
      const result = fireSingleFieldValidations(
        values,
        value,
        validationsPerField
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
    Spec #19.3
      should resolve fifth validation when it feeds 5 validations fifth failed
    `, done => {
      //Arrange
      const values = { a: 'foo', b: 'bar' };
      const value = 'new value';

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

      const fullFieldValidationAsync1: FullFieldValidationAsync = {
        validator: validationFn1,
      };

      const fullFieldValidationAsync2: FullFieldValidationAsync = {
        validator: validationFn2,
      };

      const fullFieldValidationAsync3: FullFieldValidationAsync = {
        validator: validationFn3,
      };
      const fullFieldValidationAsync4: FullFieldValidationAsync = {
        validator: validationFn4,
      };
      const fullFieldValidationAsync5: FullFieldValidationAsync = {
        validator: validationFn5,
      };

      const validationsPerField: FullFieldValidationAsync[] = [
        fullFieldValidationAsync1,
        fullFieldValidationAsync2,
        fullFieldValidationAsync3,
        fullFieldValidationAsync4,
        fullFieldValidationAsync5,
      ];

      // Act
      const result = fireSingleFieldValidations(
        values,
        value,
        validationsPerField
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
    Spec #19.4
      should resolve fifth validation when it feeds 5 successfully validations
    `, done => {
      //Arrange
      const values = { a: 'foo', b: 'bar' };
      const value = 'new value';

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

      const fullFieldValidationAsync1: FullFieldValidationAsync = {
        validator: validationFn1,
      };

      const fullFieldValidationAsync2: FullFieldValidationAsync = {
        validator: validationFn2,
      };

      const fullFieldValidationAsync3: FullFieldValidationAsync = {
        validator: validationFn3,
      };
      const fullFieldValidationAsync4: FullFieldValidationAsync = {
        validator: validationFn4,
      };
      const fullFieldValidationAsync5: FullFieldValidationAsync = {
        validator: validationFn5,
      };

      const validationsPerField: FullFieldValidationAsync[] = [
        fullFieldValidationAsync1,
        fullFieldValidationAsync2,
        fullFieldValidationAsync3,
        fullFieldValidationAsync4,
        fullFieldValidationAsync5,
      ];

      // Act
      const result = fireSingleFieldValidations(
        values,
        value,
        validationsPerField
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
