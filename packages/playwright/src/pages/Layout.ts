import { type Locator, type Page } from '@playwright/test'

import { Site, StrapiLocale } from '@fc/types'

import { getUrl } from '../utils'

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
  readonly site: Site
  readonly menu: {
    mobile: Record<keyof typeof headerLinks, Locator>
    desktop: Record<keyof typeof headerLinks, Locator>
    footer: Record<keyof typeof footerLinks, Locator>
  }
  readonly languageMenu: {
    en: Locator
    nl: Locator
    tr: Locator
  }
  readonly profileMenu: Locator
  readonly profileLink: Locator
  readonly logoutButton: Locator

  constructor(page: Page, site: Site) {
    this.page = page
    this.menu = {
      mobile: {
        arts: page.getByTestId(`link-m/club/arts`),
        collections: page.getByTestId(`link-m/club/collections`),
        activities: page.getByTestId(`link-m/activities`),
        about: page.getByTestId(`link-m/about`),
        contact: page.getByTestId(`link-m/contact`),
        donation: page.getByTestId(`link-m/donation`),
      },
      desktop: {
        arts: page.getByTestId(`link-d/club/arts`),
        collections: page.getByTestId(`link-d/club/collections`),
        activities: page.getByTestId(`link-d/activities`),
        about: page.getByTestId(`link-d/about`),
        contact: page.getByTestId(`link-d/contact`),
        donation: page.getByTestId(`link-d/donation`),
      },
      footer: {
        arts: page.getByTestId(`link-footer/club/arts`),
        collections: page.getByTestId(`link-footer/club/collections`),
        activities: page.getByTestId(`link-footer/activities`),
        about: page.getByTestId(`link-footer/about`),
        contact: page.getByTestId(`link-footer/contact`),
        donation: page.getByTestId(`link-footer/donation`),
        terms: page.getByTestId(`link-footer/terms`),
        privacy: page.getByTestId(`link-footer/privacy`),
      },
    }
    this.languageMenu = {
      en: page.getByLabel('en'),
      nl: page.getByLabel('nl'),
      tr: page.getByLabel('tr'),
    }
    this.profileMenu = page.getByTestId('button-d-profile-menu')
    this.profileLink = page.getByTestId('link-d-profile')
    this.logoutButton = page.getByTestId('button-d-logout')

    this.site = site
  }

  get url() {
    return getUrl(this.site)
  }

  async gotoHome() {
    await this.page.goto(this.url)
    await this.page.waitForLoadState('domcontentloaded')
  }

  async gotoLogin() {
    await this.page.goto(`${this.url}/auth/login?returnUrl=/`)
    await this.page.waitForLoadState('domcontentloaded')
  }

  async gotoProfilePage() {
    // Scroll to the top of the page to see the header
    await this.scrollToTop()
    await this.profileMenu.click()
    await this.profileLink.click()
    await this.page.waitForLoadState('domcontentloaded')
  }

  async logout() {
    // Scroll to the top of the page to see the header
    await this.scrollToTop()
    await this.profileMenu.click()
    await this.logoutButton.click()
    await this.page.waitForLoadState('domcontentloaded')
  }

  async switchLanguage(language: StrapiLocale) {
    await this.scrollToTop()
    await this.languageMenu[language].click()
    await this.page.waitForLoadState('domcontentloaded')
  }

  async gotoPage(page: keyof typeof headerLinks) {
    await this.scrollToTop()
    await this.menu.desktop[page].click()
    await this.page.waitForLoadState('domcontentloaded')
  }

  async scrollToTop() {
    await this.page.evaluate(() => {
      window.scrollTo(0, 0)
    })
    await this.page.waitForTimeout(1000)
  }
}
