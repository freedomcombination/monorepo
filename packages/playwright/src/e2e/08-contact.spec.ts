import { expect } from '@playwright/test'

import { test } from '../fixtures'
import { getUrl, checkExternalLink } from '../utils'
test.beforeEach(async ({ page }) => {
  await page.goto(getUrl('kunsthalte'))
  await page.waitForTimeout(1000)
  await page.click('button:has-text("EN")')
})

test.describe('08. Contact required field control', () => {
  test('TC-01: should Contact', async ({ page, layoutPage }) => {
    await layoutPage.gotoPage('contact')
    await page.getByTestId('input-fullname').click()
    await page.getByTestId('input-email').click()
    await page.getByTestId('input-message').click()
    await page.getByTestId('input-fullname').click()
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
  })

  test('TC-02: should send message via contact form', async ({
    page,
    layoutPage,
  }) => {
    await layoutPage.gotoPage('contact')
    await page.waitForTimeout(1000)
    await page.getByPlaceholder('Your Full Name').fill('Test Mustafa BUDAK')

    const emailInput = await page.locator('[data-testid="input-email"]')
    const testEmail = 'test@example.com'
    await emailInput.fill(testEmail)

    await page.getByPlaceholder('Message').fill('This is a Test Message.')
    await page.waitForTimeout(5000)
    await page.getByRole('button', { name: 'Send message' }).click()
    await page.waitForTimeout(2000)
    const successDiv = await page.textContent('div[data-status="success"]')
    expect(successDiv).toBe('Thank you. Your message has been delivered.') // 07. Can the user send the message successfully ?
  })
  test('TC-03: should Check if it is redirected to another page ', async ({
    page,
    layoutPage,
  }) => {
    await layoutPage.gotoPage('contact')
    const emaillink = page.locator('a[href^="mailto:"]')
    await expect(emaillink).toBeVisible() //  08. When clicking on the email address icon, the user should be directed to the Outlook application.
    const xElement = page.getByLabel('X').first()
    await checkExternalLink(xElement, 'https://x.com/kunsthalte') // 09. When clicking on the xcom icon, the user should be directed to another page.

    const WhatsAppElement = page.getByLabel('WhatsApp').first()
    await checkExternalLink(
      WhatsAppElement,
      'https://api.whatsapp.com/send?phone=31685221308',
    ) // 10. When clicking on the WhatsApp icon, the user should be directed to another page.

    const InstagramElement = page.getByLabel('Instagram').first()
    await checkExternalLink(
      InstagramElement,
      'https://instagram.com/kunsthalte',
    ) // 11. When clicking on the Instagram icon, the user should be directed to another page.
    const YoutubeElement = page.getByLabel('Youtube').first()
    await checkExternalLink(
      YoutubeElement,
      'https://www.youtube.com/@Kunsthalte',
    ) // 12. When clicking on the Youtube icon, the user should be directed to another page.
    await page.click('button:has-text("EN")')
  })
})
