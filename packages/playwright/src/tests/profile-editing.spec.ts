import { Page, expect, test } from '@playwright/test'

import { PASSWORD } from '../constants'
import { LoginPage } from '../pages'
import {
  addCookies,
  checkExternalLink,
  generateRandomUser,
  getVercelUrl,
} from '../utils'

const { username } = generateRandomUser()

const TEMP_USERNAME = 'temp'
const TEMP_PASSWORD = '1234567At'

// TODO: Move this function to LoginPage.ts page object
const login = async (page: Page, username: string, password: string) => {
  const loginPage = new LoginPage(page)

  // TODO: Add testid to the link
  await page.getByRole('link', { name: 'Sign in' }).click()
  await page.waitForLoadState('networkidle')
  await loginPage.login(username, password)
}

// TODO: Move this function to Layout.ts page object
const gotoProfile = async (page: Page) => {
  await page.getByTestId('button-profile-menu').first().click()
  await page.getByTestId('link-profile').first().click()
  await page.waitForLoadState('networkidle')
}

// TODO: Move this function to Layout.ts page object
const logout = async (page: Page) => {
  await page.getByTestId('button-profile-menu').first().click()
  await page.getByTestId('button-logout')?.first().click()
  await page.waitForLoadState('networkidle')
  await page.waitForSelector('[data-testid="button-profile-menu"]')
}

// TODO: Move this function to Profile.ts page object
const updatePassword = async (
  page: Page,
  currentPassword: string,
  newPassword: string,
) => {
  await page.getByTestId('input-currentPassword').fill(currentPassword)
  await page.getByTestId('input-password').fill(newPassword)
  await page.getByTestId('input-passwordConfirmation').fill(newPassword)
  // TODO: Add testid to the button
  await page.getByRole('button', { name: 'Change Password' }).click()
  await page.waitForLoadState('networkidle')
}

test.afterEach(async ({ page }) => {
  await page.close()
})

test.describe('Profile Editing Tests', () => {
  test('TC-01: should not update password with invalid input', async ({
    page,
    context,
  }) => {
    await addCookies(context, 'kunsthalte')
    await page.goto(getVercelUrl('kunsthalte'))

    await login(page, TEMP_USERNAME, PASSWORD)
    await gotoProfile(page)
    await page.getByTestId('tab-security').click()

    const INVALID_PASSWORD = '1'

    await updatePassword(page, PASSWORD, INVALID_PASSWORD)

    await expect(page.getByTestId('error-text-password')).toBeVisible()
  })

  // test('User adds social address, User can display new credentials', async ({
  test('TC-02: should update social address', async ({ page, context }) => {
    await addCookies(context, 'kunsthalte')
    await page.goto(getVercelUrl('kunsthalte'))

    await login(page, TEMP_USERNAME, PASSWORD)
    await gotoProfile(page)
    await page.getByTestId('tab-socials').click()

    // Use random username to prevent the save button being disabled
    const LINKEDIN_URL = 'https://www.linkedin.com/in/' + username

    await page.getByTestId('input-linkedin').fill(LINKEDIN_URL)
    // TODO: Add testid to the button
    await page.getByRole('button', { name: 'Save' }).click()
    await page.waitForLoadState('networkidle')

    // TODO: Add testid to the social links
    const socialLinkLocator = page
      .locator('.chakra-input__right-element a')
      .first()
    await checkExternalLink(socialLinkLocator, LINKEDIN_URL)
  })

  test('TC-03: should not add invalid social address', async ({
    page,
    context,
  }) => {
    await addCookies(context, 'kunsthalte')
    await page.goto(getVercelUrl('kunsthalte'))

    await login(page, TEMP_USERNAME, PASSWORD)
    await gotoProfile(page)
    await page.getByTestId('tab-socials').click()

    const INVALID_URL = 'invalid-url'
    await page.getByTestId('input-linkedin').fill(INVALID_URL)
    // TODO: Add testid to the button
    await page.getByRole('button', { name: 'Save' }).click()

    await expect(page.getByTestId('error-text-linkedin')).toBeVisible()
  })

  test('TC-04: should update password and display new credentials', async ({
    page,
    context,
  }) => {
    await addCookies(context, 'kunsthalte')
    const URL = getVercelUrl('kunsthalte')

    await page.goto(URL)

    await login(page, TEMP_USERNAME, PASSWORD)
    await gotoProfile(page)

    await page.getByTestId('tab-security').click()

    // TODO: Updating the authenticated user password is not recommended
    // Because it will affect the other tests when it fails or runs in parallel
    // So, use a secondary account to update the password
    await updatePassword(page, PASSWORD, TEMP_PASSWORD)

    await logout(page)

    // Login with the new password
    await login(page, TEMP_USERNAME, TEMP_PASSWORD)
    await expect(page).toHaveURL(URL)

    // Restore the password
    await gotoProfile(page)
    await page.getByTestId('tab-security').click()
    await updatePassword(page, TEMP_PASSWORD, PASSWORD)
  })
})
