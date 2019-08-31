import { pattern, VALIDATOR_TYPE, PatternArgs } from './pattern';
import { FieldValidatorArgs, ValidationResult } from '../model';

describe(`pattern validator`, () => {
  describe('Pattern option boundaries =>', () => {
    it('should throw an error if pattern is null', () => {
      // Arrange
      const value = 'test';
      const values = undefined;
      const patternArgs: PatternArgs = { pattern: null };

      // Act
      // TODO: check how to acomplish this using jest toThrowError
      try {
        pattern({
          value,
          values,
          customArgs: patternArgs,
        });
      } catch (error) {
        // Assert
        expect(error.message).toBe(
          'FieldValidationError: pattern option for pattern validation is mandatory. Example: { pattern: /d+/ }.'
        );
      }
    });

    it('should throw an error if patternArgs is null', () => {
      // Arrange
      const value = 'test';
      const values = undefined;
      const patternArgs: PatternArgs = null;

      // Act
      // TODO: check how to acomplish this using jest toThrowError
      try {
        pattern({
          value,
          values,
          customArgs: patternArgs,
        });
      } catch (error) {
        // Assert
        expect(error.message).toBe(
          'FieldValidationError: pattern option for pattern validation is mandatory. Example: { pattern: /d+/ }.'
        );
      }
    });

    it('should throw an error if patternArgs is undefined', () => {
      // Arrange
      const value = 'test';
      const values = undefined;
      const patternArgs: PatternArgs = void 0;

      // Act
      // TODO: check how to acomplish this using jest toThrowError
      try {
        pattern({
          value,
          values,
          customArgs: patternArgs,
        });
      } catch (error) {
        // Assert
        expect(error.message).toBe(
          'FieldValidationError: pattern option for pattern validation is mandatory. Example: { pattern: /d+/ }.'
        );
      }
    });
  });

  describe('Given a string as RegExp in pattern option', () => {
    it('should return validation succeed when field matches the pattern', () => {
      // Arrange
      const value = 'test';
      const values = undefined;
      const patternArgs: PatternArgs = { pattern: '^tes.*$' };

      // Act
      const validationResult: ValidationResult = pattern({
        value,
        values,
        customArgs: patternArgs,
      });

      // Assert
      expect(validationResult.succeeded).toBeTruthy();
      expect(validationResult.type).toBe('PATTERN');
      expect(validationResult.message).toBe('');
    });

    it('should return validation failed when field does not match the pattern', () => {
      // Arrange
      const value = 'test';
      const values = undefined;
      const patternArgs: PatternArgs = { pattern: '^abc.*$' };

      // Act
      const validationResult: ValidationResult = pattern({
        value,
        values,
        customArgs: patternArgs,
      });

      // Assert
      expect(validationResult.succeeded).toBeFalsy();
      expect(validationResult.type).toBe('PATTERN');
      expect(validationResult.message).toBe('Please provide a valid format.');
    });
  });
});
