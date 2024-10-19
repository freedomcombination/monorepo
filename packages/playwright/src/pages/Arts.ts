import { faker } from '@faker-js/faker'
import { type Locator, type Page, expect } from '@playwright/test'

import { IMAGE_PATH } from '../constants'

export class ArtsPage {
  readonly page: Page

  readonly uploadArtButton: Locator
  readonly warning: Locator

  readonly titleInput: Locator
  readonly descriptionInput: Locator

  readonly filePicker: Locator
  readonly titleError: Locator
  readonly descriptionError: Locator
  readonly saveButton: Locator
  readonly submitButton: Locator
  readonly confirmationMessage: Locator
  readonly goToMyProfileLink: Locator
  readonly photos: Locator
  readonly photosIcon: Locator
  readonly photoTitle: Locator
  readonly photoLikeIcon: Locator
  readonly photoLikeButton: Locator
  readonly photoCommentTxt: Locator
  readonly photoSendCommentButton: Locator

  constructor(page: Page) {
    this.page = page

    this.uploadArtButton = page.getByTestId('upload-art')
    this.warning = page.getByTestId('text-require-login')
    this.filePicker = page.locator('.uppy-Dashboard-input').first()
    this.titleInput = page.getByTestId('input-title')
    this.descriptionInput = page.getByTestId('input-description')
    this.titleError = page.getByTestId('error-text-title')
    this.descriptionError = page.getByTestId('error-text-description')
    this.saveButton = page.locator('.uppy-DashboardContent-save')
    this.submitButton = page.getByTestId('button-create-art')
    this.confirmationMessage = page.getByTestId('text-create-art-success')
    this.goToMyProfileLink = page.getByTestId('link-goto-profile')
    this.photos = page.locator('.chakra-aspect-ratio').first()
    this.photosIcon = page.locator('//button[@aria-label="view art"]')
    this.photoTitle = page.locator('.chakra-heading').first()
    this.photoLikeIcon = page.getByTestId('button-like')

    this.photoLikeButton = page.locator('//*[@data-testid="button-like"]')
    this.photoCommentTxt = page.locator('//*[@data-testid="input-content"]')
    this.photoSendCommentButton = page.getByText('Send Comment')
  }

  async clickUploadArtButton() {
    await this.uploadArtButton.click()
    await this.page.waitForTimeout(1000)
  }

  async submit() {
    await this.submitButton.click()
  }

  async goToMyProfile() {
    await this.goToMyProfileLink.click()
    await this.page.waitForLoadState('domcontentloaded')
  }

  async fillTitle(title = faker.internet.displayName()) {
    await this.titleInput.fill(title)
  }

  async fillDescription(description = faker.lorem.sentence()) {
    await this.descriptionInput.fill(description)
  }

  async uploadImage(imagePath = IMAGE_PATH) {
    await this.filePicker.setInputFiles(imagePath)
    await this.page.waitForTimeout(1000)
    await this.saveButton.click()
  }

  async chooseTheFirstPhoto() {
    await this.page.locator('.art-image').first().hover()
    await this.photosIcon.first().click()
    await this.page.waitForLoadState()
  }

  async likeTheFirstPhoto() {
    await this.photoLikeIcon.click()
    await this.page.waitForTimeout(2000)
  }

  async writeACommentForThePhotoAndSendIt(comment = faker.lorem.sentence()) {
    await this.photoCommentTxt.fill(comment)
    await this.photoSendCommentButton.click()
  }

  async createArt(args?: {
    title?: string
    description?: string
    imagePath?: string
  }) {
    await this.uploadImage(args?.imagePath)

    await this.fillTitle(args?.title)
    await this.fillDescription(args?.description)

    expect(this.submitButton).toBeEnabled()

    await this.submit()
    await this.page.waitForTimeout(1000)

    await expect(this.confirmationMessage).toBeVisible()
  }
}
