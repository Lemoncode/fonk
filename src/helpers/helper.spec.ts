import {
  safeArrayLength,
  arrayContainsEntries,
  isFunction,
  isUndefinedOrNull,
  areAllElementsInArrayDefined,
  isLastIndexInArray,
  isPromise,
  safeObjectKeys,
} from './helpers';

describe('safeArrayLength', () => {
  it('Should return 0 when feeding collection equals undefined', () => {
    // Arrange
    const collection = void 0;

    // Act
    const result = safeArrayLength(collection);

    // Assert
    expect(result).toEqual(0);
  });

  it('Should return 0 when feeding collection equals null', () => {
    // Arrange
    const collection = null;

    // Act
    const result = safeArrayLength(collection);

    // Assert
    expect(result).toEqual(0);
  });

  it('Should return 0 when feeding collection equals empty array', () => {
    // Arrange
    const collection = [];

    // Act
    const result = safeArrayLength(collection);

    // Assert
    expect(result).toEqual(0);
  });

  it('Should return 1 when feeding collection with one item', () => {
    // Arrange
    const collection = ['first item'];

    // Act
    const result = safeArrayLength(collection);

    // Assert
    expect(result).toEqual(1);
  });

  it('Should return 2 when feeding collection with two items', () => {
    // Arrange
    const collection = ['first item', 'second item'];

    // Act
    const result = safeArrayLength(collection);

    // Assert
    expect(result).toEqual(2);
  });
});

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

describe('areAllElementsInArrayDefined', () => {
  it('Should return false when passing undefined', () => {
    // Arrange
    const myCollection = void 0;

    // Act
    const result = areAllElementsInArrayDefined(myCollection);

    // Assert
    expect(result).toBeFalsy();
  });

  it('Should return false when passing null', () => {
    // Arrange
    const myCollection = null;

    // Act
    const result = areAllElementsInArrayDefined(myCollection);

    // Assert
    expect(result).toBeFalsy();
  });

  it('Should return false when passing empty array', () => {
    // Arrange
    const myCollection = [];

    // Act
    const result = areAllElementsInArrayDefined(myCollection);

    // Assert
    expect(result).toBeFalsy();
  });

  it('Should return false when passing an array including one element equals undefined', () => {
    // Arrange
    const myCollection = [void 0];

    // Act
    const result = areAllElementsInArrayDefined(myCollection);

    // Assert
    expect(result).toBeFalsy();
  });

  it('Should return false when passing an array including one element equals null', () => {
    // Arrange
    const myCollection = [null];

    // Act
    const result = areAllElementsInArrayDefined(myCollection);

    // Assert
    expect(result).toBeFalsy();
  });

  it('Should return true when passing an array including one element equals emtpy array', () => {
    // Arrange
    const myCollection = [[]];

    // Act
    const result = areAllElementsInArrayDefined(myCollection);

    // Assert
    expect(result).toBeTruthy();
  });

  it('Should return true when passing an array including one element equals emtpy object', () => {
    // Arrange
    const myCollection = [{}];

    // Act
    const result = areAllElementsInArrayDefined(myCollection);

    // Assert
    expect(result).toBeTruthy();
  });

  it('Should return true when passing an array including one element equals string', () => {
    // Arrange
    const myCollection = ['item'];

    // Act
    const result = areAllElementsInArrayDefined(myCollection);

    // Assert
    expect(result).toBeTruthy();
  });

  it('Should return true when passing an array including one element equals number', () => {
    // Arrange
    const myCollection = [1];

    // Act
    const result = areAllElementsInArrayDefined(myCollection);

    // Assert
    expect(result).toBeTruthy();
  });

  it('Should return false when passing an array including two elements equals undefined and number', () => {
    // Arrange
    const myCollection = [void 0, 1];

    // Act
    const result = areAllElementsInArrayDefined(myCollection);

    // Assert
    expect(result).toBeFalsy();
  });

  it('Should return false when passing an array including two elements equals null and number', () => {
    // Arrange
    const myCollection = [null, 1];

    // Act
    const result = areAllElementsInArrayDefined(myCollection);

    // Assert
    expect(result).toBeFalsy();
  });
});

describe('isLastIndexInArray', () => {
  it('should return false when it feeds index equal 0 and collection equals undefined', () => {
    // Arrange
    const index = 0;
    const collection = void 0;

    // Act
    const result = isLastIndexInArray(index, collection);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false when it feeds index equal 0 and collection equals null', () => {
    // Arrange
    const index = 0;
    const collection = null;

    // Act
    const result = isLastIndexInArray(index, collection);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false when it feeds index equal 0 and collection equals empty array', () => {
    // Arrange
    const index = 0;
    const collection = [];

    // Act
    const result = isLastIndexInArray(index, collection);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false when it feeds index equal 0 and collection equals empty array', () => {
    // Arrange
    const index = 0;
    const collection = [];

    // Act
    const result = isLastIndexInArray(index, collection);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return true when it feeds index equal 0 and collection with one item', () => {
    // Arrange
    const index = 0;
    const collection = ['item1'];

    // Act
    const result = isLastIndexInArray(index, collection);

    // Assert
    expect(result).toBeTruthy();
  });

  it('should return false when it feeds index equal 0 and collection with two items', () => {
    // Arrange
    const index = 0;
    const collection = ['item1', 'item2'];

    // Act
    const result = isLastIndexInArray(index, collection);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false when it feeds index equal -1 and collection with two items', () => {
    // Arrange
    const index = -1;
    const collection = ['item1', 'item2'];

    // Act
    const result = isLastIndexInArray(index, collection);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false when it feeds index equal undefined and collection with two items', () => {
    // Arrange
    const index = void 0;
    const collection = ['item1', 'item2'];

    // Act
    const result = isLastIndexInArray(index, collection);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false when it feeds index equal null and collection with two items', () => {
    // Arrange
    const index = null;
    const collection = ['item1', 'item2'];

    // Act
    const result = isLastIndexInArray(index, collection);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return true when it feeds index equal 1 and collection with two items', () => {
    // Arrange
    const index = 1;
    const collection = ['item1', 'item2'];

    // Act
    const result = isLastIndexInArray(index, collection);

    // Assert
    expect(result).toBeTruthy();
  });

  it('should return false when it feeds index equal 2 and collection with two items', () => {
    // Arrange
    const index = 2;
    const collection = ['item1', 'item2'];

    // Act
    const result = isLastIndexInArray(index, collection);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false when it feeds index equal 3 and collection with two items', () => {
    // Arrange
    const index = 3;
    const collection = ['item1', 'item2'];

    // Act
    const result = isLastIndexInArray(index, collection);

    // Assert
    expect(result).toBeFalsy();
  });
});

describe('isPromise', () => {
  it('should return false when it feed value equals undefined', () => {
    // Arrange
    const value = void 0;

    // Act
    const result = isPromise(value);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false when it feed value equals null', () => {
    // Arrange
    const value = null;

    // Act
    const result = isPromise(value);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false when it feed value equals empty array', () => {
    // Arrange
    const value = [];

    // Act
    const result = isPromise(value);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false when it feed value equals empty object', () => {
    // Arrange
    const value = {};

    // Act
    const result = isPromise(value);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false when it feed value equals object with props', () => {
    // Arrange
    const value = {
      prop: 1,
    };

    // Act
    const result = isPromise(value);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false when it feed value equals string', () => {
    // Arrange
    const value = 'test';

    // Act
    const result = isPromise(value);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false when it feed value equals number', () => {
    // Arrange
    const value = 1;

    // Act
    const result = isPromise(value);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false when it feed value equals boolean', () => {
    // Arrange
    const value = true;

    // Act
    const result = isPromise(value);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false when it feed value equals function', () => {
    // Arrange
    const value = () => {};

    // Act
    const result = isPromise(value);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false when it feed value equals object with then property equals undefined', () => {
    // Arrange
    const value = {
      then: void 0,
    };

    // Act
    const result = isPromise(value);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false when it feed value equals object with then property equals null', () => {
    // Arrange
    const value = {
      then: null,
    };

    // Act
    const result = isPromise(value);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false when it feed value equals object with then property equals empty array', () => {
    // Arrange
    const value = {
      then: [],
    };

    // Act
    const result = isPromise(value);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false when it feed value equals object with then property equals empty object', () => {
    // Arrange
    const value = {
      then: {},
    };

    // Act
    const result = isPromise(value);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false when it feed value equals object with then property equals object with props', () => {
    // Arrange
    const value = {
      then: { prop: 1 },
    };

    // Act
    const result = isPromise(value);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false when it feed value equals object with then property equals string', () => {
    // Arrange
    const value = {
      then: 'test',
    };

    // Act
    const result = isPromise(value);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false when it feed value equals object with then property equals number', () => {
    // Arrange
    const value = {
      then: 1,
    };

    // Act
    const result = isPromise(value);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false when it feed value equals object with then property equals boolean', () => {
    // Arrange
    const value = {
      then: true,
    };

    // Act
    const result = isPromise(value);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false when it feed value equals object with then property equals function', () => {
    // Arrange
    const value = {
      then: () => {},
    };

    // Act
    const result = isPromise(value);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false when it feed value equals object with then and catch property equals function', () => {
    // Arrange
    const value = {
      then: () => {},
      catch: () => {},
    };

    // Act
    const result = isPromise(value);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return true when it feed value equals Promise', () => {
    // Arrange
    const value = new Promise(() => {});

    // Act
    const result = isPromise(value);

    // Assert
    expect(result).toBeTruthy();
  });
});

describe('safeObjectKeys', () => {
  it('Should return [] when feeding value equals undefined', () => {
    // Arrange
    const value = void 0;

    // Act
    const result = safeObjectKeys(value);

    // Assert
    expect(result).toEqual([]);
  });

  it('Should return [] when feeding value equals null', () => {
    // Arrange
    const value = null;

    // Act
    const result = safeObjectKeys(value);

    // Assert
    expect(result).toEqual([]);
  });

  it('Should return [] when feeding value equals empty object', () => {
    // Arrange
    const value = {};

    // Act
    const result = safeObjectKeys(value);

    // Assert
    expect(result).toEqual([]);
  });

  it('Should return ["field"] when feeding value equals { field: 1 }', () => {
    // Arrange
    const value = { field: 1 };

    // Act
    const result = safeObjectKeys(value);

    // Assert
    expect(result).toEqual(['field']);
  });

  it('Should return ["field", "other"] when feeding value equals { field: 1, other: 2 }', () => {
    // Arrange
    const value = { field: 1, other: 2 };

    // Act
    const result = safeObjectKeys(value);

    // Assert
    expect(result).toEqual(['field', 'other']);
  });
});
