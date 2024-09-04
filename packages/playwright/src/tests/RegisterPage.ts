import { Page } from '@playwright/test'
// Defining the getVercelUrl function
function getVercelUrl(projectName: string): string {
  return `https://${projectName}.vercel.app/tr`
}

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
    const url = getVercelUrl('kunsthalte') // Dynamically generate Vercel URL
    await this.page.goto(url) // Go to dynamically generated URL

    await this.page.click('a[href*="auth/login"]') // Go to login page
    await this.page.click('a[href*="auth/register"]') // Go to registration page
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

    await this.page.getByTestId('button-register').click() // Click "Create Account" button
  }
}
