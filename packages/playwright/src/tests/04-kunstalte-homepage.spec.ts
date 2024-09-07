import { expect, test } from '@playwright/test'

import { getVercelUrl } from '../utils'

test.describe('04. Kunsthalte Homepage', () => {
  // Test the title of the homepage
  test('TC-01: should display translated titles', async ({ page }) => {
    // Go to the homepage
    await page.goto(getVercelUrl('kunsthalte'))

    //   Check TR title
    await page.click('button:has-text("TR")')
    await page.waitForTimeout(1000)
    const titleTR = await page.textContent('h2.chakra-heading')
    expect(titleTR).toBe('Sanat Durağı')

    //   Check NL title
    await page.click('button:has-text("NL")')
    await page.waitForTimeout(1000)
    const titleNL = await page.textContent('h2.chakra-heading')
    expect(titleNL).toBe('Kunsthalte')

    //   Check EN title
    await page.click('button:has-text("EN")')
    await page.waitForTimeout(1000)
    const titleEN = await page.textContent('h2.chakra-heading')

    expect(titleEN).toBe('Art Station')
  })
})
