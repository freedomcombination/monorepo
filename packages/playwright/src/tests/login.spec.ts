import { expect, test } from '@playwright/test'

import { CookieKey, Site } from '@fc/types'

import { TEST_TIMEOUT } from '../config'
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
      {
        name: CookieKey.COOKIE_BANNER_ALLOWED,
        value: 'true',
        url: homePage.url,
      },
      {
        name: CookieKey.PUSH_NOTIFICATIONS_SUBSCRIBED,
        value: 'true',
        url: homePage.url,
      },
    ])

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
}
