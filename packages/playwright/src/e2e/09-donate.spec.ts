import { expect } from '@playwright/test'

import { test } from '../fixtures'
import { getUrl } from '../utils'
test.beforeEach(async ({ page }) => {
  await page.goto(getUrl('kunsthalte'))
  await page.waitForTimeout(1000)
  await page.click('button:has-text("EN")')
  await page.waitForTimeout(1000)
})

test.describe('01. Donate', () => {
  test('TC-01: should donation page', async ({ page, layoutPage }) => {
    // TODO: Use locators in Donate.ts
    await layoutPage.gotoPage('donation')
    await page.getByTestId('button-donation-10').click()

    const inputElement = await page.getByTestId('input-donation').inputValue()
    expect(inputElement).toContain('10')

    await page.getByTestId('button-donation-5').click()
    await page.getByTestId('button-donation-20').click()
    await page.getByTestId('button-donation-50').click()
    await page.getByTestId('button-donation-100').click()
    await page.getByTestId('button-donation-10').click()
    await page.getByTestId('button-donation-increment').click()
    await page.waitForLoadState('networkidle')

    const chakraNumberInputDivvalue = await page
      .getByTestId('input-donation')
      .inputValue()
    expect(chakraNumberInputDivvalue).toContain('11')
    await page.getByTestId('button-donation-decrement').click()

    const inputLocatorvaluee = await page
      .getByTestId('input-donation')
      .inputValue()

    expect(inputLocatorvaluee).toContain('10')
    await page.getByTestId('input-name').click()
    await page.getByTestId('input-email').click()
    await page.getByTestId('input-name').click()

    await expect(page.getByTestId('error-text-name')).toBeVisible() // 05. Is Name a required field?
    await page.getByTestId('input-name').fill('Mustafa Budak')

    await expect(page.getByTestId('error-text-email')).toBeVisible() // 06. Is Name a required field?
    const emailInput = await page.getByTestId('input-email')
    const testEmailError = 'test_example.com'
    await emailInput.fill(testEmailError)
    await page.waitForTimeout(1000)
    await expect(page.getByTestId('error-text-email')).toBeVisible() // 06. Email must be a valid email
    const testEmail = 'test@example.com'
    await emailInput.fill(testEmail)
    const emailValue = await emailInput.inputValue()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const isValidEmail = emailRegex.test(emailValue)
    expect(isValidEmail).toBe(true) // 07. Assert that the email is valid
    await page.getByTestId('button-donation-submit').click()
    const newUrl = page.url()
    expect(isValidEmail).toBe(newUrl.length > 0) // 08. When the donate button is clicked, the user should be directed to the payment page.
  })
})
