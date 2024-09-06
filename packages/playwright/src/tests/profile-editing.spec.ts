import { expect, test } from '@playwright/test'

import { getVercelUrl } from '../utils'

// A function to generate random numbers
function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

// A function to generate random usernames and email addresses
function generateRandomUser() {
  const randomNumber = getRandomInt(10000) // Generates a random number between 0 and 9999
  const randomUser = `testuser${randomNumber}`
  const randomEmail = `${randomUser}@gmail.com`

  return { randomUser, randomEmail }
}
const { randomUser, randomEmail } = generateRandomUser()

test.describe('Profile Editing Tests', () => {
  test('User updates password, User can display new credentials', async ({
    page,
  }) => {
    await page.goto(getVercelUrl('kunsthalte'))
    await page.getByRole('button', { name: 'EN' }).click()
    await page.getByRole('link', { name: 'Sign in' }).click()
    await page.getByRole('link', { name: 'Sign up' }).click()
    await page.getByPlaceholder('Name', { exact: true }).click()
    await page.getByPlaceholder('Name', { exact: true }).fill('TestUser')
    await page.getByPlaceholder('Username').click()
    await page.getByPlaceholder('Username').fill(randomUser)
    await page.getByPlaceholder('E-mail').click()
    await page.getByPlaceholder('E-mail').fill(randomEmail)
    await page.getByPlaceholder('Password').click()
    await page.getByPlaceholder('Password').fill('Test?123')
    await page.getByRole('button', { name: 'Create Account' }).click()
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.getByRole('button', { name: 'TestUser' }).click()
    await page.getByRole('menuitem', { name: 'Profile' }).click()
    await page.getByTestId('tab-security').click()
    await page.getByPlaceholder('currentPassword').click()
    await page.getByPlaceholder('currentPassword').fill('Test?123')
    await page.getByPlaceholder('Password', { exact: true }).click()
    await page.getByPlaceholder('Password', { exact: true }).fill('1234567At')
    await page.getByPlaceholder('passwordConfirmation').click()
    await page.getByPlaceholder('passwordConfirmation').fill('1234567At')
    await page.getByRole('button', { name: 'Change Password' }).click()
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.getByRole('button', { name: 'TestUser' }).click()
    await page.getByRole('menuitem', { name: 'Sign Out' }).click()
    await page.getByRole('link', { name: 'Sign in' }).click()
    await page.getByTestId('input-identifier').click()
    await page.getByTestId('input-identifier').fill(randomEmail)
    await page.getByTestId('input-password').click()
    await page.getByTestId('input-password').fill('1234567At')
    await page.getByTestId('button-submit-login').click()
    await expect(page).toHaveURL('https://kunsthalte.vercel.app/')
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.getByRole('button', { name: 'TestUser' }).click()
    await page.getByRole('menuitem', { name: 'Sign Out' }).click()
    await page.waitForTimeout(1000)
  })

  test('User cannot update password with invalid input', async ({ page }) => {
    await page.goto(getVercelUrl('kunsthalte'))
    await page.getByRole('button', { name: 'EN' }).click()
    await page.getByRole('link', { name: 'Sign in' }).click()
    await page.getByTestId('input-identifier').click()
    await page.getByTestId('input-identifier').fill(randomEmail)
    await page.getByTestId('input-password').click()
    await page.getByTestId('input-password').fill('1234567At')
    await page.getByTestId('button-submit-login').click()
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(1000)
    await page.getByRole('button', { name: 'TestUser' }).click()
    await page.getByRole('menuitem', { name: 'Profile' }).click()
    await page.getByTestId('tab-security').click()
    await page.getByPlaceholder('currentPassword').click()
    await page.getByPlaceholder('currentPassword').fill('1234567At')
    await page.getByPlaceholder('Password', { exact: true }).click()
    await page.getByPlaceholder('Password', { exact: true }).fill('1')
    await page.getByPlaceholder('passwordConfirmation').click()
    await page.getByPlaceholder('passwordConfirmation').fill('1')
    await page.getByRole('button', { name: 'Change Password' }).click()
    await expect(page.getByText('At least 8 characters long')).toBeVisible()
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.getByRole('button', { name: 'TestUser' }).click()
    await page.getByRole('menuitem', { name: 'Sign Out' }).click()
    await page.waitForTimeout(1000)
  })

  test('User adds social address, User can display new credentials', async ({
    page,
  }) => {
    await page.goto(getVercelUrl('kunsthalte'))
    await page.getByRole('link', { name: 'Sign in' }).click()
    await page.getByTestId('input-identifier').click()
    await page.getByTestId('input-identifier').fill(randomEmail)
    await page.getByTestId('input-password').click()
    await page.getByTestId('input-password').fill('1234567At')
    await page.getByTestId('button-submit-login').click()
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.getByRole('button', { name: 'TestUser' }).click()
    await page.getByRole('menuitem', { name: 'Profile' }).click()
    await page.getByTestId('tab-socials').click()
    await page.getByPlaceholder('linkedin').click()
    await page
      .getByPlaceholder('linkedin')
      .fill('https://www.linkedin.com/in/williamhgates/')
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight)
    })
    await page.getByRole('button', { name: 'Save' }).click()
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.getByRole('button', { name: 'TestUser' }).click()
    await page.getByRole('menuitem', { name: 'Sign Out' }).click()
    await page.getByRole('link', { name: 'Sign in' }).click()
    await page.getByTestId('input-identifier').click()
    await page.getByTestId('input-identifier').fill(randomEmail)
    await page.getByTestId('input-password').click()
    await page.getByTestId('input-password').fill('1234567At')
    await page.getByTestId('button-submit-login').click()
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.getByRole('button', { name: 'TestUser' }).click()
    await page.getByRole('menuitem', { name: 'Profile' }).click()
    const sosyalLinkLocater = page.getByText('https://www.linkedin.com/in/')
    const href = await sosyalLinkLocater.getAttribute('href')
    expect(href).toBe('https://www.linkedin.com/in/')
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.getByRole('button', { name: 'TestUser' }).click()
    await page.getByRole('menuitem', { name: 'Sign Out' }).click()
    await page.waitForTimeout(1000)
  })

  test('User cannot add invalid social address', async ({ page }) => {
    await page.goto(getVercelUrl('kunsthalte'))
    await page.getByRole('button', { name: 'EN' }).click()
    await page.getByRole('link', { name: 'Sign in' }).click()
    await page.getByTestId('input-identifier').click()
    await page.getByTestId('input-identifier').fill(randomEmail)
    await page.getByTestId('input-password').click()
    await page.getByTestId('input-password').fill('1234567At')
    await page.getByTestId('button-submit-login').click()
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.getByRole('button', { name: 'TestUser' }).click()
    await page.getByRole('menuitem', { name: 'Profile' }).click()
    await page.getByTestId('tab-socials').click()
    await page.getByPlaceholder('linkedin').click()
    await page.waitForTimeout(1000)
    await page.getByPlaceholder('linkedin').fill('123')
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight)
    })
    await page.getByRole('button', { name: 'Save' }).click()
    await expect(page.getByText('linkedin must be a valid URL')).toBeVisible()
    await page.waitForTimeout(1000)
    page.close()
  })
})
