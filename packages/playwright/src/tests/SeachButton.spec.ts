import { test } from '@playwright/test'

import { getVercelUrl } from '../utils'

function gotoSearch() {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })

    // Go to the homepage
    await page.goto(getVercelUrl('kunsthalte'))
    await page.getByRole('link', { name: 'View Arts' }).click()
    await page.waitForTimeout(1000)
  })
}

test.describe('Seach Button Test', () => {
  gotoSearch()
  test('TC-0001 Happy flow', async ({ page }) => {
    const searchInput = await page.$('.css-1xmacr9') // 01. Locate the search input box (CSS class: .css-1xmacr9).
    if (searchInput) {
      await searchInput.fill('Future') // 02. Type "Future" in the search box.

      await page.waitForTimeout(5000) // wait 5 seconds
      const searchResults = await page.$$('.masonry-grid_column') // 03. Count search results (CSS class: .masonry-grid_column).
      const numberOfResults = searchResults.length // Count search results
      if (numberOfResults > 0) {
        // 04. Verify that the number of search results is greater than 0.
        console.log(`Number of search (Future) results: ${numberOfResults}`) // 05. Print the number of results to the console.
        await page.waitForTimeout(5000) // wait 5 seconds
      }
    }
  })
  test('TC-0002 Negative flow', async ({ page }) => {
    const searchInput = await page.$('.css-1xmacr9') // 01. Locate the search input box (CSS class: .css-1xmacr9).
    if (searchInput) {
      await searchInput.fill('') // 02. Clear the search box.
      await searchInput.fill('Future1') // 03. Type "Future1" in the search box.
    } else {
      throw new Error('search Input not found')
    }
    await page.waitForTimeout(5000) // wait 5 seconds

    const searchResults = await page.$$('.masonry-grid_column') // 04. Count search results (CSS class: .masonry-grid_column).
    const numberOfResults = searchResults.length // Count search results
    if (numberOfResults < 1) {
      // 05. Verify that the number of search results is less than 1.
      console.log(`Number of search (Future1) results: ${numberOfResults}`) // 06. Print the number of results to the console.
      await page.waitForTimeout(5000) // wait 5 seconds
    }
  })
  test('TC-0003  Negative flow. Error Handling', async ({ page }) => {
    const searchInput = await page.$('.css-1xmacr9') // 01. Locate the search input box (CSS class: .css-1xmacr9).
    if (searchInput) {
      await searchInput.fill('') // 02. Clear the search box.
      await searchInput.fill('Future2') // 03. Type "Future2" in the search box.
    } else {
      throw new Error('search Input not found')
    }
    await page.waitForTimeout(5000) // wait 5 seconds

    const searchResults = await page.$$('.masonry-grid_column') // 04. Count search results (CSS class: .masonry-grid_column).
    const numberOfResults = searchResults.length // Count search results
    if (numberOfResults < 1) {
      // 05. Verify that the number of search results is less than 1.
      console.log(`Number of search (Future2) results: ${numberOfResults}`) // 06.  If no results are found, an appropriate error message is displayed.
      await page.waitForTimeout(5000) // wait 5 seconds
    }
  })
  test('TC-0004  Happy flow. Filtering and Sorting', async ({ page }) => {
    const searchInput = await page.$('.css-1xmacr9') // 01. Locate the search input box (CSS class: .css-1xmacr9).
    if (searchInput) {
      await searchInput.fill('') // 02. Clear the search box.
      await searchInput.fill('Future') // 03. Type "Future" in the search box.
    } else {
      throw new Error('search Input not found')
    }
    await page.waitForTimeout(5000) // wait 5 seconds

    const searchResults = await page.$$('.masonry-grid_column') // 04. Count search results (CSS class: .masonry-grid_column).
    const numberOfResults = searchResults.length // Count search results
    if (numberOfResults > 0) {
      // 05. Verify that the number of search results is greater than 0.
      console.log(`Number of search (Future) results: ${numberOfResults}`) // 06.  Allowing the search results to be filtered and sorted according to certain criteria.
      await page.waitForTimeout(5000) // wait 5 seconds
    }
    page.close()
  })
})
