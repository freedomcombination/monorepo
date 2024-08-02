import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.getByRole('link', { name: 'Sign in' }).click()
  await page.getByRole('link', { name: 'Sign in' }).click()
  await page.getByTestId('input-email').click()
  await page.getByTestId('input-email').fill('admin')
  await page.getByTestId('input-email').press('Enter')
  await page.getByTestId('input-password').press('CapsLock')
  await page.getByTestId('input-password').fill('T')
  await page.getByTestId('input-password').press('CapsLock')
  await page.getByTestId('input-password').fill('Test?123')
  await page.getByTestId('input-password').press('Enter')
  await page.getByRole('button', { name: 'TR' }).click()
  await page.getByRole('link', { name: 'Eserler' }).first().click()
  await page.getByText('resim', { exact: true }).click()
  await page.locator('.css-1x01hl1').first().click()
  await page
    .locator(
      'div:nth-child(2) > .css-1snie26 > .css-mpphlv > .css-1tet98h > .css-1x01hl1',
    )
    .click()
  await page.getByRole('link', { name: 'Koleksiyonlar' }).first().click()
  await page.getByRole('link', { name: 'Etkinlikler' }).click()
  await page.getByRole('link', { name: 'Hakkımızda' }).first().click()
  await page.getByRole('link', { name: 'İletişim' }).first().click()
  await page.getByRole('link', { name: 'Bağış' }).first().click()
})
