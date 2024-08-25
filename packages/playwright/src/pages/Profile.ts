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

  async openArtsTab() {
    await this.artsMenuTab.click()
    await this.page.waitForTimeout(1000)
  }

  async openPendingArtsTab() {
    await this.pendingArtsTab.click()
    await this.page.waitForTimeout(1000)
  }

  async openApprovedArtsTab() {
    await this.approvedArtsTab.click()
    await this.page.waitForTimeout(1000)
  }

  async openRejectedArtsTab() {
    await this.rejectedArtsTab.click()
    await this.page.waitForTimeout(1000)
  }
}
