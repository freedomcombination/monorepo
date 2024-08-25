import { faker } from '@faker-js/faker'
import { test, expect } from '@playwright/test'

import { RegisterPage } from './RegisterPage'

// Rastgele kullanıcı bilgileri üreten fonksiyon
function generateRandomUser() {
  const name = faker.person.firstName()
  const username = faker.internet.userName()
  const email = faker.internet.email()
  const password = '2Wsx.2Wsx.' // Sabit şifre

  return { name, username, email, password }
}

// TC-0001 Happy Flow
test('TC-0001 Happy flow', async ({ page }) => {
  const registerPage = new RegisterPage(page)
  const { name, username, email, password } = generateRandomUser()

  await registerPage.navigateToRegister()
  await registerPage.register({ name, username, email, password })

  await page.getByRole('button', { name }).click() // Click on the button named "name"
  await page.click('[id*="menu-list-"]') // Log out
  await page.waitForTimeout(1000)
})

// TC-0002 Negative Flow (Leave Email Field Blank)
test('TC-0002 Negative flow (Leave Email Field Blank)', async ({ page }) => {
  const registerPage = new RegisterPage(page)
  const { name, username, password } = generateRandomUser()

  await registerPage.navigateToRegister()
  await registerPage.register({ name, username, email: '', password }) // Leave email field blank

  await expect(page.getByText('email is a required field')).toBeVisible() // Error message checking
  await page.waitForTimeout(1000)
})

// TC-0003 Negative Flow (Invalid e-mail address)
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

// TC-0004 Negative Flow (login with invalid information)
test('TC-0004 Negative flow (login with invalid information)', async ({
  page,
}) => {
  const registerPage = new RegisterPage(page)
  const { name, username, email, password } = generateRandomUser()

  await registerPage.navigateToRegister()
  await registerPage.register({ name, username, email, password })

  await page.setViewportSize({ width: 1920, height: 1080 })
  await page.goto('https://kunsthalte.vercel.app/tr')

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
