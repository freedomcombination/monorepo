import { type Locator, type Page } from '@playwright/test'

export class LoginPage {
  readonly page: Page
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator

  readonly loginButton: Locator
  readonly userNameInputDashboard: Locator
  readonly passwordInputDashboard: Locator
  readonly submitButtonDashboard: Locator

  constructor(page: Page) {
    this.page = page
    this.usernameInput = page.locator('#identifier')
    this.passwordInput = page.locator('#password')
    this.submitButton = page.getByTestId('button-submit-login')

    this.loginButton = page.locator('.chakra-button').getByText('Login')
    this.userNameInputDashboard = page.locator('#identifier')
    this.passwordInputDashboard = page.locator('#password')
    this.submitButtonDashboard = page
      .locator('.chakra-button')
      .getByText('Sign in')
  }

  async fillUsername(username: string) {
    await this.usernameInput.focus()
    await this.usernameInput.fill(username)
  }

  async fillPassword(password: string) {
    await this.passwordInput.focus()
    await this.passwordInput.fill(password)
  }

  async submit() {
    await this.submitButton.click()
  }

  async login(username: string, password: string) {
    await this.fillUsername(username)
    await this.fillPassword(password)
    await this.submit()
  }

  async fillUsernameDashboard(username: string) {
    await this.userNameInputDashboard.click()
    await this.userNameInputDashboard.fill(username)
  }

  async fillPasswordDashboard(password: string) {
    await this.passwordInputDashboard.click()
    await this.passwordInputDashboard.fill(password)
  }

  async signIn() {
    await this.submitButtonDashboard.click()
  }

  async loginDashboard(username: string, password: string) {
    await this.loginButton.click()
    await this.fillUsernameDashboard(username)
    await this.fillPasswordDashboard(password)
    await this.signIn()
  }
}
