import { validator } from './required';
import { FieldValidatorArgs } from '../model';

describe(`required validator`, () => {
  describe('When validating a non string value', () => {
    it('should return validation failed if value is null', () => {
      // Arrange
      const validationArgs: FieldValidatorArgs = {
        value: null,
        values: undefined,
        customArgs: undefined,
        message: undefined,
      };

      // Act
      const validationResult = validator(validationArgs);

      // Assert
      expect(validationResult.succeeded).toBeFalsy();
      expect(validationResult.type).toBe('REQUIRED');
      expect(validationResult.message).toBe(
        'Please fill in this mandatory field.'
      );
    });
    it(`should return validation failed and custom error message
      if value is null and custom message informed`, () => {
      // Arrange
      const validationArgs: FieldValidatorArgs = {
        value: null,
        message: 'Hey ! inform this field',
      };

      // Act
      const validationResult = validator(validationArgs);
      // Assert
      expect(validationResult.succeeded).toBeFalsy();
      expect(validationResult.type).toBe('REQUIRED');
      expect(validationResult.message).toBe(validationArgs.message);
    });
    it('should return validation failed if value is undefined', () => {
      // Arrange
      const validationArgs: FieldValidatorArgs = {
        value: void 0,
      };

      // Act
      const validationResult = validator(validationArgs);

      // Assert
      expect(validationResult.succeeded).toBeFalsy();
      expect(validationResult.type).toBe('REQUIRED');
      expect(validationResult.message).toBe(
        'Please fill in this mandatory field.'
      );
    });

    it('should return validation succeeded if value is false', () => {
      // Arrange
      const validationArgs: FieldValidatorArgs = {
        value: false,
      };

      // Act
      const validationResult = validator(validationArgs);

      // Assert
      expect(validationResult.succeeded).toBeTruthy();
      expect(validationResult.type).toBe('REQUIRED');
      expect(validationResult.message).toBe('');
    });

    it('should return validation succeeded if value is true', () => {
      // Arrange
      const validationArgs: FieldValidatorArgs = {
        value: true,
      };

      // Act
      const validationResult = validator(validationArgs);

      // Assert
      expect(validationResult.succeeded).toBeTruthy();
      expect(validationResult.type).toBe('REQUIRED');
      expect(validationResult.message).toBe('');
    });

    it('should return true if typeof value is number', () => {
      // Arrange
      const validationArgs: FieldValidatorArgs = {
        value: 1,
      };

      // Act
      const validationResult = validator(validationArgs);

      // Assert
      expect(validationResult.succeeded).toBeTruthy();
      expect(validationResult.type).toBe('REQUIRED');
      expect(validationResult.message).toBe('');
    });
  });
  describe('When validating a string value', () => {
    it('should return false if string is empty', () => {
      // Arrange
      const validationArgs: FieldValidatorArgs = {
        value: '',
      };

      // Act
      const validationResult = validator(validationArgs);

      // Assert
      expect(validationResult.succeeded).toBeFalsy();
      expect(validationResult.type).toBe('REQUIRED');
      expect(validationResult.message).toBe(
        'Please fill in this mandatory field.'
      );
    });

    it('should return false if string has whitespace characters and trim option is true', () => {
      // Arrange
      const validationArgs: FieldValidatorArgs = {
        value: ' ',
        customArgs: { trim: true },
      };

      // Act
      const validationResult = validator(validationArgs);

      // Assert
      expect(validationResult.succeeded).toBeFalsy();
      expect(validationResult.type).toBe('REQUIRED');
      expect(validationResult.message).toBe(
        'Please fill in this mandatory field.'
      );
    });

    it('should return true if string has whitespace characters and trim option is false', () => {
      // Arrange
      const validationArgs: FieldValidatorArgs = {
        value: ' ',
        customArgs: { trim: false },
      };

      // Act
      const validationResult = validator(validationArgs);

      // Assert
      expect(validationResult.succeeded).toBeTruthy();
      expect(validationResult.type).toBe('REQUIRED');
      expect(validationResult.message).toBe('');
    });

    it('should return succeeded if string has whitespace characters and trim option is null', () => {
      // Arrange
      const validationArgs: FieldValidatorArgs = {
        value: ' ',
        customArgs: { trim: null },
      };

      // Act
      const validationResult = validator(validationArgs);

      // Assert
      expect(validationResult.succeeded).toBeTruthy();
      expect(validationResult.type).toBe('REQUIRED');
      expect(validationResult.message).toBe('');
    });

    it('should return succeeded if string has whitespace characters and trim option is undefined', () => {
      // Arrange
      const validationArgs: FieldValidatorArgs = {
        value: ' ',
        customArgs: { trim: undefined },
      };

      // Act
      const validationResult = validator(validationArgs);

      // Assert
      expect(validationResult.succeeded).toBeTruthy();
      expect(validationResult.type).toBe('REQUIRED');
      expect(validationResult.message).toBe('');
    });

    it('should return failed with custom message when it feeds empty value and custom message with customArgs', () => {
      // Arrange
      const validationArgs: FieldValidatorArgs = {
        value: '',
        message: 'Required value, with trim flag equals {{trim}}',
        customArgs: { trim: true },
      };

      // Act
      const validationResult = validator(validationArgs);

      // Assert
      expect(validationResult.succeeded).toBeFalsy();
      expect(validationResult.type).toBe('REQUIRED');
      expect(validationResult.message).toBe(
        'Required value, with trim flag equals true'
      );
    });
  });
});
