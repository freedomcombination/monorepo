import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await expect(page.getByRole('button', { name: 'TR' })).toBeVisible();
  await page.waitForSelector('#elementId', { visible: true, timeout: 10000 });
  await page.getByRole('link', { name: 'Eserler' }).first().click();
  await page.getByRole('link', { name: 'Kunsten' }).first().click()
  await page.getByText('resim', { exact: true }).click()
  await page.getByText('dijital resim').click();
  await page.getByText('Tanıtım').click();
  await page.locator('label').filter({ hasText: 'Diger' }).click();
  await page.getByText('Dijital Art').click();
  await page.locator('p').filter({ hasText: 'Koleksiyonlar' }).click();
  await page.getByRole('link', { name: 'Kunsten' }).first().click()
  await page.getByRole('link', { name: 'Kunsten' }).first().click()
  await page.getByRole('button', { name: 'NL' }).click()
  await page.getByRole('link', { name: 'Kunsten' }).first().click();
  await page.getByRole('link', { name: 'Kunsten' }).first().click()
  await page.getByText('Categorieën').click()
  await page.getByRole('link', { name: 'Collecties' }).first().click();
  await page.getByRole('link', { name: 'Activiteiten' }).click();
  await page.getByRole('link', { name: 'Over Ons' }).first().click();
  await page.getByRole('link', { name: 'Contact' }).first().click();
  await page.getByRole('link', { name: 'Donatie' }).first().click();
  await page.getByRole('button', { name: 'EN' }).first().click()
  await page.getByRole('link', { name: 'Arts' }).first().click();
  await page.locator('p').filter({ hasText: 'Collections' }).click();
});