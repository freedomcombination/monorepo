import { faker } from '@faker-js/faker/locale/en'
import { expect, test } from '@playwright/test'

import { PASSWORD, USERNAME } from '../constants'
import { HomePage, LoginPage } from '../pages'
import { ArtsPage } from '../pages/Arts'
import { DashboardArtsPage } from '../pages/Dashboard'
import { ProfilePage } from '../pages/Profile'
import { getVercelUrl } from '../utils'

test.describe('Upload Arts', () => {
  test('TC01- should not upload art without logging in', async ({ page }) => {
    const homePage = new HomePage(page, 'kunsthalte')
    const artsPage = new ArtsPage(page)
    await page.goto(getVercelUrl('kunsthalte'))

    await homePage.clickArtsMenu()
    await artsPage.clickOnTheUploadsArtButton()
    await page.waitForTimeout(2000)
    expect(artsPage.warning).toContainText(
      'You must be logged in in order to be able to upload an art!',
    )
  })

  test('TC02- should upload art with logging in', async ({ page }) => {
    const loginPage = new LoginPage(page)
    const homePage = new HomePage(page, 'kunsthalte')
    const artsPage = new ArtsPage(page)

    await page.goto(homePage.url, { waitUntil: 'domcontentloaded' })
    await homePage.gotoLogin()
    await loginPage.login(USERNAME, PASSWORD)
    await homePage.clickArtsMenu()
    await artsPage.clickOnTheUploadsArtButton()

    await page.waitForTimeout(2000)
    expect(artsPage.titleInput).toBeVisible()
  })

  test('TC03- should fill required fields for upload art', async ({ page }) => {
    const loginPage = new LoginPage(page)
    const homePage = new HomePage(page, 'kunsthalte')
    const artsPage = new ArtsPage(page)

    await page.goto(homePage.url, { waitUntil: 'domcontentloaded' })
    await homePage.gotoLogin()
    await loginPage.login(USERNAME, PASSWORD)
    await page.waitForTimeout(1000)

    await homePage.clickArtsMenu()
    await artsPage.clickOnTheUploadsArtButton()
    await page.waitForTimeout(1000)
    const filePath = 'apps/kunsthalte/public/arts.jpeg'
    await artsPage.uploadButton.setInputFiles(filePath)
    await page.waitForTimeout(1000)

    await artsPage.clickTitle()
    await artsPage.clickDescription()
    await artsPage.clickTitle()

    expect(artsPage.errorMessage1).toContainText('title is a required field')
    expect(artsPage.errorMessage2).toContainText(
      'description is a required field',
    )
  })

  test('TC04- The uploaded image should be displayed in the pending arts section', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page)
    const homePage = new HomePage(page, 'kunsthalte')
    const artsPage = new ArtsPage(page)
    const profilePage = new ProfilePage(page)

    await page.goto(homePage.url, { waitUntil: 'domcontentloaded' })
    await homePage.gotoLogin()
    await loginPage.login(USERNAME, PASSWORD)
    await page.waitForTimeout(2000)

    await homePage.clickArtsMenu()
    await artsPage.clickOnTheUploadsArtButton()
    await page.waitForTimeout(1000)
    const filePath = 'apps/kunsthalte/public/arts.jpeg'
    await artsPage.uploadButton.setInputFiles(filePath)
    await page.waitForTimeout(1000)
    await artsPage.saveSelectedFile()

    const title = faker.internet.userName().toString()

    await artsPage.fillTitle(title)
    await artsPage.fillDescription('Description Test')
    expect(artsPage.submitButton).toBeEnabled()

    await artsPage.submit()

    expect(artsPage.confirmationMessage).toBeVisible()

    await page.waitForTimeout(1000)

    await artsPage.goToMyProfile()
    await profilePage.clickArtsMenu()
    await page.waitForTimeout(2000)

    await profilePage.clickPendingArtsMenu()
    await page.waitForTimeout(2000)

    expect(profilePage.picture).toHaveAttribute('src')
  })

  test('TC05- The uploaded image should be approved from the dashboard', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page)
    const homePage = new HomePage(page, 'kunsthalte')
    const artsPage = new ArtsPage(page)
    const profilePage = new ProfilePage(page)
    const dashboardPage = new DashboardArtsPage(page)

    await page.goto(homePage.url, { waitUntil: 'domcontentloaded' })
    await homePage.gotoLogin()
    await loginPage.login(USERNAME, PASSWORD)
    await page.waitForTimeout(2000)

    await homePage.clickArtsMenu()
    await artsPage.clickOnTheUploadsArtButton()
    await page.waitForTimeout(1000)
    const filePath = 'apps/kunsthalte/public/arts.jpeg'
    await artsPage.uploadButton.setInputFiles(filePath)
    await page.waitForTimeout(1000)
    await artsPage.saveSelectedFile()

    const titlePicture = faker.internet.userName().toString()

    await artsPage.fillTitle(titlePicture)
    await artsPage.fillDescription('Description Test')
    expect(artsPage.submitButton).toBeEnabled()

    await artsPage.submit()

    expect(artsPage.confirmationMessage).toBeVisible()

    await page.waitForTimeout(1000)

    await artsPage.goToMyProfile()
    await profilePage.clickArtsMenu()
    await page.waitForTimeout(2000)

    await profilePage.clickPendingArtsMenu()
    await page.waitForTimeout(2000)

    await page.goto(getVercelUrl('dashboard'), {
      waitUntil: 'domcontentloaded',
    })
    await loginPage.loginDashboard('admin', 'Test?123')

    await dashboardPage.clickArtsMenu()
    await dashboardPage.clickPendingArtsMenu()
    await dashboardPage.selectUploadedPicture(titlePicture)
    await dashboardPage.typeComment()
    await dashboardPage.clickApproveButton()
    await dashboardPage.clickApprovedArtsMenu()

    await page.getByText(`${titlePicture}`).click()
    await expect(page.locator('.css-dbleiq')).toContainText('Approved')
  })
})
