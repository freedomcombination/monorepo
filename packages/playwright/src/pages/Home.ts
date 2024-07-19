import { expect, type Locator, type Page } from '@playwright/test'

import { Site } from '@fc/types'

import { TEST_TIMEOUT } from '../config'
import { getVercelUrl } from '../utils'

export class HomePage {
  readonly page: Page
  readonly loginLink: Locator
  readonly site: Site
  readonly ArtsButton: Locator

  constructor(page: Page, site: Site) {
    this.page = page
    this.ArtsButton = page.getByRole('link', { name: 'Arts' }).first()
    this.loginLink = page.getByRole('link', { name: 'Sign in' })
    this.site = site
  }

  get url() {
    return getVercelUrl(this.site)
  }

  async gotoLogin() {
    await this.loginLink.click({ timeout: TEST_TIMEOUT })
    expect(this.page).toHaveURL(`${this.url}/auth/login?returnUrl=/`)
  }
  async clickArtsMenu() {
    await this.ArtsButton.click()
  }
}
