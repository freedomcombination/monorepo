import { test, expect } from '@playwright/test'

import { getVercelUrl } from '../utils'

test.beforeEach(async ({ page }) => {
  await page.goto(getVercelUrl('kunsthalte'))
  await page.waitForTimeout(100)
})

test('TC-0001 About Us', async ({ page }) => {
  await page.click('button:has-text("TR")')
  await page.click('a[href="/tr/about-us"]')
  await page.waitForLoadState('networkidle')
  const titleTR = await page.textContent('h2.chakra-heading')
  expect(titleTR).toContain('Hakkımızda') // 01. Does the About Us page open? (For TR)

  const pageTitleTR = await page.title()
  // 02. Does the title match the page name? (For TR)
  expect(pageTitleTR).toContain('Hakkımızda')

  await page.click('button:has-text("NL")')
  await page.getByRole('link', { name: 'Over Ons' }).first().click()
  await page.waitForLoadState('networkidle')
  const titleNL = await page.textContent('h2.chakra-heading')
  expect(titleNL).toContain('Over ons') // 03. Does the About Us page open? (For NL)

  const pageTitleNL = await page.title()
  expect(pageTitleNL).toContain('Over ons') // 04. Does the title match the page name? (For NL)

  await page.click('button:has-text("EN")')
  await page.getByRole('link', { name: 'About Us' }).first().click()
  await page.waitForLoadState('networkidle')
  const titleEN = await page.textContent('h2.chakra-heading')
  expect(titleEN).toContain('About Us') // 05. Does the About Us page open? (For EN)

  const pageTitleEN = await page.title()
  expect(pageTitleEN).toContain('About Us') // 06. Does the title match the page name? (For EN)
})

test('TC-0002 Contact', async ({ page }) => {
  await page.getByRole('link', { name: 'Contact' }).first().click()
  await page.waitForLoadState('networkidle')
  const title = await page
    .getByRole('link', { name: 'Contact' })
    .first()
    .textContent()

  expect(title).toContain('Contact') // 01. Does the Contact page open?

  const pageTitle = await page.title()
  await page.waitForTimeout(100)
  expect(pageTitle).toContain('Contact') // 02. Does the title match the page name?

  await page.getByPlaceholder('Your Full Name').click()
  await page.getByPlaceholder('E-mail').click()
  await page.getByPlaceholder('Message').click()
  await page.getByPlaceholder('Your Full Name').click()

  const fullNameErrorMessage = await page.locator(
    '[data-testid="error-text-fullname"]',
  )
  const isDivVisible = await fullNameErrorMessage.isVisible()
  await expect(isDivVisible).toBe(true) // 03. Is Your Full Name a required field?

  const requiredTextEmail = await page.locator(
    '[data-testid="error-text-email"]',
  )
  const isTextVisibleEmail = await requiredTextEmail.isVisible()
  await expect(isTextVisibleEmail).toBe(true) // 04. Is email a required field?

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

  const YoutubeElement = page.getByLabel('Youtube').first().getAttribute('href')
  expect(YoutubeElement).not.toBeNull() // 12. When clicking on the Youtube icon, the user should be directed to another page.

  await page.click('button:has-text("EN")')
})

test('TC-0003 Donate', async ({ page }) => {
  await page.getByRole('link', { name: 'Donate' }).click()

  const title = await page
    .getByRole('link', { name: 'Donate' })
    .first()
    .textContent()
  await page.waitForTimeout(100)
  expect(title).toContain('Donate') // 01. Does the Donate page open?

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
  const requiredTextEmail = await page.locator('text=email is a required field')

  const isTextVisibleEmail = await requiredTextEmail.isVisible()
  await expect(isTextVisibleEmail).toBe(true) // 06. Is E-mail a required field?

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
})
