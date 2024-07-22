import { type Locator, type Page } from '@playwright/test'

export class ArtsPage {
  readonly page: Page
  readonly uploadArtsButton: Locator
  readonly warning: Locator
  readonly titleInput: Locator
  readonly uploadButton: Locator
  readonly descriptionInput: Locator
  readonly errorMessage1: Locator
  readonly errorMessage2: Locator
  readonly saveButton: Locator
  readonly submitButton: Locator
  readonly confirmationMessage: Locator
  readonly goToMyProfileLink: Locator

  constructor(page: Page) {
    this.page = page
    this.uploadArtsButton = page.getByText('Upload Art')
    this.warning = page.getByText('You must be logged in in')
    this.uploadButton = page.locator('.uppy-Dashboard-input').first()
    this.titleInput = page.locator('#title')
    this.descriptionInput = page.locator('#description')
    this.errorMessage1 = page.locator('.chakra-form__error-message').first()
    this.errorMessage2 = page.locator('.chakra-form__error-message').last()
    this.saveButton = page.locator('.uppy-DashboardContent-save')
    this.submitButton = page.locator("//*[@type='submit']")
    this.confirmationMessage = page.getByText('Art successfully submitted')
    this.goToMyProfileLink = page.getByText('Go to my profile')
  }

  async clickOnTheUploadsArtButton() {
    await this.uploadArtsButton.click()
  }

  async clickTitle() {
    await this.titleInput.click()
  }

  async clickDescription() {
    await this.descriptionInput.click()
  }

  async saveSelectedFile() {
    await this.saveButton.click()
  }

  async submit() {
    await this.submitButton.click()
  }

  async goToMyProfile() {
    await this.goToMyProfileLink.click()
  }

  async fillTitle(title: string) {
    await this.titleInput.fill(title)
  }

  async fillDescription(description: string) {
    await this.descriptionInput.fill(description)
  }
}
