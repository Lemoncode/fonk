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

    it('should return true if typeof value is number', () => {
      // Arrange
      const value = 1;
      const values = undefined;
      const customArgs: RequiredArgs = undefined;

      // Act
      const validationResult = required(value, values, customArgs);

      // Assert
      expect(validationResult.succeeded).toBeTruthy();
      expect(validationResult.type).toBe(VALIDATOR_TYPE);
    });
  });
  describe('When validating a string value', () => {
    it('should return false if string is empty', () => {
      // Arrange
      const value = '';
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
    it('should return succeed if string has whitespace characters and trim option is false', () => {
      // Arrange
      const value = ' ';
      const values = undefined;
      const customArgs: RequiredArgs = { trim: false };

      // Act
      const validationResult = required(value, values, customArgs);

      // Assert
      expect(validationResult.succeeded).toBeTruthy();
      expect(validationResult.type).toBe(VALIDATOR_TYPE);
    });

    it('should return true if string has whitespace characters and trim option is false', () => {
      // Arrange
      const value = ' ';
      const values = undefined;
      const customArgs: RequiredArgs = { trim: false };

      // Act
      const validationResult = required(value, values, customArgs);

      // Assert
      expect(validationResult.succeeded).toBeTruthy();
      expect(validationResult.type).toBe(VALIDATOR_TYPE);
    });

    it('should return succeed if string has whitespace characters and trim option is null', () => {
      // Arrange
      const value = ' ';
      const values = undefined;
      const customArgs: RequiredArgs = { trim: null };

      // Act
      const validationResult = required(value, values, customArgs);

      // Assert
      expect(validationResult.succeeded).toBeTruthy();
      expect(validationResult.type).toBe(VALIDATOR_TYPE);
    });

    it('should return failed if string has whitespace characters and trim option is undefined', () => {
      // Arrange
      const value = ' ';
      const values = void 0;
      const customArgs: RequiredArgs = null;

      // Act
      const validationResult = required(value, values, customArgs);

      // Assert
      expect(validationResult.succeeded).toBeFalsy();
      expect(validationResult.type).toBe(VALIDATOR_TYPE);
    });
  });
});
