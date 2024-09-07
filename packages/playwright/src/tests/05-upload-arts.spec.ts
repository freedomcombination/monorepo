import { faker } from '@faker-js/faker'
import { expect, test } from '@playwright/test'

import { PASSWORD, USERNAME } from '../constants'
import {
  ArtsPage,
  DashboardArtsPage,
  LayoutPage,
  LoginPage,
  ProfilePage,
} from '../pages'
import { addCookies, getVercelUrl } from '../utils'

// test.afterEach(async ({ page }) => {
//   await page.close()
// })

test.describe('05. Upload Arts', () => {
  // Clear browser context before each test
  test.beforeEach(async ({ context }) => {
    await context.clearCookies()
    await context.clearPermissions()
  })

  test('TC-01: should not upload art without logging in', async ({ page }) => {
    const layoutPage = new LayoutPage(page, 'kunsthalte')
    const artsPage = new ArtsPage(page)

    await layoutPage.gotoLogin()
    await layoutPage.gotoPage('arts')
    await artsPage.clickUploadArtButton()

    await expect(artsPage.warning).toBeVisible()
  })

  test('TC-02: should upload art with logging in', async ({ page }) => {
    const loginPage = new LoginPage(page)
    const layoutPage = new LayoutPage(page, 'kunsthalte')
    const artsPage = new ArtsPage(page)

    await layoutPage.gotoLogin()
    await loginPage.login(USERNAME, PASSWORD)

    await layoutPage.gotoPage('arts')
    await artsPage.clickUploadArtButton()

    await expect(artsPage.titleInput).toBeVisible()
  })

  test('TC-03: should fill required fields for upload art', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page)
    const layoutPage = new LayoutPage(page, 'kunsthalte')
    const artsPage = new ArtsPage(page)

    await layoutPage.gotoLogin()
    await loginPage.login(USERNAME, PASSWORD)

    await layoutPage.gotoPage('arts')
    await artsPage.clickUploadArtButton()

    await artsPage.uploadImage()

    await artsPage.titleInput.focus()
    await artsPage.titleInput.blur()
    expect(artsPage.titleError).not.toBeEmpty()

    await artsPage.descriptionInput.focus()
    await artsPage.descriptionInput.blur()
    await expect(artsPage.descriptionError).toBeVisible()
  })

  test('TC-04: should display the uploaded image in the pending arts section', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page)
    const layoutPage = new LayoutPage(page, 'kunsthalte')
    const artsPage = new ArtsPage(page)
    const profilePage = new ProfilePage(page)

    await page.goto(layoutPage.url, { waitUntil: 'domcontentloaded' })
    await layoutPage.gotoLogin()
    await loginPage.login(USERNAME, PASSWORD)

    await layoutPage.gotoPage('arts')
    await artsPage.clickUploadArtButton()

    await artsPage.createArt()

    await expect(artsPage.confirmationMessage).toBeVisible()

    await artsPage.goToMyProfile()
    await page.waitForTimeout(1000)
    await profilePage.openTab('arts')

    await profilePage.openArtsTab('pending')
    await page.waitForTimeout(1000)

    await expect(profilePage.firstArtImage).toHaveAttribute('srcset')
  })

  test('TC-05: should approve the uploaded art from the dashboard and display it on the profile', async ({
    page,
    context,
  }) => {
    const loginPage = new LoginPage(page)
    const layoutPage = new LayoutPage(page, 'kunsthalte')
    const artsPage = new ArtsPage(page)
    const profilePage = new ProfilePage(page)
    const dashboardPage = new DashboardArtsPage(page)

    // Prevent push notification modal from appearing
    await addCookies(context, 'dashboard')

    await page.goto(layoutPage.url, { waitUntil: 'domcontentloaded' })
    await layoutPage.gotoLogin()
    await loginPage.login(USERNAME, PASSWORD)

    await layoutPage.gotoPage('arts')
    await artsPage.clickUploadArtButton()

    const artTitle = faker.internet.userName().toString()

    await artsPage.createArt({ title: artTitle })

    await artsPage.goToMyProfile()
    await profilePage.openTab('arts')
    await profilePage.openArtsTab('pending')

    await page.goto(getVercelUrl('dashboard'))
    await page.waitForLoadState('domcontentloaded')
    await loginPage.loginDashboard()

    await dashboardPage.toggleArtsMenu()
    await dashboardPage.gotoPendingArts()
    await dashboardPage.selectUploadedPicture(artTitle)
    await dashboardPage.fillFeedback('Approved!')
    await dashboardPage.approveArt()
    await dashboardPage.gotoApprovedArts()

    await page.getByText(artTitle).click()
    await expect(dashboardPage.artStatusTag).toContainText('Approved')

    await layoutPage.gotoHome()
    await layoutPage.gotoLogin()
    await loginPage.login(USERNAME, PASSWORD)

    await layoutPage.gotoProfilePage()
    await page.waitForTimeout(1000)
    await profilePage.openTab('arts')
    await profilePage.openArtsTab('approved')
    await expect(page.getByText(`${artTitle}`)).toBeVisible()
  })

  test('TC-06: should reject the uploaded image from the dashboard and display the rejection on the profile', async ({
    page,
    context,
  }) => {
    const loginPage = new LoginPage(page)
    const layoutPage = new LayoutPage(page, 'kunsthalte')
    const artsPage = new ArtsPage(page)
    const profilePage = new ProfilePage(page)
    const dashboardPage = new DashboardArtsPage(page)

    // Prevent push notification modal from appearing
    await addCookies(context, 'dashboard')

    await layoutPage.gotoLogin()
    await loginPage.login(USERNAME, PASSWORD)

    await layoutPage.gotoPage('arts')
    await artsPage.clickUploadArtButton()

    const artTitle = faker.internet.userName().toString()

    await artsPage.createArt({ title: artTitle })

    await artsPage.goToMyProfile()
    await profilePage.openTab('arts')
    await profilePage.openArtsTab('pending')

    // Reject the art from the dashboard
    await page.goto(getVercelUrl('dashboard'), {
      waitUntil: 'domcontentloaded',
    })
    await loginPage.loginDashboard()

    await dashboardPage.toggleArtsMenu()
    await dashboardPage.gotoPendingArts()
    await dashboardPage.selectUploadedPicture(artTitle)
    await dashboardPage.fillFeedback('Rejected')
    await dashboardPage.rejectArt()
    await dashboardPage.gotoRejectedArts()

    await page.getByText(`${artTitle}`).click()
    await expect(dashboardPage.artStatusTag).toContainText('Rejected')

    // Check if the art is displayed in the rejected arts section
    await layoutPage.gotoLogin()
    await loginPage.login(USERNAME, PASSWORD)

    await layoutPage.gotoProfilePage()
    await profilePage.openTab('arts')
    await profilePage.openArtsTab('rejected')
    await expect(page.getByText(`${artTitle}`)).toBeVisible()
  })
})
