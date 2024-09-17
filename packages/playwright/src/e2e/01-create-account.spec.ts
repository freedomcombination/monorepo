import { expect } from '@playwright/test'

import { test } from '../fixtures'
import { generateRandomUser } from '../utils'

test.beforeEach(async ({ registerPage }) => {
  await registerPage.navigateToRegister('kunsthalte')
})

test.describe('01. Create Account', () => {
  test('TC-01: should register', async ({ registerPage, layoutPage }) => {
    const { name, username, email, password } = generateRandomUser()

    await registerPage.register({ name, username, email, password })

    await layoutPage.logout()
  })

  test('TC-02: should not register with empty email', async ({
    page,
    registerPage,
  }) => {
    const { name, username, password } = generateRandomUser()

    await registerPage.register({ name, username, email: '', password })

    await expect(page.getByTestId('error-text-email')).toBeVisible()
    await page.waitForTimeout(1000)
  })

  test('TC-03: should not register with invalid email', async ({
    page,
    registerPage,
  }) => {
    const { name, username, password } = generateRandomUser()

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

  test('TC-05: should not register with blank email', async ({
    page,
    registerPage,
  }) => {
    const { name, username, password } = generateRandomUser()

    await registerPage.register({ name, username, email: '', password }) // Leave email field blank

    await expect(page.getByText('email is a required field')).toBeVisible() // Error message checking
  })

  test('TC-06: should not register with invalid email', async ({
    page,
    registerPage,
  }) => {
    const { name, username, password } = generateRandomUser()

    await registerPage.register({
      name,
      username,
      email: 'invalid-email',
      password,
    })

    // TODO: Use data-testid instead of text content
    await expect(page.getByText('email must be a valid email')).toBeVisible()
  })

  test('TC-07: should Negative flow (login with invalid information)', async ({
    page,
    registerPage,
  }) => {
    const { name, username, email, password } = generateRandomUser()

    await registerPage.register({ name, username, email, password })

    // TODO: Use layoutPage.switchLanguage
    await page.click('button:has-text("TR")')

    // TODO: Use data-testid instead of text content
    await page.getByRole('link', { name: 'Giriş yap' }).click() // Go to login page

    // TODO: Use registerPage.inputEmail ('input-username' is the correct data-testid)
    await page.getByTestId('input-identifier').click()
    await page.getByTestId('input-identifier').fill(email) // Nonexistent email

    await page.getByTestId('input-password').click()
    await page.getByTestId('input-password').fill(password + 'aaa') // Invalid password

    await page.getByTestId('button-submit-login').click() // Click "Log in" button

    // TODO: Use data-testid instead of text content
    await expect(
      page.getByText(
        'Kullanıcı adı veya şifre hatalı. Lütfen tekrar deneyiniz.',
      ),
    ).toBeVisible()
  })

  test('TC-08: should not register with invalid name', async ({
    page,
    registerPage,
  }) => {
    const invalidName = 'Jo1?!@'
    const { username, email, password } = generateRandomUser()

    await registerPage.register({
      name: invalidName,
      username,
      email,
      password,
    })

    // TODO: Use data-testid instead of text content
    await expect(
      page.getByText('Only alphabetic characters allowed'),
    ).toBeVisible()
  })

  test('TC-09: should not register with invalid username', async ({
    page,
    registerPage,
  }) => {
    const shortName = 'Jo'
    const { username, email, password } = generateRandomUser()

    await registerPage.register({
      name: shortName,
      username,
      email,
      password,
    })

    // TODO: Use data-testid instead of text content
    await expect(
      page.getByText('Name must be at least 3 characters'),
    ).toBeVisible()

    page.close()
  })
})
