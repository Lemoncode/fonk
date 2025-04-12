import { getFonk } from './fonk.js';
import type { Errors, ValidatorFn } from './model.js';

interface ExampleModel {
  name: string;
  age: number;
  client: {
    name: string;
    orders: string[];
    a?: {
      b: {
        c: {
          d: string;
        };
      };
    };
  };
  products: {
    id: string;
    name: string;
    reviews: string[];
    a?: {
      b: { c: { d: string[] }[] }[];
    }[];
  }[];
}

describe('validateField', () => {
  it('should call the one sync validator and return the error when validator return error', async () => {
    // Arrange
    const internalValidator = vi.fn(() => 'error');
    const validator: ValidatorFn = () => internalValidator;
    const { validateField } = getFonk<ExampleModel>({
      name: [validator()],
    });

    // Act
    const result = await validateField('name', 'test');

    // Assert
    expect(internalValidator).toHaveBeenCalledWith({
      value: 'test',
      values: undefined,
    });
    expect(result).toEqual('error');
  });

  it('should call the one async validator and return the error when validator return error', async () => {
    // Arrange
    const internalValidator = vi.fn(async () => 'error');
    const validator: ValidatorFn = () => internalValidator;
    const { validateField } = getFonk<ExampleModel>({
      name: [validator()],
    });

    // Act
    const result = await validateField('name', 'test');

    // Assert
    expect(internalValidator).toHaveBeenCalledWith({
      value: 'test',
      values: undefined,
    });
    expect(result).toEqual('error');
  });

  it('should return undefined when validator return undefined', async () => {
    // Arrange
    const validator: ValidatorFn = () => () => undefined;
    const { validateField } = getFonk<ExampleModel>({
      name: [validator()],
    });

    // Act
    const result = await validateField('name', 'test');

    // Assert
    expect(result).toBeUndefined();
  });

  it('should return custom error when validator return custom error', async () => {
    // Arrange
    interface CustomErrorMessage {
      success: boolean;
      message: string;
    }

    const validator: ValidatorFn<{}, CustomErrorMessage> = () => () => ({
      success: true,
      message: 'custom error',
    });
    const { validateField } = getFonk<ExampleModel, CustomErrorMessage>({
      name: [validator()],
    });

    // Act
    const result = await validateField('name', 'test');

    // Assert
    expect(result).toEqual({
      success: true,
      message: 'custom error',
    });
  });

  it('should return the same error message that it provides from validationSchema', async () => {
    // Arrange
    const validator: ValidatorFn =
      ({ message }) =>
      () =>
        Boolean(message) ? message : 'error';
    const { validateField } = getFonk<ExampleModel>({
      name: [validator({ message: 'translated message' })],
    });

    // Act
    const result = await validateField('name', 'test');

    // Assert
    expect(result).toEqual('translated message');
  });

  it('should use the custom params that it provides from validationSchema', async () => {
    // Arrange
    interface CustomParams {
      param1: string;
      param2: number;
    }

    const validator: ValidatorFn<CustomParams> =
      ({ message, param1, param2 }) =>
      () =>
        `${message} ${param1} ${param2}`;
    const { validateField } = getFonk<ExampleModel>({
      name: [validator({ message: 'error', param1: 'test', param2: 123 })],
    });

    // Act
    const result = await validateField('name', 'test');

    // Assert
    expect(result).toEqual('error test 123');
  });

  it('should use value and values from the validateField function', async () => {
    // Arrange
    const validator: ValidatorFn =
      () =>
      ({ value, values }) =>
        `${value} ${JSON.stringify(values)}`;
    const { validateField } = getFonk<ExampleModel>({
      name: [validator()],
    });

    // Act
    const result = await validateField('name', 'test', {
      name: 'test',
      age: 10,
      client: { name: 'test', orders: [] },
      products: [],
    });

    // Assert
    expect(result).toEqual(`test {"name":"test","age":10,"client":{"name":"test","orders":[]},"products":[]}`);
  });

  it('should call both validators and return undefined when both validators return undefined', async () => {
    // Arrange
    const internalValidator1 = vi.fn(() => undefined);
    const internalValidator2 = vi.fn(() => undefined);
    const validator1: ValidatorFn = () => internalValidator1;
    const validator2: ValidatorFn = () => internalValidator2;
    const { validateField } = getFonk<ExampleModel>({
      name: [validator1(), validator2()],
    });

    // Act
    const result = await validateField('name', 'test');

    // Assert
    expect(internalValidator1).toHaveBeenCalledWith({
      value: 'test',
      values: undefined,
    });
    expect(internalValidator2).toHaveBeenCalledWith({
      value: 'test',
      values: undefined,
    });
    expect(result).toBeUndefined();
  });

  it('should call both validators and return the second error when the first validator return undefined and the second one return error', async () => {
    // Arrange
    const internalValidator1 = vi.fn(() => undefined);
    const internalValidator2 = vi.fn(() => 'error2');
    const validator1: ValidatorFn = () => internalValidator1;
    const validator2: ValidatorFn = () => internalValidator2;
    const { validateField } = getFonk<ExampleModel>({
      name: [validator1(), validator2()],
    });

    // Act
    const result = await validateField('name', 'test');

    // Assert
    expect(internalValidator1).toHaveBeenCalledWith({
      value: 'test',
      values: undefined,
    });
    expect(internalValidator2).toHaveBeenCalledWith({
      value: 'test',
      values: undefined,
    });
    expect(result).toEqual('error2');
  });

  it('should call only the first validator and return the first error when both validators returns error', async () => {
    // Arrange
    const internalValidator1 = vi.fn(() => 'error1');
    const internalValidator2 = vi.fn(() => 'error2');
    const validator1: ValidatorFn = () => internalValidator1;
    const validator2: ValidatorFn = () => internalValidator2;
    const { validateField } = getFonk<ExampleModel>({
      name: [validator1(), validator2()],
    });

    // Act
    const result = await validateField('name', 'test');

    // Assert
    expect(internalValidator1).toHaveBeenCalledWith({
      value: 'test',
      values: undefined,
    });
    expect(internalValidator2).not.toHaveBeenCalled();
    expect(result).toEqual('error1');
  });

  it('should call only the first validator and return the first error when the first validator returns error and the second one returns undefined', async () => {
    // Arrange
    const internalValidator1 = vi.fn(() => 'error1');
    const internalValidator2 = vi.fn(() => undefined);
    const validator1: ValidatorFn = () => internalValidator1;
    const validator2: ValidatorFn = () => internalValidator2;
    const { validateField } = getFonk<ExampleModel>({
      name: [validator1(), validator2()],
    });

    // Act
    const result = await validateField('name', 'test');

    // Assert
    expect(internalValidator1).toHaveBeenCalledWith({
      value: 'test',
      values: undefined,
    });
    expect(internalValidator2).not.toHaveBeenCalled();
    expect(result).toEqual('error1');
  });

  it('should call only related validators when it provides several fields validators in validationSchema', async () => {
    // Arrange
    const nameInternalValidator = vi.fn(() => undefined);
    const ageInternalValidator = vi.fn(() => undefined);
    const nameValidator: ValidatorFn = () => nameInternalValidator;
    const ageValidator: ValidatorFn = () => ageInternalValidator;
    const { validateField } = getFonk<ExampleModel>({
      name: [nameValidator()],
      age: [ageValidator()],
    });

    // Act
    const result = await validateField('name', 'test');

    // Assert
    expect(nameInternalValidator).toHaveBeenCalledWith({
      value: 'test',
      values: undefined,
    });
    expect(ageInternalValidator).not.toHaveBeenCalled();
    expect(result).toBeUndefined();
  });

  it('should validate nested fields correctly', async () => {
    // Arrange
    const internalValidator = vi.fn(() => 'error');
    const validator: ValidatorFn = () => internalValidator;
    const { validateField } = getFonk<ExampleModel>({
      'client.name': [validator()],
    });

    // Act
    const result = await validateField('client.name', 'test');

    // Assert
    expect(internalValidator).toHaveBeenCalledWith({
      value: 'test',
      values: undefined,
    });
    expect(result).toEqual('error');
  });

  it('should validate nested fields at multiple levels correctly', async () => {
    // Arrange
    const aInternalValidator = vi.fn(() => 'error1');
    const aValidator: ValidatorFn = () => aInternalValidator;
    const bInternalValidator = vi.fn(() => 'error2');
    const bValidator: ValidatorFn = () => bInternalValidator;
    const cInternalValidator = vi.fn(() => 'error3');
    const cValidator: ValidatorFn = () => cInternalValidator;
    const dInternalValidator = vi.fn(() => 'error4');
    const dValidator: ValidatorFn = () => dInternalValidator;

    const { validateField } = getFonk<ExampleModel>({
      'client.a': [aValidator()],
      'client.a.b': [bValidator()],
      'client.a.b.c': [cValidator()],
      'client.a.b.c.d': [dValidator()],
    });

    // Act
    const aResult = await validateField('client.a', { b: { c: { d: 'test' } } });
    const bResult = await validateField('client.a.b', { c: { d: 'test' } });
    const cResult = await validateField('client.a.b.c', { d: 'test' });
    const dResult = await validateField('client.a.b.c.d', 'test');

    // Assert
    expect(aInternalValidator).toHaveBeenCalledWith({
      value: { b: { c: { d: 'test' } } },
      values: undefined,
    });
    expect(aResult).toEqual('error1');
    expect(bInternalValidator).toHaveBeenCalledWith({
      value: { c: { d: 'test' } },
      values: undefined,
    });
    expect(bResult).toEqual('error2');
    expect(cInternalValidator).toHaveBeenCalledWith({
      value: { d: 'test' },
      values: undefined,
    });
    expect(cResult).toEqual('error3');
    expect(dInternalValidator).toHaveBeenCalledWith({
      value: 'test',
      values: undefined,
    });
    expect(dResult).toEqual('error4');
  });

  it('should validate array fields correctly', async () => {
    // Arrange
    const productsInternalValidator = vi.fn(() => 'error1');
    const productsValidator: ValidatorFn = () => productsInternalValidator;
    const productNameInternalValidator = vi.fn(() => 'error2');
    const productNameValidator: ValidatorFn = () => productNameInternalValidator;
    const { validateField } = getFonk<ExampleModel>({
      products: [productsValidator()],
      'products[i].name': [productNameValidator()],
    });

    // Act
    const productsResult = await validateField('products', [{ id: 'id', name: 'name', reviews: [] }]);
    const productNameResult = await validateField('products[0].name', 'test');

    // Assert
    expect(productsInternalValidator).toHaveBeenCalledWith({
      value: [{ id: 'id', name: 'name', reviews: [] }],
      values: undefined,
    });
    expect(productsResult).toEqual('error1');
    expect(productNameInternalValidator).toHaveBeenCalledWith({
      value: 'test',
      values: undefined,
    });
    expect(productNameResult).toEqual('error2');
  });

  it('should validate nested array fields correctly', async () => {
    // Arrange
    const orderInternalValidator = vi.fn(() => 'error1');
    const orderValidator: ValidatorFn = () => orderInternalValidator;
    const reviewInternalValidator = vi.fn(() => 'error2');
    const reviewValidator: ValidatorFn = () => reviewInternalValidator;
    const { validateField } = getFonk<ExampleModel>({
      'client.orders[i]': [orderValidator()],
      'products[i].reviews[i]': [reviewValidator()],
    });

    // Act
    const orderResult = await validateField('client.orders[0]', 'order1');
    const reviewResult = await validateField('products[1].reviews[20]', 'review20');

    // Assert
    expect(orderInternalValidator).toHaveBeenCalledWith({
      value: 'order1',
      values: undefined,
    });
    expect(reviewInternalValidator).toHaveBeenCalledWith({
      value: 'review20',
      values: undefined,
    });
    expect(orderResult).toEqual('error1');
    expect(reviewResult).toEqual('error2');
  });

  it('should validate nested array fields at multiple levels correctly', async () => {
    // Arrange
    const productsInternalValidator = vi.fn(() => 'error1');
    const productsValidator: ValidatorFn = () => productsInternalValidator;
    const productAInternalValidator = vi.fn(() => 'error2');
    const productAValidator: ValidatorFn = () => productAInternalValidator;
    const productBInternalValidator = vi.fn(() => 'error3');
    const productBValidator: ValidatorFn = () => productBInternalValidator;
    const productCInternalValidator = vi.fn(() => 'error4');
    const productCValidator: ValidatorFn = () => productCInternalValidator;
    const productDInternalValidator = vi.fn(() => 'error5');
    const productDValidator: ValidatorFn = () => productDInternalValidator;
    const productDItemInternalValidator = vi.fn(() => 'error6');
    const productDItemValidator: ValidatorFn = () => productDItemInternalValidator;

    const { validateField } = getFonk<ExampleModel>({
      products: [productsValidator()],
      'products[i].a': [productAValidator()],
      'products[i].a[i].b': [productBValidator()],
      'products[i].a[i].b[i].c': [productCValidator()],
      'products[i].a[i].b[i].c[i].d': [productDValidator()],
      'products[i].a[i].b[i].c[i].d[i]': [productDItemValidator()],
    });

    // Act
    const productsResult = await validateField('products', [{ id: 'id', name: 'name', reviews: [] }]);
    const productAResult = await validateField('products[0].a', [{ b: [{ c: [{ d: ['test'] }] }] }]);
    const productBResult = await validateField('products[0].a[1].b', [{ c: [{ d: ['test'] }] }]);
    const productCResult = await validateField('products[0].a[1].b[2].c', [{ d: ['test'] }]);
    const productDResult = await validateField('products[0].a[1].b[2].c[3].d', ['test']);
    const productDItemResult = await validateField('products[0].a[1].b[2].c[3].d[4]', 'test');

    // Assert
    expect(productsInternalValidator).toHaveBeenCalledWith({
      value: [{ id: 'id', name: 'name', reviews: [] }],
      values: undefined,
    });
    expect(productsResult).toEqual('error1');
    expect(productAInternalValidator).toHaveBeenCalledWith({
      value: [{ b: [{ c: [{ d: ['test'] }] }] }],
      values: undefined,
    });
    expect(productAResult).toEqual('error2');
    expect(productBInternalValidator).toHaveBeenCalledWith({
      value: [{ c: [{ d: ['test'] }] }],
      values: undefined,
    });
    expect(productBResult).toEqual('error3');
    expect(productCInternalValidator).toHaveBeenCalledWith({
      value: [{ d: ['test'] }],
      values: undefined,
    });
    expect(productCResult).toEqual('error4');
    expect(productDInternalValidator).toHaveBeenCalledWith({
      value: ['test'],
      values: undefined,
    });
    expect(productDResult).toEqual('error5');
    expect(productDItemInternalValidator).toHaveBeenCalledWith({
      value: 'test',
      values: undefined,
    });
    expect(productDItemResult).toEqual('error6');
  });

  it('should validate array fields with array indexes correctly', async () => {
    // Arrange
    const internalValidator = vi.fn(() => 'error');
    const validator: ValidatorFn = () => internalValidator;
    const { validateField } = getFonk<ExampleModel>({
      'products[i].name': [validator()],
      'client.orders[i]': [validator()],
      products: [validator()],
      'products[i].reviews[i]': [validator()],
      'products[i].a': [validator()],
      'products[i].a[i].b': [validator()],
      'products[i].a[i].b[i].c': [validator()],
      'products[i].a[i].b[i].c[i].d': [validator()],
      'products[i].a[i].b[i].c[i].d[i]': [validator()],
    });

    // Act
    const values: ExampleModel = {
      name: 'test',
      age: 10,
      client: { name: 'test', orders: ['order1', 'order2'] },
      products: [
        {
          id: 'id',
          name: 'name',
          reviews: ['review1', 'review2'],
          a: [{ b: [{ c: [{ d: ['d-value'] }] }] }],
        },
      ],
    };
    await validateField('products[0].name', 'test', values, { products: 0 });
    await validateField('client.orders[0]', 'order1', values, { 'client.orders': 0 });
    await validateField('products[1].reviews[20]', 'review20', values, {
      products: 1,
      'products.reviews': 20,
    });
    await validateField('products', [{ id: 'id', name: 'name', reviews: [] }], values);
    await validateField('products[0].a', [{ b: [{ c: [{ d: ['test'] }] }] }], values, {
      products: 0,
    });
    await validateField('products[0].a[1].b', [{ c: [{ d: ['test'] }] }], values, {
      products: 0,
      'products.a': 1,
    });
    await validateField('products[0].a[1].b[2].c', [{ d: ['test'] }], values, {
      products: 0,
      'products.a': 1,
      'products.a.b': 2,
    });
    await validateField('products[0].a[1].b[2].c[3].d', ['test'], values, {
      products: 0,
      'products.a': 1,
      'products.a.b': 2,
      'products.a.b.c': 3,
    });
    await validateField('products[0].a[1].b[2].c[3].d[4]', 'test', values, {
      products: 0,
      'products.a': 1,
      'products.a.b': 2,
      'products.a.b.c': 3,
      'products.a.b.c.d': 4,
    });

    // Assert
    expect(internalValidator).toHaveBeenNthCalledWith(1, {
      value: 'test',
      values,
      arrayIndexes: { products: 0 },
    });
    expect(internalValidator).toHaveBeenNthCalledWith(2, {
      value: 'order1',
      values,
      arrayIndexes: { 'client.orders': 0 },
    });
    expect(internalValidator).toHaveBeenNthCalledWith(3, {
      value: 'review20',
      values,
      arrayIndexes: { products: 1, 'products.reviews': 20 },
    });
    expect(internalValidator).toHaveBeenNthCalledWith(4, {
      value: [{ id: 'id', name: 'name', reviews: [] }],
      values,
      arrayIndexes: undefined,
    });
    expect(internalValidator).toHaveBeenNthCalledWith(5, {
      value: [{ b: [{ c: [{ d: ['test'] }] }] }],
      values,
      arrayIndexes: { products: 0 },
    });
    expect(internalValidator).toHaveBeenNthCalledWith(6, {
      value: [{ c: [{ d: ['test'] }] }],
      values,
      arrayIndexes: { products: 0, 'products.a': 1 },
    });
    expect(internalValidator).toHaveBeenNthCalledWith(7, {
      value: [{ d: ['test'] }],
      values,
      arrayIndexes: { products: 0, 'products.a': 1, 'products.a.b': 2 },
    });
    expect(internalValidator).toHaveBeenNthCalledWith(8, {
      value: ['test'],
      values,
      arrayIndexes: { products: 0, 'products.a': 1, 'products.a.b': 2, 'products.a.b.c': 3 },
    });
    expect(internalValidator).toHaveBeenNthCalledWith(9, {
      value: 'test',
      values,
      arrayIndexes: { products: 0, 'products.a': 1, 'products.a.b': 2, 'products.a.b.c': 3, 'products.a.b.c.d': 4 },
    });
  });
});

describe('validateAll', () => {
  it('should call the one sync validator and return the error when validator return error', async () => {
    // Arrange
    const internalValidator = vi.fn(() => 'error');
    const validator: ValidatorFn = () => internalValidator;
    const { validateAll } = getFonk<ExampleModel>({
      name: [validator()],
    });

    // Act
    const result = await validateAll({
      name: 'test',
      age: 10,
      client: { name: 'test', orders: [] },
      products: [],
    });

    // Assert
    expect(internalValidator).toHaveBeenCalledWith({
      value: 'test',
      values: {
        name: 'test',
        age: 10,
        client: { name: 'test', orders: [] },
        products: [],
      },
    });
    const expectedError: Errors<ExampleModel> = {
      name: 'error',
    };
    expect(result).toEqual(expectedError);
  });

  it('should call the one async validator and return the error when validator return error', async () => {
    // Arrange
    const internalValidator = vi.fn(async () => 'error');
    const validator: ValidatorFn = () => internalValidator;
    const { validateAll } = getFonk<ExampleModel>({
      name: [validator()],
    });

    // Act
    const result = await validateAll({
      name: 'test',
      age: 10,
      client: { name: 'test', orders: [] },
      products: [],
    });

    // Assert
    expect(internalValidator).toHaveBeenCalledWith({
      value: 'test',
      values: {
        name: 'test',
        age: 10,
        client: { name: 'test', orders: [] },
        products: [],
      },
    });
    const expectedError: Errors<ExampleModel> = {
      name: 'error',
    };
    expect(result).toEqual(expectedError);
  });

  it('should return undefined when validator return undefined', async () => {
    // Arrange
    const validator: ValidatorFn = () => () => undefined;
    const { validateAll } = getFonk<ExampleModel>({
      name: [validator()],
    });

    // Act
    const result = await validateAll({
      name: 'test',
      age: 10,
      client: { name: 'test', orders: [] },
      products: [],
    });

    // Assert
    expect(result).toBeUndefined();
  });

  it('should return custom error when validator return custom error', async () => {
    // Arrange
    interface CustomErrorMessage {
      success: boolean;
      message: string;
    }

    const validator: ValidatorFn<{}, CustomErrorMessage> = () => () => ({
      success: true,
      message: 'custom error',
    });
    const { validateAll } = getFonk<ExampleModel, CustomErrorMessage>({
      name: [validator()],
    });

    // Act
    const result = await validateAll({
      name: 'test',
      age: 10,
      client: { name: 'test', orders: [] },
      products: [],
    });

    // Assert
    expect(result).toEqual({
      name: {
        success: true,
        message: 'custom error',
      },
    });
  });

  it('should return the same error message that it provides from validationSchema', async () => {
    // Arrange
    const validator: ValidatorFn =
      ({ message }) =>
      () =>
        Boolean(message) ? message : 'error';
    const { validateAll } = getFonk<ExampleModel>({
      name: [validator({ message: 'translated message' })],
    });

    // Act
    const result = await validateAll({
      name: 'test',
      age: 10,
      client: { name: 'test', orders: [] },
      products: [],
    });

    // Assert
    expect(result).toEqual({
      name: 'translated message',
    });
  });

  it('should use the custom params that it provides from validationSchema', async () => {
    // Arrange
    interface CustomParams {
      param1: string;
      param2: number;
    }

    const validator: ValidatorFn<CustomParams> =
      ({ message, param1, param2 }) =>
      () =>
        `${message} ${param1} ${param2}`;
    const { validateAll } = getFonk<ExampleModel>({
      name: [validator({ message: 'error', param1: 'test', param2: 123 })],
    });

    // Act
    const result = await validateAll({
      name: 'test',
      age: 10,
      client: { name: 'test', orders: [] },
      products: [],
    });

    // Assert
    expect(result).toEqual({
      name: 'error test 123',
    });
  });

  it('should use value and values from the validateAll function', async () => {
    // Arrange
    const validator: ValidatorFn =
      () =>
      ({ value, values }) =>
        `${value} ${JSON.stringify(values)}`;
    const { validateAll } = getFonk<ExampleModel>({
      name: [validator()],
    });

    // Act
    const result = await validateAll({
      name: 'test',
      age: 10,
      client: { name: 'test', orders: [] },
      products: [],
    });

    // Assert
    expect(result).toEqual({
      name: `test {"name":"test","age":10,"client":{"name":"test","orders":[]},"products":[]}`,
    });
  });

  it('should call both validators and return undefined when both validators return undefined', async () => {
    // Arrange
    const internalValidator1 = vi.fn(() => undefined);
    const internalValidator2 = vi.fn(() => undefined);
    const validator1: ValidatorFn = () => internalValidator1;
    const validator2: ValidatorFn = () => internalValidator2;
    const { validateAll } = getFonk<ExampleModel>({
      name: [validator1(), validator2()],
    });

    // Act
    const result = await validateAll({
      name: 'test',
      age: 10,
      client: { name: 'test', orders: [] },
      products: [],
    });

    // Assert
    expect(internalValidator1).toHaveBeenCalledWith({
      value: 'test',
      values: {
        name: 'test',
        age: 10,
        client: { name: 'test', orders: [] },
        products: [],
      },
    });
    expect(internalValidator2).toHaveBeenCalledWith({
      value: 'test',
      values: {
        name: 'test',
        age: 10,
        client: { name: 'test', orders: [] },
        products: [],
      },
    });
    expect(result).toBeUndefined();
  });

  it('should call both validators and return the second error when the first validator return undefined and the second one return error', async () => {
    // Arrange
    const internalValidator1 = vi.fn(() => undefined);
    const internalValidator2 = vi.fn(() => 'error2');
    const validator1: ValidatorFn = () => internalValidator1;
    const validator2: ValidatorFn = () => internalValidator2;
    const { validateAll } = getFonk<ExampleModel>({
      name: [validator1(), validator2()],
    });

    // Act
    const result = await validateAll({
      name: 'test',
      age: 10,
      client: { name: 'test', orders: [] },
      products: [],
    });

    // Assert
    expect(internalValidator1).toHaveBeenCalledWith({
      value: 'test',
      values: {
        name: 'test',
        age: 10,
        client: { name: 'test', orders: [] },
        products: [],
      },
    });
    expect(internalValidator2).toHaveBeenCalledWith({
      value: 'test',
      values: {
        name: 'test',
        age: 10,
        client: { name: 'test', orders: [] },
        products: [],
      },
    });
    expect(result).toEqual({
      name: 'error2',
    });
  });

  it('should call only the first validator and return the first error when both validators returns error', async () => {
    // Arrange
    const internalValidator1 = vi.fn(() => 'error1');
    const internalValidator2 = vi.fn(() => 'error2');
    const validator1: ValidatorFn = () => internalValidator1;
    const validator2: ValidatorFn = () => internalValidator2;
    const { validateAll } = getFonk<ExampleModel>({
      name: [validator1(), validator2()],
    });

    // Act
    const result = await validateAll({
      name: 'test',
      age: 10,
      client: { name: 'test', orders: [] },
      products: [],
    });

    // Assert
    expect(internalValidator1).toHaveBeenCalledWith({
      value: 'test',
      values: {
        name: 'test',
        age: 10,
        client: { name: 'test', orders: [] },
        products: [],
      },
    });
    expect(internalValidator2).not.toHaveBeenCalled();
    expect(result).toEqual({
      name: 'error1',
    });
  });

  it('should call only the first validator and return the first error when the first validator returns error and the second one returns undefined', async () => {
    // Arrange
    const internalValidator1 = vi.fn(() => 'error1');
    const internalValidator2 = vi.fn(() => undefined);
    const validator1: ValidatorFn = () => internalValidator1;
    const validator2: ValidatorFn = () => internalValidator2;
    const { validateAll } = getFonk<ExampleModel>({
      name: [validator1(), validator2()],
    });

    // Act
    const result = await validateAll({
      name: 'test',
      age: 10,
      client: { name: 'test', orders: [] },
      products: [],
    });

    // Assert
    expect(internalValidator1).toHaveBeenCalledWith({
      value: 'test',
      values: {
        name: 'test',
        age: 10,
        client: { name: 'test', orders: [] },
        products: [],
      },
    });
    expect(internalValidator2).not.toHaveBeenCalled();
    expect(result).toEqual({
      name: 'error1',
    });
  });

  it('should call all validators for simple fields when it provides several fields validators in validationSchema', async () => {
    // Arrange
    const nameInternalValidator = vi.fn(() => 'error1');
    const nameValidator: ValidatorFn = () => nameInternalValidator;
    const ageInternalValidator = vi.fn(() => 'error2');
    const ageValidator: ValidatorFn = () => ageInternalValidator;
    const { validateAll } = getFonk<ExampleModel>({
      name: [nameValidator()],
      age: [ageValidator()],
    });

    // Act
    const result = await validateAll({
      name: 'test',
      age: 10,
      client: { name: 'test', orders: [] },
      products: [],
    });

    // Assert
    expect(nameInternalValidator).toHaveBeenCalledWith({
      value: 'test',
      values: {
        name: 'test',
        age: 10,
        client: { name: 'test', orders: [] },
        products: [],
      },
    });
    expect(ageInternalValidator).toHaveBeenCalledWith({
      value: 10,
      values: {
        name: 'test',
        age: 10,
        client: { name: 'test', orders: [] },
        products: [],
      },
    });
    const expectedError: Errors<ExampleModel> = {
      name: 'error1',
      age: 'error2',
    };
    expect(result).toEqual(expectedError);
  });

  it('should validate nested fields correctly', async () => {
    // Arrange
    const internalValidator = vi.fn(() => 'error');
    const validator: ValidatorFn = () => internalValidator;
    const { validateAll } = getFonk<ExampleModel>({
      'client.name': [validator()],
    });

    // Act
    const result = await validateAll({
      name: 'test',
      age: 10,
      client: { name: 'test', orders: [] },
      products: [],
    });

    // Assert
    expect(internalValidator).toHaveBeenCalledWith({
      value: 'test',
      values: {
        name: 'test',
        age: 10,
        client: { name: 'test', orders: [] },
        products: [],
      },
    });
    expect(result).toEqual({
      'client.name': 'error',
    });
  });

  it('should validate nested fields at multiple levels correctly', async () => {
    // Arrange
    const aInternalValidator = vi.fn(() => 'error1');
    const aValidator: ValidatorFn = () => aInternalValidator;
    const bInternalValidator = vi.fn(() => 'error2');
    const bValidator: ValidatorFn = () => bInternalValidator;
    const cInternalValidator = vi.fn(() => 'error3');
    const cValidator: ValidatorFn = () => cInternalValidator;
    const dInternalValidator = vi.fn(() => 'error4');
    const dValidator: ValidatorFn = () => dInternalValidator;

    const { validateAll } = getFonk<ExampleModel>({
      'client.a': [aValidator()],
      'client.a.b': [bValidator()],
      'client.a.b.c': [cValidator()],
      'client.a.b.c.d': [dValidator()],
    });

    // Act
    const result = await validateAll({
      name: 'test',
      age: 10,
      client: { a: { b: { c: { d: 'test' } } }, name: 'test', orders: [] },
      products: [],
    });

    // Assert
    expect(aInternalValidator).toHaveBeenCalledWith({
      value: { b: { c: { d: 'test' } } },
      values: {
        name: 'test',
        age: 10,
        client: { a: { b: { c: { d: 'test' } } }, name: 'test', orders: [] },
        products: [],
      },
    });
    const expectedError: Errors<ExampleModel> = {
      'client.a': 'error1',
      'client.a.b': 'error2',
      'client.a.b.c': 'error3',
      'client.a.b.c.d': 'error4',
    };
    expect(result).toEqual(expectedError);
  });

  it('should validate array fields correctly', async () => {
    // Arrange
    const internalValidator = vi.fn(({ value }) => `error-${value}`);
    const validator: ValidatorFn = () => internalValidator;
    const { validateAll } = getFonk<ExampleModel>({
      'products[i].name': [validator()],
    });

    // Act
    const values: ExampleModel = {
      name: 'test',
      age: 10,
      client: { name: 'test', orders: [] },
      products: [
        { id: 'id-1', name: 'test-1', reviews: [] },
        { id: 'id-2', name: 'test-2', reviews: [] },
      ],
    };
    const result = await validateAll(values);

    // Assert
    expect(internalValidator).toHaveBeenNthCalledWith(1, {
      value: 'test-1',
      values,
      arrayIndexes: { products: 0 },
    });
    expect(internalValidator).toHaveBeenNthCalledWith(2, {
      value: 'test-2',
      values,
      arrayIndexes: { products: 1 },
    });
    const expectedError: Errors<ExampleModel> = {
      'products[0].name': 'error-test-1',
      'products[1].name': 'error-test-2',
    };
    expect(result).toEqual(expectedError);
  });

  it('should validate nested fields in array fields correctly', async () => {
    // Arrange
    const internalValidator = vi.fn(({ value }) => `error-${value}`);
    const validator: ValidatorFn = () => internalValidator;
    const { validateAll } = getFonk<ExampleModel>({
      'client.orders[i]': [validator()],
      'products[i].reviews[i]': [validator()],
    });

    // Act
    const values: ExampleModel = {
      name: 'test',
      age: 10,
      client: { name: 'test', orders: ['order1', 'order2'] },
      products: [
        { id: 'id-1', name: 'name-1', reviews: ['review1', 'review2'] },
        { id: 'id-2', name: 'name-2', reviews: ['review3'] },
      ],
    };
    const result = await validateAll(values);

    // Assert
    expect(internalValidator).toHaveBeenNthCalledWith(1, {
      value: 'order1',
      values,
      arrayIndexes: { 'client.orders': 0 },
    });
    expect(internalValidator).toHaveBeenNthCalledWith(2, {
      value: 'order2',
      values,
      arrayIndexes: { 'client.orders': 1 },
    });
    expect(internalValidator).toHaveBeenNthCalledWith(3, {
      value: 'review1',
      values,
      arrayIndexes: {
        products: 0,
        'products.reviews': 0,
      },
    });
    expect(internalValidator).toHaveBeenNthCalledWith(4, {
      value: 'review2',
      values,
      arrayIndexes: {
        products: 0,
        'products.reviews': 1,
      },
    });
    expect(internalValidator).toHaveBeenNthCalledWith(5, {
      value: 'review3',
      values,
      arrayIndexes: {
        products: 1,
        'products.reviews': 0,
      },
    });
    const expectedError: Errors<ExampleModel> = {
      'client.orders[0]': 'error-order1',
      'client.orders[1]': 'error-order2',
      'products[0].reviews[0]': 'error-review1',
      'products[0].reviews[1]': 'error-review2',
      'products[1].reviews[0]': 'error-review3',
    };
    expect(result).toEqual(expectedError);
  });

  it('should validate nested array fields at multiple levels correctly', async () => {
    // Arrange
    const productsInternalValidator = vi.fn(() => 'error1');
    const productsValidator: ValidatorFn = () => productsInternalValidator;
    const productAInternalValidator = vi.fn(() => 'error2');
    const productAValidator: ValidatorFn = () => productAInternalValidator;
    const productBInternalValidator = vi.fn(() => 'error3');
    const productBValidator: ValidatorFn = () => productBInternalValidator;
    const productCInternalValidator = vi.fn(() => 'error4');
    const productCValidator: ValidatorFn = () => productCInternalValidator;
    const productDInternalValidator = vi.fn(() => 'error5');
    const productDValidator: ValidatorFn = () => productDInternalValidator;
    const productDItemInternalValidator = vi.fn(() => 'error6');
    const productDItemValidator: ValidatorFn = () => productDItemInternalValidator;

    const { validateAll } = getFonk<ExampleModel>({
      products: [productsValidator()],
      'products[i].a': [productAValidator()],
      'products[i].a[i].b': [productBValidator()],
      'products[i].a[i].b[i].c': [productCValidator()],
      'products[i].a[i].b[i].c[i].d': [productDValidator()],
      'products[i].a[i].b[i].c[i].d[i]': [productDItemValidator()],
    });

    // Act
    const values: ExampleModel = {
      name: 'test',
      age: 10,
      client: { name: 'test', orders: [] },
      products: [
        {
          id: 'id',
          name: 'name',
          reviews: [],
          a: [{ b: [{ c: [{ d: ['d-value'] }] }] }],
        },
      ],
    };
    const result = await validateAll(values);

    // Assert
    expect(productsInternalValidator).toHaveBeenCalledWith({
      value: [
        {
          id: 'id',
          name: 'name',
          reviews: [],
          a: [{ b: [{ c: [{ d: ['d-value'] }] }] }],
        },
      ],
      values,
    });
    expect(productAInternalValidator).toHaveBeenCalledWith({
      value: [{ b: [{ c: [{ d: ['d-value'] }] }] }],
      values,
      arrayIndexes: { products: 0 },
    });
    expect(productBInternalValidator).toHaveBeenCalledWith({
      value: [{ c: [{ d: ['d-value'] }] }],
      values,
      arrayIndexes: { products: 0, 'products.a': 0 },
    });
    expect(productCInternalValidator).toHaveBeenCalledWith({
      value: [{ d: ['d-value'] }],
      values,
      arrayIndexes: { products: 0, 'products.a': 0, 'products.a.b': 0 },
    });
    expect(productDInternalValidator).toHaveBeenCalledWith({
      value: ['d-value'],
      values,
      arrayIndexes: { products: 0, 'products.a': 0, 'products.a.b': 0, 'products.a.b.c': 0 },
    });
    expect(productDItemInternalValidator).toHaveBeenCalledWith({
      value: 'd-value',
      values,
      arrayIndexes: {
        products: 0,
        'products.a': 0,
        'products.a.b': 0,
        'products.a.b.c': 0,
        'products.a.b.c.d': 0,
      },
    });
    const expectedError: Errors<ExampleModel> = {
      products: 'error1',
      'products[0].a': 'error2',
      'products[0].a[0].b': 'error3',
      'products[0].a[0].b[0].c': 'error4',
      'products[0].a[0].b[0].c[0].d': 'error5',
      'products[0].a[0].b[0].c[0].d[0]': 'error6',
    };
    expect(result).toEqual(expectedError);
  });
});
