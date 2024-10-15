import { faker } from '@faker-js/faker'
import { expect } from '@playwright/test'

import { PASSWORD, USERNAME } from '../constants'
import { test } from '../fixtures'
import { LoginPage } from '../pages'
import { addCookies, getUrl } from '../utils'

// test.afterEach(async ({ page }) => {
//   await page.close()
// })

test.describe('05. Upload Arts', () => {
  // Clear browser context before each test
  test.beforeEach(async ({ context }) => {
    await context.clearCookies()
    await context.clearPermissions()
  })

  test('TC-01: should not upload art without logging in', async ({
    artsPage,
    layoutPage,
  }) => {
    await layoutPage.gotoLogin('kunsthalte')
    await layoutPage.gotoPage('arts')
    await artsPage.clickUploadArtButton()

    await expect(artsPage.warning).toBeVisible()
  })

  test('TC-02: should upload art with logging in', async ({
    artsPage,
    loginPage,
    layoutPage,
  }) => {
    await layoutPage.gotoLogin('kunsthalte')
    await loginPage.login(USERNAME, PASSWORD)

    await layoutPage.gotoPage('arts')
    await artsPage.clickUploadArtButton()

    await expect(artsPage.titleInput).toBeVisible()
  })

  test('TC-03: should fill required fields for upload art', async ({
    artsPage,
    layoutPage,
    loginPage,
  }) => {
    await layoutPage.gotoLogin('kunsthalte')
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
    artsPage,
    layoutPage,
    loginPage,
    profilePage,
    page,
  }) => {
    const url = getUrl('kunsthalte')

    await page.goto(url, { waitUntil: 'domcontentloaded' })
    await layoutPage.gotoLogin('kunsthalte')
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
    artsPage,
    layoutPage,
    profilePage,
    dashboardArtsPage,
  }) => {
    test.slow()
    const loginPage = new LoginPage(page)

    // Prevent push notification modal from appearing
    await addCookies(context, 'dashboard')

    await layoutPage.gotoHome('kunsthalte')
    await layoutPage.gotoLogin('kunsthalte')
    await loginPage.login(USERNAME, PASSWORD)

    await layoutPage.gotoPage('arts')
    await artsPage.clickUploadArtButton()

    const artTitle = faker.internet.userName().toString()

    await artsPage.createArt({ title: artTitle })

    await artsPage.goToMyProfile()
    await profilePage.openTab('arts')
    await profilePage.openArtsTab('pending')

    await page.goto(getUrl('dashboard'))
    await page.waitForLoadState('domcontentloaded')
    await loginPage.loginDashboard()

    await dashboardArtsPage.toggleArtsMenu()
    await dashboardArtsPage.gotoPendingArts()
    await dashboardArtsPage.selectUploadedPicture(artTitle)
    await dashboardArtsPage.fillFeedback('Approved!')
    await dashboardArtsPage.approveArt()
    await dashboardArtsPage.gotoApprovedArts()

    await page.getByText(artTitle).click()
    await expect(dashboardArtsPage.artStatusTag).toContainText('Approved')

    await layoutPage.gotoHome('kunsthalte')
    await layoutPage.gotoLogin('kunsthalte')
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
    artsPage,
    layoutPage,
    loginPage,
    profilePage,
    dashboardArtsPage,
  }) => {
    test.slow()
    // Prevent push notification modal from appearing
    await addCookies(context, 'dashboard')

    await layoutPage.gotoLogin('kunsthalte')
    await loginPage.login(USERNAME, PASSWORD)

    await layoutPage.gotoPage('arts')
    await artsPage.clickUploadArtButton()

    const artTitle = faker.internet.userName().toString()

    await artsPage.createArt({ title: artTitle })

    await artsPage.goToMyProfile()
    await profilePage.openTab('arts')
    await profilePage.openArtsTab('pending')

    // Reject the art from the dashboard
    await page.goto(getUrl('dashboard'), {
      waitUntil: 'domcontentloaded',
    })
    await loginPage.loginDashboard()

    await dashboardArtsPage.toggleArtsMenu()
    await dashboardArtsPage.gotoPendingArts()
    await dashboardArtsPage.selectUploadedPicture(artTitle)
    await dashboardArtsPage.fillFeedback('Rejected')
    await dashboardArtsPage.rejectArt()
    await dashboardArtsPage.gotoRejectedArts()

    await page.getByText(`${artTitle}`).click()
    await expect(dashboardArtsPage.artStatusTag).toContainText('Rejected')

    // Check if the art is displayed in the rejected arts section
    await layoutPage.gotoLogin('kunsthalte')
    await loginPage.login(USERNAME, PASSWORD)

    await layoutPage.gotoProfilePage()
    await profilePage.openTab('arts')
    await profilePage.openArtsTab('rejected')
    await expect(page.getByText(`${artTitle}`)).toBeVisible()
  })
})
