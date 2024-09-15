import { type Locator, type Page } from '@playwright/test'

export class ProfilePage {
  readonly page: Page
  readonly tabs: {
    arts: Locator
    security: Locator
    socials: Locator
  }
  readonly artTabs: {
    approved: Locator
    pending: Locator
    rejected: Locator
  }
  readonly inputs: {
    currentPassword: Locator
    newPassword: Locator
    passwordConfirmation: Locator
  }
  readonly toasts: {
    usernameSuccess: Locator
    usernameError: Locator
    emailSuccess: Locator
    emailError: Locator
    passwordSuccess: Locator
    passwordError: Locator
  }
  readonly firstArtImage: Locator
  readonly submitUpdatePassword: Locator

  constructor(page: Page) {
    this.page = page
    this.tabs = {
      arts: page.getByTestId('tab-arts'),
      security: page.getByTestId('tab-security'),
      socials: page.getByTestId('tab-socials'),
    }
    this.artTabs = {
      approved: page.getByTestId('tab-approved'),
      pending: page.getByTestId('tab-pending'),
      rejected: page.getByTestId('tab-rejected'),
    }
    this.inputs = {
      currentPassword: page.getByTestId('input-currentPassword'),
      newPassword: page.getByTestId('input-password'),
      passwordConfirmation: page.getByTestId('input-passwordConfirmation'),
    }
    this.toasts = {
      usernameSuccess: page.locator('#toast-success-update-username'),
      usernameError: page.locator('#toast-error-update-username'),
      emailSuccess: page.locator('#toast-success-update-email'),
      emailError: page.locator('#toast-error-update-email'),
      passwordSuccess: page.locator('#toast-success-update-password'),
      passwordError: page.locator('#toast-error-update-password'),
    }
    this.firstArtImage = page.locator('.art-image').first()
    this.submitUpdatePassword = page.getByTestId(
      'button-submit-update-password',
    )
  }

  async openTab(tab: 'arts' | 'security' | 'socials') {
    await this.tabs[tab].click()
    await this.page.waitForTimeout(1000)
  }

  async openArtsTab(tab: 'approved' | 'pending' | 'rejected') {
    await this.artTabs[tab].click()
    await this.page.waitForTimeout(1000)
  }

  async updatePassword(currentPassword: string, newPassword: string) {
    await this.inputs.currentPassword.fill(currentPassword)
    await this.inputs.newPassword.fill(newPassword)
    await this.inputs.passwordConfirmation.fill(newPassword)
    await this.submitUpdatePassword.click()
  }
}
