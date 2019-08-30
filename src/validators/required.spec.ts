import { required, RequiredArgs, VALIDATOR_TYPE } from './required';
import { ValidatorArgs } from '../model';

describe(`required validator`, () => {
  describe('When validating a non string value', () => {
    it('should return validation failed if value is null', () => {
      // Arrange
      const validationArgs: ValidatorArgs<RequiredArgs> = {
        value: null,
        values: undefined,
        customArgs: undefined,
        message: undefined,
      };

      // Act
      const validationResult = required(validationArgs);

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
      const validationArgs: ValidatorArgs<RequiredArgs> = {
        value: null,
        message: 'Hey ! inform this field',
      };

      // Act
      const validationResult = required(validationArgs);
      // Assert
      expect(validationResult.succeeded).toBeFalsy();
      expect(validationResult.type).toBe(VALIDATOR_TYPE);
      expect(validationResult.message).toBe(validationArgs.message);
    });
    it('should return validation failed if value is undefined', () => {
      // Arrange
      const validationArgs: ValidatorArgs<RequiredArgs> = {
        value: void 0,
      };

      // Act
      const validationResult = required(validationArgs);

      // Assert
      expect(validationResult.succeeded).toBeFalsy();
      expect(validationResult.type).toBe(VALIDATOR_TYPE);
      expect(validationResult.message).toBe(
        'Please fill in this mandatory field.'
      );
    });

    it('should return validation failed if value is false', () => {
      // Arrange
      const validationArgs: ValidatorArgs<RequiredArgs> = {
        value: false,
      };

      // Act
      const validationResult = required(validationArgs);

      // Assert
      expect(validationResult.succeeded).toBeFalsy();
      expect(validationResult.type).toBe(VALIDATOR_TYPE);
      expect(validationResult.message).toBe(
        'Please fill in this mandatory field.'
      );
    });

    it('should return validation succeeded if value is true', () => {
      // Arrange
      const validationArgs: ValidatorArgs<RequiredArgs> = {
        value: true,
      };

      // Act
      const validationResult = required(validationArgs);

      // Assert
      expect(validationResult.succeeded).toBeTruthy();
      expect(validationResult.type).toBe(VALIDATOR_TYPE);
    });

    it('should return true if typeof value is number', () => {
      // Arrange
      const validationArgs: ValidatorArgs<RequiredArgs> = {
        value: 1,
      };

      // Act
      const validationResult = required(validationArgs);

      // Assert
      expect(validationResult.succeeded).toBeTruthy();
      expect(validationResult.type).toBe(VALIDATOR_TYPE);
    });
  });
  describe('When validating a string value', () => {
    it('should return false if string is empty', () => {
      // Arrange
      const validationArgs: ValidatorArgs<RequiredArgs> = {
        value: '',
      };

      // Act
      const validationResult = required(validationArgs);

      // Assert
      expect(validationResult.succeeded).toBeFalsy();
      expect(validationResult.type).toBe(VALIDATOR_TYPE);
      expect(validationResult.message).toBe(
        'Please fill in this mandatory field.'
      );
    });

    it('should return false if string has whitespace characters and trim option is true', () => {
      // Arrange
      const validationArgs: ValidatorArgs<RequiredArgs> = {
        value: ' ',
        customArgs: { trim: true },
      };

      // Act
      const validationResult = required(validationArgs);

      // Assert
      expect(validationResult.succeeded).toBeFalsy();
      expect(validationResult.type).toBe(VALIDATOR_TYPE);
    });

    it('should return true if string has whitespace characters and trim option is false', () => {
      // Arrange
      const validationArgs: ValidatorArgs<RequiredArgs> = {
        value: ' ',
        customArgs: { trim: false },
      };

      // Act
      const validationResult = required(validationArgs);

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
