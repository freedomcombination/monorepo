import { expect } from '@playwright/test'

import { socialLinks } from '@fc/config/socialLinks'
import type { Site } from '@fc/types'

import { test } from '../fixtures'
import { addCookies, checkExternalLink, checkLink, getUrl } from '../utils'

test.describe('03. Footer', () => {
  Object.entries(socialLinks)
    // Filter out sites without social links
    .filter(socialLink => socialLink[1]?.length > 0)
    .forEach((socialLink, index) => {
      const site = socialLink[0] as Site
      const siteSocialLinks = socialLink[1]

      test(`TC-0${index + 1}: should have footer social links for ${site}`, async ({
        page,
        context,
      }) => {
        const url = getUrl(site)
        await page.goto(url, { waitUntil: 'domcontentloaded' })

        await addCookies(context, site)

        for (const socialItem of siteSocialLinks) {
          const item = siteSocialLinks?.find(item => item.id === socialItem.id)
          const label = item?.label as string
          const link = item?.link.en as string

          const linkLocator = page.getByLabel(label).last()

          await expect(linkLocator).toBeVisible()

          await checkExternalLink(linkLocator, link)
        }
      })
    })
  test('TC-04: should footer links work', async ({ page, layoutPage }) => {
    const url = getUrl('kunsthalte')
    await page.goto(url)

    await checkLink(page.getByTestId('link-m-logo-home'), '/')
    await checkLink(layoutPage.menu.footer.contact, '/contact')
    await checkLink(layoutPage.menu.footer.about, '/about-us')
    await checkLink(layoutPage.menu.footer.donation, '/donation')
    await checkLink(layoutPage.menu.footer.arts, '/club/arts')
    await checkLink(layoutPage.menu.footer.collections, '/club/collections')
    await checkLink(layoutPage.menu.footer.activities, '/activities')
    await checkLink(layoutPage.menu.footer.terms, '/terms')
    await checkLink(layoutPage.menu.footer.privacy, '/privacy')
    await checkExternalLink(
      layoutPage.menu.footer.foundation,
      'https://freedomcombination.com',
    )
  })
})
