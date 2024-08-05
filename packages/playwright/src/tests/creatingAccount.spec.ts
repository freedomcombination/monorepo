import { test, expect } from '@playwright/test'

// A function to generate random numbers
function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

// A function to generate random usernames and email addresses
function generateRandomUser() {
  const randomNumber = getRandomInt(10000) // Generates a random number between 0 and 9999
  const randomUser = `filizbudak${randomNumber}`
  const randomEmail = `${randomUser}@gmail.com`

  return { randomUser, randomEmail }
}
const { randomUser, randomEmail } = generateRandomUser()

test('TC-0001 Happy flow', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 })
  await page.goto('https://kunsthalte.vercel.app/tr')
  await page.getByRole('link', { name: 'Giriş yap' }).click() // 01.. The user clicks the "log in" button on the "Kunsthalte" page.
  await page.getByRole('link', { name: 'Kayıt ol' }).click() // 02.. The user clicks on the "Register" link on the page that opens.
  await page.getByPlaceholder('İsim').click()
  await page.getByPlaceholder('İsim').fill('Filiz') // 03. The user enters the "name" text box.
  await page.getByPlaceholder('Kullanıcı Adı').click()
  await page.getByPlaceholder('Kullanıcı Adı').fill(randomUser) // 04. User enters a random name in the "Username" text box.
  await page.getByPlaceholder('E-posta').click()
  await page.getByPlaceholder('E-posta').fill(randomEmail) // 05. User enters a random email in the "Email" text box.
  await page.getByPlaceholder('Parola').click()
  await page.getByPlaceholder('Parola').fill('2Wsx.2Wsx.') // 06. User enters their password in the "Password" text box.
  await page.getByRole('button', { name: 'Hesap oluştur' }).click() // 07. User clicks on "Create Account" button

  await page.getByRole('button', { name: 'Filiz' }).click() // 08. The user clicks on the button named "Filiz" on the page.
  await page.getByRole('menuitem', { name: 'Çıkış yap' }).click() // 09. User clicks on the "Log out" button.

  await page.waitForTimeout(1000)
})

test('TC-0002 Negative flow (Leave Email Field Blank)', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 })
  await page.goto('https://kunsthalte.vercel.app/tr')
  await page.getByRole('link', { name: 'Giriş yap' }).click() // 01. The user clicks the "log in" button on the "Kunsthalte" page.
  await page.getByRole('link', { name: 'Kayıt ol' }).click() // 02. The user clicks on the "Register" link on the page that opens.
  await page.getByPlaceholder('İsim').click()
  await page.getByPlaceholder('İsim').fill('Test') // 03. The user enters the "name" text box.
  await page.getByPlaceholder('Kullanıcı Adı').click()
  await page.getByPlaceholder('Kullanıcı Adı').fill('testuser') // 04. User enters a random name in the "Username" text box.
  await page.getByPlaceholder('E-posta').click()
  await page.getByPlaceholder('E-posta').fill('') // 05. User leaves the "Email" text box blank.
  await page.getByPlaceholder('Parola').click()
  await page.getByPlaceholder('Parola').fill('2Wsx.2Wsx.') // 06. User enters their password in the "Password" text box.
  await page.getByRole('button', { name: 'Hesap oluştur' }).click()
  await expect(page.getByText('email is a required field')).toBeVisible() // Error message checking
  await page.waitForTimeout(1000)
})

test('TC-0003 Negative flow (Invalid e-mail address)', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 })
  await page.goto('https://kunsthalte.vercel.app/tr')
  await page.getByRole('link', { name: 'Giriş yap' }).click() // 01. The user clicks the "log in" button on the "Kunsthalte" page.
  await page.getByRole('link', { name: 'Kayıt ol' }).click() // 02. The user clicks on the "Register" link on the page that opens.
  await page.getByPlaceholder('İsim').click()
  await page.getByPlaceholder('İsim').fill('Test') // 03. The user enters the "name" text box.
  await page.getByPlaceholder('Kullanıcı Adı').click()
  await page.getByPlaceholder('Kullanıcı Adı').fill('testuser') // 04. User enters a random name in the "Username" text box.
  await page.getByPlaceholder('E-posta').click()
  await page.getByPlaceholder('E-posta').fill('invalid-email') // 05. User enters invalid email in the "Email" text box.
  await page.getByPlaceholder('Parola').click()
  await page.getByPlaceholder('Parola').fill('2Wsx.2Wsx.') // 06. User enters their password in the "Password" text box.
  await page.getByRole('button', { name: 'Hesap oluştur' }).click() // 07. User clicks on "Create Account" button
  await expect(page.getByText('email must be a valid email')).toBeVisible() // Error message checking
  await page.waitForTimeout(1000)
})

test('TC-0004 Negative flow (login with invalid information)', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 1080 })
  await page.goto('https://kunsthalte.vercel.app/tr')
  await page.getByRole('link', { name: 'Giriş yap' }).click() // 01. The user clicks the "log in" button on the "Kunsthalte" page.
  await page.getByTestId('input-email').click()
  await page.getByTestId('input-email').fill('nonexistentuser@gmail.com') // 02. User enters a nonexistent email.
  await page.getByTestId('input-password').click()
  await page.getByTestId('input-password').fill('wrongpassword') // 03. User enters an invalid password.
  await page.getByTestId('button-submit-login').click() // 04. User clicks on the "Log in" button.
  await expect(
    page.getByText('Kullanıcı adı veya şifre hatalı. Lütfen tekrar deneyiniz.'),
  ).toBeVisible() // Error message checking
  await page.waitForTimeout(1000)
  page.close()
})
