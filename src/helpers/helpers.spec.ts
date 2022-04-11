import { InternalFieldValidationSchema } from '../model';
import {
  safeArrayLength,
  arrayContainsEntries,
  isFunction,
  isUndefinedOrNull,
  areAllElementsInArrayDefined,
  isLastIndexInArray,
  isPromise,
  safeObjectKeys,
  reduceAsync,
  isFieldIdInSchema,
  hasFieldIdArrayValidator,
  formatFieldForArrayField,
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

describe('reduceAsync', () => {
  it('should return default value when it calls with array equals empty', async () => {
    // Arrange
    const array = [];

    const sumAsync = async (a, b): Promise<number> => {
      return a + b;
    };

    const callback = jest.fn();
    const defaultValue = 0;

    // Act
    const result = await reduceAsync(array, callback, defaultValue);

    // Assert
    expect(result).toEqual(defaultValue);
  });

  it('should not call callback when it calls with array equals empty', async () => {
    // Arrange
    const array = [];
    const callback = jest.fn();
    const defaultValue = 'default value';

    // Act
    const result = await reduceAsync(array, callback, defaultValue);

    // Assert
    expect(callback).not.toHaveBeenCalled();
  });

  it('should call callback when it calls with array has some items', async () => {
    // Arrange
    const array = [1, 2];
    const callback = jest.fn();
    const defaultValue = 0;

    // Act
    const result = await reduceAsync(array, callback, defaultValue);

    // Assert
    expect(callback).toHaveBeenCalled();
  });

  it('should return 3 when it calls with array equals [1, 2], callback is an async sum and default value equals 0', async () => {
    // Arrange
    const array = [1, 2];

    const sumAsync = async (a, b): Promise<number> => {
      return a + b;
    };

    const callback = async (acc, value) => {
      return await sumAsync(acc, value);
    };
    const defaultValue = 0;

    // Act
    const result = await reduceAsync(array, callback, defaultValue);

    // Assert
    expect(result).toEqual(3);
  });

  it('should return 5 when it calls with array equals [1, 2], callback is an async sum and default value calls async sum with 1 + 1', async () => {
    // Arrange
    const array = [1, 2];

    const sumAsync = async (a, b): Promise<number> => {
      return a + b;
    };

    const callback = async (acc, value) => {
      return await sumAsync(acc, value);
    };
    const defaultValue = sumAsync(1, 1);

    // Act
    const result = await reduceAsync(array, callback, defaultValue);

    // Assert
    expect(result).toEqual(5);
  });
});

describe('isFieldIdInSchema', () => {
  it('should return false when it feeds fieldId and schema equals undefined', () => {
    // Arrange
    const fieldId: string = undefined;
    const schema: InternalFieldValidationSchema = undefined;

    // Act
    const result = isFieldIdInSchema(fieldId, schema);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false when it feeds fieldId and schema equals null', () => {
    // Arrange
    const fieldId: string = null;
    const schema: InternalFieldValidationSchema = null;

    // Act
    const result = isFieldIdInSchema(fieldId, schema);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false when it feeds fieldId equals empty string and schema equals undefined', () => {
    // Arrange
    const fieldId: string = '';
    const schema: InternalFieldValidationSchema = undefined;

    // Act
    const result = isFieldIdInSchema(fieldId, schema);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false when it feeds fieldId with value and schema equals undefined', () => {
    // Arrange
    const fieldId: string = 'test-field';
    const schema: InternalFieldValidationSchema = undefined;

    // Act
    const result = isFieldIdInSchema(fieldId, schema);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false when it feeds fieldId with value and schema with values but it does not match', () => {
    // Arrange
    const fieldId: string = 'test-field';
    const schema: InternalFieldValidationSchema = {
      'another-field': [],
    };

    // Act
    const result = isFieldIdInSchema(fieldId, schema);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return true when it feeds fieldId with value and schema with values and it matches', () => {
    // Arrange
    const fieldId: string = 'test-field';
    const schema: InternalFieldValidationSchema = {
      'test-field': [],
    };

    // Act
    const result = isFieldIdInSchema(fieldId, schema);

    // Assert
    expect(result).toBeTruthy();
  });
});

describe('hasFieldIdArrayValidator', () => {
  it('should return false when it feeds fieldId and schema equals undefined', () => {
    // Arrange
    const fieldId: string = undefined;
    const schema: InternalFieldValidationSchema = undefined;

    // Act
    const result = hasFieldIdArrayValidator(fieldId, schema);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false when it feeds fieldId and schema equals null', () => {
    // Arrange
    const fieldId: string = null;
    const schema: InternalFieldValidationSchema = null;

    // Act
    const result = hasFieldIdArrayValidator(fieldId, schema);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false when it feeds fieldId equals empty string and schema equals undefined', () => {
    // Arrange
    const fieldId: string = '';
    const schema: InternalFieldValidationSchema = undefined;

    // Act
    const result = hasFieldIdArrayValidator(fieldId, schema);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false when it feeds fieldId with value and schema equals undefined', () => {
    // Arrange
    const fieldId: string = 'test-field';
    const schema: InternalFieldValidationSchema = undefined;

    // Act
    const result = hasFieldIdArrayValidator(fieldId, schema);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false when it feeds fieldId with value and schema with values but it does not match', () => {
    // Arrange
    const fieldId: string = 'test-field';
    const schema: InternalFieldValidationSchema = {
      'another-field': [],
    };

    // Act
    const result = hasFieldIdArrayValidator(fieldId, schema);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return false when it feeds fieldId is field array and schema with values and it matches', () => {
    // Arrange
    const fieldId: string = 'test-fields[0].name';
    const schema: InternalFieldValidationSchema = {
      'test-fields[0].name': [],
    };

    // Act
    const result = hasFieldIdArrayValidator(fieldId, schema);

    // Assert
    expect(result).toBeFalsy();
  });

  it('should return true when it feeds fieldId is field array and schema with values and it does not match', () => {
    // Arrange
    const fieldId: string = 'test-fields[0].name';
    const schema: InternalFieldValidationSchema = {
      'test-fields': [],
    };

    // Act
    const result = hasFieldIdArrayValidator(fieldId, schema);

    // Assert
    expect(result).toBeTruthy();
  });
});

describe('formatFieldForArrayField', () => {
  it('should return empty string when it feeds fieldId and value equals undefined', () => {
    // Arrange
    const fieldId: string = undefined;
    const value: string = undefined;

    // Act
    const result = formatFieldForArrayField(fieldId, value);

    // Assert
    const expectedResult = {
      id: '',
      value: undefined,
    };
    expect(result).toEqual(expectedResult);
  });

  it('should return empty string when it feeds fieldId and value equals null', () => {
    // Arrange
    const fieldId: string = null;
    const value: string = null;

    // Act
    const result = formatFieldForArrayField(fieldId, value);

    // Assert
    const expectedResult = {
      id: '',
      value: undefined,
    };
    expect(result).toEqual(expectedResult);
  });

  it('should return empty string when it feeds fieldId equals empty string and value equals undefined', () => {
    // Arrange
    const fieldId: string = '';
    const value: string = undefined;

    // Act
    const result = formatFieldForArrayField(fieldId, value);

    // Assert
    const expectedResult = {
      id: '',
      value: undefined,
    };
    expect(result).toEqual(expectedResult);
  });

  it('should return empty string when it feeds fieldId without array syntax and value equals undefined', () => {
    // Arrange
    const fieldId: string = 'test-field.name';
    const value: string = undefined;

    // Act
    const result = formatFieldForArrayField(fieldId, value);

    // Assert
    const expectedResult = {
      id: 'test-field',
      value: {
        name: undefined,
      },
    };
    expect(result).toEqual(expectedResult);
  });

  it('should return baseFieldId when it feeds fieldId with array syntax and value equals undefined', () => {
    // Arrange
    const fieldId: string = 'test-fields[2].name';
    const value: string = undefined;

    // Act
    const result = formatFieldForArrayField(fieldId, value);

    // Assert
    const expectedResult = {
      id: 'test-fields',
      value: [
        undefined,
        undefined,
        {
          name: undefined,
        },
      ],
    };
    expect(result).toEqual(expectedResult);
  });

  it('should return baseFieldId when it feeds fieldId with array syntax and value with value', () => {
    // Arrange
    const fieldId: string = 'test-fields[2].nested.field[1].name';
    const value: string = 'test';

    // Act
    const result = formatFieldForArrayField(fieldId, value);

    // Assert
    const expectedResult = {
      id: 'test-fields',
      value: [
        undefined,
        undefined,
        {
          nested: {
            field: [
              undefined,
              {
                name: 'test',
              },
            ],
          },
        },
      ],
    };
    expect(result).toEqual(expectedResult);
  });
});
