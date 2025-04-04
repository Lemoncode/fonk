import { validator } from './array';
import * as required from './required';
import {
  ValidationSchema,
  FormValidationResult,
  ValidationResult,
} from '../model';
import { createFormValidation } from '../form-validation';

describe('array validator', () => {
  describe('validator', () => {
    it('should return succeded validation when all items pass validations', async () => {
      // Arrange
      const value = [
        { name: 'test-name-1', surname: 'test-surname-1' },
        { name: 'test-name-2', surname: 'test-surname-2' },
      ];
      const customArgs = {
        field: {
          name: [required],
          surname: [required],
        },
      };

      // Act
      const result = await validator({ value, customArgs });

      // Assert
      const expectedResult = {
        succeeded: true,
        arrayErrors: [
          {
            name: { succeeded: true, message: '', type: 'REQUIRED' },
            surname: { succeeded: true, message: '', type: 'REQUIRED' },
          },
          {
            name: { succeeded: true, message: '', type: 'REQUIRED' },
            surname: { succeeded: true, message: '', type: 'REQUIRED' },
          },
        ],
        type: 'ARRAY_VALIDATIONS',
        message: null,
      };
      expect(result).toEqual(expectedResult);
    });

    it('should return failed validation when first item fail surname validations', async () => {
      // Arrange
      const value = [
        { name: 'test-name-1', surname: '' },
        { name: 'test-name-2', surname: 'test-surname-2' },
      ];
      const customArgs = {
        field: {
          name: [required],
          surname: [required],
        },
      };

      // Act
      const result = await validator({ value, customArgs });

      // Assert
      const expectedResult = {
        succeeded: false,
        arrayErrors: [
          {
            name: { succeeded: true, message: '', type: 'REQUIRED' },
            surname: {
              succeeded: false,
              message: 'Please fill in this mandatory field.',
              type: 'REQUIRED',
            },
          },
          {
            name: { succeeded: true, message: '', type: 'REQUIRED' },
            surname: { succeeded: true, message: '', type: 'REQUIRED' },
          },
        ],
        type: 'ARRAY_VALIDATIONS',
        message: null,
      };
      expect(result).toEqual(expectedResult);
    });

    it('should return failed validation when first item fail name validations', async () => {
      // Arrange
      const value = [
        { name: '', surname: 'test-surname-1' },
        { name: 'test-name-2', surname: 'test-surname-2' },
      ];
      const customArgs = {
        field: {
          name: [required],
          surname: [required],
        },
      };

      // Act
      const result = await validator({ value, customArgs });

      // Assert
      const expectedResult = {
        succeeded: false,
        arrayErrors: [
          {
            name: {
              succeeded: false,
              message: 'Please fill in this mandatory field.',
              type: 'REQUIRED',
            },
            surname: {
              succeeded: true,
              message: '',
              type: 'REQUIRED',
            },
          },
          {
            name: { succeeded: true, message: '', type: 'REQUIRED' },
            surname: { succeeded: true, message: '', type: 'REQUIRED' },
          },
        ],
        type: 'ARRAY_VALIDATIONS',
        message: null,
      };
      expect(result).toEqual(expectedResult);
    });

    it('should return failed validation when second item fail surname validations', async () => {
      // Arrange
      const value = [
        { name: 'test-name-1', surname: 'test-surname-1' },
        { name: 'test-name-2', surname: '' },
      ];
      const customArgs = {
        field: {
          name: [required],
          surname: [required],
        },
      };

      // Act
      const result = await validator({ value, customArgs });

      // Assert
      const expectedResult = {
        succeeded: false,
        arrayErrors: [
          {
            name: {
              succeeded: true,
              message: '',
              type: 'REQUIRED',
            },
            surname: {
              succeeded: true,
              message: '',
              type: 'REQUIRED',
            },
          },
          {
            name: { succeeded: true, message: '', type: 'REQUIRED' },
            surname: {
              succeeded: false,
              message: 'Please fill in this mandatory field.',
              type: 'REQUIRED',
            },
          },
        ],
        type: 'ARRAY_VALIDATIONS',
        message: null,
      };
      expect(result).toEqual(expectedResult);
    });

    it('should return failed validation when second item fail name validations', async () => {
      // Arrange
      const value = [
        { name: 'test-name-1', surname: 'test-surname-1' },
        { name: '', surname: 'test-surname-2' },
      ];
      const customArgs = {
        field: {
          name: [required],
          surname: [required],
        },
      };

      // Act
      const result = await validator({ value, customArgs });

      // Assert
      const expectedResult = {
        succeeded: false,
        arrayErrors: [
          {
            name: {
              succeeded: true,
              message: '',
              type: 'REQUIRED',
            },
            surname: {
              succeeded: true,
              message: '',
              type: 'REQUIRED',
            },
          },
          {
            name: {
              succeeded: false,
              message: 'Please fill in this mandatory field.',
              type: 'REQUIRED',
            },
            surname: {
              succeeded: true,
              message: '',
              type: 'REQUIRED',
            },
          },
        ],
        type: 'ARRAY_VALIDATIONS',
        message: null,
      };
      expect(result).toEqual(expectedResult);
    });

    it('should return failed validation when first item fail both validations', async () => {
      // Arrange
      const value = [
        { name: '', surname: '' },
        { name: 'test-name-2', surname: 'test-surname-2' },
      ];
      const customArgs = {
        field: {
          name: [required],
          surname: [required],
        },
      };

      // Act
      const result = await validator({ value, customArgs });

      // Assert
      const expectedResult = {
        succeeded: false,
        arrayErrors: [
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
          {
            name: {
              succeeded: true,
              message: '',
              type: 'REQUIRED',
            },
            surname: {
              succeeded: true,
              message: '',
              type: 'REQUIRED',
            },
          },
        ],
        type: 'ARRAY_VALIDATIONS',
        message: null,
      };
      expect(result).toEqual(expectedResult);
    });

    it('should return failed validation when second item fail both validations', async () => {
      // Arrange
      const value = [
        { name: 'test-name-1', surname: 'test-surname-1' },
        { name: '', surname: '' },
      ];
      const customArgs = {
        field: {
          name: [required],
          surname: [required],
        },
      };

      // Act
      const result = await validator({ value, customArgs });

      // Assert
      const expectedResult = {
        succeeded: false,
        arrayErrors: [
          {
            name: {
              succeeded: true,
              message: '',
              type: 'REQUIRED',
            },
            surname: {
              succeeded: true,
              message: '',
              type: 'REQUIRED',
            },
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
        type: 'ARRAY_VALIDATIONS',
        message: null,
      };
      expect(result).toEqual(expectedResult);
    });

    it('should return failed validation when first and second items fail both validations', async () => {
      // Arrange
      const value = [
        { name: '', surname: '' },
        { name: '', surname: '' },
      ];
      const customArgs = {
        field: {
          name: [required],
          surname: [required],
        },
      };

      // Act
      const result = await validator({ value, customArgs });

      // Assert
      const expectedResult = {
        succeeded: false,
        arrayErrors: [
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
        type: 'ARRAY_VALIDATIONS',
        message: null,
      };
      expect(result).toEqual(expectedResult);
    });
  });

  describe('validateField', () => {
    it('should return succeded validation when all items pass validations', async () => {
      // Arrange
      const clients = [
        { name: 'test-name-1', surname: 'test-surname-1' },
        { name: 'test-name-2', surname: 'test-surname-2' },
      ];

      const validationSchema: ValidationSchema = {
        field: {
          clients: [
            {
              validator,
              customArgs: {
                field: {
                  name: [required],
                  surname: [required],
                },
              },
            },
          ],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = await formValidation.validateField('clients', clients);

      // Assert
      const expectedResult = {
        'clients[0].name': {
          succeeded: true,
          type: 'REQUIRED',
          message: '',
        },
        'clients[0].surname': {
          succeeded: true,
          type: 'REQUIRED',
          message: '',
        },
        'clients[1].name': {
          succeeded: true,
          type: 'REQUIRED',
          message: '',
        },
        'clients[1].surname': {
          succeeded: true,
          type: 'REQUIRED',
          message: '',
        },
      };
      expect(result).toEqual(expectedResult);
    });

    it('should return failed validation when first item fail surname validations', async () => {
      // Arrange
      const clients = [
        { name: 'test-name-1', surname: '' },
        { name: 'test-name-2', surname: 'test-surname-2' },
      ];

      const validationSchema: ValidationSchema = {
        field: {
          clients: [
            {
              validator,
              customArgs: {
                field: {
                  name: [required],
                  surname: [required],
                },
              },
            },
          ],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = await formValidation.validateField('clients', clients);

      // Assert
      const expectedResult = {
        'clients[0].name': {
          succeeded: true,
          type: 'REQUIRED',
          message: '',
        },
        'clients[0].surname': {
          succeeded: false,
          type: 'REQUIRED',
          message: 'Please fill in this mandatory field.',
        },
        'clients[1].name': {
          succeeded: true,
          type: 'REQUIRED',
          message: '',
        },
        'clients[1].surname': {
          succeeded: true,
          type: 'REQUIRED',
          message: '',
        },
      };
      expect(result).toEqual(expectedResult);
    });

    it('should return failed validation when first item fail name validations', async () => {
      // Arrange
      const clients = [
        { name: '', surname: 'test-surname-1' },
        { name: 'test-name-2', surname: 'test-surname-2' },
      ];

      const validationSchema: ValidationSchema = {
        field: {
          clients: [
            {
              validator,
              customArgs: {
                field: {
                  name: [required],
                  surname: [required],
                },
              },
            },
          ],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = await formValidation.validateField('clients', clients);

      // Assert
      const expectedResult = {
        'clients[0].name': {
          succeeded: false,
          type: 'REQUIRED',
          message: 'Please fill in this mandatory field.',
        },
        'clients[0].surname': {
          succeeded: true,
          type: 'REQUIRED',
          message: '',
        },
        'clients[1].name': {
          succeeded: true,
          type: 'REQUIRED',
          message: '',
        },
        'clients[1].surname': {
          succeeded: true,
          type: 'REQUIRED',
          message: '',
        },
      };
      expect(result).toEqual(expectedResult);
    });

    it('should return failed validation when second item fail surname validations', async () => {
      // Arrange
      const clients = [
        { name: 'test-name-1', surname: 'test-surname-1' },
        { name: 'test-name-2', surname: '' },
      ];

      const validationSchema: ValidationSchema = {
        field: {
          clients: [
            {
              validator,
              customArgs: {
                field: {
                  name: [required],
                  surname: [required],
                },
              },
            },
          ],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = await formValidation.validateField('clients', clients);

      // Assert
      const expectedResult = {
        'clients[0].name': {
          succeeded: true,
          type: 'REQUIRED',
          message: '',
        },
        'clients[0].surname': {
          succeeded: true,
          type: 'REQUIRED',
          message: '',
        },
        'clients[1].name': {
          succeeded: true,
          type: 'REQUIRED',
          message: '',
        },
        'clients[1].surname': {
          succeeded: false,
          type: 'REQUIRED',
          message: 'Please fill in this mandatory field.',
        },
      };
      expect(result).toEqual(expectedResult);
    });

    it('should return failed validation when second item fail name validations', async () => {
      // Arrange
      const clients = [
        { name: 'test-name-1', surname: 'test-surname-1' },
        { name: '', surname: 'test-surname-2' },
      ];

      const validationSchema: ValidationSchema = {
        field: {
          clients: [
            {
              validator,
              customArgs: {
                field: {
                  name: [required],
                  surname: [required],
                },
              },
            },
          ],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = await formValidation.validateField('clients', clients);

      // Assert
      const expectedResult = {
        'clients[0].name': {
          succeeded: true,
          type: 'REQUIRED',
          message: '',
        },
        'clients[0].surname': {
          succeeded: true,
          type: 'REQUIRED',
          message: '',
        },
        'clients[1].name': {
          succeeded: false,
          type: 'REQUIRED',
          message: 'Please fill in this mandatory field.',
        },
        'clients[1].surname': {
          succeeded: true,
          type: 'REQUIRED',
          message: '',
        },
      };
      expect(result).toEqual(expectedResult);
    });

    it('should return failed validation when first item fail both validations', async () => {
      // Arrange
      const clients = [
        { name: '', surname: '' },
        { name: 'test-name-2', surname: 'test-surname-2' },
      ];

      const validationSchema: ValidationSchema = {
        field: {
          clients: [
            {
              validator,
              customArgs: {
                field: {
                  name: [required],
                  surname: [required],
                },
              },
            },
          ],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = await formValidation.validateField('clients', clients);

      // Assert
      const expectedResult = {
        'clients[0].name': {
          succeeded: false,
          type: 'REQUIRED',
          message: 'Please fill in this mandatory field.',
        },
        'clients[0].surname': {
          succeeded: false,
          type: 'REQUIRED',
          message: 'Please fill in this mandatory field.',
        },
        'clients[1].name': {
          succeeded: true,
          type: 'REQUIRED',
          message: '',
        },
        'clients[1].surname': {
          succeeded: true,
          type: 'REQUIRED',
          message: '',
        },
      };
      expect(result).toEqual(expectedResult);
    });

    it('should return failed validation when second item fail both validations', async () => {
      // Arrange
      const clients = [
        { name: 'test-name-1', surname: 'test-surname-1' },
        { name: '', surname: '' },
      ];

      const validationSchema: ValidationSchema = {
        field: {
          clients: [
            {
              validator,
              customArgs: {
                field: {
                  name: [required],
                  surname: [required],
                },
              },
            },
          ],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = await formValidation.validateField('clients', clients);

      // Assert
      const expectedResult = {
        'clients[0].name': {
          succeeded: true,
          type: 'REQUIRED',
          message: '',
        },
        'clients[0].surname': {
          succeeded: true,
          type: 'REQUIRED',
          message: '',
        },
        'clients[1].name': {
          succeeded: false,
          type: 'REQUIRED',
          message: 'Please fill in this mandatory field.',
        },
        'clients[1].surname': {
          succeeded: false,
          type: 'REQUIRED',
          message: 'Please fill in this mandatory field.',
        },
      };
      expect(result).toEqual(expectedResult);
    });

    it('should return failed validation when first and second items fail both validations', async () => {
      // Arrange
      const clients = [
        { name: '', surname: '' },
        { name: '', surname: '' },
      ];

      const validationSchema: ValidationSchema = {
        field: {
          clients: [
            {
              validator,
              customArgs: {
                field: {
                  name: [required],
                  surname: [required],
                },
              },
            },
          ],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = await formValidation.validateField('clients', clients);

      // Assert
      const expectedResult = {
        'clients[0].name': {
          succeeded: false,
          type: 'REQUIRED',
          message: 'Please fill in this mandatory field.',
        },
        'clients[0].surname': {
          succeeded: false,
          type: 'REQUIRED',
          message: 'Please fill in this mandatory field.',
        },
        'clients[1].name': {
          succeeded: false,
          type: 'REQUIRED',
          message: 'Please fill in this mandatory field.',
        },
        'clients[1].surname': {
          succeeded: false,
          type: 'REQUIRED',
          message: 'Please fill in this mandatory field.',
        },
      };
      expect(result).toEqual(expectedResult);
    });
  });

  describe('validateForm', () => {
    it('should return succeded validation when all items pass validations', async () => {
      // Arrange
      const clients = [
        { name: 'test-name-1', surname: 'test-surname-1' },
        { name: 'test-name-2', surname: 'test-surname-2' },
      ];

      const formValue = {
        clients,
      };

      const validationSchema: ValidationSchema = {
        field: {
          clients: [
            {
              validator,
              customArgs: {
                field: {
                  name: [required],
                  surname: [required],
                },
              },
            },
          ],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = await formValidation.validateForm(formValue);

      // Assert
      const expectedResult: FormValidationResult = {
        succeeded: true,
        recordErrors: {},
        fieldErrors: {
          'clients[0].name': { succeeded: true, message: '', type: 'REQUIRED' },
          'clients[0].surname': {
            succeeded: true,
            message: '',
            type: 'REQUIRED',
          },
          'clients[1].name': { succeeded: true, message: '', type: 'REQUIRED' },
          'clients[1].surname': {
            succeeded: true,
            message: '',
            type: 'REQUIRED',
          },
        },
      };
      expect(result).toEqual(expectedResult);
    });

    it('should return failed validation when first item fail surname validations', async () => {
      // Arrange
      const clients = [
        { name: 'test-name-1', surname: '' },
        { name: 'test-name-2', surname: 'test-surname-2' },
      ];

      const formValue = {
        clients,
      };

      const validationSchema: ValidationSchema = {
        field: {
          clients: [
            {
              validator,
              customArgs: {
                field: {
                  name: [required],
                  surname: [required],
                },
              },
            },
          ],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = await formValidation.validateForm(formValue);

      // Assert
      const expectedResult: FormValidationResult = {
        succeeded: false,
        recordErrors: {},
        fieldErrors: {
          'clients[0].name': { succeeded: true, message: '', type: 'REQUIRED' },
          'clients[0].surname': {
            succeeded: false,
            type: 'REQUIRED',
            message: 'Please fill in this mandatory field.',
          },
          'clients[1].name': { succeeded: true, message: '', type: 'REQUIRED' },
          'clients[1].surname': {
            succeeded: true,
            message: '',
            type: 'REQUIRED',
          },
        },
      };
      expect(result).toEqual(expectedResult);
    });

    it('should return failed validation when first item fail name validations', async () => {
      // Arrange
      const clients = [
        { name: '', surname: 'test-surname-1' },
        { name: 'test-name-2', surname: 'test-surname-2' },
      ];

      const formValue = {
        clients,
      };

      const validationSchema: ValidationSchema = {
        field: {
          clients: [
            {
              validator,
              customArgs: {
                field: {
                  name: [required],
                  surname: [required],
                },
              },
            },
          ],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = await formValidation.validateForm(formValue);

      // Assert
      const expectedResult: FormValidationResult = {
        succeeded: false,
        recordErrors: {},
        fieldErrors: {
          'clients[0].name': {
            succeeded: false,
            type: 'REQUIRED',
            message: 'Please fill in this mandatory field.',
          },
          'clients[0].surname': {
            succeeded: true,
            message: '',
            type: 'REQUIRED',
          },
          'clients[1].name': { succeeded: true, message: '', type: 'REQUIRED' },
          'clients[1].surname': {
            succeeded: true,
            message: '',
            type: 'REQUIRED',
          },
        },
      };
      expect(result).toEqual(expectedResult);
    });

    it('should return failed validation when second item fail surname validations', async () => {
      // Arrange
      const clients = [
        { name: 'test-name-1', surname: 'test-surname-1' },
        { name: 'test-name-2', surname: '' },
      ];

      const formValue = {
        clients,
      };

      const validationSchema: ValidationSchema = {
        field: {
          clients: [
            {
              validator,
              customArgs: {
                field: {
                  name: [required],
                  surname: [required],
                },
              },
            },
          ],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = await formValidation.validateForm(formValue);

      // Assert
      const expectedResult: FormValidationResult = {
        succeeded: false,
        recordErrors: {},
        fieldErrors: {
          'clients[0].name': {
            succeeded: true,
            message: '',
            type: 'REQUIRED',
          },
          'clients[0].surname': {
            succeeded: true,
            message: '',
            type: 'REQUIRED',
          },
          'clients[1].name': { succeeded: true, message: '', type: 'REQUIRED' },
          'clients[1].surname': {
            succeeded: false,
            type: 'REQUIRED',
            message: 'Please fill in this mandatory field.',
          },
        },
      };
      expect(result).toEqual(expectedResult);
    });

    it('should return failed validation when second item fail name validations', async () => {
      // Arrange
      const clients = [
        { name: 'test-name-1', surname: 'test-surname-1' },
        { name: '', surname: 'test-surname-2' },
      ];

      const formValue = {
        clients,
      };

      const validationSchema: ValidationSchema = {
        field: {
          clients: [
            {
              validator,
              customArgs: {
                field: {
                  name: [required],
                  surname: [required],
                },
              },
            },
          ],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = await formValidation.validateForm(formValue);

      // Assert
      const expectedResult: FormValidationResult = {
        succeeded: false,
        recordErrors: {},
        fieldErrors: {
          'clients[0].name': {
            succeeded: true,
            message: '',
            type: 'REQUIRED',
          },
          'clients[0].surname': {
            succeeded: true,
            message: '',
            type: 'REQUIRED',
          },
          'clients[1].name': {
            succeeded: false,
            type: 'REQUIRED',
            message: 'Please fill in this mandatory field.',
          },
          'clients[1].surname': {
            succeeded: true,
            message: '',
            type: 'REQUIRED',
          },
        },
      };
      expect(result).toEqual(expectedResult);
    });

    it('should return failed validation when first item fail both validations', async () => {
      // Arrange
      const clients = [
        { name: '', surname: '' },
        { name: 'test-name-2', surname: 'test-surname-2' },
      ];

      const formValue = {
        clients,
      };

      const validationSchema: ValidationSchema = {
        field: {
          clients: [
            {
              validator,
              customArgs: {
                field: {
                  name: [required],
                  surname: [required],
                },
              },
            },
          ],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = await formValidation.validateForm(formValue);

      // Assert
      const expectedResult: FormValidationResult = {
        succeeded: false,
        recordErrors: {},
        fieldErrors: {
          'clients[0].name': {
            succeeded: false,
            type: 'REQUIRED',
            message: 'Please fill in this mandatory field.',
          },
          'clients[0].surname': {
            succeeded: false,
            type: 'REQUIRED',
            message: 'Please fill in this mandatory field.',
          },
          'clients[1].name': {
            succeeded: true,
            message: '',
            type: 'REQUIRED',
          },
          'clients[1].surname': {
            succeeded: true,
            message: '',
            type: 'REQUIRED',
          },
        },
      };
      expect(result).toEqual(expectedResult);
    });

    it('should return failed validation when second item fail both validations', async () => {
      // Arrange
      const clients = [
        { name: 'test-name-1', surname: 'test-surname-1' },
        { name: '', surname: '' },
      ];

      const formValue = {
        clients,
      };

      const validationSchema: ValidationSchema = {
        field: {
          clients: [
            {
              validator,
              customArgs: {
                field: {
                  name: [required],
                  surname: [required],
                },
              },
            },
          ],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = await formValidation.validateForm(formValue);

      // Assert
      const expectedResult: FormValidationResult = {
        succeeded: false,
        recordErrors: {},
        fieldErrors: {
          'clients[0].name': {
            succeeded: true,
            message: '',
            type: 'REQUIRED',
          },
          'clients[0].surname': {
            succeeded: true,
            message: '',
            type: 'REQUIRED',
          },
          'clients[1].name': {
            succeeded: false,
            type: 'REQUIRED',
            message: 'Please fill in this mandatory field.',
          },
          'clients[1].surname': {
            succeeded: false,
            type: 'REQUIRED',
            message: 'Please fill in this mandatory field.',
          },
        },
      };
      expect(result).toEqual(expectedResult);
    });

    it('should return failed validation when first and second items fail both validations', async () => {
      // Arrange
      const clients = [
        { name: '', surname: '' },
        { name: '', surname: '' },
      ];

      const formValue = {
        clients,
      };

      const validationSchema: ValidationSchema = {
        field: {
          clients: [
            {
              validator,
              customArgs: {
                field: {
                  name: [required],
                  surname: [required],
                },
              },
            },
          ],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = await formValidation.validateForm(formValue);

      // Assert
      const expectedResult: FormValidationResult = {
        succeeded: false,
        recordErrors: {},
        fieldErrors: {
          'clients[0].name': {
            succeeded: false,
            type: 'REQUIRED',
            message: 'Please fill in this mandatory field.',
          },
          'clients[0].surname': {
            succeeded: false,
            type: 'REQUIRED',
            message: 'Please fill in this mandatory field.',
          },
          'clients[1].name': {
            succeeded: false,
            type: 'REQUIRED',
            message: 'Please fill in this mandatory field.',
          },
          'clients[1].surname': {
            succeeded: false,
            type: 'REQUIRED',
            message: 'Please fill in this mandatory field.',
          },
        },
      };
      expect(result).toEqual(expectedResult);
    });

    it('should return two failed validation when first value is undefined and second has values and items fail both validations using validateForm', async () => {
      // Arrange
      const clients = [undefined, { name: '' }];

      const formValue = {
        clients,
      };

      const validationSchema: ValidationSchema = {
        field: {
          clients: [
            {
              validator,
              customArgs: {
                field: {
                  name: [required],
                  surname: [required],
                },
              },
            },
          ],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = await formValidation.validateForm(formValue);

      // Assert
      const expectedResult: FormValidationResult = {
        succeeded: false,
        recordErrors: {},
        fieldErrors: {
          'clients[0].name': {
            succeeded: false,
            type: 'REQUIRED',
            message: 'Please fill in this mandatory field.',
          },
          'clients[0].surname': {
            succeeded: false,
            type: 'REQUIRED',
            message: 'Please fill in this mandatory field.',
          },
          'clients[1].name': {
            succeeded: false,
            type: 'REQUIRED',
            message: 'Please fill in this mandatory field.',
          },
          'clients[1].surname': {
            succeeded: false,
            type: 'REQUIRED',
            message: 'Please fill in this mandatory field.',
          },
        },
      };
      expect(result).toEqual(expectedResult);
    });

    it('should return failed validation when it feeds nested fieldId with array syntax and index is not zero', async () => {
      // Arrange
      const validationSchema: ValidationSchema = {
        field: {
          clients: [
            {
              validator,
              customArgs: {
                field: {
                  name: [required],
                  surname: [required],
                },
              },
            },
          ],
        },
      };

      // Act
      const formValidation = createFormValidation(validationSchema);
      const result = await formValidation.validateField('clients[2].name', '');

      // Assert
      const expectedResult: ValidationResult = {
        succeeded: false,
        type: 'REQUIRED',
        message: 'Please fill in this mandatory field.',
      };
      expect(result).toEqual(expectedResult);
    });
  });
});
