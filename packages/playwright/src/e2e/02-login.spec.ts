import { expect } from '@playwright/test'

import type { Site } from '@fc/types'

import { TEST_TIMEOUT } from '../config'
import { test } from '../fixtures'
import { addCookies, getUrl } from '../utils'

const sitesWithLogin: Site[] = [
  'foundation',
  'kunsthalte',
  'trend-rights',
  'dashboard',
]

test.describe('02. Login', () => {
  sitesWithLogin.forEach(async (site, index) => {
    test(`TC-0${index + 1}: Login for ${site}`, async ({
      page,
      layoutPage,
      loginPage,
      context,
    }) => {
      await addCookies(context, site)

      await layoutPage.gotoHome(site)

      if (site === 'dashboard') {
        await loginPage.loginDashboard()
      } else {
        await layoutPage.gotoLogin(site)
        await loginPage.login()
        // Timeout 10 seconds
        const url = getUrl(site)
        await page.waitForURL(url, { timeout: TEST_TIMEOUT })
        await expect(page).toHaveURL(url)
      }
    })
  })
})
