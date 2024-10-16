import { expect } from '@playwright/test'

import { test } from '../fixtures'
import { checkExternalLink } from '../utils'

test.beforeEach(async ({ page, layoutPage }) => {
  await layoutPage.gotoHome('kunsthalte')
  await layoutPage.gotoPage('contact')
  await page.waitForLoadState()
})

test.describe('08. Contact', () => {
  test('TC-01: should display validation error messages', async ({
    page,
    contactPage,
  }) => {
    await contactPage.fullnameInput.focus()
    await contactPage.emailInput.focus()
    await contactPage.messageInput.focus()
    await contactPage.messageInput.blur()

    const fullNameErrorMessage = page.getByTestId('error-text-fullname')
    const emailErrorMessage = page.getByTestId('error-text-email')
    const messageErrorMessage = page.getByTestId('error-text-message')

    await expect(fullNameErrorMessage).toBeVisible()
    await expect(emailErrorMessage).toBeVisible()
    await expect(messageErrorMessage).toBeVisible()

    const invalidEmail = 'test_example.com'
    await contactPage.emailInput.fill(invalidEmail)
    contactPage.emailInput.blur()
    await expect(emailErrorMessage).toBeVisible()
  })

  test.fail(
    'TC-02: should send message via contact form',
    async ({ contactPage }) => {
      await contactPage.sendContactMessage()
      // It may not always work because of the captcha protection
      await expect(contactPage.successAlert).toBeVisible()
    },
  )

  test('TC-03: should social links work', async ({ contactPage }) => {
    await expect(contactPage.socialLinks.email).toBeVisible()

    await checkExternalLink(
      contactPage.socialLinks.x,
      'https://x.com/kunsthalte',
    )

    await checkExternalLink(
      contactPage.socialLinks.whatsapp,
      'https://api.whatsapp.com/send?phone=31687578056',
    )

    await checkExternalLink(
      contactPage.socialLinks.instagram,
      'https://instagram.com/kunsthalte',
    )

    await checkExternalLink(
      contactPage.socialLinks.youtube,
      'https://www.youtube.com/@Kunsthalte',
    )
  })
})
