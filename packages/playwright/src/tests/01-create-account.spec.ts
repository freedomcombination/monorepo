import { faker } from '@faker-js/faker'
import { expect, test } from '@playwright/test'

import { RegisterPage } from './RegisterPage'

// Function that generates random user information
function generateRandomUser() {
  const name = faker.person.firstName()
  const username = faker.internet.userName()
  const email = faker.internet.email()
  const password = '2Wsx.2Wsx.' // Sabit şifre

  return { name, username, email, password }
}
test.describe('01.create-account ', () => {
  test('TC-01: should Happy flow ', async ({ page }) => {
    const registerPage = new RegisterPage(page)
    const { name, username, email, password } = generateRandomUser()

    await registerPage.navigateToRegister()
    await registerPage.register({ name, username, email, password })

    await page.getByRole('button', { name }).click() // Click on the button named "name"
    const buttonText = await page
      .getByTestId('button-m-profile-menu')
      .innerText()
    await expect(buttonText).toContain(name)
    await page.click('[data-testid="button-d-logout"]') // Log out
  })
})

test('TC-02: should Negative flow (Leave Email Field Blank)', async ({
  page,
}) => {
  const registerPage = new RegisterPage(page)
  const { name, username, password } = generateRandomUser()

  await registerPage.navigateToRegister()
  await registerPage.register({ name, username, email: '', password }) // Leave email field blank

  await expect(page.getByText('email is a required field')).toBeVisible() // Error message checking
})

test('TC-03: should Negative flow (Invalid e-mail address)', async ({
  page,
}) => {
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
})

test('TC-04: should Negative flow (login with invalid information)', async ({
  page,
}) => {
  const registerPage = new RegisterPage(page)
  const { name, username, email, password } = generateRandomUser()

  await registerPage.navigateToRegister()
  await registerPage.register({ name, username, email, password })

  // await page.goto(getVercelUrl('kunsthalte'))
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
})
test('TC-05: should Negative flow (Invalid name field)', async ({ page }) => {
  const registerPage = new RegisterPage(page)

  const invalidName = 'Jo1?!@' // 2. 'name' field with invalid characters (numbers, question marks and special characters)
  const { username, email, password } = generateRandomUser()

  await registerPage.navigateToRegister()
  await registerPage.register({
    name: invalidName,
    username,
    email,
    password,
  }) // Invalid 'name' field

  await expect(
    page.getByText('Only alphabetic characters allowed'),
  ).toBeVisible() // Error message checking
})
test('TC-06: should Negative flow (Name field with less than 3 characters)', async ({
  page,
}) => {
  const registerPage = new RegisterPage(page)

  const shortName = 'Jo' // 'name' field with less than 3 characters
  const { username, email, password } = generateRandomUser()

  await registerPage.navigateToRegister()
  await registerPage.register({
    name: shortName,
    username,
    email,
    password,
  }) // 'name' field with less than 3 characters

  await expect(
    page.getByText('Name must be at least 3 characters'),
  ).toBeVisible() // Error message checking

  page.close()
})
