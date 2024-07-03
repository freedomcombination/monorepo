
import { expect, test, ElementHandle } from '@playwright/test' // Playwright test ve expect modüllerini dahil eder.
// 'has title' adlı bir test tanımlar.
test('has title', async ({ page }) => {
    // Tarayıcı penceresinin boyutunu 1920x1080 olarak ayarlar (tam ekran).
    await page.setViewportSize({ width: 1920, height: 1080 });


    // Playwright web sitesine gider.
    await page.goto('https://playwright.dev/');

    // Sayfa başlığının "Playwright" içerdiğini doğrular.
    await expect(page).toHaveTitle(/Playwright/);

    // Sayfanın kapanmadan önce 5 saniye beklemesini sağlar.
    // await page.waitForTimeout(5000);

    // "Get started" isimli bağlantıya tıklar.
    await page.getByRole('link', { name: 'Get started' }).click();

    // Sayfanın kapanmadan önce 5 saniye beklemesini sağlar.
    await page.waitForTimeout(1000);

    // "Writing tests" yazan metne tıklar.
    await page.click('text="Writing tests"');

    // Sayfanın kapanmadan önce 5 saniye beklemesini sağlar.
    await page.waitForTimeout(1000);

    // "Generating tests" yazan metne tıklar.
    await page.click('text="Generating tests"');

    // Sayfanın kapanmadan önce 5 saniye beklemesini sağlar.
    await page.waitForTimeout(1000);


    // Sayfadaki .DocSearch.DocSearch-Button seçicisine sahip öğeyi bul
    const docSearchButton = await page.$('.DocSearch.DocSearch-Button');

    // Butona tıkla
    if (docSearchButton) {
        await docSearchButton.click();
    } else {
        throw new Error('DocSearch button not found');
    }



    // 5 saniye bekle
    await page.waitForTimeout(1000);

    // Sayfadaki .DocSearch-Input seçicisine sahip öğeyi bul
    const searchInput = await page.$('.DocSearch-Input');

    // Arama kutusuna "Run" yaz
    if (searchInput) {
        await searchInput.fill('aaaaaa');
    } else {
        throw new Error('search Input not found');
    }



    // 5 saniye bekle
    await page.waitForTimeout(1000);
    page.close(); // Sayfa kapanır.
});
