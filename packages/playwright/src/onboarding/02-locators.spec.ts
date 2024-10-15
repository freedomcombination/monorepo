/// //////////////////////////////////////////////////////////////////// ///
///                                                                      ///
///                          02. LOCATORS                                ///
///            branch: onboarding/<username>/02-locators                 ///
///                                                                      ///
/// //////////////////////////////////////////////////////////////////// ///

import { test } from '@playwright/test'

// https://playwright.dev/docs/locators
test.describe('OB-02. Locators', { tag: ['@onboarding'] }, () => {
  test('OB-02-01. should built-in locators be visible', async () => {
    // TODO:
    // Try to find the locators for the following elements throughout the bol.com website
    // - [ ] expect getByRole locator toBeVisible
    // - [ ] expect getByText locator toBeVisible
    // - [ ] expect getByLabel locator toBeVisible
    // - [ ] expect getByPlaceholder locator toBeVisible
    // - [ ] expect getByAltText locator toBeVisible
    // - [ ] expect getByTitle locator toBeVisible
    // - [ ] expect getByTestId locator toBeVisible
  })

  test('OB-02-02. should custom locators be visible', async () => {
    // https://playwright.dev/docs/locators#locate-by-css-or-xpath
    // TODO:
    // Try to find the locators by CSS or XPath throughout the bol.com website
    // - [ ] expect locator by CSS toBeVisible
    // - [ ] expect locator by XPath toBeVisible
  })

  test('OB-02-03. should filtered locators be visible', async () => {
    // https://playwright.dev/docs/locators#filtering-locators
    // TODO:
    // Try to find the locators by locator.filter throughout the bol.com website
    // - [ ] expect locator.filter toBeVisible
  })
})
