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

  describe(`FieldValidations`, () => {
    it(`should execute a field validation and fail when
    adding a field validation in the schema on a given field
    firing a validation for that given field that fails
`, () => {});

    it(`should execute a field validation and success when
    adding a field validation in the schema on a given field
    firing a validation for that given field that succeeds
`, () => {});

    it(`should execute a field validation and display custom message when
    adding a field validation in the schema on a given field (including custom message)
    firing a validation for that given field that fails
`, () => {});

    it(`should not execute a field validation and succeed when
    adding a field validation in the schema on a given field
    firing a validation for another field that fails
`, () => {});

    it(`should execute two validations for a given field
    adding a two field succeed validations for in the schema on a given field
    firing validation for that field
`, () => {});
  });

  describe(`FormValidations`, () => {
    // Test here all fields togehter
    // Create a form validation check is fired
    // Combine both field and form
    // Create two form validations check both executed
    // on succeed
    // first fail second succeeded
    // secondf succeeds
  });
});
