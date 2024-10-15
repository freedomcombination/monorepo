import { Locator, Page } from '@playwright/test'

import { generateRandomUser } from '../utils'

const { name, email } = generateRandomUser()

export class ContactPage {
  readonly page: Page

  readonly fullnameInput: Locator
  readonly emailInput: Locator
  readonly messageInput: Locator
  readonly submitButton: Locator

  readonly errorAlert: Locator
  readonly successAlert: Locator

  readonly socialLinks: {
    email: Locator
    facebook: Locator
    instagram: Locator
    linkedin: Locator
    x: Locator
    whatsapp: Locator
    youtube: Locator
  }

  constructor(page: Page) {
    this.page = page

    this.fullnameInput = page.getByTestId('input-fullname')
    this.emailInput = page.getByTestId('input-email')
    this.messageInput = page.getByTestId('input-message')
    this.submitButton = page.getByRole('button', { name: 'Send message' })

    this.errorAlert = page.getByTestId('error-contact-form')
    this.successAlert = page.getByTestId('success-contact-form')

    this.socialLinks = {
      email: page.locator('a[href^="mailto:"]'),
      x: page.getByLabel('X').first(),
      facebook: page.getByLabel('Facebook').first(),
      instagram: page.getByLabel('Instagram').first(),
      linkedin: page.getByLabel('LinkedIn').first(),
      whatsapp: page.getByLabel('WhatsApp').first(),
      youtube: page.getByLabel('YouTube').first(),
    }
  }

  async sendContactMessage() {
    // Locator.fill sometimes doesn't work as expected
    // Timeout was needed to fix the issue
    this.fullnameInput.fill(name)
    await this.page.waitForTimeout(1000)

    this.emailInput.fill(email)
    await this.page.waitForTimeout(1000)

    this.messageInput.focus()
    this.messageInput.fill('This is a Test Message.')

    await this.submitButton.click()
    await this.page.waitForTimeout(1000)
  }
}
