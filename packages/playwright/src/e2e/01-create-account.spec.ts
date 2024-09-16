import { expect } from '@playwright/test'

import { test } from '../fixtures'
import { generateRandomUser } from '../utils'

test.describe('01. Create Account', () => {
  test('TC-01: should register', async ({ registerPage, layoutPage }) => {
    const { name, username, email, password } = generateRandomUser()

    await registerPage.navigateToRegister('kunsthalte')
    await registerPage.register({ name, username, email, password })

    await layoutPage.logout()
  })

  test('TC-02: should not register with empty email', async ({
    page,
    registerPage,
  }) => {
    const { name, username, password } = generateRandomUser()

    await registerPage.navigateToRegister('kunsthalte')
    await registerPage.register({ name, username, email: '', password })

    await expect(page.getByTestId('error-text-email')).toBeVisible()
    await page.waitForTimeout(1000)
  })

  test('TC-03: should not register with invalid email', async ({
    page,
    registerPage,
  }) => {
    const { name, username, password } = generateRandomUser()

    await registerPage.navigateToRegister('kunsthalte')
    await registerPage.register({
      name,
      username,
      email: 'invalid-email',
      password,
    })

    await expect(page.getByTestId('error-text-email')).toBeVisible()
    await page.waitForTimeout(1000)
  })

  test('TC-04: should not register with invalid password', async ({
    page,
    registerPage,
  }) => {
    const { name, username, email } = generateRandomUser()

    await registerPage.navigateToRegister('kunsthalte')
    const INVALID_PASSWORD = '123'
    await registerPage.register({
      name,
      username,
      email,
      password: INVALID_PASSWORD,
    })

    await expect(page.getByTestId('error-text-password')).toBeVisible()
    await page.waitForTimeout(1000)
    page.close()
  })
})
