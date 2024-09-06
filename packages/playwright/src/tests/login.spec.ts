import { expect, test } from '@playwright/test'

import { Site } from '@fc/types'

import { TEST_TIMEOUT } from '../config'
import { HomePage, LoginPage } from '../pages'
import { addCookies } from '../utils'

const sitesWithLogin: Site[] = [
  'foundation',
  'kunsthalte',
  'trend-rights',
  'dashboard',
]

test.describe('Login', () => {
  sitesWithLogin.forEach(async (site, index) => {
    test(`TC-0${index + 1}: Login for ${site}`, async ({ page, context }) => {
      const homePage = new HomePage(page, site)
      const loginPage = new LoginPage(page)

      await addCookies(context, site)

      await page.goto(homePage.url, { waitUntil: 'domcontentloaded' })

      if (site === 'dashboard') {
        await loginPage.loginDashboard()
      } else {
        await homePage.gotoLogin()
        await loginPage.login()
        // Timeout 10 seconds
        await page.waitForURL(homePage.url, { timeout: TEST_TIMEOUT })
        await expect(page).toHaveURL(homePage.url)
      }
    })
  })
})
