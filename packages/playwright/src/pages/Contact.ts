import { expect, Locator, Page } from '@playwright/test'

import { generateRandomUser } from '../utils'

const { name, email } = generateRandomUser()

export class Contact {
  private page: Page

  private nameInput: Locator
  private emailInput: Locator
  private messageInput: Locator
  private submitButton: Locator

  private errorAlert: Locator
  private successAlert: Locator

  constructor(page: Page) {
    this.page = page

    this.nameInput = page.getByTestId('input-name')
    this.emailInput = page.getByTestId('input-email')
    this.messageInput = page.getByTestId('input-message')
    this.submitButton = page.getByTestId('submit-send-message')

    this.errorAlert = page.getByTestId('error-contact-form')
    this.successAlert = page.getByTestId('success-contact-form')
  }

  async sendMessage() {
    this.nameInput.fill(name)
    this.emailInput.fill(email)
    this.messageInput.fill('This is a Test Message.')

    await this.submitButton.click()
    await this.page.waitForLoadState('networkidle')

    await expect(this.successAlert).toBeVisible()
  }
}
