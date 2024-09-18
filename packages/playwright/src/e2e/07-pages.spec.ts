import { expect } from '@playwright/test'

import { test } from '../fixtures'

test.beforeEach(async ({ layoutPage }) => {
  await layoutPage.gotoHome('kunsthalte')
  await layoutPage.switchLanguage('en')
})

test.describe('07. Pages', () => {
  test('TC-01: should display arts page ', async ({ page, layoutPage }) => {
    await layoutPage.gotoPage('arts')
    const pageTitle = await page.title()
    expect(pageTitle).toContain('Art Station') // 01. On the Arts page, does the title match the page name?
  })

  test('TC-02: should display collections page', async ({
    page,
    layoutPage,
  }) => {
    await layoutPage.gotoPage('collections')
    await page.getByTestId('link-d/club/collections').click()
    await page.waitForTimeout(1000)
    const titleEN = await page.textContent('h2.chakra-heading')
    expect(titleEN).toContain('Collections') // 01. Does the Collections page open?
    const pageTitleEN = await page.title()
    expect(pageTitleEN).toContain('Collections') // 02. On the Collections page, Does the title match the page name?
  })

  test('TC-03: should display activities page ', async ({
    page,
    layoutPage,
  }) => {
    await layoutPage.gotoPage('activities')
    await page.waitForTimeout(1000)
    const titleEN = await page.textContent('h2.chakra-heading')
    expect(titleEN).toBe('Activities') // 01. Does the Activities page open?
    const pageTitleEN = await page.title()
    expect(pageTitleEN).toContain('Activities') // 02. On the Activities page, Does the title match the page name?
  })
  test('TC-04: should display about us page', async ({ page, layoutPage }) => {
    await layoutPage.gotoPage('about')
    await page.waitForTimeout(1000)
    const titleEN = await page.textContent('h2.chakra-heading')
    expect(titleEN).toBe('About Us') // 01. Does the Activities page open?
    const pageTitleEN = await page.title()
    expect(pageTitleEN).toContain('About Us') // 02. On the Activities page, Does the title match the page name?
  })
  test('TC-05: should display Contact page', async ({ page, layoutPage }) => {
    await layoutPage.gotoPage('contact')
    await page.waitForTimeout(1000)
    await expect(page.locator('[id="__next"]')).toContainText('Contact') // 01. Does the Contact page open?
    const pageTitleEN = await page.title()
    expect(pageTitleEN).toContain('Contact') // 02. On the Activities page, Does the title match the page name?
  })

  test('TC-06: should display Donate page', async ({ page, layoutPage }) => {
    await layoutPage.gotoPage('donation')
    await page.waitForTimeout(1000)
    const titleEN = await page.textContent('h3.chakra-heading')
    expect(titleEN).toBe('Donate') // 01. Does the Activities page open?
    const pageTitleEN = await page.title()
    expect(pageTitleEN).toContain('Donate') // 02. On the Activities page, Does the title match the page name?
  })
})
