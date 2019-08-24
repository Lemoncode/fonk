import { arrayContainsEntries, isFunction, isUndefinedOrNull } from './helper';

describe('arrayContainsEntries', () => {
  it('Should return false when passing undefined', () => {
    // Arrange
    const myCollection = void 0;

    // Act
    const result = arrayContainsEntries(myCollection);

    // Assert
    expect(result).toBeFalsy();
  });

  it('Should return false when passing null', () => {
    // Arrange
    const myCollection = null;

    // Act
    const result = arrayContainsEntries(myCollection);

    // Assert
    expect(result).toBeFalsy();
  });

  it('Should return false when passing empty array', () => {
    // Arrange
    const myCollection = [];

    // Act
    const result = arrayContainsEntries(myCollection);

    // Assert
    expect(result).toBeFalsy();
  });

  it('Should return true when passing an array including one element', () => {
    // Arrange
    const myCollection = ['john'];

    // Act
    const result = arrayContainsEntries(myCollection);

    // Assert
    expect(result).toBeTruthy();
  });

  it('Should return true when passing an array including two elements', () => {
    // Arrange
    const myCollection = [{ a: 'first' }, { a: 'second' }];

    // Act
    const result = arrayContainsEntries(myCollection);

    // Assert
    expect(result).toBeTruthy();
  });
});

describe('isFunction', () => {
  it('Should return false when passing undefined', () => {
    // Arrange
    const v = void 0;
    // Act
    const result = isFunction(v);

    // Assert
    expect(result).toBeFalsy();
  });

  it('Should return false when passing null', () => {
    // Arrange
    const v = null;
    // Act
    const result = isFunction(v);

    // Assert
    expect(result).toBeFalsy();
  });

  it('Should return false when passing string', () => {
    // Arrange
    const v = 'hello';
    // Act
    const result = isFunction(v);

    // Assert
    expect(result).toBeFalsy();
  });

  it('Should return false when passing object', () => {
    // Arrange
    const v = { a: 'foo' };
    // Act
    const result = isFunction(v);

    // Assert
    expect(result).toBeFalsy();
  });

  it('Should return false when passing Date', () => {
    // Arrange
    const v = new Date();
    // Act
    const result = isFunction(v);

    // Assert
    expect(result).toBeFalsy();
  });

  it('Should return true when passing a function', () => {
    // Arrange
    const v = () => {
      return 'hello';
    };
    // Act
    const result = isFunction(v);

    // Assert
    expect(result).toBeTruthy();
  });

  it('Should return true when passing a function with params', () => {
    // Arrange
    const v = (a, b) => {
      return a + b;
    };
    // Act
    const result = isFunction(v);

    // Assert
    expect(result).toBeTruthy();
  });
});

describe('isUndefinedOrNull', () => {
  it('returns true when undefined', () => {
    // Arrange
    const value = void 0;

    // Act
    const result = isUndefinedOrNull(value);

    // Assert
    expect(result).toBeTruthy();
  });

  it('returns true when null', () => {
    // Arrange
    const value = null;

    // Act
    const result = isUndefinedOrNull(value);

    // Assert
    expect(result).toBeTruthy();
  });

  it('returns false when value is false', () => {
    // Arrange
    const value = false;

    // Act
    const result = isUndefinedOrNull(value);

    // Assert
    expect(result).toBeFalsy();
  });

  it('returns false when value is empty string', () => {
    // Arrange
    const value = '';

    // Act
    const result = isUndefinedOrNull(value);

    // Assert
    expect(result).toBeFalsy();
  });

  it('returns false when value is an object', () => {
    // Arrange
    const value = { a: 'foo' };

    // Act
    const result = isUndefinedOrNull(value);

    // Assert
    expect(result).toBeFalsy();
  });
});
