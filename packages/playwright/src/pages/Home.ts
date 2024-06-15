import { expect, type Locator, type Page } from '@playwright/test'

import { AppSlug } from '@fc/types'

import { TEST_TIMEOUT } from '../config'
import { getVercelUrl } from '../utils'

export class HomePage {
  readonly page: Page
  readonly loginLink: Locator
  readonly project: AppSlug

  constructor(page: Page, project: AppSlug) {
    this.page = page
    this.loginLink = page.getByRole('link', { name: 'Sign in' })
    this.project = project
  }

  get url() {
    return getVercelUrl(this.project)
  }

  async gotoLogin() {
    await this.loginLink.click({ timeout: TEST_TIMEOUT })
    expect(this.page).toHaveURL(`${this.url}/auth/login?returnUrl=/`)
  }
}
