import {
  mapInternalValidationResultToValidationResult,
  mapInternalFormValidationResultToFormValidationResult,
} from './validation-result.mappers';
import {
  InternalValidationResult,
  InternalFormValidationResult,
} from '../model';

describe('validation-result.mappers specs', () => {
  describe('mapInternalValidationResultToValidationResult', () => {
    it('should return same validationResult when it feeds internalValidationResult without arrayErros', () => {
      // Arrange
      const internalValidationResult: InternalValidationResult = {
        key: 'test-key',
        message: 'test-message',
        type: 'test-type',
        succeeded: true,
        arrayErrors: undefined,
      };

      // Act
      const result = mapInternalValidationResultToValidationResult(
        internalValidationResult
      );

      // Assert
      expect(result).toEqual({
        message: 'test-message',
        type: 'test-type',
        succeeded: true,
      });
    });

    it('should return mapped validationResult when it feeds internalValidationResult with arrayErros', () => {
      // Arrange
      const internalValidationResult: InternalValidationResult = {
        key: 'test-key',
        message: 'test-message',
        type: 'test-type',
        succeeded: true,
        arrayErrors: [
          {
            name: { succeeded: true, message: '', type: 'REQUIRED' },
            surname: { succeeded: true, message: '', type: 'REQUIRED' },
          },
          {
            name: {
              succeeded: false,
              message: 'Please fill in this mandatory field.',
              type: 'REQUIRED',
            },
            surname: {
              succeeded: false,
              message: 'Please fill in this mandatory field.',
              type: 'REQUIRED',
            },
          },
        ],
      };

      // Act
      const result = mapInternalValidationResultToValidationResult(
        internalValidationResult
      );

      // Assert
      expect(result).toEqual({
        'test-key[0].name': {
          succeeded: true,
          message: '',
          type: 'REQUIRED',
        },
        'test-key[0].surname': {
          succeeded: true,
          message: '',
          type: 'REQUIRED',
        },
        'test-key[1].name': {
          succeeded: false,
          message: 'Please fill in this mandatory field.',
          type: 'REQUIRED',
        },
        'test-key[1].surname': {
          succeeded: false,
          message: 'Please fill in this mandatory field.',
          type: 'REQUIRED',
        },
      });
    });
  });
  describe('mapInternalFormValidationResultToFormValidationResult', () => {
    it('should return same validationResult when it feeds internalFormValidationResult without arrayErros', () => {
      // Arrange
      const internalFormValidationResult: InternalFormValidationResult = {
        succeeded: false,
        fieldErrors: {
          name: {
            key: 'name',
            message: 'test-name-message',
            type: 'test-name-type',
            succeeded: true,
          },
          surname: {
            key: 'surname',
            message: 'test-surname-message',
            type: 'test-surname-type',
            succeeded: false,
          },
        },
        recordErrors: {},
      };

      // Act
      const result = mapInternalFormValidationResultToFormValidationResult(
        internalFormValidationResult
      );

      // Assert
      expect(result).toEqual({
        succeeded: false,
        fieldErrors: {
          name: {
            key: 'name',
            message: 'test-name-message',
            type: 'test-name-type',
            succeeded: true,
          },
          surname: {
            key: 'surname',
            message: 'test-surname-message',
            type: 'test-surname-type',
            succeeded: false,
          },
        },
        recordErrors: {},
      });
    });

    it('should return mapped validationResult when it feeds internalFormValidationResult with arrayErros', () => {
      // Arrange
      const internalFormValidationResult: InternalFormValidationResult = {
        succeeded: false,
        fieldErrors: {
          name: {
            key: 'name',
            message: 'test-name-message',
            type: 'test-name-type',
            succeeded: true,
          },
          surname: {
            key: 'surname',
            message: 'test-surname-message',
            type: 'test-surname-type',
            succeeded: false,
          },
          clients: {
            key: 'clients',
            message: 'test-clients-message',
            type: 'test-clients-type',
            succeeded: false,
            arrayErrors: [
              {
                name: { succeeded: true, message: '', type: 'REQUIRED' },
                surname: { succeeded: true, message: '', type: 'REQUIRED' },
              },
              {
                name: {
                  succeeded: false,
                  message: 'Please fill in this mandatory field.',
                  type: 'REQUIRED',
                },
                surname: {
                  succeeded: false,
                  message: 'Please fill in this mandatory field.',
                  type: 'REQUIRED',
                },
              },
            ],
          },
        },
        recordErrors: {},
      };

      // Act
      const result = mapInternalFormValidationResultToFormValidationResult(
        internalFormValidationResult
      );

      // Assert
      expect(result).toEqual({
        succeeded: false,
        fieldErrors: {
          name: {
            key: 'name',
            message: 'test-name-message',
            type: 'test-name-type',
            succeeded: true,
          },
          surname: {
            key: 'surname',
            message: 'test-surname-message',
            type: 'test-surname-type',
            succeeded: false,
          },
          'clients[0].name': { succeeded: true, message: '', type: 'REQUIRED' },
          'clients[0].surname': {
            succeeded: true,
            message: '',
            type: 'REQUIRED',
          },
          'clients[1].name': {
            succeeded: false,
            message: 'Please fill in this mandatory field.',
            type: 'REQUIRED',
          },
          'clients[1].surname': {
            succeeded: false,
            message: 'Please fill in this mandatory field.',
            type: 'REQUIRED',
          },
        },
        recordErrors: {},
      });
    });

    it('should return mapped validationResult when it feeds internalFormValidationResult with arrayErros and empty keys', () => {
      // Arrange
      const internalFormValidationResult: InternalFormValidationResult = {
        succeeded: false,
        fieldErrors: {
          name: {
            key: 'name',
            message: 'test-name-message',
            type: 'test-name-type',
            succeeded: true,
          },
          surname: {
            key: 'surname',
            message: 'test-surname-message',
            type: 'test-surname-type',
            succeeded: false,
          },
          clients: {
            key: undefined,
            message: 'test-clients-message',
            type: 'test-clients-type',
            succeeded: false,
            arrayErrors: [
              {
                name: { succeeded: true, message: '', type: 'REQUIRED' },
                surname: { succeeded: true, message: '', type: 'REQUIRED' },
              },
              {
                name: {
                  succeeded: false,
                  message: 'Please fill in this mandatory field.',
                  type: 'REQUIRED',
                },
                surname: {
                  succeeded: false,
                  message: 'Please fill in this mandatory field.',
                  type: 'REQUIRED',
                },
              },
            ],
          },
        },
        recordErrors: {},
      };

      // Act
      const result = mapInternalFormValidationResultToFormValidationResult(
        internalFormValidationResult
      );

      // Assert
      expect(result).toEqual({
        succeeded: false,
        fieldErrors: {
          name: {
            key: 'name',
            message: 'test-name-message',
            type: 'test-name-type',
            succeeded: true,
          },
          surname: {
            key: 'surname',
            message: 'test-surname-message',
            type: 'test-surname-type',
            succeeded: false,
          },
          'clients[0].name': { succeeded: true, message: '', type: 'REQUIRED' },
          'clients[0].surname': {
            succeeded: true,
            message: '',
            type: 'REQUIRED',
          },
          'clients[1].name': {
            succeeded: false,
            message: 'Please fill in this mandatory field.',
            type: 'REQUIRED',
          },
          'clients[1].surname': {
            succeeded: false,
            message: 'Please fill in this mandatory field.',
            type: 'REQUIRED',
          },
        },
        recordErrors: {},
      });
    });
  });
});
