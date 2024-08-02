import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://kunsthalte.vercel.app/nl');
  await page.getByRole('link', { name: 'Inloggen' }).click();
  await page.getByTestId('input-email').click();
  await page.getByTestId('input-email').fill('admin');
  await page.getByTestId('input-password').click();
  await page.getByTestId('input-password').press('CapsLock');
  await page.getByTestId('input-password').fill('T');
  await page.getByTestId('input-password').press('CapsLock');
  await page.getByTestId('input-password').fill('Test?123');
  await page.getByTestId('button-submit-login').click();
  await page.getByRole('button', { name: 'TR' }).first().click();
  await page.getByRole('button', { name: 'NL' }).first().click();
  await page.getByRole('button', { name: 'EN' }).first().click();
  await page.getByRole('link', { name: 'Arts' }).first().click();
  await expect(page.getByRole('link', { name: 'Collections' }).first()).toBeVisible();
  await page.getByRole('link', { name: 'Activities' }).click();
  await page.getByRole('link', { name: 'About Us' }).first().click();
  await page.getByRole('link', { name: 'Contact' }).first().click();
  await page.getByRole('link', { name: 'Donate' }).click();
});