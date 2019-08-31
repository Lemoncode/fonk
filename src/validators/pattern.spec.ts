import { pattern, VALIDATOR_TYPE, PatternArgs } from './pattern';
import { FieldValidatorArgs, ValidationResult } from '../model';

describe(`pattern validator`, () => {
  describe('Pattern option boundaries =>', () => {});

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
