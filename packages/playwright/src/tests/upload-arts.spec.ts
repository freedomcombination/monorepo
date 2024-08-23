import { faker } from '@faker-js/faker'
import { expect, test } from '@playwright/test'

import { TEST_TIMEOUT } from '../config'
import { PASSWORD, USERNAME } from '../constants'
import { HomePage, LoginPage } from '../pages'
import { ArtsPage } from '../pages/Arts'
import { DashboardArtsPage } from '../pages/Dashboard'
import { ProfilePage } from '../pages/Profile'
import { getVercelUrl } from '../utils'

// test.afterEach(async ({ page }) => {
//   await page.close()
// })

test.describe('Upload Arts', () => {
  test('TC01- should not upload art without logging in', async ({ page }) => {
    const homePage = new HomePage(page, 'kunsthalte')
    const artsPage = new ArtsPage(page)
    await page.goto(getVercelUrl('kunsthalte'))

    await homePage.gotoArtsPage()
    await artsPage.clickUploadArtsButton()
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
    await homePage.gotoArtsPage()
    await page.waitForURL(`${homePage.url}/club/arts`, {
      timeout: TEST_TIMEOUT,
    })
    await artsPage.clickUploadArtsButton()

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

    await homePage.gotoArtsPage()
    await artsPage.clickUploadArtsButton()
    await page.waitForTimeout(1000)

    await artsPage.uploadImage()

    await artsPage.titleInput.focus()
    await artsPage.titleInput.blur()
    expect(artsPage.titleError).toContainText('title is a required field')

    await artsPage.descriptionInput.focus()
    await artsPage.descriptionInput.blur()
    expect(artsPage.descriptionError).toContainText(
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

    await homePage.gotoArtsPage()
    await artsPage.clickUploadArtsButton()
    await page.waitForTimeout(1000)

    await artsPage.createArt()
    await page.waitForTimeout(1000)

    expect(artsPage.confirmationMessage).toBeVisible()

    await page.waitForTimeout(1000)

    await artsPage.goToMyProfile()
    await profilePage.clickArtsMenu()
    await page.waitForTimeout(2000)

    await profilePage.clickPendingArtsMenu()
    await page.waitForTimeout(2000)

    expect(profilePage.picture).toHaveAttribute('srcset')
  })

  test('TC05- The uploaded image should be approved from the dashboard and it must be seen that it is approved in the profile.', async ({
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

    await homePage.gotoArtsPage()
    await artsPage.clickUploadArtsButton()
    await page.waitForTimeout(1000)

    const artTitle = faker.internet.userName().toString()

    await artsPage.createArt({ title: artTitle })

    await page.waitForTimeout(1000)

    await artsPage.goToMyProfile()
    await profilePage.clickArtsMenu()
    await page.waitForTimeout(2000)

    await profilePage.clickPendingArtsMenu()

    await page.goto(getVercelUrl('dashboard'), {
      waitUntil: 'domcontentloaded',
    })
    await loginPage.loginDashboard('admin', 'Test?123')

    await dashboardPage.clickArtsMenu()
    await dashboardPage.clickPendingArtsMenu()
    await dashboardPage.selectUploadedPicture(artTitle)
    await dashboardPage.typeComment('Approved!')
    await dashboardPage.clickApproveButton()
    await dashboardPage.clickApprovedArtsMenu()

    await page.getByText(artTitle).click()
    await expect(dashboardPage.statusArt).toContainText('Approved')

    await page.goto(homePage.url, { waitUntil: 'domcontentloaded' })
    await homePage.gotoLogin()
    await loginPage.login(USERNAME, PASSWORD)

    await homePage.gotoProfilePage()
    await profilePage.clickArtsMenu()
    await profilePage.clickapprovedArtsMenu()
    await expect(page.getByText(`${artTitle}`)).toBeVisible()
  })

  test('TC06- The uploaded image can be rejected from the board and the rejection must be visible on the profile.', async ({
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

    await homePage.gotoArtsPage()
    await artsPage.clickUploadArtsButton()
    await page.waitForTimeout(1000)

    await artsPage.uploadImage()

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

    await page.goto(getVercelUrl('dashboard'), {
      waitUntil: 'domcontentloaded',
    })
    await loginPage.loginDashboard('admin', 'Test?123')

    await dashboardPage.clickArtsMenu()
    await dashboardPage.clickPendingArtsMenu()
    await dashboardPage.selectUploadedPicture(titlePicture)
    await dashboardPage.typeComment('Rejected')
    await dashboardPage.clickRejectButton()
    await dashboardPage.clickRejectedArtsMenu()

    await page.getByText(`${titlePicture}`).click()
    await expect(dashboardPage.statusArt).toContainText('Rejected')

    await page.goto(homePage.url, { waitUntil: 'domcontentloaded' })
    await homePage.gotoLogin()
    await loginPage.login(USERNAME, PASSWORD)

    await homePage.gotoProfilePage()
    await profilePage.clickArtsMenu()
    await profilePage.clickRejectedArtsMenu()
    await expect(page.getByText(`${titlePicture}`)).toBeVisible()
  })
})
