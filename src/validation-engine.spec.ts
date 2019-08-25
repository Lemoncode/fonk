import { ValidationEngine } from './validation-engine';

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
  });
});
