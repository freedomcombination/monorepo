import { test } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('https://www.bol.com/nl/nl/')
  await page.waitForTimeout(1000)
  await page.locator('[data-test="search_input_trigger"]').click()
  await page.locator('[data-test="search_input_trigger"]').fill('shonen')
  await page.getByRole('link', { name: 'schonen', exact: true }).click()
  await page.waitForTimeout(5000)
})
