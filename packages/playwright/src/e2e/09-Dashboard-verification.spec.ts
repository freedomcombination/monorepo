import { expect } from '@playwright/test'

import { test } from '../fixtures'
import { checkExternalLink, getUrl } from '../utils'

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
  test('TC-02: Footer Menu links work', async ({ page }) => {
    const url = getUrl('kunsthalte')
    await page.goto(url)
    await expect(page.getByTestId('link-m-logo-home')).toHaveAttribute(
      'href',
      '/',
    ) // When you click on the homepage logo, it goes to the homepage.

    await expect(page.getByTestId('link-footer/contact')).toHaveAttribute(
      'href',
      '/contact',
    ) // When you click on the contact, it goes to the contact.

    await expect(page.getByTestId('link-footer/contact')).toHaveAttribute(
      'href',
      '/contact',
    ) // When you click on the Contact menu, it goes to the Contact page.

    await expect(page.getByTestId('link-footer/about-us')).toHaveAttribute(
      'href',
      '/about-us',
    ) // When you click on the About Us menu, it goes to the About Us page.

    await expect(page.getByTestId('footer-link-foundation')).toHaveAttribute(
      'href',
      'https://freedomcombination.com',
    ) // When you click on the Foundation menu, it goes to the Foundation page.

    await expect(page.getByTestId('link-footer/donation')).toHaveAttribute(
      'href',
      '/donation',
    ) // When you click on the Donation menu, it goes to the Donation page.

    await expect(page.getByTestId('link-footer/club/arts')).toHaveAttribute(
      'href',
      '/club/arts',
    ) // When you click on the Arts menu, it goes to the Arts page.

    await expect(
      page.getByTestId('link-footer/club/collections'),
    ).toHaveAttribute('href', '/club/collections') // When you click on the Collections menu, it goes to the Collections page.

    await expect(page.getByTestId('link-footer/activities')).toHaveAttribute(
      'href',
      '/activities',
    ) // When you click on the Activities menu, it goes to the Activities page.

    await expect(page.getByTestId('link-footer/terms')).toHaveAttribute(
      'href',
      '/terms',
    ) // When you click on the Terms of service menu, it goes to the Terms of service page.

    await expect(page.getByTestId('link-footer/privacy')).toHaveAttribute(
      'href',
      '/privacy',
    ) // When you click on the Privacy Policy menu, it goes to the Privacy Policy page.
  })
  test('TC-03: should social links work', async ({ page }) => {
    const url = getUrl('kunsthalte')
    await page.goto(url)

    const locatorX = page.getByLabel('X').last()
    await expect(locatorX).toHaveAttribute('href', 'https://x.com/kunsthalte') // Address X checked
    await expect(locatorX).toHaveAttribute('target', '_blank') // target checked
    await expect(locatorX).toHaveAttribute('rel', 'noopener noreferrer') // rel checked

    const locatorWhatsapp = page.getByLabel('WhatsApp').last()
    await expect(locatorWhatsapp).toHaveAttribute(
      'href',
      'https://api.whatsapp.com/send?phone=31685221308',
    ) // Address WhatsApp checked
    await expect(locatorWhatsapp).toHaveAttribute('target', '_blank') // target checked
    await expect(locatorWhatsapp).toHaveAttribute('rel', 'noopener noreferrer') // rel checked

    const locatorInstagram = page.getByLabel('Instagram').last()
    await expect(locatorInstagram).toHaveAttribute(
      'href',
      'https://instagram.com/kunsthalte',
    ) // Address Instagram checked
    await expect(locatorInstagram).toHaveAttribute('target', '_blank') // target checked
    await expect(locatorInstagram).toHaveAttribute('rel', 'noopener noreferrer') // rel checked

    const locatorYoutube = page.getByLabel('Youtube').last()
    await expect(locatorYoutube).toHaveAttribute(
      'href',
      'https://www.youtube.com/@Kunsthalte',
    ) // Address Youtube checked
    await expect(locatorYoutube).toHaveAttribute('target', '_blank') // target checked
    await expect(locatorYoutube).toHaveAttribute('rel', 'noopener noreferrer') // rel checked

    // Test code here
  })
})
