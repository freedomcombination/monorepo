import { type Locator, type Page } from '@playwright/test'

import { ADMIN_USERNAME, PASSWORD, USERNAME } from '../constants'

export class LoginPage {
  readonly page: Page

  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator

  readonly loginButton: Locator

  constructor(page: Page) {
    this.page = page

    this.usernameInput = page.getByTestId('input-identifier')
    this.passwordInput = page.getByTestId('input-password')
    this.submitButton = page.getByTestId('button-submit-login')

    this.loginButton = page.getByTestId('button-admin-login')
  }

  async login(username = USERNAME, password = PASSWORD) {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)

    await this.submitButton.click()
    await this.page.waitForLoadState('networkidle')
  }

  async loginDashboard(username = ADMIN_USERNAME, password = PASSWORD) {
    await this.loginButton.click()
    await this.login(username, password)
    await this.page.waitForLoadState('networkidle')
  }
}
