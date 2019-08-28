import { createFormValidation, FormValidation } from './form-validation';
import { ValidationSchema } from './model';

describe('createFormValidation', () => {
  it(`spec #1: should return an instance of FormValidation
  when calling createFormValidation
  `, () => {
    // Arrange

    const validationSchema: ValidationSchema = {};

    // Act
    const formValidation = createFormValidation(validationSchema);

    // Assert
    expect(formValidation).toBeInstanceOf(FormValidation);
  });
});
