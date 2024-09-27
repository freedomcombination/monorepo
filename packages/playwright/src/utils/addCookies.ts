import { BrowserContext } from '@playwright/test'

import { CookieKey, Site } from '@fc/types'

import { getUrl } from './getUrl'

export const addCookies = async (context: BrowserContext, site: Site) => {
  const url = getUrl(site)
  // Prevent showing the cookie banner
  // TODO: Write a test to accept the cookie banner
  await context.addCookies([
    {
      name: CookieKey.COOKIE_BANNER_ALLOWED,
      value: 'true',
      url,
    },
    // Prevent showing the push notifications modal
    // TODO: Write a test to accept or dismiss the push notifications modal
    {
      name: CookieKey.PUSH_NOTIFICATIONS_SUBSCRIBED,
      value: 'true',
      url,
    },
  ])
}
