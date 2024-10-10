import { expect } from '@playwright/test'

import { test } from '../fixtures'

test.beforeEach(async ({ layoutPage }) => {
  await layoutPage.gotoHome('kunsthalte')
  await layoutPage.switchLanguage('en')
})

test.describe('10. Collections', () => {
  test('TC-01: should collection cards have a visible picture, title and text', async ({
    page,
    layoutPage,
  }) => {
    await layoutPage.gotoPage('collections')

    await layoutPage.switchLanguage('tr')
    const parentDiv = page.locator('div.chakra-linkbox.css-v2jlpl').nth(1)
    const imagetitle = parentDiv.locator('div.chakra-aspect-ratio.css-1dghanm')
    await expect(imagetitle).toBeVisible()
    const nestedHeading = parentDiv.locator('h3.chakra-heading.css-7syql7')
    await expect(nestedHeading).toBeVisible()
    const textHeading = parentDiv.locator('p.chakra-text.css-e3za9i')
    await expect(textHeading).toBeVisible()
  })

  test('TC-02: should page number control', async ({ page, layoutPage }) => {
    await layoutPage.gotoPage('collections')
    await layoutPage.switchLanguage('tr')
    const firstOverlayElement = page
      .locator('a.chakra-linkbox__overlay')
      .first()
    await firstOverlayElement.click()
    await page
      .locator('div.css-16jmcak.stf__item.--soft.--right.--simple')
      .first()
      .click()

    expect(
      await page.locator('p.chakra-text.css-1ijgt0h').nth(0).innerText(),
    ).toBe('1')

    await page
      .locator('div.css-16jmcak.stf__item.--soft.--right.--simple')
      .first()
      .click()

    expect(
      await page.locator('p.chakra-text.css-1ijgt0h').nth(1).innerText(),
    ).toBe('2')

    await page
      .locator('div.css-16jmcak.stf__item.--soft.--right.--simple')
      .first()
      .click()

    expect(
      await page.locator('p.chakra-text.css-1ijgt0h').nth(2).innerText(),
    ).toBe('3')
  })

  test('TC-03: The pages of the collection cards should have pictures, titles, text and author visible. ', async ({
    page,
    layoutPage,
  }) => {
    await layoutPage.gotoPage('collections')
    await layoutPage.switchLanguage('tr')

    await page.locator('a.chakra-linkbox__overlay').first().click()
    const rightPage = page
      .locator('div.css-16jmcak.stf__item.--soft.--right.--simple')
      .first()
    await rightPage.click()

    const parentDivRighth = page
      .locator('div.css-16jmcak.stf__item.--soft.--right.--simple')
      .nth(0)
    await expect(parentDivRighth).toBeVisible()

    const nestedHeading = parentDivRighth.locator(
      'h2.chakra-heading.css-ejlo1q',
    )

    await expect(nestedHeading).toBeVisible()

    const nestedText = parentDivRighth.locator('p.chakra-text.css-1wq7vzl')

    await expect(nestedText).toBeVisible()

    const nestedAuthor = parentDivRighth.locator('p.chakra-text.css-8bbczo')

    await expect(nestedAuthor).toBeVisible()

    const parentDivLeft = page
      .locator('div.css-16jmcak.stf__item.--left.--hard.--simple')
      .nth(0)
    await expect(parentDivLeft).toBeVisible()

    const image = parentDivLeft.locator('img')

    await expect(image).toBeVisible()
  })
})
