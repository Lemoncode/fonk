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
          expect(validationEngine.isValidationInProgress()).toBeFalsy();
          done();
        });

      // Assert
      expect(validationEngine.isValidationInProgress()).toBeTruthy();
    });
  });
});
