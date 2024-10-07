import { expect } from '@playwright/test'

import { PASSWORD, USERNAME } from '../constants'
import { test } from '../fixtures'
import {
  addCookies,
  checkExternalLink,
  generateRandomUser,
  getUrl,
} from '../utils'

const { username } = generateRandomUser()

const TEMP_USERNAME = 'temp'
const TEMP_PASSWORD = '1234567At'

test.afterEach(async ({ page }) => {
  await page.close()
})

test.describe('06. Profile Editing Tests', () => {
  test('TC-01: should not update password with invalid input', async ({
    page,
    context,
    layoutPage,
    loginPage,
    profilePage,
  }) => {
    await addCookies(context, 'kunsthalte')
    await layoutPage.gotoHome('kunsthalte')

    await layoutPage.gotoLogin('kunsthalte')
    await loginPage.login(USERNAME, PASSWORD)
    await layoutPage.gotoProfilePage()

    await page.getByTestId('tab-security').click()

    const INVALID_PASSWORD = '1'

    await profilePage.updatePassword(PASSWORD, INVALID_PASSWORD)

    await expect(page.getByTestId('error-text-password')).toBeVisible()
  })

  // test('User adds social address, User can display new credentials', async ({
  test('TC-02: should update social address', async ({
    page,
    context,
    layoutPage,
    loginPage,
  }) => {
    await addCookies(context, 'kunsthalte')
    await layoutPage.gotoHome('kunsthalte')

    await layoutPage.gotoLogin('kunsthalte')
    await loginPage.login(USERNAME, PASSWORD)
    await layoutPage.gotoProfilePage()
    await page.getByTestId('tab-socials').click()

    // Use random username to prevent the save button being disabled
    const LINKEDIN_URL = 'https://www.linkedin.com/in/' + username

    await page.getByTestId('input-linkedin').fill(LINKEDIN_URL)
    await page.getByTestId('button-save-socials').click()

    const linkedinLinkLocator = page.getByTestId('link-social-linkedin')
    await checkExternalLink(linkedinLinkLocator, LINKEDIN_URL)
  })

  test('TC-03: should not add invalid social address', async ({
    page,
    context,
    layoutPage,
    loginPage,
  }) => {
    await addCookies(context, 'kunsthalte')
    await layoutPage.gotoHome('kunsthalte')

    await layoutPage.gotoLogin('kunsthalte')
    await loginPage.login(USERNAME, PASSWORD)
    await layoutPage.gotoProfilePage()
    await page.getByTestId('tab-socials').click()

    const INVALID_URL = 'invalid-url'
    await page.getByTestId('input-linkedin').fill(INVALID_URL)
    await page.getByTestId('button-save-socials').click()

    await expect(page.getByTestId('error-text-linkedin')).toBeVisible()
  })

  test('TC-04: should update password and display new credentials', async ({
    page,
    context,
    layoutPage,
    loginPage,
    profilePage,
  }) => {
    await addCookies(context, 'kunsthalte')

    await layoutPage.gotoHome('kunsthalte')
    await layoutPage.gotoLogin('kunsthalte')
    await loginPage.login(TEMP_USERNAME, PASSWORD)
    await layoutPage.gotoProfilePage()

    await page.getByTestId('tab-security').click()

    // TODO: Remove after fixing update password
    test.skip()

    // NOTE: Updating the authenticated user password is not recommended
    // Because it will affect the other tests when it fails or runs in parallel
    // So, use a secondary account to update the password
    await profilePage.updatePassword(PASSWORD, TEMP_PASSWORD)
    // TODO: Add assertion for success toast

    await layoutPage.logout()

    // Login with the new password
    await layoutPage.gotoLogin('kunsthalte')
    await loginPage.login(TEMP_USERNAME, TEMP_PASSWORD)

    const URL = getUrl('kunsthalte')
    await expect(page).toHaveURL(URL)

    // Restore the password
    await layoutPage.gotoProfilePage()

    await profilePage.tabs.security.click()
    await profilePage.updatePassword(TEMP_PASSWORD, PASSWORD)
  })

  test('TC-05: Password Update Requirements Not Enforced in Profile Editing', async ({
    page,
    context,
    layoutPage,
    loginPage,
    profilePage,
  }) => {
    await addCookies(context, 'kunsthalte')
    await layoutPage.gotoHome('kunsthalte')

    // should not update password without symbol
    await layoutPage.gotoLogin('kunsthalte')
    await loginPage.login(USERNAME, PASSWORD)
    await layoutPage.gotoProfilePage()

    await page.getByTestId('tab-security').click()

    const nonSymbolPassword = 'Test1234'

    await profilePage.updatePassword(PASSWORD, nonSymbolPassword)

    await expect(page.getByTestId('error-text-password')).toBeVisible()

    // should not update password without uppercase
    await page.getByTestId('tab-security').click()

    const noUppercasePassword = 'test?123'

    await profilePage.updatePassword(PASSWORD, noUppercasePassword)

    await expect(page.getByTestId('error-text-password')).toBeVisible()

    // should not update password without lowercase
    await page.getByTestId('tab-security').click()

    const noLowercasePassword = 'TEST?123'

    await profilePage.updatePassword(PASSWORD, noLowercasePassword)

    await expect(page.getByTestId('error-text-password')).toBeVisible()

    // should not update password without numbers
    await page.getByTestId('tab-security').click()

    const noNumbersPassword = 'Test?Test'

    await profilePage.updatePassword(PASSWORD, noNumbersPassword)

    await expect(page.getByTestId('error-text-password')).toBeVisible() 
  })
})