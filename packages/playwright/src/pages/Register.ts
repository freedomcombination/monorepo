import { Locator, Page } from '@playwright/test'

import type { Site } from '@fc/types'

import { getUrl } from '../utils'

type RegisterArgs = {
  name: string
  username: string
  email: string
  password: string
}

export class RegisterPage {
  readonly page: Page

  readonly nameInput: Locator
  readonly usernameInput: Locator
  readonly emailInput: Locator
  readonly passwordInput: Locator

  readonly submitButton: Locator

  constructor(page: Page) {
    this.page = page

    this.nameInput = page.getByTestId('input-name')
    this.usernameInput = page.getByTestId('input-username')
    this.emailInput = page.getByTestId('input-email')
    this.passwordInput = page.getByTestId('input-password')

    this.submitButton = page.getByTestId('button-register')
  }

  async navigateToRegister(site: Site) {
    const url = getUrl(site)
    await this.page.goto(url)

    await this.page.click('a[href*="auth/login"]')
    await this.page.click('a[href*="auth/register"]')
  }

  async register({ name, username, email, password }: RegisterArgs) {
    await this.nameInput.fill(name)
    await this.usernameInput.fill(username)
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)

    await this.submitButton.click()
  }
}
