import { test } from '@playwright/test'

import { getVercelUrl } from '../utils'

test.describe('Search Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })

    // Go to the homepage
    await page.goto(getVercelUrl('kunsthalte'))
    await page.getByRole('link', { name: 'View Arts' }).click()
    await page.waitForTimeout(1000)
  })

  test('Search Test Pozitif', async ({ page }) => {
    const searchInput = await page.$('.css-1xmacr9')

    // Type "Future" in the search box
    if (searchInput) {
      await searchInput.fill('Future')
      await page.waitForTimeout(5000) // wait 5 seconds

      // Count search results
      const searchResults = await page.$$('.masonry-grid_column') // Replace 'masonry-grid_column' with the search results CSS class
      const numberOfResults = searchResults.length
      if (numberOfResults > 0) {
        console.log(`Number of search results: ${numberOfResults}`)
        await page.waitForTimeout(5000) // wait 5 seconds
      }
    }
  })

  test('Search Test Negatif', async ({ page }) => {
    const searchInput = await page.$('.css-1xmacr9')

    // Clear the search box and type "Future1" in the search box
    if (searchInput) {
      await searchInput.fill('')
      await searchInput.fill('Future1')
    } else {
      throw new Error('search Input not found')
    }
    await page.waitForTimeout(5000) // wait 5 seconds

    // Count search results
    const searchResults = await page.$$('.masonry-grid_column') // Replace 'masonry-grid_column' with the search results CSS class
    const numberOfResults = searchResults.length
    if (numberOfResults < 1) {
      console.log(`Number of search results: ${numberOfResults}`)
      await page.waitForTimeout(5000) // wait 5 seconds
    }
    page.close()
  })
})
