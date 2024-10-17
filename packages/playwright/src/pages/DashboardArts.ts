import { type Locator, type Page } from '@playwright/test'

import { getUrl } from '../utils'

export class DashboardArtsPage {
  readonly page: Page
  readonly artsMenuItem: Locator
  readonly pendingArtsLink: Locator
  readonly approvedArtsLink: Locator
  readonly feedbackInput: Locator
  readonly approveButton: Locator
  readonly confirmApproveButton: Locator
  readonly rejectButton: Locator
  readonly rejectedArtsMenu: Locator
  readonly artStatusTag: Locator

  constructor(page: Page) {
    this.page = page

    this.artsMenuItem = page.getByTestId('arts')
    this.approvedArtsLink = page.getByTestId('approved-arts')
    this.pendingArtsLink = page.getByTestId('pending-arts')
    this.rejectedArtsMenu = page.getByTestId('rejected-arts')

    this.feedbackInput = page.getByTestId('input-feedback')

    this.approveButton = page.getByTestId('button-approve')
    this.confirmApproveButton = page.getByTestId('button-confirm')
    this.rejectButton = page.getByTestId('button-reject')

    this.artStatusTag = page.getByTestId('tag-status')
  }

  get url() {
    return getUrl('dashboard')
  }

  async toggleArtsMenu() {
    await this.artsMenuItem.click()
  }

  async gotoPendingArts() {
    await this.pendingArtsLink.click()
    await this.page.waitForURL(`${this.url}/arts?status=pending`)
  }

  async gotoApprovedArts() {
    await this.approvedArtsLink.click()
    await this.page.waitForURL(`${this.url}/arts?status=approved`)
  }

  async gotoRejectedArts() {
    await this.rejectedArtsMenu.click()
    await this.page.waitForURL(`${this.url}/arts?status=rejected`)
  }

  async selectUploadedPicture(title: string) {
    await this.page.locator('tr', { hasText: title }).click()
    // await this.page.getByText(`${title}`).click()
  }

  async fillFeedback(comment: string) {
    await this.feedbackInput.fill(comment)
  }

  async approveArt() {
    await this.approveButton.click()
    await this.confirmApproveButton.click()
  }

  async rejectArt() {
    await this.rejectButton.last().click()
    await this.confirmApproveButton.click()
  }
}
