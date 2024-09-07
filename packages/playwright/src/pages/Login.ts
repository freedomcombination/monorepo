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

  private async _login(username = USERNAME, password = PASSWORD) {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)

    await this.submitButton.click()
  }

  async login(username = USERNAME, password = PASSWORD) {
    await this._login(username, password)
    await this.page.waitForLoadState('domcontentloaded')
    // Ensure the user is logged in
    await this.page.waitForSelector('data-testid=button-d-profile-menu')
  }

  async loginDashboard(username = ADMIN_USERNAME, password = PASSWORD) {
    await this.loginButton.click()
    await this._login(username, password)
    await this.page.waitForSelector('data-testid=button-logout')
  }
}
