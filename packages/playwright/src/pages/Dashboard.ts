import { type Locator, type Page } from '@playwright/test'

export class DashboardArtsPage {
  readonly page: Page
  readonly artsButton: Locator
  readonly pendingsArtsButton: Locator
  readonly approvedArtsButton: Locator
  readonly commentInput: Locator
  readonly approveButton: Locator
  readonly confirmApproveButton: Locator
  readonly alertCloseButton: Locator
  readonly rejectButton: Locator
  readonly rejectedArtsMenu: Locator
  readonly statusArt: Locator

  constructor(page: Page) {
    this.page = page
    this.artsButton = page.getByText('Arts').first()
    this.pendingsArtsButton = page.locator('[href*="/arts?status=pending"]')
    this.approvedArtsButton = page.locator('[href*="/arts?status=approved"]')
    this.commentInput = page.getByTestId('feedback-textarea')
    this.approveButton = page.getByTestId('approve-button')
    this.confirmApproveButton = page.getByTestId('confirm-button')
    this.alertCloseButton = page.locator('.chakra-button.css-1hcn127')
    this.rejectButton = page.getByTestId('reject-button')
    this.rejectedArtsMenu = page.locator('[href*="/arts?status=rejected"]')
    this.statusArt = page.getByTestId('status-tag')
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
    await this.commentInput.fill(comment)
  }

  async clickApproveButton() {
    await this.approveButton.click()
    await this.confirmApproveButton.click()
  }

  async clickRejectButton() {
    await this.rejectButton.last().click()
    await this.rejectButton.last().click()
  }

  async clickRejectedArtsMenu() {
    await this.rejectedArtsMenu.click()
  }
}
