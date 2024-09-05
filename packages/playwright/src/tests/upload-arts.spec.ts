import { faker } from '@faker-js/faker'
import { expect, test } from '@playwright/test'

import { PASSWORD, USERNAME } from '../constants'
import {
  ArtsPage,
  DashboardArtsPage,
  HomePage,
  LoginPage,
  ProfilePage,
} from '../pages'
import { addCookies, getVercelUrl } from '../utils'

// test.afterEach(async ({ page }) => {
//   await page.close()
// })

test.describe('Upload Arts', () => {
  // Clear browser context before each test
  test.beforeEach(async ({ context }) => {
    await context.clearCookies()
    await context.clearPermissions()
  })

  test('TC-01: should not upload art without logging in', async ({ page }) => {
    const homePage = new HomePage(page, 'kunsthalte')
    const artsPage = new ArtsPage(page)

    await homePage.gotoHomePage()
    await homePage.gotoArtsPage()
    await artsPage.clickUploadArtButton()

    expect(artsPage.warning).toBeVisible()
  })

  test('TC-02: should upload art with logging in', async ({ page }) => {
    const loginPage = new LoginPage(page)
    const homePage = new HomePage(page, 'kunsthalte')
    const artsPage = new ArtsPage(page)

    await homePage.gotoLogin()
    await loginPage.login(USERNAME, PASSWORD)
    await page.waitForTimeout(1000)

    await homePage.gotoArtsPage()
    await page.waitForURL(`${homePage.url}/club/arts`)
    await artsPage.clickUploadArtButton()

    expect(artsPage.titleInput).toBeVisible()
  })

  test('TC-03: should fill required fields for upload art', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page)
    const homePage = new HomePage(page, 'kunsthalte')
    const artsPage = new ArtsPage(page)

    await homePage.gotoLogin()
    await loginPage.login(USERNAME, PASSWORD)
    await page.waitForTimeout(1000)

    await homePage.gotoArtsPage()
    await artsPage.clickUploadArtButton()

    await artsPage.uploadImage()

    await artsPage.titleInput.focus()
    await artsPage.titleInput.blur()
    expect(artsPage.titleError).not.toBeEmpty()

    await artsPage.descriptionInput.focus()
    await artsPage.descriptionInput.blur()
    expect(artsPage.descriptionError).not.toBeEmpty()
  })

  test('TC-04: should display the uploaded image in the pending arts section', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page)
    const homePage = new HomePage(page, 'kunsthalte')
    const artsPage = new ArtsPage(page)
    const profilePage = new ProfilePage(page)

    await page.goto(homePage.url, { waitUntil: 'domcontentloaded' })
    await homePage.gotoLogin()
    await loginPage.login(USERNAME, PASSWORD)
    await page.waitForTimeout(1000)

    await homePage.gotoArtsPage()
    await artsPage.clickUploadArtButton()

    await artsPage.createArt()
    await page.waitForTimeout(1000)

    expect(artsPage.confirmationMessage).toBeVisible()

    await page.waitForTimeout(1000)

    await artsPage.goToMyProfile()
    await profilePage.openArtsTab()
    await page.waitForTimeout(2000)

    await profilePage.openPendingArtsTab()
    await page.waitForTimeout(2000)

    expect(profilePage.firstArtImage).toHaveAttribute('srcset')
  })

  test('TC-05: should approve the uploaded image from the dashboard and display the approval on the profile', async ({
    page,
    context,
  }) => {
    const loginPage = new LoginPage(page)
    const homePage = new HomePage(page, 'kunsthalte')
    const artsPage = new ArtsPage(page)
    const profilePage = new ProfilePage(page)
    const dashboardPage = new DashboardArtsPage(page)

    // Prevent push notification modal from appearing
    await addCookies(context, 'dashboard')

    await page.goto(homePage.url, { waitUntil: 'domcontentloaded' })
    await homePage.gotoLogin()
    await loginPage.login(USERNAME, PASSWORD)
    await page.waitForTimeout(1000)

    await homePage.gotoArtsPage()
    await artsPage.clickUploadArtButton()

    const artTitle = faker.internet.userName().toString()

    await artsPage.createArt({ title: artTitle })

    await page.waitForTimeout(1000)

    await artsPage.goToMyProfile()
    await profilePage.openArtsTab()
    await profilePage.openPendingArtsTab()

    await page.goto(getVercelUrl('dashboard'), {
      waitUntil: 'domcontentloaded',
    })
    await loginPage.loginDashboard()
    await page.waitForTimeout(1000)

    await dashboardPage.toggleArtsMenu()
    await dashboardPage.gotoPendingArts()
    await dashboardPage.selectUploadedPicture(artTitle)
    await dashboardPage.fillFeedback('Approved!')
    await dashboardPage.approveArt()
    await dashboardPage.gotoApprovedArts()

    await page.getByText(artTitle).click()
    await expect(dashboardPage.artStatusTag).toContainText('Approved')

    await page.goto(homePage.url, { waitUntil: 'domcontentloaded' })
    await homePage.gotoLogin()
    await loginPage.login(USERNAME, PASSWORD)
    await page.waitForTimeout(1000)

    await homePage.gotoProfilePage()
    await profilePage.openArtsTab()
    await profilePage.openApprovedArtsTab()
    await expect(page.getByText(`${artTitle}`)).toBeVisible()
  })

  test('TC-06: should reject the uploaded image from the dashboard and display the rejection on the profile', async ({
    page,
    context,
  }) => {
    const loginPage = new LoginPage(page)
    const homePage = new HomePage(page, 'kunsthalte')
    const artsPage = new ArtsPage(page)
    const profilePage = new ProfilePage(page)
    const dashboardPage = new DashboardArtsPage(page)

    // Prevent push notification modal from appearing
    await addCookies(context, 'dashboard')

    await homePage.gotoLogin()
    await loginPage.login(USERNAME, PASSWORD)
    await page.waitForTimeout(1000)

    await homePage.gotoArtsPage()
    await artsPage.clickUploadArtButton()

    const artTitle = faker.internet.userName().toString()

    await artsPage.createArt({ title: artTitle })

    await page.waitForTimeout(1000)

    await artsPage.goToMyProfile()
    await profilePage.openArtsTab()
    await profilePage.openPendingArtsTab()

    // Reject the art from the dashboard
    await page.goto(getVercelUrl('dashboard'), {
      waitUntil: 'domcontentloaded',
    })
    await loginPage.loginDashboard()
    await page.waitForTimeout(1000)

    await dashboardPage.toggleArtsMenu()
    await dashboardPage.gotoPendingArts()
    await dashboardPage.selectUploadedPicture(artTitle)
    await dashboardPage.fillFeedback('Rejected')
    await dashboardPage.rejectArt()
    await dashboardPage.gotoRejectedArts()

    await page.getByText(`${artTitle}`).click()
    await expect(dashboardPage.artStatusTag).toContainText('Rejected')

    // Check if the art is displayed in the rejected arts section
    await homePage.gotoLogin()
    await loginPage.login(USERNAME, PASSWORD)
    await page.waitForTimeout(1000)

    await homePage.gotoProfilePage()
    await profilePage.openArtsTab()
    await profilePage.openRejectedArtsTab()
    await expect(page.getByText(`${artTitle}`)).toBeVisible()
  })
})
