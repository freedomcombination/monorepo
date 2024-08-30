import { faker } from '@faker-js/faker'
import { test, expect } from '@playwright/test'

import { RegisterPage } from './RegisterPage'
import { getVercelUrl } from '../utils'

// Function that generates random user information
function generateRandomUser() {
  const name = faker.person.firstName()
  const username = faker.internet.userName()
  const email = faker.internet.email()
  const password = '2Wsx.2Wsx.' // Sabit şifre

  return { name, username, email, password }
}

test('TC-0001 Happy flow', async ({ page }) => {
  const registerPage = new RegisterPage(page)
  const { name, username, email, password } = generateRandomUser()

  await registerPage.navigateToRegister()
  await registerPage.register({ name, username, email, password })

  await page.getByRole('button', { name }).click() // Click on the button named "name"
  await page.click('[data-testid*="button-logout"]') // Log out
  await page.waitForTimeout(1000)
})

test('TC-0002 Negative flow (Leave Email Field Blank)', async ({ page }) => {
  const registerPage = new RegisterPage(page)
  const { name, username, password } = generateRandomUser()

  await registerPage.navigateToRegister()
  await registerPage.register({ name, username, email: '', password }) // Leave email field blank

  await expect(page.getByText('email is a required field')).toBeVisible() // Error message checking
  await page.waitForTimeout(1000)
})

test('TC-0003 Negative flow (Invalid e-mail address)', async ({ page }) => {
  const registerPage = new RegisterPage(page)
  const { name, username, password } = generateRandomUser()

  await registerPage.navigateToRegister()
  await registerPage.register({
    name,
    username,
    email: 'invalid-email',
    password,
  }) // Invalid email

  await expect(page.getByText('email must be a valid email')).toBeVisible() // Error message checking
  await page.waitForTimeout(1000)
})

test('TC-0004 Negative flow (login with invalid information)', async ({
  page,
}) => {
  const registerPage = new RegisterPage(page)
  const { name, username, email, password } = generateRandomUser()

  await registerPage.navigateToRegister()
  await registerPage.register({ name, username, email, password })

  await page.goto(getVercelUrl('kunsthalte'))
  await page.click('button:has-text("TR")')

  await page.getByRole('link', { name: 'Giriş yap' }).click() // Go to login page

  await page.getByTestId('input-identifier').click()
  await page.getByTestId('input-identifier').fill(email) // Nonexistent email

  await page.getByTestId('input-password').click()
  await page.getByTestId('input-password').fill(password + 'aaa') // Invalid password

  await page.getByTestId('button-submit-login').click() // Click "Log in" button

  await expect(
    page.getByText('Kullanıcı adı veya şifre hatalı. Lütfen tekrar deneyiniz.'),
  ).toBeVisible() // Error message checking
  await page.waitForTimeout(1000)
  page.close()
})
