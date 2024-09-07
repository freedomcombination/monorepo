import { expect, test } from '@playwright/test'

import { PASSWORD } from '../constants'
import { LayoutPage, LoginPage, ProfilePage } from '../pages'
import {
  addCookies,
  checkExternalLink,
  generateRandomUser,
  getVercelUrl,
} from '../utils'

const { username } = generateRandomUser()

const TEMP_USERNAME = 'temp'
const TEMP_PASSWORD = '1234567At'

test.afterEach(async ({ page }) => {
  await page.close()
})

test.describe('Profile Editing Tests', () => {
  test('TC-01: should not update password with invalid input', async ({
    page,
    context,
  }) => {
    const layoutPage = new LayoutPage(page, 'kunsthalte')
    const loginPage = new LoginPage(page)
    const profilePage = new ProfilePage(page)

    await addCookies(context, 'kunsthalte')
    await layoutPage.gotoHomePage()

    await layoutPage.gotoLogin()
    await loginPage.login(TEMP_USERNAME, PASSWORD)
    await layoutPage.gotoProfilePage()

    await page.getByTestId('tab-security').click()

    const INVALID_PASSWORD = '1'

    await profilePage.updatePassword(PASSWORD, INVALID_PASSWORD)

    await expect(page.getByTestId('error-text-password')).toBeVisible()
  })

  // test('User adds social address, User can display new credentials', async ({
  test('TC-02: should update social address', async ({ page, context }) => {
    const layoutPage = new LayoutPage(page, 'kunsthalte')
    const loginPage = new LoginPage(page)

    await addCookies(context, 'kunsthalte')
    await layoutPage.gotoHomePage()

    await layoutPage.gotoLogin()
    await loginPage.login(TEMP_USERNAME, PASSWORD)
    await layoutPage.gotoProfilePage()
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
    const layoutPage = new LayoutPage(page, 'kunsthalte')
    const loginPage = new LoginPage(page)

    await addCookies(context, 'kunsthalte')
    await layoutPage.gotoHomePage()

    await layoutPage.gotoLogin()
    await loginPage.login(TEMP_USERNAME, PASSWORD)
    await layoutPage.gotoProfilePage()
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
    const layoutPage = new LayoutPage(page, 'kunsthalte')
    const loginPage = new LoginPage(page)
    const profilePage = new ProfilePage(page)

    await addCookies(context, 'kunsthalte')

    await layoutPage.gotoHomePage()
    await layoutPage.gotoLogin()
    await loginPage.login(TEMP_USERNAME, PASSWORD)
    await layoutPage.gotoProfilePage()

    await page.getByTestId('tab-security').click()

    // NOTE: Updating the authenticated user password is not recommended
    // Because it will affect the other tests when it fails or runs in parallel
    // So, use a secondary account to update the password
    await profilePage.updatePassword(PASSWORD, TEMP_PASSWORD)

    await layoutPage.logout()

    // Login with the new password
    await layoutPage.gotoLogin()
    await loginPage.login(TEMP_USERNAME, TEMP_PASSWORD)

    const URL = getVercelUrl('kunsthalte')
    await expect(page).toHaveURL(URL)

    // Restore the password
    await layoutPage.gotoProfilePage()
    await page.getByTestId('tab-security').click()
    await profilePage.updatePassword(TEMP_PASSWORD, PASSWORD)
  })
})
