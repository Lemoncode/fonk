import { minLength } from './min-length';
import { LengthArgs } from './length';

describe('[minLength] validation rule tests =>', () => {
  describe('When validating a non string value', () => {
    it('should return true if value is undefined', () => {});

    it('should return true if value is null', () => {});
  });

  describe('When validating a string value', () => {
    it('should return false for empty strings', () => {});

    it('should return true if value length is greater than length option', () => {});

    it('should return false if value length is lesser than length option', () => {});

    it('should return true if value length is equal than length option', () => {});

    it('should return true if value has length greater than 0 and length option is 0', () => {});

    it('should return true if valuehas length of 0 and length option is 0', () => {});
  });

  describe('CustomParams boundaries =>', () => {
    it('should throw an error if no length option is provided', () => {});

    it('should return false if length option is null', () => {});
  });
});
