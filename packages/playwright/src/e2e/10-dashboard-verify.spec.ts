import { expect } from '@playwright/test'

import { test } from '../fixtures'
import { getUrl } from '../utils'

test.describe('01. Dashboard Verify', () => {
  test('TC-01: should display pages in Turkish', async ({
    page,
    layoutPage,
  }) => {
    await layoutPage.gotoHome('kunsthalte')
    await layoutPage.switchLanguage('tr')
    const titleTR = await page.textContent('h2.chakra-heading')
    expect(titleTR).toBe('Sanat Durağı')

    await page.getByTestId('view-arts').click()
    await page.waitForTimeout(2000)
    const pictureCategoryLocator = page.getByTestId('picture')
    expect(pictureCategoryLocator).toContainText('Resim')
  })

  test('TC-02: should display pages in Dutch', async ({ page }) => {
    await page.goto(getUrl('kunsthalte'))
    await page.click('button:has-text("NL")')
    await page.waitForTimeout(2000)
    const titleNL = await page.textContent('h2.chakra-heading')
    expect(titleNL).toBe('Kunsthalte')
    await expect(
      page.getByRole('link', { name: 'Kunsten' }).first(),
    ).toBeVisible()
    await page.getByTestId('view-arts').click()
    const dijitalCategoryLocator = page.getByTestId('dijital kunst')
    expect(dijitalCategoryLocator).toContainText('digital')
    await page.goBack()
  })

  test('TC-03: should display pages in English', async ({ page }) => {
    await page.goto(getUrl('kunsthalte'))
    await page.click('button:has-text("EN")')
    await page.waitForTimeout(2000)
    const titleEN = await page.textContent('h2.chakra-heading')
    expect(titleEN).toBe('Art Station')
    await page.getByTestId('view-arts').click()
    await expect(page.getByTestId('other')).toBeVisible()
    await page.getByTestId('other').click()
    await expect(
      page.getByTestId('other').getByRole('paragraph'),
    ).toContainText('Other')
  })
})
