import { type Locator, type Page } from '@playwright/test'

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

    this.loginButton = page.getByTestId('button-login')
  }

  async login(username: string, password: string) {
    // await this.page.fill('[data-testid=input-identifier]', username)
    // await this.page.fill('[data-testid=input-password]', password)

    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)

    await this.submitButton.click()
  }

  async loginDashboard(username: string, password: string) {
    await this.loginButton.click()
    await this.login(username, password)
  }
}
