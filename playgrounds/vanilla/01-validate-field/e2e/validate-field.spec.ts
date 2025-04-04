import { test, expect } from '@playwright/test';

const IDS = {
  firstName: 'firstName',
  lastName: 'lastName',
  age: 'age',
};

test('should validate the three fields on blur', async ({ page }) => {
  await page.goto('http://localhost:8080');
  const firstNameError = page.getByTestId(`${IDS.firstName}-error`);
  const lastNameError = page.getByTestId(`${IDS.lastName}-error`);
  const ageError = page.getByTestId(`${IDS.age}-error`);
  await expect(firstNameError).toHaveText('');
  await expect(lastNameError).toHaveText('');
  await expect(ageError).toHaveText('');

  const firstName = page.getByLabel('First Name');
  await firstName.focus();
  await firstName.blur();
  await expect(firstNameError).toHaveText(/required/i);

  const lastName = page.getByLabel('Last Name');
  await lastName.focus();
  await lastName.blur();
  await expect(lastNameError).toHaveText(/required/i);

  const age = page.getByLabel('Age');
  await age.focus();
  await age.clear();
  await age.blur();
  await expect(ageError).toHaveText(/must be an integer/i);
});

test('should validate the firstName field on change', async ({ page }) => {
  await page.goto('http://localhost:8080');
  const firstNameError = page.getByTestId(`${IDS.firstName}-error`);
  await expect(firstNameError).toHaveText('');

  const firstName = page.getByLabel('First Name');
  await firstName.fill('John');
  await expect(firstNameError).toHaveText('');
  await firstName.clear();
  await expect(firstNameError).toHaveText(/required/i);
});

test('should validate the lastName field on change', async ({ page }) => {
  await page.goto('http://localhost:8080');
  const lastNameError = page.getByTestId(`${IDS.lastName}-error`);
  await expect(lastNameError).toHaveText('');

  const lastName = page.getByLabel('Last Name');
  await lastName.fill('Doe');
  await expect(lastNameError).toHaveText('');
  await lastName.clear();
  await expect(lastNameError).toHaveText(/required/i);
});

test('should validate the age field on change', async ({ page }) => {
  await page.goto('http://localhost:8080');
  const ageError = page.getByTestId(`${IDS.age}-error`);
  await expect(ageError).toHaveText('');

  const age = page.getByLabel('Age');
  await age.fill('abc');
  await expect(ageError).toHaveText(/must be an integer/i);
  await age.clear();
  await expect(ageError).toHaveText(/must be an integer/i);
  await age.fill('0.2');
  await expect(ageError).toHaveText(/must be an integer/i);
  await age.fill('1');
  await expect(ageError).toHaveText(/must be at least 18/i);
  await age.fill('18');
  await expect(ageError).toHaveText('');
});
