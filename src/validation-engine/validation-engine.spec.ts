import { ValidationEngine } from './validation-engine';
import {
  ValidationResult,
  FieldValidationFunctionSyncAsync,
  FullRecordValidation,
  FullFieldValidation,
  FullFieldValidationAsync,
  FullRecordValidationAsync,
} from '../model';
import { recordFormValidationId } from '../const';

describe('ValidationEngine tests', () => {
  describe('AddFieldValidation', () => {
    it(`Should fire the added validation (async flavour) and succeed
        when adding a validation to a given field and firing validation
        on that field
    `, done => {
      // Arrange
      const validationEngine: ValidationEngine = new ValidationEngine();
      const values = [{ username: 'john', lastname: 'doe' }];

      const validationFn = (value): Promise<ValidationResult> => {
        const promise = new Promise<ValidationResult>((resolve, reject) => {
          setTimeout(() => {
            resolve({
              key: 'username',
              type: 'REQUIRED',
              succeeded: true,
              message: '',
            });
          }, 500);
        });
        return promise;
      };

      const fullFieldValidation: FullFieldValidationAsync = {
        validator: validationFn,
      };

      // Act
      validationEngine.addFieldValidation('username', fullFieldValidation);

      validationEngine
        .validateField('username', 'newContent', values)
        .then(validationResult => {
          // Assert
          expect(validationResult.succeeded).toBeTruthy();
          expect(validationResult.type).toBe('REQUIRED');
          done();
        });
    });
    it(`Should not fire the added validation on first
        when adding a validation to a given field and firing validation
        on another field, sync
    `, done => {
      // Arrange
      const validationEngine: ValidationEngine = new ValidationEngine();
      const values = [{ username: 'john', lastname: 'doe' }];

      const validationFn = jest.fn().mockResolvedValue({
        key: 'username',
        type: 'REQUIRED',
        succeeded: true,
        message: '',
      });

      const fullFieldValidation: FullFieldValidationAsync = {
        validator: validationFn,
      };

      // Act
      validationEngine.addFieldValidation('username', fullFieldValidation);

      validationEngine
        .validateField('lastname', 'sellers', values)
        .then(validationResult => {
          // Assert
          expect(validationFn).not.toHaveBeenCalled();
          expect(validationResult.key).toBe('');
          expect(validationResult.succeeded).toBeTruthy();
          done();
        });
    });

    it(`Should not fire the added validation on first instance then on second run fire and succeed
        when adding a validation to a given field and firing validation
        on another field, after than firing on the expected field.
    `, done => {
      // Arrange
      const validationEngine: ValidationEngine = new ValidationEngine();
      const values = [{ username: 'john', lastname: 'doe' }];

      const validationFn = jest.fn().mockResolvedValue({
        key: 'username',
        type: 'REQUIRED',
        succeeded: true,
        message: '',
      });

      const fullFieldValidation: FullFieldValidationAsync = {
        validator: validationFn,
      };

      // Act
      validationEngine.addFieldValidation('username', fullFieldValidation);

      validationEngine
        .validateField('lastname', 'sellers', values)
        .then(validationResult => {
          // Assert
          expect(validationFn).not.toHaveBeenCalled();
          validationEngine
            .validateField('username', 'Mary', values)
            .then(validationResult => {
              expect(validationFn).toHaveBeenCalled();
              expect(validationResult.succeeded).toBeTruthy();
              expect(validationResult.type).toBe('REQUIRED');
              expect(validationResult);
            });
          done();
        });
    });
    it(`Should fire the added validation
    when calling ValidateForm`, done => {
      // Arrange
      const validationEngine: ValidationEngine = new ValidationEngine();
      const values = [{ username: 'john', lastname: 'doe' }];
      const validationFn = jest.fn().mockResolvedValue({
        key: 'username',
        type: 'REQUIRED',
        succeeded: true,
        message: '',
      });

      const fullFieldValidation: FullFieldValidationAsync = {
        validator: validationFn,
      };

      // Act
      validationEngine.addFieldValidation('username', fullFieldValidation);

      validationEngine.validateForm(values).then(validationResult => {
        // Assert
        expect(validationFn).toHaveBeenCalled();
        expect(validationResult.succeeded).toBeTruthy();
        // HERE
        //expect(validationEngine.)
        done();
      });
    });
  });

  describe('addRecordValidation', () => {
    it(`Should fire the added form validation (async) when calling
      fire all validations and return succeeded
    `, done => {
      // Arrange
      const validationEngine: ValidationEngine = new ValidationEngine();
      const values = [{ username: 'john', lastname: 'doe' }];
      const validationFn = jest.fn().mockResolvedValue({
        key: '',
        type: '',
        succeeded: true,
        message: '',
      });

      const recordValidation: FullRecordValidationAsync = {
        validation: validationFn,
      };

      // Act
      validationEngine.addRecordValidation(recordValidation);

      validationEngine.validateForm(values).then(validationResult => {
        // Assert
        expect(validationFn).toHaveBeenCalled();
        expect(validationResult.succeeded).toBeTruthy();
        expect(validationResult.recordErrors.length).toBe(0);
        done();
      });
    });

    it(`Should fire the added form validation (async) when calling
      fire all validations and return failed and formvalidation in the queue
    `, done => {
      // Arrange
      const validationEngine: ValidationEngine = new ValidationEngine();
      const values = [{ username: 'john', lastname: 'doe' }];
      const validationFn = jest.fn().mockResolvedValue({
        key: '',
        type: '',
        succeeded: false,
        message: '',
      });

      const recordValidation: FullRecordValidationAsync = {
        validation: validationFn,
      };

      // Act
      validationEngine.addRecordValidation(recordValidation);

      validationEngine.validateForm(values).then(validationResult => {
        // Assert
        expect(validationFn).toHaveBeenCalled();
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.recordErrors.length).toBe(1);
        expect(validationResult.recordErrors[0].key).toBe(
          recordFormValidationId
        );
        done();
      });
    });

    it(`Should fire the two added form validation (succeeded) when calling
      fire all validations
    `, done => {
      // Arrange
      const validationEngine: ValidationEngine = new ValidationEngine();
      const values = [{ username: 'john', lastname: 'doe' }];
      const validationFn1 = jest.fn().mockResolvedValue({
        key: '',
        type: '',
        succeeded: true,
        message: '',
      });

      const validationFn2 = jest.fn().mockResolvedValue({
        key: '',
        type: '',
        succeeded: true,
        message: '',
      });

      const recordValidation1: FullRecordValidationAsync = {
        validation: validationFn1,
      };

      const recordValidation2: FullRecordValidationAsync = {
        validation: validationFn2,
      };

      // Act
      validationEngine.addRecordValidation(recordValidation1);
      validationEngine.addRecordValidation(recordValidation2);

      validationEngine.validateForm(values).then(validationResult => {
        // Assert
        expect(validationFn1).toHaveBeenCalled();
        expect(validationFn2).toHaveBeenCalled();
        expect(validationResult.succeeded).toBeTruthy();
        expect(validationResult.recordErrors.length).toBe(0);
        done();
      });
    });

    it(`Should fire the two added form validation (failed first), but only failed validation
    in the form result list. when first form validation fails, second succeeds
    `, done => {
      // Arrange
      const validationEngine: ValidationEngine = new ValidationEngine();
      const values = [{ username: 'john', lastname: 'doe' }];
      const validationFn1 = jest.fn().mockResolvedValue({
        key: '',
        type: '',
        succeeded: false,
        message: '',
      });

      const validationFn2 = jest.fn().mockResolvedValue({
        key: '',
        type: '',
        succeeded: true,
        message: '',
      });

      const recordValidation1: FullRecordValidationAsync = {
        validation: validationFn1,
      };

      const recordValidation2: FullRecordValidationAsync = {
        validation: validationFn2,
      };

      // Act
      validationEngine.addRecordValidation(recordValidation1);
      validationEngine.addRecordValidation(recordValidation2);

      validationEngine.validateForm(values).then(validationResult => {
        // Assert
        expect(validationFn1).toHaveBeenCalled();
        expect(validationFn2).toHaveBeenCalled();
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.recordErrors.length).toBe(1);
        done();
      });
    });

    it(`Should fire the two added form validation (both failed), adn both in
    the form validation result
      fire all validations, and first form validation fails, second fails
    `, done => {
      // Arrange
      const validationEngine: ValidationEngine = new ValidationEngine();
      const values = [{ username: 'john', lastname: 'doe' }];
      const validationFn1 = jest.fn().mockResolvedValue({
        key: '',
        type: '',
        succeeded: false,
        message: '',
      });

      const validationFn2 = jest.fn().mockResolvedValue({
        key: '',
        type: '',
        succeeded: false,
        message: '',
      });

      const recordValidation1: FullRecordValidationAsync = {
        validation: validationFn1,
      };

      const recordValidation2: FullRecordValidationAsync = {
        validation: validationFn2,
      };

      // Act
      validationEngine.addRecordValidation(recordValidation1);
      validationEngine.addRecordValidation(recordValidation2);

      validationEngine.validateForm(values).then(validationResult => {
        // Assert
        expect(validationFn1).toHaveBeenCalled();
        expect(validationFn2).toHaveBeenCalled();
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.recordErrors.length).toBe(2);
        done();
      });
    });

    it(`Should not fire the added form validation when calling
      fire field validations
    `, done => {
      // Arrange
      const validationEngine: ValidationEngine = new ValidationEngine();
      const values = [{ username: 'john', lastname: 'doe' }];
      const validationFn = jest.fn().mockResolvedValue({
        key: '',
        type: '',
        succeeded: false,
        customArgs: {},
        message: '',
      });

      const recordValidation: FullRecordValidationAsync = {
        validation: validationFn,
      };

      // Act
      validationEngine.addRecordValidation(recordValidation);

      validationEngine
        .validateField('username', 'John', values)
        .then(validationResult => {
          // Assert
          expect(validationFn).not.toHaveBeenCalled();
          expect(validationResult.succeeded).toBeTruthy();
          done();
        });
    });

    it(`Should fire the added validation (async flavour) and display
    a customized message
    when adding a validation and indicating customized message in
    the addFieldValidation function`, done => {
      // Arrange
      const validationEngine: ValidationEngine = new ValidationEngine();
      const values = [{ username: 'john', lastname: 'doe' }];

      const validationFn = (
        values: any,
        value: any,
        customArgs: object,
        errorMessage?: string
      ): Promise<ValidationResult> => {
        const promise = new Promise<ValidationResult>((resolve, reject) => {
          setTimeout(() => {
            resolve({
              key: 'username',
              type: 'REQUIRED',
              succeeded: false,
              message: errorMessage ? errorMessage : '',
            });
          }, 500);
        });
        return promise;
      };

      const fullFieldValidation: FullFieldValidationAsync = {
        validator: validationFn,
        customArgs: {},
        message: 'my custom message',
      };

      // Act
      validationEngine.addFieldValidation('username', fullFieldValidation);

      validationEngine
        .validateField('username', 'peter', values)
        .then(validationResult => {
          // Assert
          expect(validationResult.message).toBe('my custom message');
          done();
        });
    });

    it(`Should fire the added form validation (async) and display a custom message when calling
      fire all validations and return failed
    `, done => {
      // Arrange
      const validationEngine: ValidationEngine = new ValidationEngine();
      const values = [{ username: 'john', lastname: 'doe' }];
      const validationFn = (values: any, message: string) =>
        Promise.resolve({
          key: '',
          type: '',
          succeeded: false,
          message: message ? message : 'no custom message',
        });

      const recordValidation: FullRecordValidationAsync = {
        validation: validationFn,
        message: 'custom message',
      };

      // Act
      validationEngine.addRecordValidation(recordValidation);

      validationEngine.validateForm(values).then(validationResult => {
        // Assert
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.recordErrors.length).toBe(1);
        expect(validationResult.recordErrors[0].message).toBe('custom message');
        done();
      });
    });

    it(`Should fire the added form validation (async) and display a custom message when calling
      fire all validations and return failed
    `, done => {
      // Arrange
      const validationEngine: ValidationEngine = new ValidationEngine();
      const values = [{ username: 'john', lastname: 'doe' }];
      const validationFn = (
        values: any,
        message: string
      ): Promise<ValidationResult> =>
        Promise.resolve({
          key: '',
          type: '',
          succeeded: false,
          message: message ? message : 'no custom message',
        });

      const recordValidation: FullRecordValidationAsync = {
        validation: validationFn,
        message: 'custom message',
      };

      // Act
      validationEngine.addRecordValidation(recordValidation);

      validationEngine.validateForm(values).then(validationResult => {
        // Assert
        expect(validationResult.succeeded).toBeFalsy();
        expect(validationResult.recordErrors.length).toBe(1);
        expect(validationResult.recordErrors[0].message).toBe('custom message');
        done();
      });
    });
  });

  describe('FireFieldValidation', () => {
    it(`Should fire first validation and not second
    when adding two validations to same field and first one is failing
    `, done => {
      // Arrange
      const validationEngine: ValidationEngine = new ValidationEngine();
      const values = [{ username: 'john', lastname: 'doe' }];
      const validationFn1: FieldValidationFunctionSyncAsync = (
        values: any,
        field: string,
        value
      ): Promise<ValidationResult> => {
        const promise = new Promise<ValidationResult>((resolve, reject) => {
          setTimeout(() => {
            resolve({
              key: 'username',
              type: 'REQUIRED',
              succeeded: false,
              message: '',
            });
          }, 500);
        });
        return promise;
      };

      const validationFn2: FieldValidationFunctionSyncAsync = (
        values: any,
        field: string,
        value
      ): Promise<ValidationResult> => {
        const promise = new Promise<ValidationResult>((resolve, reject) => {
          setTimeout(() => {
            resolve({
              key: 'username',
              type: 'ANOTHER',
              succeeded: true,
              message: '',
            });
          }, 20);
        });
        return promise;
      };

      const fullFieldValidation1: FullFieldValidationAsync = {
        validator: validationFn1,
      };

      const fullFieldValidation2: FullFieldValidationAsync = {
        validator: validationFn2,
      };

      // Act
      validationEngine.addFieldValidation('username', fullFieldValidation1);

      validationEngine.addFieldValidation('username', fullFieldValidation2);

      validationEngine
        .validateField('username', 'newContent', values)
        .then(validationResult => {
          // Assert
          expect(validationResult.succeeded).toBeFalsy();
          expect(validationResult.type).toBe('REQUIRED');
          done();
        });
    });

    it(`Should fire first validation and  second
    when adding two validation to same field and first one succeed and second failing
    `, done => {
      // Arrange
      const validationEngine: ValidationEngine = new ValidationEngine();
      const values = [{ username: 'john', lastname: 'doe' }];
      const validationFn1: FieldValidationFunctionSyncAsync = (
        values: any,
        field: string,
        value
      ): Promise<ValidationResult> => {
        const promise = new Promise<ValidationResult>((resolve, reject) => {
          setTimeout(() => {
            resolve({
              key: 'username',
              type: 'REQUIRED',
              succeeded: true,
              message: '',
            });
          }, 500);
        });
        return promise;
      };

      const validationFn2: FieldValidationFunctionSyncAsync = (
        values: any,
        field: string,
        value
      ): Promise<ValidationResult> => {
        const promise = new Promise<ValidationResult>((resolve, reject) => {
          setTimeout(done => {
            resolve({
              key: 'username',
              type: 'ANOTHER',
              succeeded: false,
              message: '',
            });
          }, 20);
        });
        return promise;
      };

      const fullFieldValidation1: FullFieldValidationAsync = {
        validator: validationFn1,
      };

      const fullFieldValidation2: FullFieldValidationAsync = {
        validator: validationFn2,
      };

      // Act
      validationEngine.addFieldValidation('username', fullFieldValidation1);

      validationEngine.addFieldValidation('username', fullFieldValidation2);

      validationEngine
        .validateField('username', 'newContent', values)
        .then(validationResult => {
          // Assert
          expect(validationResult.succeeded).toBeFalsy();
          expect(validationResult.type).toBe('ANOTHER');
          done();
        });
    });
  });
});
