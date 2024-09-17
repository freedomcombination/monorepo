import { expect } from '@playwright/test'

import { test } from '../fixtures'

test.describe('04. Kunsthalte Homepage', () => {
  // Test the title of the homepage
  test('TC-01: should display translated titles', async ({
    page,
    layoutPage,
  }) => {
    // Go to the homepage
    await layoutPage.gotoHome('kunsthalte')

    //   Check TR title
    await layoutPage.switchLanguage('tr')
    const titleTR = await page.textContent('h2.chakra-heading')
    expect(titleTR).toBe('Sanat Durağı')

    //   Check NL title
    await layoutPage.switchLanguage('nl')
    const titleNL = await page.textContent('h2.chakra-heading')
    expect(titleNL).toBe('Kunsthalte')

    //   Check EN title
    await layoutPage.switchLanguage('en')
    await page.waitForTimeout(1000)
    const titleEN = await page.textContent('h2.chakra-heading')

    expect(titleEN).toBe('Art Station')
  })
})
