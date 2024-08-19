import { test, expect } from '@playwright/test'

import { getVercelUrl } from '../utils'

test('test', async ({ page }) => {
  await page.goto(getVercelUrl('kunsthalte'))
  await page.getByRole('link', { name: 'Sign in' }).click()
  await page.getByTestId('input-email').click()
  await page.getByTestId('input-email').fill('admin')
  await page.getByTestId('input-email').press('Enter')
  await page.getByTestId('input-password').press('CapsLock')
  await page.getByTestId('input-password').fill('T')
  await page.getByTestId('input-password').press('CapsLock')
  await page.getByTestId('input-password').fill('Test?123')
  await page.getByTestId('button-submit-login').click()
  await expect(page.getByRole('button', { name: 'TR' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Arts' }).first()).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Art Station' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'View Arts' })).toBeVisible()
  await page.getByRole('button', { name: 'TR' }).click()
  await expect(
    page.getByRole('heading', { name: 'Sanat Durağı' }),
  ).toBeVisible()
  await expect(page.getByRole('link', { name: 'Eserlere Gözat' })).toBeVisible()
  await page.getByRole('button', { name: 'TR' }).click()
  await page.getByRole('heading', { name: 'Sanat Durağı' }).click()
  await page.getByText('"Farklı renklerin buluşma').click()
  await page.getByRole('link', { name: 'Eserlere Gözat' }).click()
  await page.getByText('Kategoriler').click()
  await page.getByRole('button', { name: 'NL' }).first().click()
  await page.getByRole('link', { name: 'Kunsten' }).first().click()
  await page.getByRole('link', { name: 'Collecties' }).first().click()
  await page.getByRole('link', { name: 'Activiteiten' }).click()
  await page.getByRole('link', { name: 'Over Ons' }).first().click()
  await page.getByRole('link', { name: 'Contact' }).first().click()
  await page.getByRole('button', { name: 'EN', exact: true }).click()
  await page.getByRole('link', { name: 'Arts' }).first().click()
  await page.getByText('Other').click()
  await page.getByRole('link', { name: 'Collections' }).first().click()
  await page.getByRole('link', { name: 'Activities' }).click()
  await page.getByRole('link', { name: 'About Us' }).first().click()
  await page.getByRole('link', { name: 'Contact' }).first().click()

  await page.locator('.css-1x01hl1').first().click()
  await expect(page.locator('.css-1x01hl1').first()).toBeVisible()
  await page.getByRole('link', { name: 'Koleksiyonlar' }).first().click()
  await page.getByRole('link', { name: 'Özgürlük Günü' }).click()
  await page.getByRole('link', { name: 'Özgürlük Günü' }).click()
  await page.goto(
    'https://kunsthalte.vercel.app/tr/club/collections/oezguerluek',
  )
  await expect(
    page.getByRole('heading', { name: 'Özgürlük Günü' }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'Özgürlük Günü' }),
  ).toBeVisible()
  await page.getByRole('link', { name: 'Etkinlikler' }).click()
  await page.getByRole('link', { name: 'Hakkımızda' }).first().click()
  await page.getByRole('link', { name: 'Hakkımızda' }).first().click()
  await page.getByRole('link', { name: 'İletişim' }).first().click()
  await page.getByText('Sanata ilgi duyan Hollanda’ya').click()
  await expect(page.getByText('Sanata ilgi duyan Hollanda’ya')).toBeVisible()
})
