import {
  ValidationResult,
  createDefaultValidationResult,
} from '@lemoncode/fonk';

export interface User {
  firstName: string;
  lastName: string;
  age: number;
}

export const createEmptyUser = (): User => ({
  firstName: '',
  lastName: '',
  age: 0,
});

export interface UserError {
  firstName: ValidationResult;
  lastName: ValidationResult;
  age: ValidationResult;
}

export const createEmptyUserError = (): UserError => ({
  firstName: createDefaultValidationResult(),
  lastName: createDefaultValidationResult(),
  age: createDefaultValidationResult(),
});
