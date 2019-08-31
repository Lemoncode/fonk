import { email, VALIDATOR_TYPE, setErrorMessage } from './email';
import { FieldValidatorArgs } from '../model';

describe(`required validator`, () => {
  describe('When validating a non string value', () => {
    it('should return true if value is null', () => {
      // Arrange
      const value = null;
      const values = undefined;

      // Act
      const validationResult = email({ value });

      // Assert
      expect(validationResult.succeeded).toBeTruthy();
      expect(validationResult.type).toBe('EMAIL');
      expect(validationResult.message).toBe('');
    });

    it('should return true if value is undefined', () => {
      // Arrange
      const value = void 0;
      const values = undefined;

      // Act
      const validationResult = email({ value });

      // Assert
      expect(validationResult.succeeded).toBeTruthy();
      expect(validationResult.type).toBe('EMAIL');
      expect(validationResult.message).toBe('');
    });
  });
  describe('When validating a string value', () => {
    it('should return custom global message for invalid email address', () => {
      // Arrange
      const value = 'some text';
      const values = undefined;

      // Act
      setErrorMessage('custom message');
      const validationResult = email({ value });

      // Assert
      expect(validationResult.succeeded).toBeFalsy;
      expect(validationResult.type).toBe('EMAIL');
      expect(validationResult.message).toBe('custom message');

      // Restore, this tests cannot be run in parallel
      // we are global setting ErrorMessage for this validator
      setErrorMessage('Please enter a valid email address.');
    });

    it('should return false for invalid email address', () => {
      // Arrange
      const value = 'some text';
      const values = undefined;

      // Act
      const validationResult = email({ value });

      // Assert
      expect(validationResult.succeeded).toBeFalsy;
      expect(validationResult.type).toBe('EMAIL');
      expect(validationResult.message).toBe(
        'Please enter a valid email address.'
      );
    });
    it('should return true for a valid email address', () => {
      // Arrange
      const value = 'john.doe@acme.com';
      const values = undefined;

      // Act
      const validationResult = email({ value });

      // Assert
      expect(validationResult.succeeded).toBeTruthy();
      expect(validationResult.type).toBe('EMAIL');
      expect(validationResult.message).toBe('');
    });
  });
});
