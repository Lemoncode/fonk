import { buildFormValidationResult } from './form-validation-summary-builder';
import { InternalValidationResult } from './model';

describe('form-validation-summary-build specs', () => {
  describe(`buildFormValidationResult`, () => {
    it(`Spec #1 => should returns new FormValidationResult equals { succeeded: true }
  when passing fieldValidationResults and recordValidationResults equals undefined`, () => {
      // Arrange
      const fieldValidationResults: InternalValidationResult[] = void 0;
      const recordValidationResults: InternalValidationResult[] = void 0;

      // Act
      const formValidationSummary = buildFormValidationResult(
        fieldValidationResults,
        recordValidationResults
      );

      // Assert
      expect(formValidationSummary.succeeded).toBeTruthy();
      expect(formValidationSummary.fieldErrors).toEqual({});
      expect(formValidationSummary.recordErrors).toEqual({});
    });

    it(`Spec #2 => should returns new FormValidationResult equals { succeeded: true }
  when passing fieldValidationResults and recordValidationResults equals null`, () => {
      // Arrange
      const fieldValidationResults: InternalValidationResult[] = null;
      const recordValidationResults: InternalValidationResult[] = null;

      // Act
      const formValidationSummary = buildFormValidationResult(
        fieldValidationResults,
        recordValidationResults
      );

      // Assert
      expect(formValidationSummary.succeeded).toBeTruthy();
      expect(formValidationSummary.fieldErrors).toEqual({});
      expect(formValidationSummary.recordErrors).toEqual({});
    });

    it(`Spec #3 => should returns new FormValidationResult equals { succeeded: true }
  when passing fieldValidationResults and recordValidationResults equals []`, () => {
      // Arrange
      const fieldValidationResults: InternalValidationResult[] = [];
      const recordValidationResults: InternalValidationResult[] = [];

      // Act
      const formValidationSummary = buildFormValidationResult(
        fieldValidationResults,
        recordValidationResults
      );

      // Assert
      expect(formValidationSummary.succeeded).toBeTruthy();
      expect(formValidationSummary.fieldErrors).toEqual({});
      expect(formValidationSummary.recordErrors).toEqual({});
    });

    it(`Spec #4 => should returns new FormValidationResult equals { succeeded: true }
  when passing fieldValidationResults and recordValidationResults contains one element and succeeded`, () => {
      // Arrange
      const fieldValidationResults: InternalValidationResult[] = [
        {
          succeeded: true,
          type: 'MY_VALIDATION_1',
          message: 'My Error Message 1',
          key: 'myfield',
        },
      ];
      const recordValidationResults: InternalValidationResult[] = [
        {
          succeeded: true,
          type: 'MY_VALIDATION_2',
          message: 'My Error Message 2',
          key: 'myrecord',
        },
      ];

      // Act
      const formValidationSummary = buildFormValidationResult(
        fieldValidationResults,
        recordValidationResults
      );

      // Assert
      expect(formValidationSummary.succeeded).toBeTruthy();
      expect(formValidationSummary.fieldErrors).toEqual({
        myfield: {
          succeeded: true,
          type: 'MY_VALIDATION_1',
          message: 'My Error Message 1',
        },
      });
      expect(formValidationSummary.recordErrors).toEqual({
        myrecord: {
          succeeded: true,
          type: 'MY_VALIDATION_2',
          message: 'My Error Message 2',
        },
      });
    });

    it(`Spec #5 => should returns new FormValidationResult equals { succeeded: false }
  when passing fieldValidationResults and recordValidationResults contains one element and failed`, () => {
      // Arrange
      const fieldValidationResults: InternalValidationResult[] = [
        {
          succeeded: false,
          type: 'MY_VALIDATION_1',
          message: 'My Error Message 1',
          key: 'myfield',
        },
      ];
      const recordValidationResults: InternalValidationResult[] = [
        {
          succeeded: false,
          type: 'MY_VALIDATION_2',
          message: 'My Error Message 2',
          key: 'myrecord',
        },
      ];

      // Act
      const formValidationSummary = buildFormValidationResult(
        fieldValidationResults,
        recordValidationResults
      );

      // Assert
      expect(formValidationSummary.succeeded).toBeFalsy();
      expect(formValidationSummary.fieldErrors).toEqual({
        myfield: {
          succeeded: false,
          type: 'MY_VALIDATION_1',
          message: 'My Error Message 1',
        },
      });
      expect(formValidationSummary.recordErrors).toEqual({
        myrecord: {
          succeeded: false,
          type: 'MY_VALIDATION_2',
          message: 'My Error Message 2',
        },
      });
    });

    it(`Spec #6 => should returns new FormValidationResult equals { succeeded: false }
  when passing fieldValidationResults contains one element and failed and recordValidationResults contains one element and succeeded`, () => {
      // Arrange
      const fieldValidationResults: InternalValidationResult[] = [
        {
          succeeded: false,
          type: 'MY_VALIDATION_1',
          message: 'My Error Message 1',
          key: 'myfield',
        },
      ];
      const recordValidationResults: InternalValidationResult[] = [
        {
          succeeded: true,
          type: 'MY_VALIDATION_2',
          message: 'My Error Message 2',
          key: 'myrecord',
        },
      ];

      // Act
      const formValidationSummary = buildFormValidationResult(
        fieldValidationResults,
        recordValidationResults
      );

      // Assert
      expect(formValidationSummary.succeeded).toBeFalsy();
      expect(formValidationSummary.fieldErrors).toEqual({
        myfield: {
          succeeded: false,
          type: 'MY_VALIDATION_1',
          message: 'My Error Message 1',
        },
      });
      expect(formValidationSummary.recordErrors).toEqual({
        myrecord: {
          succeeded: true,
          type: 'MY_VALIDATION_2',
          message: 'My Error Message 2',
        },
      });
    });

    it(`Spec #7 => should returns new FormValidationResult equals { succeeded: false }
  when passing fieldValidationResults contains one element and succeeded and recordValidationResults contains one element and failed`, () => {
      // Arrange
      const fieldValidationResults: InternalValidationResult[] = [
        {
          succeeded: true,
          type: 'MY_VALIDATION_1',
          message: 'My Error Message 1',
          key: 'myfield',
        },
      ];
      const recordValidationResults: InternalValidationResult[] = [
        {
          succeeded: false,
          type: 'MY_VALIDATION_2',
          message: 'My Error Message 2',
          key: 'myrecord',
        },
      ];

      // Act
      const formValidationSummary = buildFormValidationResult(
        fieldValidationResults,
        recordValidationResults
      );

      // Assert
      expect(formValidationSummary.succeeded).toBeFalsy();
      expect(formValidationSummary.fieldErrors).toEqual({
        myfield: {
          succeeded: true,
          type: 'MY_VALIDATION_1',
          message: 'My Error Message 1',
        },
      });
      expect(formValidationSummary.recordErrors).toEqual({
        myrecord: {
          succeeded: false,
          type: 'MY_VALIDATION_2',
          message: 'My Error Message 2',
        },
      });
    });

    it(`Spec #8 => should returns new FormValidationResult equals { succeeded: false }
  when passing fieldValidationResults and recordValidationResults with two items first equals { succeeded: true }
  and second equals { succeeded: false }
  `, () => {
      // Arrange
      const fieldValidationResults: InternalValidationResult[] = [
        {
          succeeded: true,
          type: 'MY_VALIDATION_1',
          message: 'My Error Message 1',
          key: 'myfield',
        },
        {
          succeeded: false,
          type: 'MY_VALIDATION_2',
          message: 'My Error Message 2',
          key: 'myotherfield',
        },
      ];
      const recordValidationResults: InternalValidationResult[] = [
        {
          succeeded: true,
          type: 'MY_VALIDATION_3',
          message: 'My Error Message 3',
          key: 'myrecord',
        },
        {
          succeeded: false,
          type: 'MY_VALIDATION_4',
          message: 'My Error Message 4',
          key: 'myotherrecord',
        },
      ];

      // Act
      const formValidationSummary = buildFormValidationResult(
        fieldValidationResults,
        recordValidationResults
      );

      // Assert
      expect(formValidationSummary.succeeded).toBeFalsy();
      expect(formValidationSummary.fieldErrors).toEqual({
        myfield: {
          succeeded: true,
          type: 'MY_VALIDATION_1',
          message: 'My Error Message 1',
        },
        myotherfield: {
          succeeded: false,
          type: 'MY_VALIDATION_2',
          message: 'My Error Message 2',
        },
      });
      expect(formValidationSummary.recordErrors).toEqual({
        myrecord: {
          succeeded: true,
          type: 'MY_VALIDATION_3',
          message: 'My Error Message 3',
        },
        myotherrecord: {
          succeeded: false,
          type: 'MY_VALIDATION_4',
          message: 'My Error Message 4',
        },
      });
    });

    it(`Spec #9 => should returns new FormValidationResult equals { succeeded: true }
  when passing fieldValidationResults and recordValidationResults with two items first equals { succeeded: true }
  and second equals { succeeded: true }
  `, () => {
      // Arrange
      const fieldValidationResults: InternalValidationResult[] = [
        {
          succeeded: true,
          type: 'MY_VALIDATION_1',
          message: 'My Error Message 1',
          key: 'myfield',
        },
        {
          succeeded: true,
          type: 'MY_VALIDATION_2',
          message: 'My Error Message 2',
          key: 'myotherfield',
        },
      ];
      const recordValidationResults: InternalValidationResult[] = [
        {
          succeeded: true,
          type: 'MY_VALIDATION_3',
          message: 'My Error Message 3',
          key: 'myrecord',
        },
        {
          succeeded: true,
          type: 'MY_VALIDATION_4',
          message: 'My Error Message 4',
          key: 'myotherrecord',
        },
      ];

      // Act
      const formValidationSummary = buildFormValidationResult(
        fieldValidationResults,
        recordValidationResults
      );

      // Assert
      expect(formValidationSummary.succeeded).toBeTruthy();
      expect(formValidationSummary.fieldErrors).toEqual({
        myfield: {
          succeeded: true,
          type: 'MY_VALIDATION_1',
          message: 'My Error Message 1',
        },
        myotherfield: {
          succeeded: true,
          type: 'MY_VALIDATION_2',
          message: 'My Error Message 2',
        },
      });
      expect(formValidationSummary.recordErrors).toEqual({
        myrecord: {
          succeeded: true,
          type: 'MY_VALIDATION_3',
          message: 'My Error Message 3',
        },
        myotherrecord: {
          succeeded: true,
          type: 'MY_VALIDATION_4',
          message: 'My Error Message 4',
        },
      });
    });

    it(`Spec #10 => should returns new FormValidationResult equals { succeeded: true } with one field object and one record object
  when passing fieldValidationResults and recordValidationResults with two items with same key and succeeded true
  `, () => {
      // Arrange
      const fieldValidationResults: InternalValidationResult[] = [
        {
          succeeded: true,
          type: 'MY_VALIDATION_1',
          message: 'My Error Message 1',
          key: 'myfield',
        },
        {
          succeeded: true,
          type: 'MY_VALIDATION_2',
          message: 'My Error Message 2',
          key: 'myfield',
        },
      ];
      const recordValidationResults: InternalValidationResult[] = [
        {
          succeeded: true,
          type: 'MY_VALIDATION_3',
          message: 'My Error Message 3',
          key: 'myrecord',
        },
        {
          succeeded: true,
          type: 'MY_VALIDATION_4',
          message: 'My Error Message 4',
          key: 'myrecord',
        },
      ];

      // Act
      const formValidationSummary = buildFormValidationResult(
        fieldValidationResults,
        recordValidationResults
      );

      // Assert
      expect(formValidationSummary.succeeded).toBeTruthy();
      expect(formValidationSummary.fieldErrors).toEqual({
        myfield: {
          succeeded: true,
          type: 'MY_VALIDATION_2',
          message: 'My Error Message 2',
        },
      });
      expect(formValidationSummary.recordErrors).toEqual({
        myrecord: {
          succeeded: true,
          type: 'MY_VALIDATION_4',
          message: 'My Error Message 4',
        },
      });
    });

    it(`Spec #11 => should returns new FormValidationResult equals { succeeded: false } with one field object and one record object
  when passing fieldValidationResults and recordValidationResults with two items with same key and succeeded false
  `, () => {
      // Arrange
      const fieldValidationResults: InternalValidationResult[] = [
        {
          succeeded: false,
          type: 'MY_VALIDATION_1',
          message: 'My Error Message 1',
          key: 'myfield',
        },
        {
          succeeded: false,
          type: 'MY_VALIDATION_2',
          message: 'My Error Message 2',
          key: 'myfield',
        },
      ];
      const recordValidationResults: InternalValidationResult[] = [
        {
          succeeded: false,
          type: 'MY_VALIDATION_3',
          message: 'My Error Message 3',
          key: 'myrecord',
        },
        {
          succeeded: false,
          type: 'MY_VALIDATION_4',
          message: 'My Error Message 4',
          key: 'myrecord',
        },
      ];

      // Act
      const formValidationSummary = buildFormValidationResult(
        fieldValidationResults,
        recordValidationResults
      );

      // Assert
      expect(formValidationSummary.succeeded).toBeFalsy();
      expect(formValidationSummary.fieldErrors).toEqual({
        myfield: {
          succeeded: false,
          type: 'MY_VALIDATION_2',
          message: 'My Error Message 2',
        },
      });
      expect(formValidationSummary.recordErrors).toEqual({
        myrecord: {
          succeeded: false,
          type: 'MY_VALIDATION_4',
          message: 'My Error Message 4',
        },
      });
    });

    it(`Spec #12 => should returns new FormValidationResult equals { succeeded: false } with one field object and one record object
  when passing fieldValidationResults and recordValidationResults with two items with same key and first succeeded true and second succeeded false
  `, () => {
      // Arrange
      const fieldValidationResults: InternalValidationResult[] = [
        {
          succeeded: true,
          type: 'MY_VALIDATION_1',
          message: 'My Error Message 1',
          key: 'myfield',
        },
        {
          succeeded: false,
          type: 'MY_VALIDATION_2',
          message: 'My Error Message 2',
          key: 'myfield',
        },
      ];
      const recordValidationResults: InternalValidationResult[] = [
        {
          succeeded: true,
          type: 'MY_VALIDATION_3',
          message: 'My Error Message 3',
          key: 'myrecord',
        },
        {
          succeeded: false,
          type: 'MY_VALIDATION_4',
          message: 'My Error Message 4',
          key: 'myrecord',
        },
      ];

      // Act
      const formValidationSummary = buildFormValidationResult(
        fieldValidationResults,
        recordValidationResults
      );

      // Assert
      expect(formValidationSummary.succeeded).toBeFalsy();
      expect(formValidationSummary.fieldErrors).toEqual({
        myfield: {
          succeeded: false,
          type: 'MY_VALIDATION_2',
          message: 'My Error Message 2',
        },
      });
      expect(formValidationSummary.recordErrors).toEqual({
        myrecord: {
          succeeded: false,
          type: 'MY_VALIDATION_4',
          message: 'My Error Message 4',
        },
      });
    });

    it(`Spec #13 => should returns new FormValidationResult equals { succeeded: false } with one field object and one record object
  when passing fieldValidationResults and recordValidationResults with two items with same key and first succeeded false and second succeeded true
  `, () => {
      // Arrange
      const fieldValidationResults: InternalValidationResult[] = [
        {
          succeeded: false,
          type: 'MY_VALIDATION_1',
          message: 'My Error Message 1',
          key: 'myfield',
        },
        {
          succeeded: true,
          type: 'MY_VALIDATION_2',
          message: 'My Error Message 2',
          key: 'myfield',
        },
      ];
      const recordValidationResults: InternalValidationResult[] = [
        {
          succeeded: false,
          type: 'MY_VALIDATION_3',
          message: 'My Error Message 3',
          key: 'myrecord',
        },
        {
          succeeded: true,
          type: 'MY_VALIDATION_4',
          message: 'My Error Message 4',
          key: 'myrecord',
        },
      ];

      // Act
      const formValidationSummary = buildFormValidationResult(
        fieldValidationResults,
        recordValidationResults
      );

      // Assert
      expect(formValidationSummary.succeeded).toBeFalsy();
      expect(formValidationSummary.fieldErrors).toEqual({
        myfield: {
          succeeded: true,
          type: 'MY_VALIDATION_2',
          message: 'My Error Message 2',
        },
      });
      expect(formValidationSummary.recordErrors).toEqual({
        myrecord: {
          succeeded: true,
          type: 'MY_VALIDATION_4',
          message: 'My Error Message 4',
        },
      });
    });
  });
});
