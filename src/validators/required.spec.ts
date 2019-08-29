import {
  required,
  setErrorMessage,
  RequiredArgs,
  VALIDATOR_TYPE,
} from './required';

describe(`required validator`, () => {
  describe('When validating a non string value', () => {
    it('should return validation failed if value is null', () => {
      // Arrange
      const value = null;
      const values = undefined;
      const customArgs: RequiredArgs = undefined;

      // Act
      const validationResult = required(value, values, customArgs);

      // Assert
      expect(validationResult.succeeded).toBeFalsy();
      expect(validationResult.type).toBe(VALIDATOR_TYPE);
      expect(validationResult.message).toBe(
        'Please fill in this mandatory field.'
      );
    });
    it(`should return validation failed and custom error message 
      if value is null and custom message informed`, () => {
      // Arrange
      const value = null;
      const values = undefined;
      const customArgs: RequiredArgs = undefined;
      const customMessage = 'Hey ! inform this field';

      // Act
      const validationResult = required(
        value,
        values,
        customArgs,
        customMessage
      );

      // Assert
      expect(validationResult.succeeded).toBeFalsy();
      expect(validationResult.type).toBe(VALIDATOR_TYPE);
      expect(validationResult.message).toBe(customMessage);
    });
    it('should return validation failed if value is undefined', () => {
      // Arrange
      const value = void 0;
      const values = undefined;
      const customArgs: RequiredArgs = undefined;

      // Act
      const validationResult = required(value, values, customArgs);

      // Assert
      expect(validationResult.succeeded).toBeFalsy();
      expect(validationResult.type).toBe(VALIDATOR_TYPE);
      expect(validationResult.message).toBe(
        'Please fill in this mandatory field.'
      );
    });

    it('should return validation failed if value is false', () => {
      // Arrange
      const value = false;
      const values = undefined;
      const customArgs: RequiredArgs = undefined;

      // Act
      const validationResult = required(value, values, customArgs);

      // Assert
      expect(validationResult.succeeded).toBeFalsy();
      expect(validationResult.type).toBe(VALIDATOR_TYPE);
      expect(validationResult.message).toBe(
        'Please fill in this mandatory field.'
      );
    });

    it('should return validation succeeded if value is true', () => {
      // Arrange
      const value = true;
      const values = undefined;
      const customArgs: RequiredArgs = undefined;

      // Act
      const validationResult = required(value, values, customArgs);

      // Assert
      expect(validationResult.succeeded).toBeTruthy();
      expect(validationResult.type).toBe(VALIDATOR_TYPE);
    });
  });
});
