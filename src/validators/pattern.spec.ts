import { validator, PatternArgs, setErrorMessage } from './pattern';
import { ValidationResult } from '../model';

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
        validator({
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
        validator({
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
        validator({
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
      const validationResult: ValidationResult = validator({
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
      const validationResult: ValidationResult = validator({
        value,
        values,
        customArgs: patternArgs,
      });

      // Assert
      expect(validationResult.succeeded).toBeFalsy();
      expect(validationResult.type).toBe('PATTERN');
      expect(validationResult.message).toBe('Please provide a valid format.');
    });
    it(`should return validation failed + custom message when field does not match
    the pattern and custom message is set`, () => {
      // Arrange
      const value = 'test';
      const values = undefined;
      const patternArgs: PatternArgs = { pattern: '^abc.*$' };

      setErrorMessage('my custom message');

      // Act
      const validationResult: ValidationResult = validator({
        value,
        values,
        customArgs: patternArgs,
      });

      // Assert
      expect(validationResult.succeeded).toBeFalsy();
      expect(validationResult.type).toBe('PATTERN');
      expect(validationResult.message).toBe('my custom message');

      setErrorMessage('Please provide a valid format.');
    });
  });
});
