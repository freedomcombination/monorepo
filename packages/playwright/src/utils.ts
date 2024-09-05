import { faker } from '@faker-js/faker'
import { BrowserContext, expect, Locator } from '@playwright/test'

import { CookieKey, Site } from '@fc/types'

import { ports, stagingUrls } from './config'
import { PASSWORD } from './constants'

export const getVercelUrl = (site: Site) => {
  if (process.env.CI === 'true') {
    return stagingUrls[site]
  }

  return `http://localhost:${ports[site]}`
}

export const checkLink = async (locator: Locator, link: string) => {
  const href = await locator.getAttribute('href')
  expect(href).toContain(link)
}

export const checkExternalLink = async (locator: Locator, link: string) => {
  await checkLink(locator, link)

  const target = await locator.getAttribute('target')
  expect(target).toBe('_blank')

  const rel = await locator.getAttribute('rel')
  expect(rel).toBe('noopener noreferrer')
}

export const addCookies = async (context: BrowserContext, site: Site) => {
  const url = getVercelUrl(site)
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

export const generateRandomUser = () => {
  const name = faker.person.firstName()
  const username = faker.internet.userName()
  const email = faker.internet.email()
  const password = PASSWORD

  return { name, username, email, password }
}
