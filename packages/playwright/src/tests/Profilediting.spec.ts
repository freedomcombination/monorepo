import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://kunsthalte.vercel.app/nl');
  await page.getByRole('link', { name: 'Inloggen' }).click();
  await page.getByTestId('input-email').click();
  await page.getByTestId('input-email').fill('Admin6');
  await page.getByTestId('input-password').click();
  await page.getByTestId('input-password').fill('1234512345Ad');
  await page.getByTestId('button-submit-login').click();
  await page.getByRole('button', { name: 'Admin6' }).click();
  await page.getByRole('menuitem', { name: 'Profiel' }).click();
});