import { ValidationEngine } from './validation-engine';
import { ValidationResult } from './model';

describe('ValidationEngine tests', () => {
  describe('isValidationInProgress', () => {
    it('should return isValidationInProgress false after initialization', () => {
      // Arrange
      const validationEngine: ValidationEngine = new ValidationEngine();

      // Assert
      expect(validationEngine.isValidationInProgress()).toBeFalsy();
    });

    it('should return isValidationInProgress false if no validations are defined', done => {
      // Arrange
      const validationEngine: ValidationEngine = new ValidationEngine();
      const values = [{ formFieldName: 'nameId', vmFieldName: 'name' }];

      // Act
      validationEngine
        .validateField(values, 'nameId', 'newContent')
        .then(errors => {
          // Assert
          expect(validationEngine.isValidationInProgress()).toBeFalsy();
          done();
        });

      // Assert
      expect(validationEngine.isValidationInProgress()).toBeFalsy;
    });

    it('should return isValidationInProgress true then false when completed if a field validation is completed', done => {
      // Arrange
      const validationEngine: ValidationEngine = new ValidationEngine();
      const values = [{ username: 'john', lastname: 'doe' }];

      // Act
      validationEngine.addFieldValidation(
        'username',
        (value): Promise<ValidationResult> => {
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
        }
      );

      validationEngine
        .validateField(values, 'username', 'newContent')
        .then(errors => {
          // Assert
        })
        .finally(() => {
          expect(validationEngine.isValidationInProgress()).toBeFalsy();
          done();
        });

      // Assert
      expect(validationEngine.isValidationInProgress()).toBeTruthy();
    });
  });

  describe('AddFieldValidation', () => {
    it(`Should fire the added validation (sync flavour) and succeed
        when adding a validation to a given field and firing validation
        on that field
    `, done => {
      // Arrange
      const validationEngine: ValidationEngine = new ValidationEngine();
      const values = [{ username: 'john', lastname: 'doe' }];

      // Act
      validationEngine.addFieldValidation(
        'username',
        (value): ValidationResult => ({
          key: 'username',
          type: 'REQUIRED',
          succeeded: true,
          message: '',
        })
      );

      validationEngine
        .validateField(values, 'username', 'newContent')
        .then(validationResult => {
          // Assert
          expect(validationResult.succeeded).toBeTruthy();
          expect(validationResult.type).toBe('REQUIRED');
          done();
        });
    });

    it(`Should fire the added validation (async flavour) and succeed
        when adding a validation to a given field and firing validation
        on that field
    `, done => {
      // Arrange
      const validationEngine: ValidationEngine = new ValidationEngine();
      const values = [{ username: 'john', lastname: 'doe' }];

      // Act
      validationEngine.addFieldValidation(
        'username',
        (value): Promise<ValidationResult> => {
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
        }
      );

      validationEngine
        .validateField(values, 'username', 'newContent')
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

      const validationFn = jest.fn().mockReturnValue({
        key: 'username',
        type: 'REQUIRED',
        succeeded: true,
        message: '',
      });

      // Act
      validationEngine.addFieldValidation('username', validationFn);

      validationEngine
        .validateField(values, 'lastname', 'sellers')
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

      const validationFn = jest.fn().mockReturnValue({
        key: 'username',
        type: 'REQUIRED',
        succeeded: true,
        message: '',
      });

      // Act
      validationEngine.addFieldValidation('username', validationFn);

      validationEngine
        .validateField(values, 'lastname', 'sellers')
        .then(validationResult => {
          // Assert
          expect(validationFn).not.toHaveBeenCalled();
          validationEngine
            .validateField(values, 'username', 'Mary')
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
      const validationFn = jest.fn().mockReturnValue({
        key: 'username',
        type: 'REQUIRED',
        succeeded: true,
        message: '',
      });

      // Act
      validationEngine.addFieldValidation('username', validationFn);

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

  describe('AddFormValidation', () => {
    it(`Should fire the added form validation when calling
      fire all validations
    `, () => {});
    it(`Should fire the two added form validation when calling
      fire all validations
    `, () => {});
    it(`Should not fire the added form validation when calling
      fire field validations
    `, () => {});
  });

  describe('FireFieldValidation', () => {
    it(`Should fire first validation and not second
    when adding two validation to same field and first one is failing
    `, () => {});

    it(`Should fire first validation and  second
    when adding two validation to same field and firs one succeed and second failing
    `, () => {});

    it(`Should one fire first validation and
    when adding two async validations to same field
    and first one takes 500ms and fails and second 100ms and not failing
    `, () => {});

    it(`Should one fire first validation and
    when adding two async validations to same field
    and first one takes 500ms and fails and second is sync and not failing
    `, () => {});
  });
});
