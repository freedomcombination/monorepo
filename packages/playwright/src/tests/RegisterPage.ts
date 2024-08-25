import { Page } from '@playwright/test'

type RegisterArgs = {
  name: string
  username: string
  email: string
  password: string
}

export class RegisterPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async navigateToRegister() {
    await this.page.goto('https://kunsthalte.vercel.app/tr')
    await this.page.click('a[href*="auth/login"]') // Go to login page
    await this.page.click('a[href*="auth/register"]') // Go to register page
  }

  async register({ name, username, email, password }: RegisterArgs) {
    await this.page.click('#name')
    await this.page.fill('#name', name) // Fill name

    await this.page.click('#username')
    await this.page.fill('#username', username) // Fill username

    await this.page.click('#email')
    await this.page.fill('#email', email) // Fill email

    await this.page.click('#password')
    await this.page.fill('#password', password) // Fill password

    await this.page.click('button.css-1vhfr1i') // Click "Create Account" button
  }
}
