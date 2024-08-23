import { faker } from '@faker-js/faker'
import { type Locator, type Page } from '@playwright/test'

import { IMAGE_PATH } from '../constants'

export class ArtsPage {
  readonly page: Page

  readonly title: string
  readonly description: string

  readonly uploadArtsButton: Locator
  readonly warning: Locator
  readonly titleInput: Locator
  readonly uploadButton: Locator
  readonly descriptionInput: Locator
  readonly titleError: Locator
  readonly descriptionError: Locator
  readonly saveButton: Locator
  readonly submitButton: Locator
  readonly confirmationMessage: Locator
  readonly goToMyProfileLink: Locator

  constructor(page: Page) {
    this.page = page

    this.title = faker.internet.displayName()
    this.description = faker.string.sample(200)

    this.uploadArtsButton = page.getByText('Upload Art')
    this.warning = page.getByTestId('text-require-login')
    this.uploadButton = page.locator('.uppy-Dashboard-input').first()
    this.titleInput = page.locator('#title')
    this.descriptionInput = page.locator('#description')
    this.titleError = page.locator('.chakra-form__error-message').first()
    this.descriptionError = page.locator('.chakra-form__error-message').last()
    this.saveButton = page.locator('.uppy-DashboardContent-save')
    this.submitButton = page.locator("//*[@type='submit']")
    this.confirmationMessage = page.getByText('Art successfully submitted')
    this.goToMyProfileLink = page.getByText('Go to my profile')
  }

  async clickUploadArtsButton() {
    await this.uploadArtsButton.click()
  }

  async submit() {
    await this.submitButton.click()
  }

  async goToMyProfile() {
    await this.goToMyProfileLink.click()
  }

  async fillTitle(title = this.title) {
    await this.titleInput.fill(title)
  }

  async fillDescription(description = this.description) {
    await this.descriptionInput.fill(description)
  }

  async uploadImage(imagePath = IMAGE_PATH) {
    await this.uploadButton.setInputFiles(imagePath)
    await this.page.waitForTimeout(1000)
    await this.saveButton.click()
  }

  async createArt(args?: {
    title?: string
    description?: string
    imagePath?: string
  }) {
    await this.uploadImage(args?.imagePath)

    await this.fillTitle(args?.title)
    await this.fillDescription(args?.description)

    await this.submit()
  }
}
