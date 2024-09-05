import { expect, test } from '@playwright/test'

import { LoginPage, RegisterPage } from '../pages'
import { generateRandomUser, getVercelUrl } from '../utils'

test.describe('Create Account', () => {
  test('TC-01: should register', async ({ page }) => {
    const registerPage = new RegisterPage(page, 'kunsthalte')
    const { name, username, email, password } = generateRandomUser()

    await registerPage.navigateToRegister()
    await registerPage.register({ name, username, email, password })

    await page.getByRole('button', { name }).click()
    await page.getByTestId('button-logout').first().click()
    await page.waitForTimeout(1000)
  })

  test('TC-02: should not register with empty email', async ({ page }) => {
    const registerPage = new RegisterPage(page, 'kunsthalte')
    const { name, username, password } = generateRandomUser()

    await registerPage.navigateToRegister()
    await registerPage.register({ name, username, email: '', password })

    await expect(page.getByTestId('error-text-email')).toBeVisible()
    await page.waitForTimeout(1000)
  })

  test('TC-03: should not register with invalid email', async ({ page }) => {
    const registerPage = new RegisterPage(page, 'kunsthalte')
    const { name, username, password } = generateRandomUser()

    await registerPage.navigateToRegister()
    await registerPage.register({
      name,
      username,
      email: 'invalid-email',
      password,
    })

    await expect(page.getByTestId('error-text-email')).toBeVisible()
    await page.waitForTimeout(1000)
  })

  test('TC-04: should not register with invalid password', async ({ page }) => {
    const registerPage = new RegisterPage(page, 'kunsthalte')
    const loginPage = new LoginPage(page)
    const { name, username, email, password } = generateRandomUser()

    await registerPage.navigateToRegister()
    await registerPage.register({ name, username, email, password })

    await page.goto(getVercelUrl('kunsthalte'))
    await page.click('button:has-text("TR")')

    await page.getByRole('link', { name: 'Giriş yap' }).click()

    await loginPage.login(email, password + 'aaa')

    await page.getByTestId('button-submit-login').click()

    await expect(page.getByTestId('error-auth')).toBeVisible()
    await page.waitForTimeout(1000)
    page.close()
  })
})
