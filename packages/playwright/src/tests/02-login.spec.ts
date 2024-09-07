import { expect, test } from '@playwright/test'

import { Site } from '@fc/types'

import { TEST_TIMEOUT } from '../config'
import { LayoutPage, LoginPage } from '../pages'
import { addCookies } from '../utils'

const sitesWithLogin: Site[] = [
  'foundation',
  'kunsthalte',
  'trend-rights',
  'dashboard',
]

test.describe('02. Login', () => {
  sitesWithLogin.forEach(async (site, index) => {
    test(`TC-0${index + 1}: Login for ${site}`, async ({ page, context }) => {
      const layoutPage = new LayoutPage(page, site)
      const loginPage = new LoginPage(page)

      await addCookies(context, site)

      await layoutPage.gotoHome()

      if (site === 'dashboard') {
        await loginPage.loginDashboard()
      } else {
        await layoutPage.gotoLogin()
        await loginPage.login()
        // Timeout 10 seconds
        await page.waitForURL(layoutPage.url, { timeout: TEST_TIMEOUT })
        await expect(page).toHaveURL(layoutPage.url)
      }
    })
  })
})
