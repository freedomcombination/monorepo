/// //////////////////////////////////////////////////////////////////// ///
///                                                                      ///
///                          01. WRITE TEST                              ///
///           branch: onboarding/<username>/01-write-test                ///
///                                                                      ///
/// //////////////////////////////////////////////////////////////////// ///

/**
 * 01. WRITE TEST
 */

import { test } from '@playwright/test'

// 01-01. Test
// TODO: Check how `pwtest` snippet works
test('OB-01. Example', { tag: ['@onboarding'] }, async () => {
  //   TODO: Go to the URL `https://playwright.dev/` and verify the page title is `'Playwright'`
  //   - [ ] Open the URL `https://playwright.dev/`
})

/**
 * ========================================================================
 */

/**
 * 02. GROUP TESTS
 */

// 01-01. Test
// TODO: Check how `pwdescribe` snippet works
test.describe('OB-03. bol.com', { tag: ['@onboarding'] }, () => {
  // TODO:
  // - [ ] test1 title: should display computers page title
  //   - [ ] Click on the Computer category card
  //   - [ ] Verify the data-test=page-title is 'Computers'
  // - [ ] test2 title: should display search results
  //  - [ ] Click on the search icon
  //  - [ ] Verify the search results are displayed
})
