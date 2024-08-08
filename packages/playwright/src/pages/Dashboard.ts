import { th } from '@faker-js/faker'
import { type Locator, type Page } from '@playwright/test'

export class DashboardArtsPage {
  readonly page: Page
  readonly artsButton: Locator
  readonly pendingsArtsButton: Locator
  readonly approvedArtsButton: Locator
  readonly comment: Locator
  readonly approveButton: Locator
  readonly approveButton2: Locator
  readonly alertCloseButton: Locator
  readonly rejectButton: Locator
  readonly rejectedArtsMenu: Locator

  constructor(page: Page) {
    this.page = page
    this.artsButton = page.getByText('Arts').first()
    this.pendingsArtsButton = page.locator('[href*="/arts?status=pending"]')
    this.approvedArtsButton = page.locator('[href*="/arts?status=approved"]')
    this.comment = page.locator('.chakra-stack.css-1wzmrn1 textarea')
    this.approveButton = page.locator('.chakra-button.css-11ygba6')
    this.approveButton2 = page.locator('.chakra-button.css-td5lcy')
    this.alertCloseButton = page.locator('.chakra-button.css-1hcn127')
    this.rejectButton = page.getByText('Reject')
    this.rejectedArtsMenu = page.locator('[href*="/arts?status=rejected"]')
  }

  async clickArtsMenu() {
    await this.alertCloseButton.click()
    await this.artsButton.click()
  }

  async clickPendingArtsMenu() {
    await this.pendingsArtsButton.click()
  }

  async clickApprovedArtsMenu() {
    await this.approvedArtsButton.click()
  }

  async selectUploadedPicture(title: string) {
    await this.page.getByText(`${title}`).click()
  }

  async typeComment(comment: string) {
    await this.comment.fill(comment)
  }

  async clickApproveButton() {
    await this.approveButton.click()
    await this.approveButton2.click()
  }

  async clickRejectButton() {
    await this.rejectButton.last().click()
    await this.rejectButton.last().click()
  }

  async clickRejectedArtsMenu() {
    await this.rejectedArtsMenu.click()
  }
}
