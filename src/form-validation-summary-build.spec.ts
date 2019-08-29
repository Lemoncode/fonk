import { buildFormValidationResult } from './form-validation-summary-builder';
import { ValidationResult } from './model';

describe(`buildFormValidationResult`, () => {
  it(`Spec #1 => should returns new FormValidationResult equals { succeeded: true }
  when passing fieldValidationResults equals undefined`, () => {
    // Arrange
    const validationResults: ValidationResult[] = void 0;

    // Act
    const formValidationSummary = buildFormValidationResult(validationResults);

    // Assert
    expect(formValidationSummary.succeeded).toBeTruthy();
    expect(formValidationSummary.fieldErrors.length).toBe(0);
    expect(formValidationSummary.recordErrors.length).toBe(0);
  });

  it(`Spec #2 => should returns new FormValidationResult equals { succeeded: true }
  when passing fieldValidationResults equals null`, () => {
    // Arrange
    const validationResults: ValidationResult[] = null;

    // Act
    const formValidationSummary = buildFormValidationResult(validationResults);

    // Assert
    expect(formValidationSummary.succeeded).toBeTruthy();
    expect(formValidationSummary.fieldErrors.length).toBe(0);
    expect(formValidationSummary.recordErrors.length).toBe(0);
  });

  it(`Spec #3 => should returns new FormValidationResult equals { succeeded: true }
  when passing fieldValidationResults equals []`, () => {
    // Arrange
    const validationResults: ValidationResult[] = [];

    // Act
    const formValidationSummary = buildFormValidationResult(validationResults);

    // Assert
    expect(formValidationSummary.succeeded).toBeTruthy();
    expect(formValidationSummary.fieldErrors.length).toBe(0);
    expect(formValidationSummary.recordErrors.length).toBe(0);
  });

  it(`Spec #4 => should returns new FormValidationResult equals { succeeded: true }
  when passing fieldValidationResults contains one element and succeeded`, () => {
    // Arrange
    const validationResults: ValidationResult[] = [
      {
        succeeded: true,
        type: 'MY_VALIDATION',
        message: 'My Error Message',
        key: 'myfield',
      },
    ];

    // Act
    const formValidationSummary = buildFormValidationResult(validationResults);

    // Assert
    expect(formValidationSummary.succeeded).toBeTruthy();
    expect(formValidationSummary.fieldErrors.length).toBe(0);
    expect(formValidationSummary.recordErrors.length).toBe(0);
  });

  it(`Spec #5 => should returns new FormValidationResult equals { succeeded: false }
  when passing fieldValidationResults contains one element and failed`, () => {
    // Arrange
    const validationResults: ValidationResult[] = [
      {
        succeeded: false,
        type: 'MY_VALIDATION',
        message: 'My Error Message',
        key: 'myfield',
      },
    ];

    // Act
    const formValidationSummary = buildFormValidationResult(validationResults);

    // Assert
    expect(formValidationSummary.succeeded).toBeFalsy();
    expect(formValidationSummary.fieldErrors.length).toBe(1);
    expect(formValidationSummary.recordErrors.length).toBe(0);
  });

  it(`Spec #6 => should returns new FormValidationResult equals { succeeded: false }
  when passing fieldValidationResults with two items first equals { succeeded: true }
  and second equals { succeeded: false }
  `, () => {
    // Arrange
    const validationResults: ValidationResult[] = [
      {
        succeeded: true,
        type: 'MY_VALIDATION',
        message: 'My Error Message',
        key: 'myfield',
      },
      {
        succeeded: false,
        type: 'MY_SECOND_VALIDATION',
        message: 'Second Error Message',
        key: 'myotherfield',
      },
    ];

    // Act
    const formValidationSummary = buildFormValidationResult(validationResults);

    // Assert
    expect(formValidationSummary.succeeded).toBeFalsy();
    expect(formValidationSummary.fieldErrors.length).toBe(1);
    expect(formValidationSummary.recordErrors.length).toBe(0);
  });

  it(`Spec #7 => should returns new FormValidationResult equals { succeeded: true }
  when passing fieldValidationResults with two items first equals { succeeded: true }
  and second equals { succeeded: true }
  `, () => {
    // Arrange
    const validationResults: ValidationResult[] = [
      {
        succeeded: true,
        type: 'MY_VALIDATION',
        message: 'My Error Message',
        key: 'myfield',
      },
      {
        succeeded: true,
        type: 'MY_SECOND_VALIDATION',
        message: 'Second Error Message',
        key: 'myotherfield',
      },
    ];

    // Act
    const formValidationSummary = buildFormValidationResult(validationResults);

    // Assert
    expect(formValidationSummary.succeeded).toBeTruthy();
    expect(formValidationSummary.fieldErrors.length).toBe(0);
    expect(formValidationSummary.recordErrors.length).toBe(0);
  });

  it(`Spec #8 => should returns new FormValidationResult equals { succeeded: true }
  and zero field validation
  when passing fieldValidationResults with two items first equals { succeeded: true }
  and second equals { succeeded: true }, belonging to same field
  `, () => {
    // Arrange
    const validationResults: ValidationResult[] = [
      {
        succeeded: true,
        type: 'MY_VALIDATION',
        message: 'My Error Message',
        key: 'myfield',
      },
      {
        succeeded: true,
        type: 'MY_SECOND_VALIDATION',
        message: 'Second Error Message',
        key: 'myfield',
      },
    ];

    // Act
    const formValidationSummary = buildFormValidationResult(validationResults);

    // Assert
    expect(formValidationSummary.succeeded).toBeTruthy();
    expect(formValidationSummary.fieldErrors.length).toBe(0);
    expect(formValidationSummary.recordErrors.length).toBe(0);
  });

  it(`Spec #9 => should returns new FormValidationResult equals { succeeded: false }
  and zero field validation
  when passing fieldValidationResults with one items first equals { succeeded: true }
  and second equals { succeeded: false }, belonging to same field
  `, () => {
    // Arrange
    const validationResults: ValidationResult[] = [
      {
        succeeded: true,
        type: 'MY_VALIDATION',
        message: 'My Error Message',
        key: 'myfield',
      },
      {
        succeeded: false,
        type: 'MY_SECOND_VALIDATION',
        message: 'Second Error Message',
        key: 'myfield',
      },
    ];

    // Act
    const formValidationSummary = buildFormValidationResult(validationResults);

    // Assert
    expect(formValidationSummary.succeeded).toBeFalsy();
    expect(formValidationSummary.fieldErrors.length).toBe(1);
    expect(formValidationSummary.fieldErrors[0].key).toBe('myfield');
    expect(
      formValidationSummary.fieldErrors[0].validationResult.succeeded
    ).toBeFalsy();
    expect(formValidationSummary.recordErrors.length).toBe(0);
  });

  it(`Spec #10 => should returns new FormValidationResult equals { succeeded: false }
  and one field validation, validation type: MY_VALIDATION
  when passing fieldValidationResults with one items first equals { succeeded: false }
  and second equals { succeeded: false }, belonging to same field
  `, () => {
    // Arrange
    const validationResults: ValidationResult[] = [
      {
        succeeded: false,
        type: 'MY_VALIDATION',
        message: 'My Error Message',
        key: 'myfield',
      },
      {
        succeeded: false,
        type: 'MY_SECOND_VALIDATION',
        message: 'Second Error Message',
        key: 'myfield',
      },
    ];

    // Act
    const formValidationSummary = buildFormValidationResult(validationResults);

    // Assert
    expect(formValidationSummary.succeeded).toBeFalsy();
    expect(formValidationSummary.fieldErrors.length).toBe(2);
    expect(formValidationSummary.fieldErrors[0].key).toBe('myfield');
    expect(
      formValidationSummary.fieldErrors[0].validationResult.succeeded
    ).toBeFalsy();
    expect(formValidationSummary.fieldErrors[0].validationResult.type).toBe(
      'MY_VALIDATION'
    );
    expect(formValidationSummary.recordErrors.length).toBe(0);
  });

  it(`Spec #10 => should returns new FormValidationResult equals { succeeded: false }
  and two field validations, 
  when passing fieldValidationResults with two items first equals { succeeded: false }
  and second equals { succeeded: false }, belonging to different fields
  `, () => {
    // Arrange
    const validationResults: ValidationResult[] = [
      {
        succeeded: false,
        type: 'MY_VALIDATION',
        message: 'My Error Message',
        key: 'myfieldA',
      },
      {
        succeeded: false,
        type: 'MY_SECOND_VALIDATION',
        message: 'Second Error Message',
        key: 'myfieldB',
      },
    ];

    // Act
    const formValidationSummary = buildFormValidationResult(validationResults);

    // Assert
    expect(formValidationSummary.succeeded).toBeFalsy();
    expect(formValidationSummary.fieldErrors.length).toBe(2);
    expect(formValidationSummary.fieldErrors[0].key).toBe('myfieldA');
    expect(
      formValidationSummary.fieldErrors[0].validationResult.succeeded
    ).toBeFalsy();
    expect(formValidationSummary.fieldErrors[0].validationResult.type).toBe(
      'MY_VALIDATION'
    );
    expect(formValidationSummary.recordErrors.length).toBe(0);
    expect(formValidationSummary.fieldErrors[1].key).toBe('myfieldB');
    expect(
      formValidationSummary.fieldErrors[1].validationResult.succeeded
    ).toBeFalsy();
    expect(formValidationSummary.fieldErrors[1].validationResult.type).toBe(
      'MY_SECOND_VALIDATION'
    );
    expect(formValidationSummary.recordErrors.length).toBe(0);
  });

  it(`Spec #11 => shoud return succeeded form validation when passing
  edge cases (null / undefined) plus console error message
  `, () => {
    // Arrange
    const validationResults: ValidationResult[] = [null, void 0];
    const errorStub = jest
      .spyOn(global.console, 'error')
      .mockImplementation(() => {});

    // Act
    const formValidationSummary = buildFormValidationResult(validationResults);

    // Assert
    expect(formValidationSummary.succeeded).toBeTruthy();
    expect(formValidationSummary.fieldErrors.length).toBe(0);
    expect(errorStub).toHaveBeenCalled();
  });

  it(`Spec #12 => shoud return succeeded form validation when passing
  a form validation that succeeds
  `, () => {
    // Arrange
    const validationResults: ValidationResult[] = [
      {
        key: '',
        message: 'My global validation',
        succeeded: true,
        type: 'Global',
      },
    ];
    // Act
    const formValidationSummary = buildFormValidationResult(validationResults);

    // Assert
    expect(formValidationSummary.succeeded).toBeTruthy();
    expect(formValidationSummary.fieldErrors.length).toBe(0);
    expect(formValidationSummary.recordErrors.length).toBe(0);
  });

  it(`Spec #13 => shoud return failed form validation when passing
  a form validation that fails and include that validation in the global list
  `, () => {
    // Arrange
    const validationResults: ValidationResult[] = [
      {
        key: '',
        message: 'My global validation',
        succeeded: false,
        type: 'Global',
      },
    ];
    // Act
    const formValidationSummary = buildFormValidationResult(validationResults);

    // Assert
    expect(formValidationSummary.succeeded).toBeFalsy();
    expect(formValidationSummary.fieldErrors.length).toBe(0);
    expect(formValidationSummary.recordErrors.length).toBe(1);
  });

  it(`Spec #13 => shoud return failed form validation when passing
  a field validation that pass
  a form validation that fails and include that validation in the global list
  `, () => {
    // Arrange
    const validationResults: ValidationResult[] = [
      {
        key: 'myfield',
        message: 'myvalidation',
        succeeded: true,
        type: 'required',
      },
      {
        key: '',
        message: 'My global validation',
        succeeded: false,
        type: 'Global',
      },
    ];
    // Act
    const formValidationSummary = buildFormValidationResult(validationResults);

    // Assert
    expect(formValidationSummary.succeeded).toBeFalsy();
    expect(formValidationSummary.fieldErrors.length).toBe(0);
    expect(formValidationSummary.recordErrors.length).toBe(1);
  });

  it(`Spec #13 => shoud return failed form validation when passing
  a field validation that failed
  a form validation that fails and include that validation in the global list,
  plus the field validation in the field list
  `, () => {
    // Arrange
    const validationResults: ValidationResult[] = [
      {
        key: 'myfield',
        message: 'myvalidation',
        succeeded: false,
        type: 'required',
      },
      {
        key: '',
        message: 'My global validation',
        succeeded: false,
        type: 'Global',
      },
    ];
    // Act
    const formValidationSummary = buildFormValidationResult(validationResults);

    // Assert
    expect(formValidationSummary.succeeded).toBeFalsy();
    expect(formValidationSummary.fieldErrors.length).toBe(1);
    expect(formValidationSummary.recordErrors.length).toBe(1);
  });
});
