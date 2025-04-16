import {
  getValueAtPath,
  hasSomeError,
  isArrayField,
  extractArrayIndexes,
  isValidPattern,
  replaceParamsInMessage,
} from './fonk.helpers.js';

describe('getValueAtPath', () => {
  it.each<{ path: string[]; value: Record<string, any> }>([
    { path: undefined, value: undefined },
    { path: undefined, value: null },
    { path: null, value: undefined },
    { path: null, value: null },
    { path: [], value: undefined },
  ])('should return undefined when path is $path and value is $value', ({ path, value }) => {
    // Arrange

    // Act
    const result = getValueAtPath(path, value);

    // Assert
    expect(result).toBeUndefined();
  });

  it('should return null when path is [] and value is null', () => {
    // Arrange
    const path = [];
    const value = null;

    // Act
    const result = getValueAtPath(path, value);

    // Assert
    expect(result).toBeNull();
  });

  it('should return null when path is [] and value is {}', () => {
    // Arrange
    const path = [];
    const value = {};

    // Act
    const result = getValueAtPath(path, value);

    // Assert
    expect(result).toEqual({});
  });

  it('should return the value at the given path', () => {
    // Arrange
    const path = ['a', 'b', 'c'];
    const value = { a: { b: { c: 42 } } };

    // Act
    const result = getValueAtPath(path, value);

    // Assert
    expect(result).toEqual(42);
  });

  it('should return undefined for non-existing path', () => {
    // Arrange
    const path = ['a', 'b', 'd'];
    const value = { a: { b: { c: 42 } } };

    // Act
    const result = getValueAtPath(path, value);

    // Assert
    expect(result).toBeUndefined();
  });

  it('should return undefined for values equals array', () => {
    // Arrange
    const path = ['a'];
    const value = [1, 2, 3];

    // Act
    const result = getValueAtPath(path, value);

    // Assert
    expect(result).toBeUndefined();
  });
});

describe('hasSomeError', () => {
  it('should return true if any field has error', () => {
    // Arrange
    const errors = { field1: undefined, field2: 'error' };

    // Act
    const result = hasSomeError(errors);

    // Assert
    expect(result).toBeTruthy();
  });

  it('should return true if every field has error', () => {
    // Arrange
    const errors = { field1: undefined, field2: 'error' };

    // Act
    const result = hasSomeError(errors);

    // Assert
    expect(result).toBeTruthy();
  });

  it('should return false if all fields are undefined', () => {
    // Arrange
    const errors = { field1: undefined, field2: undefined };

    // Act
    const result = hasSomeError(errors);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false for empty errors object', () => {
    // Arrange
    const errors = {};

    // Act
    const result = hasSomeError(errors);

    // Assert
    expect(result).toBeFalsy;
  });
});

describe('isArrayField', () => {
  it('should return true for array field with brackets', () => {
    // Arrange
    const field = 'field[0]';

    // Act
    const result = isArrayField(field);

    // Assert
    expect(result).toBeTruthy();
  });

  it('should return true for array field with brackets and index', () => {
    // Arrange
    const field = 'field[i]';

    // Act
    const result = isArrayField(field);

    // Assert
    expect(result).toBeTruthy();
  });

  it.each<{ field: any }>([
    { field: 'field' },
    { field: 'field[' },
    { field: 'field]' },
    { field: 'field1' },
    { field: 'field(1)' },
    { field: 'field{1}' },
    { field: 1 },
    { field: true },
    { field: null },
    { field: undefined },
    { field: {} },
    { field: [] },
    { field: () => {} },
    { field: new Date('2025-04-15') },
    { field: new Map() },
    { field: new Set() },
    { field: new WeakMap() },
    { field: new WeakSet() },
  ])('should return false for non-array field like $field', ({ field }) => {
    // Arrange

    // Act
    const result = isArrayField(field);

    // Assert
    expect(result).toBeFalsy();
  });
});

describe('extractArrayIndexes', () => {
  it.each<{ field: string }>([
    { field: undefined },
    { field: null },
    { field: '' },
    { field: 'test-field' },
    { field: 'nested.field' },
    { field: 'fieldWithInvalidArray[i]' },
  ])('should return undefined when it feeds field equals $field', ({ field }) => {
    // Arrange

    // Act
    const result = extractArrayIndexes(field);

    // Assert
    expect(result).toBeUndefined();
  });

  it('should return array indexes for array field with one index', () => {
    // Arrange
    const field = 'field[1]';

    // Act
    const result = extractArrayIndexes(field);

    // Assert
    expect(result).toEqual({ field: 1 });
  });

  it('should return array indexes for nested field with array field', () => {
    // Arrange
    const field = 'client.orders[2]';

    // Act
    const result = extractArrayIndexes(field);

    // Assert
    expect(result).toEqual({ 'client.orders': 2 });
  });

  it('should return array indexes for nested field array at multiple levels', () => {
    // Arrange
    const field = 'a[10].b[111].c[2222].d.e.f[33333]';

    // Act
    const result = extractArrayIndexes(field);

    // Assert
    expect(result).toEqual({ a: 10, 'a.b': 111, 'a.b.c': 2222, 'a.b.c.d.e.f': 33333 });
  });
});

describe('isValidPattern', () => {
  it('should return true for empty value', () => {
    // Arrange
    const value = '';
    const pattern = /test/;

    // Act
    const result = isValidPattern(value, pattern);

    // Assert
    expect(result).toBeTruthy();
  });

  it('should return true for null value', () => {
    // Arrange
    const value = null;
    const pattern = /test/;

    // Act
    const result = isValidPattern(value, pattern);

    // Assert
    expect(result).toBeTruthy();
  });

  it('should return true for undefined value', () => {
    // Arrange
    const value = undefined;
    const pattern = /test/;

    // Act
    const result = isValidPattern(value, pattern);

    // Assert
    expect(result).toBeTruthy();
  });

  it('should return false for non-empty string that does not match the pattern', () => {
    // Arrange
    const value = 'not matching';
    const pattern = /test/;

    // Act
    const result = isValidPattern(value, pattern);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return true for non-empty string that matches the pattern', () => {
    // Arrange
    const value = 'test123';
    const pattern = /test/;

    // Act
    const result = isValidPattern(value, pattern);

    // Assert
    expect(result).toBeTruthy();
  });
});

describe('replaceParamsInMessage', () => {
  it('should replace params in message', () => {
    // Arrange
    const message = 'Hello {{name}}, welcome to {{place}}!';
    const params = { name: 'John', place: 'Earth' };

    // Act
    const result = replaceParamsInMessage(message, params);

    // Assert
    expect(result).toEqual('Hello John, welcome to Earth!');
  });

  it('should return an empty string if the message is empty', () => {
    // Arrange
    const message = '';

    // Act
    const result = replaceParamsInMessage(message, {});

    // Assert
    expect(result).toEqual('');
  });

  it('should return the original message if no params match', () => {
    // Arrange
    const message = 'Hello {{name}}, welcome to {{place}}!';
    const params = { age: 30 };

    // Act
    const result = replaceParamsInMessage(message, params);

    // Assert
    expect(result).toEqual(message);
  });

  it.each<{ params: any }>([{ params: {} }, { params: undefined }, { params: null }, { params: '' }])(
    'should return the original message if params equals $params',
    ({ params }) => {
      // Arrange
      const message = 'Hello {{name}}, welcome to {{place}}!';

      // Act
      const result = replaceParamsInMessage(message, params);

      // Assert
      expect(result).toEqual(message);
    }
  );
});
