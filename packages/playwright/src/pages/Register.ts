import { Page } from '@playwright/test'

import { Site } from '@fc/types'

import { getVercelUrl } from '../utils'

type RegisterArgs = {
  name: string
  username: string
  email: string
  password: string
}

export class RegisterPage {
  readonly page: Page
  readonly site: Site

  constructor(page: Page, site: Site) {
    this.page = page
    this.site = site
  }

  async navigateToRegister() {
    const url = getVercelUrl(this.site)
    await this.page.goto(url)

    await this.page.click('a[href*="auth/login"]')
    await this.page.click('a[href*="auth/register"]')
  }

  async register({ name, username, email, password }: RegisterArgs) {
    await this.page.click('#name')
    await this.page.fill('#name', name)

    await this.page.click('#username')
    await this.page.fill('#username', username)

    await this.page.click('#email')
    await this.page.fill('#email', email)

    await this.page.click('#password')
    await this.page.fill('#password', password)

    await this.page.getByTestId('button-register').click() // Click "Create Account" button
  }
}
