import { type Locator, type Page } from '@playwright/test'

import { Site } from '@fc/types'

import { TEST_TIMEOUT } from '../config'
import { getVercelUrl } from '../utils'

export class HomePage {
  readonly page: Page
  readonly loginLink: Locator
  readonly site: Site
  readonly artsButton: Locator
  readonly userName: Locator
  readonly profile: Locator

  constructor(page: Page, site: Site) {
    this.page = page
    this.artsButton = page.getByRole('link', { name: 'Arts' }).first()
    this.loginLink = page.getByRole('link', { name: 'Sign in' })
    this.userName = page.getByText('Authenticated User').first()
    this.profile = page.getByText('Profile').first()

    this.site = site
  }

  get url() {
    return getVercelUrl(this.site)
  }

  async gotoLogin() {
    await this.loginLink.click({ timeout: TEST_TIMEOUT })
    // expect(this.page).toHaveURL(`${this.url}/auth/login?returnUrl=/`)
  }

  async gotoArtsPage() {
    await this.artsButton.click()
  }

  async gotoProfilePage() {
    await this.userName.click()
    await this.profile.click()
  }
}
