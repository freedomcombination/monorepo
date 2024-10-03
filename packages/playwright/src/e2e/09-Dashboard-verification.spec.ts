import { expect } from '@playwright/test'

import { test } from '../fixtures'
import { checkExternalLink, checkLink, getUrl } from '../utils'

test.describe('01. Dashboard verification', () => {
  test('TC-01: should username/language bar be visible', async ({
    page,
    layoutPage,
  }) => {
    const url = getUrl('kunsthalte')
    await page.goto(url)
    await layoutPage.gotoLogin('kunsthalte')
    await page.waitForTimeout(100)
    await page.getByTestId('input-identifier').fill('admin')
    await page.getByTestId('input-password').fill('Test?123')
    await page.getByTestId('button-submit-login').click()
    await page.getByTestId('button-d-profile-menu')
    const btn = await page.getByTestId('button-d-profile-menu').innerText()
    await expect(btn).toContain('Admin')
  })
  test('TC-02: Footer Menu links work', async ({ page, layoutPage }) => {
    const url = getUrl('kunsthalte')
    await page.goto(url)

    await checkLink(page.getByTestId('link-m-logo-home'), '/') // When you click on the homepage logo, it goes to the homepage.
    await checkLink(layoutPage.menu.footer.contact, '/contact') // When you click on the Contact menu, it goes to the Contact page.
    await checkLink(layoutPage.menu.footer.about, '/about-us') // When you click on the About Us menu, it goes to the About Us page.
    await checkLink(layoutPage.menu.footer.donation, '/donation') // When you click on the Donation menu, it goes to the Donation page.
    await checkLink(layoutPage.menu.footer.arts, '/club/arts') // When you click on the Arts menu, it goes to the Arts page.
    await checkLink(layoutPage.menu.footer.collections, '/club/collections') // When you click on the Collections menu, it goes to the Collections page.
    await checkLink(layoutPage.menu.footer.activities, '/activities') // When you click on the Activities menu, it goes to the Activities page.
    await checkLink(layoutPage.menu.footer.terms, '/terms') // When you click on the Terms of service menu, it goes to the Terms of service page.
    await checkLink(layoutPage.menu.footer.privacy, '/privacy') // When you click on the Privacy Policy menu, it goes to the Privacy Policy page.
    await checkExternalLink(
      layoutPage.menu.footer.foundation,
      'https://freedomcombination.com',
    ) // When you click on the Foundation menu, it goes to the Foundation page.
  })
})
