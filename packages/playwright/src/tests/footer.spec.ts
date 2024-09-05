import { expect, test } from '@playwright/test'

import { socialLinks } from '@fc/config/src/socialLinks'
import { Site } from '@fc/types'

import { addCookies, checkExternalLink, getVercelUrl } from '../utils'

test.describe('Footer', () => {
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
        const url = getVercelUrl(site)
        await page.goto(url, { waitUntil: 'domcontentloaded' })

        await addCookies(context, site)

        for (const socialItem of siteSocialLinks) {
          const item = siteSocialLinks?.find(item => item.id === socialItem.id)
          const label = item?.label as string
          const link = item?.link.en as string

          const linkLocator = page.getByLabel(label)

          await expect(linkLocator).toBeVisible()

          await checkExternalLink(linkLocator, link)
        }
      })
    })
})
