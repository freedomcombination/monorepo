import { type Locator, type Page } from '@playwright/test'

import { Site } from '@fc/types'

import { getVercelUrl } from '../utils'

const headerLinks = {
  arts: '/club/arts',
  collections: '/club/collections',
  activities: '/activities',
  about: '/about-us',
  contact: '/contact',
  donation: '/donation',
} as const

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const footerLinks = {
  ...headerLinks,
  terms: '/terms',
  privacy: '/privacy',
} as const

export class LayoutPage {
  readonly page: Page
  readonly loginLink: Locator
  readonly site: Site
  readonly menu: {
    mobile: Record<keyof typeof headerLinks, Locator>
    desktop: Record<keyof typeof headerLinks, Locator>
    footer: Record<keyof typeof footerLinks, Locator>
  }
  readonly profileMenu: Locator
  readonly profileLink: Locator
  readonly logoutButton: Locator
  readonly homeLink: Locator

  constructor(page: Page, site: Site) {
    this.page = page
    this.menu = {
      mobile: {
        arts: page.getByTestId(`link-m-arts`),
        collections: page.getByTestId(`link-m-collections`),
        activities: page.getByTestId(`link-m-activities`),
        about: page.getByTestId(`link-m-about`),
        contact: page.getByTestId(`link-m-contact`),
        donation: page.getByTestId(`link-m-donation`),
      },
      desktop: {
        arts: page.getByTestId(`link-d-arts`),
        collections: page.getByTestId(`link-d-collections`),
        activities: page.getByTestId(`link-d-activities`),
        about: page.getByTestId(`link-d-about`),
        contact: page.getByTestId(`link-d-contact`),
        donation: page.getByTestId(`link-d-donation`),
      },
      footer: {
        arts: page.getByTestId(`link-footer-arts`),
        collections: page.getByTestId(`link-footer-collections`),
        activities: page.getByTestId(`link-footer-activities`),
        about: page.getByTestId(`link-footer-about`),
        contact: page.getByTestId(`link-footer-contact`),
        donation: page.getByTestId(`link-footer-donation`),
        terms: page.getByTestId(`link-footer-terms`),
        privacy: page.getByTestId(`link-footer-privacy`),
      },
    }
    this.loginLink = page.getByRole('link', { name: 'Sign in' })
    this.profileMenu = page.getByTestId('button-profile-menu')
    this.profileLink = page.getByTestId('link-profile')
    this.logoutButton = page.getByTestId('button-logout')
    this.homeLink = page.getByTestId('link-d-logo-home')

    this.site = site
  }

  get url() {
    return getVercelUrl(this.site)
  }

  async gotoHomePage() {
    await this.homeLink.click()
    await this.page.waitForLoadState('domcontentloaded')
  }

  async gotoLogin() {
    await this.loginLink.click()
    await this.page.waitForLoadState('domcontentloaded')
  }

  async gotoProfilePage() {
    await this.profileMenu.click()
    await this.profileLink.click()
    await this.page.waitForLoadState('domcontentloaded')
  }

  async logout() {
    await this.profileMenu.click()
    await this.logoutButton.click()
    await this.page.waitForLoadState('domcontentloaded')
  }
}
