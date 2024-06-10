import { expect, test } from '@playwright/test'
import dotenv from 'dotenv'

import { AppSlug } from '@fc/types'

import { PASSWORD, USERNAME } from '../constants'
import { HomePage, LoginPage } from '../pages'

dotenv.config({ path: '.env.local' })

const projectsWithLogin: AppSlug[] = ['kunsthalte', 'foundation']

for (const project of projectsWithLogin) {
  test(`Login for ${project}`, async ({ page }) => {
    const homePage = new HomePage(page, project)
    const loginPage = new LoginPage(page)

    await page.goto(homePage.url, { waitUntil: 'domcontentloaded' })

    await homePage.gotoLogin()
    await loginPage.login(USERNAME, PASSWORD)

    // Timeout 10 seconds
    await page.waitForURL(homePage.url, { timeout: 10000 })
    await expect(page).toHaveURL(homePage.url)
  })
}
