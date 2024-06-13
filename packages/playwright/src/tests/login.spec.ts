import { expect, test } from '@playwright/test'

import { AppSlug } from '@fc/types'

import { TEST_TIMEOUT } from '../config'
import { PASSWORD, USERNAME } from '../constants'
import { HomePage, LoginPage } from '../pages'

const projectsWithLogin: AppSlug[] = [
  'foundation',
  'kunsthalte',
  'trend-rights',
]

for (const project of projectsWithLogin) {
  test(`Login for ${project}`, async ({ page }) => {
    const homePage = new HomePage(page, project)
    const loginPage = new LoginPage(page)

    await page.goto(homePage.url, { waitUntil: 'domcontentloaded' })

    await homePage.gotoLogin()
    await loginPage.login(USERNAME, PASSWORD)

    // Timeout 10 seconds
    await page.waitForURL(homePage.url, { timeout: TEST_TIMEOUT })
    await expect(page).toHaveURL(homePage.url)
  })
}
