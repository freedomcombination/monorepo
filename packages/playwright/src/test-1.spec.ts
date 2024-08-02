import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://kunsthalte.vercel.app/')

  await page.getByRole('link', { name: 'Inloggen' }).click()
  await page.getByTestId('input-email').click()
  await page.getByTestId('input-email').fill('admin')
  await page.getByTestId('input-password').click()
});