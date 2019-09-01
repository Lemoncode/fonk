import { maxLength, VALIDATOR_TYPE, setErrorMessage } from './max-length';
import { LengthArgs } from './length';

describe('[maxLength] validation rule tests =>', () => {
  describe('When validating a non string value', () => {
    it('should return true if value is undefined', () => {
      // Arrange
      const value = void 0;
      const values = undefined;
      const customArgs: LengthArgs = {
        length: 3,
      };
      // Act
      const validationResult = maxLength({ value, customArgs });

      // Assert
      expect(validationResult.succeeded).toBeTruthy;
      expect(validationResult.type).toBe(VALIDATOR_TYPE);
    });

    it('should return true if value is null', () => {
      // Arrange
      const value = void 0;
      const values = null;
      const customArgs: LengthArgs = {
        length: 3,
      };
      // Act
      const validationResult = maxLength({ value, customArgs });

      // Assert
      expect(validationResult.succeeded).toBeTruthy;
      expect(validationResult.type).toBe(VALIDATOR_TYPE);
    });
  });

  describe('When validating a string value', () => {
    // TODO: Should be add a custom param to skip when string is empty?
    it('should succeed for empty strings (use require validator for that case)', () => {
      // Arrange
      const value = '';
      const values = undefined;
      const customArgs: LengthArgs = {
        length: 3,
      };
      // Act
      const validationResult = maxLength({ value, customArgs });

      // Assert
      expect(validationResult.succeeded).toBeTruthy;
      expect(validationResult.type).toBe(VALIDATOR_TYPE);
    });

    it('should succeed for empty strings and min-length === 0', () => {
      // Arrange
      const value = '';
      const values = undefined;
      const customArgs: LengthArgs = {
        length: 0,
      };
      // Act
      const validationResult = maxLength({ value, customArgs });

      // Assert
      expect(validationResult.succeeded).toBeTruthy;
      expect(validationResult.type).toBe(VALIDATOR_TYPE);
    });

    it('should return true if value length is less than length option', () => {
      // Arrange
      const value = '1234';
      const values = undefined;
      const customArgs: LengthArgs = {
        length: 5,
      };
      // Act
      const validationResult = maxLength({ value, customArgs });

      // Assert
      expect(validationResult.succeeded).toBeTruthy;
      expect(validationResult.type).toBe(VALIDATOR_TYPE);
    });

    it('should return false if value length is greater than length option', () => {
      // Arrange
      const value = '1234';
      const values = undefined;
      const customArgs: LengthArgs = {
        length: 3,
      };
      // Act
      const validationResult = maxLength({ value, customArgs });

      // Assert
      expect(validationResult.succeeded).toBeFalsy;
      expect(validationResult.type).toBe(VALIDATOR_TYPE);
      expect(validationResult.message).toBe(
        'The value provided does not fulfil max length'
      );
    });

    it('should return false if value length is greater than length option and display custom message', () => {
      // Arrange
      const value = '1234';
      const values = undefined;
      const customArgs: LengthArgs = {
        length: 3,
      };

      setErrorMessage('my custom message');
      // Act
      const validationResult = maxLength({ value, customArgs });

      // Assert
      expect(validationResult.succeeded).toBeFalsy;
      expect(validationResult.type).toBe(VALIDATOR_TYPE);
      expect(validationResult.message).toBe('my custom message');
    });

    it('should return true if value length is equal than length option', () => {
      // Arrange
      const value = '123';
      const values = undefined;
      const customArgs: LengthArgs = {
        length: 3,
      };
      // Act
      const validationResult = maxLength({ value, customArgs });

      // Assert
      expect(validationResult.succeeded).toBeTruthy;
      expect(validationResult.type).toBe(VALIDATOR_TYPE);
    });

    it('should return failed if value has length greater than 0 and length option is 0', () => {
      // Arrange
      const value = '1';
      const values = undefined;
      const customArgs: LengthArgs = {
        length: 0,
      };
      // Act
      const validationResult = maxLength({ value, customArgs });

      // Assert
      expect(validationResult.succeeded).toBeFalsy();
      expect(validationResult.type).toBe(VALIDATOR_TYPE);
    });
  });

  describe('CustomParams boundaries =>', () => {
    it('should throw an error if no length option is provided', () => {
      // Arrange
      const value = 'test';
      const values = undefined;

      // Act
      // TODO: check how to acomplish this using jest toThrowError
      try {
        maxLength({
          value,
          values,
        });
      } catch (error) {
        // Assert
        expect(error.message).toBe(
          'FieldValidationError: Parameter "length" for maxLength in customArgs is mandatory and should be a valid number. Example: { length: 4 }.'
        );
      }
    });

    it('should return false if length option is null', () => {
      // Arrange
      const value = 'test';
      const values = undefined;
      const lengthArgs: LengthArgs = { length: null };

      // Act
      // TODO: check how to acomplish this using jest toThrowError
      try {
        maxLength({
          value,
          values,
          customArgs: lengthArgs,
        });
      } catch (error) {
        // Assert
        expect(error.message).toBe(
          'FieldValidationError: Parameter "length" for maxLength in customArgs is mandatory and should be a valid number. Example: { length: 4 }.'
        );
      }
    });
  });
});
