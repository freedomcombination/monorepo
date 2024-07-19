import { type Locator, type Page } from '@playwright/test'

export class ProfilePage {
  readonly page: Page
  readonly artsButton: Locator
  readonly pendingsArtsButton: Locator
  readonly picture: Locator

  constructor(page: Page) {
    this.page = page
    this.artsButton = page.locator('.chakra-tabs__tab').last()
    this.pendingsArtsButton = page.getByText('Pending Arts')
    this.picture = page.locator('.chakra-aspect-ratio div div img').first()
  }

  async clickArtsMenu() {
    await this.artsButton.click()
  }

  async clickPendingArtsMenu() {
    await this.pendingsArtsButton.click()
  }
}
