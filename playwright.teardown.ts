import { test as teardown } from '@playwright/test';

teardown('close browser', async ({ browser }) => {
  await browser.close();
});
