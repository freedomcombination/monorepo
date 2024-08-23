import { type Locator, type Page } from '@playwright/test'

export class ProfilePage {
  readonly page: Page
  readonly artsMenuTab: Locator
  readonly pendingArtsTab: Locator
  readonly approvedArtsTab: Locator
  readonly rejectedArtsTab: Locator
  readonly firstArtImage: Locator

  constructor(page: Page) {
    this.page = page
    this.artsMenuTab = page.getByTestId('tab-arts').last()
    this.pendingArtsTab = page.getByTestId('tab-pending')
    this.approvedArtsTab = page.getByTestId('tab-approved')
    this.rejectedArtsTab = page.getByTestId('tab-rejected')
    this.firstArtImage = page.locator('.art-image').first()
  }

  async clickArtsMenu() {
    await this.artsMenuTab.click()
  }

  async clickPendingArtsMenu() {
    await this.pendingArtsTab.click()
  }

  async clickapprovedArtsMenu() {
    await this.approvedArtsTab.click()
  }

  async clickRejectedArtsMenu() {
    await this.rejectedArtsTab.click()
  }
}
