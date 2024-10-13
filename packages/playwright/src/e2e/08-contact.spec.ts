import { expect } from '@playwright/test'

import { test } from '../fixtures'
import { checkExternalLink } from '../utils'

test.beforeEach(async ({ page, layoutPage }) => {
  await layoutPage.gotoHome('kunsthalte')
  await layoutPage.gotoPage('contact')
  await page.waitForLoadState()
})

test.describe('08. Contact required field control', () => {
  test('TC-01: should Contact', async ({ page, contactPage }) => {
    await contactPage.fullnameInput.focus()
    await contactPage.emailInput.focus()
    await contactPage.messageInput.focus()
    await contactPage.messageInput.blur()

    const fullNameErrorMessage = page.getByTestId('error-text-fullname')
    const emailErrorMessage = page.getByTestId('error-text-email')
    const messageErrorMessage = page.getByTestId('error-text-message')

    await expect(fullNameErrorMessage).toBeVisible() // 03. Is Your Full Name a required field? // bakılacak
    await expect(emailErrorMessage).toBeVisible() // 04. Is email a required field?
    await expect(messageErrorMessage).toBeVisible() // 05. Assert that message is required

    const invalidEmail = 'test_example.com'
    await contactPage.emailInput.fill(invalidEmail)
    contactPage.emailInput.blur()
    await expect(emailErrorMessage).toBeVisible() // 06. Assert that the email is invalid
  })

  test('TC-02: should send message via contact form', async ({
    contactPage,
  }) => {
    await contactPage.sendContactMessage()
    // It may not always work because of the captcha protection
    await expect(contactPage.successAlert).toBeVisible() // 07. Can the user send the message successfully ?
  })
  test('TC-03: should social links work', async ({ contactPage }) => {
    await expect(contactPage.socialLinks.email).toBeVisible() //  08. When clicking on the email address icon, the user should be directed to the Outlook application.

    await checkExternalLink(
      contactPage.socialLinks.x,
      'https://x.com/kunsthalte',
    ) // 09. When clicking on the xcom icon, the user should be directed to another page.

    await checkExternalLink(
      contactPage.socialLinks.whatsapp,
      'https://api.whatsapp.com/send?phone=31687578056',
    ) // 10. When clicking on the WhatsApp icon, the user should be directed to another page.

    await checkExternalLink(
      contactPage.socialLinks.instagram,
      'https://instagram.com/kunsthalte',
    ) // 11. When clicking on the Instagram icon, the user should be directed to another page.

    await checkExternalLink(
      contactPage.socialLinks.youtube,
      'https://www.youtube.com/@Kunsthalte',
    ) // 12. When clicking on the Youtube icon, the user should be directed to another page.
  })
})
