import { parseMessageWithCustomArgs } from './validators.helpers';

describe('validators.helpers specs', () => {
  describe('parseMessageWithCustomArgs', () => {
    it('should return empty string when it feeds message and customArgs equals undefined', () => {
      // Arrange
      const message: string = void 0;
      const customArgs = void 0;

      // Act
      const result = parseMessageWithCustomArgs(message, customArgs);

      // Assert
      expect(result).toEqual('');
    });

    it('should return empty string when it feeds message and customArgs equals null', () => {
      // Arrange
      const message: string = null;
      const customArgs = null;

      // Act
      const result = parseMessageWithCustomArgs(message, customArgs);

      // Assert
      expect(result).toEqual('');
    });

    it('should return empty string when it feeds message equals empty string and customArgs equals undefined', () => {
      // Arrange
      const message: string = '';
      const customArgs = undefined;

      // Act
      const result = parseMessageWithCustomArgs(message, customArgs);

      // Assert
      expect(result).toEqual('');
    });

    it('should return empty string when it feeds message equals empty string and customArgs equals null', () => {
      // Arrange
      const message: string = '';
      const customArgs = null;

      // Act
      const result = parseMessageWithCustomArgs(message, customArgs);

      // Assert
      expect(result).toEqual('');
    });

    it('should return empty string when it feeds message equals empty string and customArgs equals "test"', () => {
      // Arrange
      const message: string = '';
      const customArgs = 'test';

      // Act
      const result = parseMessageWithCustomArgs(message, customArgs);

      // Assert
      expect(result).toEqual('');
    });

    it('should return string equals "my text message" when it feeds message equals "my text message" and customArgs equals "test"', () => {
      // Arrange
      const message: string = 'my text message';
      const customArgs = 'test';

      // Act
      const result = parseMessageWithCustomArgs(message, customArgs);

      // Assert
      expect(result).toEqual('my text message');
    });

    it('should return string equals "my text message with {{arg}}" when it feeds message equals "my text message with {{arg}}" and customArgs equals "test"', () => {
      // Arrange
      const message: string = 'my text message with {{arg}}';
      const customArgs = 'test';

      // Act
      const result = parseMessageWithCustomArgs(message, customArgs);

      // Assert
      expect(result).toEqual('my text message with {{arg}}');
    });

    it('should return string equals "my text message with test" when it feeds message equals "my text message with {{arg}}" and customArgs equals { arg: "test" }', () => {
      // Arrange
      const message: string = 'my text message with {{arg}}';
      const customArgs = { arg: 'test' };

      // Act
      const result = parseMessageWithCustomArgs(message, customArgs);

      // Assert
      expect(result).toEqual('my text message with test');
    });

    it('should return string equals "my text message with test" when it feeds message equals "my text message with {{nested.arg}}" and customArgs equals { nested: { arg: "test" } }', () => {
      // Arrange
      const message: string = 'my text message with {{nested.arg}}';
      const customArgs = { nested: { arg: 'test' } };

      // Act
      const result = parseMessageWithCustomArgs(message, customArgs);

      // Assert
      expect(result).toEqual('my text message with test');
    });

    it('should return string equals "my text message with test1 and test2" when it feeds message equals "my text message with {{nested.arg1}} and {{arg2}}" and customArgs equals { nested: { arg1: "test1" }, arg2: "test2" }', () => {
      // Arrange
      const message: string =
        'my text message with {{nested.arg1}} and {{arg2}}';
      const customArgs = { nested: { arg1: 'test1' }, arg2: 'test2' };

      // Act
      const result = parseMessageWithCustomArgs(message, customArgs);

      // Assert
      expect(result).toEqual('my text message with test1 and test2');
    });

    it('should return string equals "my text message with {{test}}" when it feeds message equals "my text message with {{{{arg}}}}" and customArgs equals { arg: "test" }', () => {
      // Arrange
      const message: string = 'my text message with {{{{arg}}}}';
      const customArgs = { arg: 'test' };

      // Act
      const result = parseMessageWithCustomArgs(message, customArgs);

      // Assert
      expect(result).toEqual('my text message with {{test}}');
    });
  });
});
