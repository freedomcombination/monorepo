import { expect, test } from '@playwright/test'

import { Site } from '@fc/types'

import { TEST_TIMEOUT } from '../config'
import { ADMIN_USERNAME, PASSWORD, USERNAME } from '../constants'
import { HomePage, LoginPage } from '../pages'

const sitesWithLogin: Site[] = [
  'foundation',
  'kunsthalte',
  'trend-rights',
  'dashboard',
]

for (const site of sitesWithLogin) {
  test(`Login for ${site}`, async ({ page, context }) => {
    const homePage = new HomePage(page, site)
    const loginPage = new LoginPage(page)

    // Prevent showing the cookie banner
    // TODO: Write a test to accept the cookie banner
    await context.addCookies([
      { name: '__CB-ALLOWED', value: 'true', url: homePage.url },
    ])

    await page.goto(homePage.url, { waitUntil: 'domcontentloaded' })

    if (site === 'dashboard') {
      await loginPage.loginDashboard(ADMIN_USERNAME, PASSWORD)
    } else {
      await homePage.gotoLogin()
      await loginPage.login(USERNAME, PASSWORD)
      // Timeout 10 seconds
      await page.waitForURL(homePage.url, { timeout: TEST_TIMEOUT })
      await expect(page).toHaveURL(homePage.url)
    }
  })
}
