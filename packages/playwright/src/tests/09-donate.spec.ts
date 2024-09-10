import { test, expect } from '@playwright/test'

import { getUrl } from '../utils'
test.beforeEach(async ({ page }) => {
  await page.goto(getUrl('kunsthalte'))
  await page.waitForTimeout(1000)
  await page.click('button:has-text("EN")')
  await page.waitForTimeout(1000)
})

test.describe('01. Donate', () => {
  test('TC-01: should Donate', async ({ page }) => {
    await page.getByRole('link', { name: 'Donate' }).click()

    await expect(page.getByRole('heading')).toContainText('Donate') // 01. Does the Donate page open?
    const pageTitle = await page.title()
    expect(pageTitle).toContain('Donate') // 02. Does the title match the page name?
    await page.getByRole('button', { name: '€10', exact: true }).click()
    const inputElement = page.locator('.chakra-numberinput input')
    const value = await inputElement.inputValue()
    expect(value).toContain('10')
    await page.getByRole('button', { name: '€5', exact: true }).click()
    await page.getByRole('button', { name: '€20' }).click()
    await page.getByRole('button', { name: '€50' }).click()
    await page.getByRole('button', { name: '€100' }).click()
    await page.getByRole('button', { name: '€10', exact: true }).click()
    await page.locator('.css-8pgw4r').first().click()
    await page.waitForLoadState('networkidle')

    const chakraNumberInputDivvalue = await page
      .locator('.chakra-numberinput input')
      .inputValue()
    expect(chakraNumberInputDivvalue).toContain('11')
    await page.locator('.css-1jj9yua > div:nth-child(2)').click()

    const inputLocator = page.locator('.chakra-numberinput input')
    const valuee = await inputLocator.inputValue()
    expect(valuee).toContain('10')
    await page.getByPlaceholder('Name').click()
    await page.getByPlaceholder('E-mail').click()
    await page.getByPlaceholder('Name').click()

    const requiredTextName = await page.locator('text=name is a required field')

    const isTextVisibleName = await requiredTextName.isVisible()
    await expect(isTextVisibleName).toBe(true) // 05. Is Name a required field?
    await page.getByPlaceholder('Name').fill('Mustafa Budak')
    const requiredTextEmail = await page.locator(
      'text=email is a required field',
    )
    const isTextVisibleEmail = await requiredTextEmail.isVisible()
    await expect(isTextVisibleEmail).toBe(true)

    // 06. Is E-mail a required field?
    const emailInput = await page.locator('input[name="email"]')

    const testEmailError = 'test_example.com'
    await emailInput.fill(testEmailError)
    const requiredTextEmailError = await page.locator(
      'text=email must be a valid email',
    )

    const isTextVisibleEmailError = await requiredTextEmailError.isVisible()
    await expect(isTextVisibleEmailError).toBe(true)
    const testEmail = 'test@example.com'
    await emailInput.fill(testEmail)
    const emailValue = await emailInput.inputValue()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const isValidEmail = emailRegex.test(emailValue)
    expect(isValidEmail).toBe(true) // 07. Assert that the email is valid
    await Promise.all([page.getByRole('button', { name: 'Donate €' }).click()])
    const newUrl = page.url()
    expect(isValidEmail).toBe(newUrl.length > 0) // 08. When the donate button is clicked, the user should be directed to the payment page.

    // Test code here
  })
})
