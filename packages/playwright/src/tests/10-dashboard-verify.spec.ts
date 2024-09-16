import { test, expect } from '@playwright/test'

import { getUrl } from '../utils'

test.describe('01-Dashbord-verify', () => {
  test('TC-01:  should be page title visible as Home-Kunsthalte', async ({
    page,
  }) => {
    await page.goto(getUrl('kunsthalte'))
    await page.getByRole('link', { name: 'Sign in' }).first().click()
    await page.getByTestId('input-identifier').fill('admin')
    await page.getByTestId('input-password').fill('Test?123')
    await page.getByTestId('button-submit-login').click()
    await expect(page.getByRole('button', { name: 'Admin' })).toBeVisible()


  })

  test('TC-02: should be language bar (TR)should be visible,clickable ', async ({
    page,
  }) => {
     await page.goto(getUrl('kunsthalte'))
    await page.click('button:has-text("TR")')
    await page.waitForTimeout(2000)
    const titleTR = await page.textContent('h2.chakra-heading')
    expect(titleTR).toBe('Sanat Durağı')
    await expect(
      page.getByRole('link', { name: 'Eserler' }).first(),
    ).toBeVisible()
    await page.getByTestId('view-arts').click()
    const pictureCategoryLocator = page.getByTestId('schilderij')
    expect(pictureCategoryLocator).toContainText('Resim')
    await expect(page.getByRole('button', { name: '2' })).toBeVisible()
    await page.getByRole('button', { name: '2' }).click()
    await page.goBack()
  })

    test('TC-03: should be language bar(NL) should be visible,clickable ', async ({ page }) => {
      
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

  test('TC-03: should be language bar(EN) should be visible,clickable ', async ({
    page,
  }) => {
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

