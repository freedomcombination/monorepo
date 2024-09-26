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

  test('TC-02: should not register with invalid name', async ({
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

    await expect(page.getByTestId('error-text-name')).toBeVisible()
  })

  test('TC-03: should not register with invalid name', async ({
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

    await expect(page.getByTestId('error-text-name')).toBeVisible()
  })

  test('TC-04: should not register with username less than 2 characters', async ({
    page,
    registerPage,
  }) => {
    const invalidUsername = 'A'
    const { name, email, password } = generateRandomUser()

    await registerPage.register({
      name,
      username: invalidUsername,
      email,
      password,
    })

    await expect(page.getByTestId('error-text-username')).toBeVisible()
  })

  test('TC-05: should not register with empty email', async ({
    page,
    registerPage,
  }) => {
    const { name, username, password } = generateRandomUser()

    await registerPage.register({ name, username, email: '', password })

    await expect(page.getByTestId('error-text-email')).toBeVisible()
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

    await expect(page.getByTestId('error-text-email')).toBeVisible()
    page.close()
  })

  test('TC-07: should not register with password less than 8 characters', async ({
    page,
    registerPage,
  }) => {
    const { name, username, email } = generateRandomUser()
    const shortPassword = '2Wsx.'

    await registerPage.register({
      name,
      username,
      email,
      password: shortPassword,
    })

    await expect(page.getByTestId('error-text-password')).toBeVisible()
  })

  test('TC-08: should not register with password without an uppercase letter', async ({
    page,
    registerPage,
  }) => {
    const { name, username, email } = generateRandomUser()
    const noUppercasePassword = '2wsx.2wsx.'

    await registerPage.register({
      name,
      username,
      email,
      password: noUppercasePassword,
    })

    await expect(page.getByTestId('error-text-password')).toBeVisible()
  })

  test('TC-09: should not register with password without a lowercase letter', async ({
    page,
    registerPage,
  }) => {
    const { name, username, email } = generateRandomUser()
    const noLowercasePassword = '2WSX.2WSX.'

    await registerPage.register({
      name,
      username,
      email,
      password: noLowercasePassword,
    })

    await expect(page.getByTestId('error-text-password')).toBeVisible()
  })

  test('TC-10: should not register with password without a number', async ({
    page,
    registerPage,
  }) => {
    const { name, username, email } = generateRandomUser()
    const noNumberPassword = 'Password.'

    await registerPage.register({
      name,
      username,
      email,
      password: noNumberPassword,
    })

    await expect(page.getByTestId('error-text-password')).toBeVisible()
  })

  test('TC-11: should show error for incorrect username or password', async ({
    page,
    layoutPage,
  }) => {
    // You can log out and go to the login page
    await layoutPage.gotoLogin('kunsthalte')
    await page.waitForTimeout(100)
    await page.getByTestId('input-identifier').fill('warrongUser')
    await page.getByTestId('input-password').fill('warrongPassword')
    await page.getByTestId('button-submit-login').click()

    await expect(page.getByTestId('error-auth')).toBeVisible()

    page.close()
  })
})
