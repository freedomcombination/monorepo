import { expect, test } from '@playwright/test'

import { Site } from '@fc/types'

import { TEST_TIMEOUT } from '../config'
import { PASSWORD, USERNAME } from '../constants'
import { HomePage, LoginPage } from '../pages'

const sitesWithLogin: Site[] = ['kunsthalte']

for (const site of sitesWithLogin) {
  test(`Login for ${site}`, async ({ page }) => {
    const homePage = new HomePage(page, site)
    const loginPage = new LoginPage(page)

    await page.setViewportSize({ width: 1920, height: 1080 });   // Tarayıcı penceresinin boyutunu 1920x1080 olarak ayarlar (tam ekran).
    await page.goto(homePage.url, { waitUntil: 'domcontentloaded' }) // Bu satır, tarayıcı sayfasını 'homePage.url' olarak belirtilen URL'ye yönlendirir ve sayfanın 'domcontentloaded' olayına kadar yüklenmesini bekler.
    // Yöntem asenkron bir işlem içerdiği için 'await' anahtar kelimesi kullanılır ve bu işlem tamamlanana kadar diğer kodların çalışması durdurulur.
    await homePage.gotoLogin()
    await loginPage.login(USERNAME, PASSWORD)


    await page.waitForURL(homePage.url, { timeout: TEST_TIMEOUT })    // Timeout 10 secon
    await expect(page).toHaveURL(homePage.url) // Bu satır, 'page' nesnesinin mevcut URL'sinin 'homePage.url' ile eşleşip eşleşmediğini kontrol eder ve bu işlemin tamamlanmasını bekler.
    // Eğer URL eşleşmezse, test başarısız olur ve bir hata fırlatılır.

    page.close(); // Sayfa kapanır.
  })

}
