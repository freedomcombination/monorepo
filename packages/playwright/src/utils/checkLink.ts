import { expect, Locator } from '@playwright/test'

export const checkLink = async (locator: Locator, href: string) => {
  await expect(locator).toHaveAttribute('href', href)
}

export const checkExternalLink = async (locator: Locator, href: string) => {
  await checkLink(locator, href)

  await expect(locator).toHaveAttribute('target', '_blank')
  await expect(locator).toHaveAttribute('rel', 'noopener noreferrer')
}
