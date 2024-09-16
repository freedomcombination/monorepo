import { test, expect } from '@playwright/test'

import { getUrl } from '../utils'
test.beforeEach(async ({ page }) => {
  await page.goto(getUrl('kunsthalte'))
  await page.waitForTimeout(1000)
  await page.click('button:has-text("EN")')
})

test.describe('08. Contact', () => {
  test('TC-01: should Contact', async ({ page }) => {
    // TODO: Use layoutPage
    await page.getByRole('link', { name: 'Contact' }).first().click()
    await page.waitForLoadState('networkidle')
    await expect(page.locator('[id="__next"]')).toContainText('Contact') // 01. Does the Contact page open?

    const pageTitle = await page.title()
    await page.waitForTimeout(100)
    expect(pageTitle).toContain('Contact') // 02. Does the title match the page name? //yapılamadı

    // TODO: Use locators in Contact.ts
    await page.getByPlaceholder('Your Full Name').click()
    await page.getByPlaceholder('E-mail').click()
    await page.getByPlaceholder('Message').click()
    await page.getByPlaceholder('Your Full Name').click()

    const fullNameErrorMessage = await page.locator(
      '[data-testid="error-text-fullname"]',
    )
    const isDivVisible = await fullNameErrorMessage.isVisible()
    await expect(isDivVisible).toBe(true) // 03. Is Your Full Name a required field? // bakılacak

    const requiredTextEmail = page.getByTestId('error-text-email')
    await expect(requiredTextEmail).toBeVisible() // 04. Is email a required field?

    const emailInput = await page.locator('[data-testid="input-email"]')
    const testEmailError = 'test_example.com'
    await emailInput.fill(testEmailError)
    const requiredTextEmailError = await page.locator(
      '[data-testid="error-text-email"]',
    )

    const isTextVisibleEmailError = await requiredTextEmailError.isVisible()
    await expect(isTextVisibleEmailError).toBe(true)
    const testEmail = 'test@example.com'
    await emailInput.fill(testEmail)
    const emailValue = await emailInput.inputValue()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const isValidEmail = emailRegex.test(emailValue)
    expect(isValidEmail).toBe(true) // 05. Assert that the email is valid
    const requiredTextMessage = await page.locator(
      '[data-testid="error-text-message"]',
    )
    const isTextVisibleMessage = await requiredTextMessage.isVisible()
    await expect(isTextVisibleMessage).toBe(true) // 06. Is Message a required field?

    await page.getByPlaceholder('Your Full Name').fill('Test Mustafa BUDAK')
    await page.getByPlaceholder('Message').fill('Bu bir Deneme Mesajıdır.')
    await page.getByRole('button', { name: 'Send message' }).click()
    await page.waitForTimeout(1000)
    await page.waitForLoadState('networkidle')
    const successDiv = await page.textContent('div[data-status="success"]')
    expect(successDiv).toBe('Thank you. Your message has been delivered.') // 07. Can the user send the message successfully ?

    const emaillink = page.locator('a[href^="mailto:"]')
    await expect(emaillink).toHaveCount(1) //  08. When clicking on the email address icon, the user should be directed to the Outlook application.

    // TODO: Test social media link with checkExternalLink function
    const xElement = page.getByLabel('X').first().getAttribute('href')
    expect(xElement).not.toBeNull() // 09. When clicking on the xcom icon, the user should be directed to another page.

    const WhatsAppElement = page
      .getByLabel('WhatsApp')
      .first()
      .getAttribute('href')
    expect(WhatsAppElement).not.toBeNull() // 10. When clicking on the WhatsApp icon, the user should be directed to another page.

    const InstagramElement = page
      .getByLabel('Instagram')
      .first()
      .getAttribute('href')
    expect(InstagramElement).not.toBeNull() // 11. When clicking on the Instagram icon, the user should be directed to another page.

    const YoutubeElement = page
      .getByLabel('Youtube')
      .first()
      .getAttribute('href')
    expect(YoutubeElement).not.toBeNull() // 12. When clicking on the Youtube icon, the user should be directed to another page.
    await page.click('button:has-text("EN")')
  })
})
