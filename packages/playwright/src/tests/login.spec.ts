import { expect, test } from '@playwright/test'

import { Site } from '@fc/types'

import { TEST_TIMEOUT } from '../config'
import { PASSWORD, USERNAME } from '../constants'
import { HomePage, LoginPage } from '../pages'

const sitesWithLogin: Site[] = ['foundation', 'kunsthalte', 'trend-rights']

for (const site of sitesWithLogin) {
  test(`Login for ${site}`, async ({ page }) => {
    const homePage = new HomePage(page, site)
    const loginPage = new LoginPage(page)

    await page.goto(homePage.url, { waitUntil: 'domcontentloaded' })

    await homePage.gotoLogin()
    await loginPage.login(USERNAME, PASSWORD)

    // Timeout 10 secon
    await page.waitForURL(homePage.url, { timeout: TEST_TIMEOUT })
    await expect(page).toHaveURL(homePage.url)
  })
}
