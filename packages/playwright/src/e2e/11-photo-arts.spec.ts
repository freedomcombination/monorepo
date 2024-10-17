import { faker } from '@faker-js/faker'
import { expect } from '@playwright/test'

import { PASSWORD, USERNAME } from '../constants'
import { test } from '../fixtures'
import { LoginPage } from '../pages'
import { addCookies, getUrl } from '../utils'

test.afterEach(async ({ page }) => {
  await page.close()
})

test.describe('07. Photo Arts', () => {
  // Clear browser context before each test
  test.beforeEach(async ({ context }) => {
    await context.clearCookies()
    await context.clearPermissions()
  })

  test('TC-01: should user be able to view uploaded photos', async ({
    artsPage,
    loginPage,
    layoutPage,
  }) => {
    await layoutPage.gotoLogin('kunsthalte')
    await loginPage.login('visitor', 'Test?123')

    await layoutPage.gotoPage('arts')

    await expect(artsPage.photos).toBeVisible()
  })

  test('TC-02: should user be able to select the uploaded photos', async ({
    artsPage,
    loginPage,
    layoutPage,
  }) => {
    await layoutPage.gotoLogin('kunsthalte')
    await loginPage.login('visitor', 'Test?123')

    await layoutPage.gotoPage('arts')
    await artsPage.chooseTheFirstPhoto()

    await expect(artsPage.photoTitle).toBeVisible()
  })

  test('TC-03: should user be able to like each photos', async ({
    artsPage,
    layoutPage,
    loginPage,
  }) => {
    await layoutPage.gotoLogin('kunsthalte')
    await loginPage.login('visitor', 'Test?123')

    await layoutPage.gotoPage('arts')
    await artsPage.chooseTheFirstPhoto()
    const likeBefore = (await artsPage.photoLikeIcon.textContent()) ?? '0'
    const likeBeforeNumber = parseInt(likeBefore, 10)
    await artsPage.likeTheFirstPhoto()
    const likeAfter = (await artsPage.photoLikeIcon.textContent()) ?? '0'
    const likeAfterNumber = parseInt(likeAfter, 10)
    expect(likeAfterNumber).toBe(likeBeforeNumber + 1)
    await artsPage.likeTheFirstPhoto()
  })

  test('TC-04: The user should be able to comment on the photos', async ({
    artsPage,
    layoutPage,
    loginPage,
    page,
  }) => {
    const url = getUrl('kunsthalte')

    await page.goto(url, { waitUntil: 'domcontentloaded' })
    await layoutPage.gotoLogin('kunsthalte')
    await loginPage.login('visitor', 'Test?123')

    await layoutPage.gotoPage('arts')
    await artsPage.chooseTheFirstPhoto()
    const comment = faker.internet.userName().toString()

    await artsPage.writeACommentForThePhotoAndSendIt(comment)
    await expect(page.getByText(`${comment}`)).toBeVisible()
  })
})
