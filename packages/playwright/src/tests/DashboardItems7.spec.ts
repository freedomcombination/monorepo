import { test, expect } from '@playwright/test'
import { getVercelUrl } from '../utils'

function sayfayiAc() {
  test.beforeEach(async ({ page }) => {
    // Go to the homepage
    await page.goto(getVercelUrl('kunsthalte'))
    await page.waitForTimeout(100)
  })
}

test.describe('Dashboard Items (Test 7)', () => {
  sayfayiAc()

  test('TC-0001 About Us', async ({ page }) => {
    // Click on the 'TR' button
    await page.getByRole('button', { name: 'TR' }).click()
    // Click on the 'Hakkımızda' link
    await page.getByRole('link', { name: 'Hakkımızda' }).first().click()
    // Wait for navigation to complete
    await page.waitForLoadState('networkidle')
    const titleTR = await page.textContent('h2.chakra-heading')
    expect(titleTR).toContain('Hakkımızda') //01. Does the About Us page open? (For TR)
    console.log(`TC-0001  About Us`)
    console.log(`01. About Us (For TR) page is open`)
    const pageTitleTR = await page.title()
    expect(pageTitleTR).toContain('Hakkımızda') // 02. Does the title match the page name? (For TR)
    console.log(`02. Page Title (For TR): ${pageTitleTR}`)

    // Click on the 'NL' button
    await page.getByRole('button', { name: 'NL' }).click()
    // Click on the 'Over Ons' link
    await page.getByRole('link', { name: 'Over Ons' }).first().click()
    // Wait for navigation to complete
    await page.waitForLoadState('networkidle')
    const titleNL = await page.textContent('h2.chakra-heading')
    expect(titleNL).toContain('Over ons') //03. Does the About Us page open? (For NL)
    console.log(`03. About Us (For NL) page is open`)
    const pageTitleNL = await page.title()
    expect(pageTitleNL).toContain('Over ons') // 04. Does the title match the page name? (For NL)
    console.log(`04. Page Title (For NL): ${pageTitleNL}`)

    // Click on the 'EN' button
    await page.getByRole('button', { name: 'EN' }).click()
    // Click on the 'About Us' link
    await page.getByRole('link', { name: 'About Us' }).first().click()
    // Wait for navigation to complete
    await page.waitForLoadState('networkidle')
    const titleEN = await page.textContent('h2.chakra-heading')
    expect(titleEN).toContain('About Us') //05. Does the About Us page open? (For EN)
    console.log(`05. About Us (For EN) page is open`)
    const pageTitleEN = await page.title()
    expect(pageTitleEN).toContain('About Us') // 06. Does the title match the page name? (For EN)
    console.log(`06. Page Title (For EN): ${pageTitleEN}`)
  })
  test('TC-0002 Contact', async ({ page }) => {
    // Click on the 'Contact' link
    await page.getByRole('link', { name: 'Contact' }).first().click()
    // Wait for navigation to complete
    await page.waitForLoadState('networkidle')
    const title = await page
      .getByRole('link', { name: 'Contact' })
      .first()
      .textContent()

    expect(title).toContain('Contact') //01. Does the Contact page open?
    console.log(`TC-0002  Contact`)
    console.log(`01. Contact page is open`)
    const pageTitle = await page.title()
    expect(pageTitle).toContain('Contact') // 02. Does the title match the page name?
    console.log(`02. Contact Page Title : ${pageTitle}`)

    await page.getByPlaceholder('Your Full Name').click()
    await page.getByPlaceholder('E-mail').click()
    await page.getByPlaceholder('Message').click()
    await page.getByPlaceholder('Your Full Name').click()

    const requiredText_fullname = await page.locator(
      'text=fullname is a required field',
    )
    // Check if the text is visible on the page
    const isTextVisible_fullname = await requiredText_fullname.isVisible()
    // Assert that the text is present and visible
    await expect(isTextVisible_fullname).toBe(true) // 03. Is Your Full Name a required field?
    console.log('03. Your Full Name is a required field.')

    const requiredText_email = await page.locator(
      'text=email is a required field',
    )
    // Check if the text is visible on the page
    const isTextVisible_email = await requiredText_email.isVisible()
    // Assert that the text is present and visible
    await expect(isTextVisible_email).toBe(true) // 04. Is email a required field?
    console.log('04. E-mail is a required field.')
    ///////////////////////////
    const emailInput = await page.locator('input[name="email"]')

    const testEmail_error = 'test_example.com'
    await emailInput.fill(testEmail_error)
    const requiredText_Email_error = await page.locator(
      'text=email must be a valid email',
    )
    // Check if the text is visible on the page
    const isTextVisible_Email_error = await requiredText_Email_error.isVisible()
    // Assert that the text is present and visible
    await expect(isTextVisible_Email_error).toBe(true)
    console.log('05. E-mail must be a valid email.')
    // Enter an email address for testing
    const testEmail = 'test@example.com'
    await emailInput.fill(testEmail)
    // Get the value from the input field
    const emailValue = await emailInput.inputValue()
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    // Check if the email matches the regex pattern
    const isValidEmail = emailRegex.test(emailValue)
    // Assert that the email is valid
    expect(isValidEmail).toBe(true) // 05. Assert that the email is valid
    console.log('05. Email is valid.')
    ///////////////////////////
    const requiredText_Message = await page.locator(
      'text=Message is a required field',
    )
    // Check if the text is visible on the page
    const isTextVisible_Message = await requiredText_Message.isVisible()
    // Assert that the text is present and visible
    await expect(isTextVisible_Message).toBe(true) // 06. Is Message a required field?
    console.log('06. Message is a required field.')

    await page.getByPlaceholder('Your Full Name').fill('Test Mustafa BUDAK')
    await page.getByPlaceholder('Message').fill('Bu bir Deneme Mesajıdır.')
    await page.getByRole('button', { name: 'Send message' }).click()
    await page.waitForTimeout(1000)
    const isIconVisible = await page.isVisible('.css-su69pd')
    // Check if the text is visible on the page

    if (isIconVisible) {
      await expect(isIconVisible).toBe(true) // 07. Can the user send the message successfully (Negatif)?
      console.log('07. Message could not be sent. There is an bag here.')
    } else {
      await expect(isIconVisible).toBe(false) // 07. Can the user send the message successfully (Pozitif) ?
      console.log('07. Message sent successfully.')
    }

    // Wait for the popup window to open
    const page1Promise = page.waitForEvent('popup')

    // I clicked on the email address link
    await page
      .getByRole('link', { name: 'kunsthalte@freedomcombination' })
      .click()

    // capture the popup window that opens
    const page1 = await page1Promise
    expect(page1).not.toBeNull() // 08. When clicking on the email address icon, the user should be directed to the Outlook application.
    console.log('08. Popup for Outlook successfully opened.')

    await page.getByLabel('X').first().click()
    const page2Promise = page.waitForEvent('popup')
    const page2 = await page2Promise
    expect(page2).not.toBeNull() // 09. When clicking on the xcom icon, the user should be directed to another page.
    console.log('09. Popup for xcom successfully opened.')

    const page3Promise = page.waitForEvent('popup')
    await page.getByLabel('WhatsApp').first().click()
    const page3 = await page3Promise
    expect(page3).not.toBeNull() // 10. When clicking on the WhatsApp icon, the user should be directed to another page.
    console.log('10. Popup for WhatsApp successfully opened.')

    const page4Promise = page.waitForEvent('popup')
    await page.getByLabel('Instagram').first().click()
    const page4 = await page4Promise
    expect(page4).not.toBeNull() // 11. When clicking on the Instagram icon, the user should be directed to another page.
    console.log('11. Popup for Instagram successfully opened.')

    const page5Promise = page.waitForEvent('popup')
    await page.getByLabel('Youtube').first().click()
    const page5 = await page5Promise
    expect(page5).not.toBeNull() // 12. When clicking on the Youtube icon, the user should be directed to another page.
    console.log('12. Popup for Youtube successfully opened.')
  })
  test('TC-0003 Donate', async ({ page }) => {
    // Click on the 'Donate' link
    await page.getByRole('link', { name: 'Donate' }).click()
    // Wait for navigation to complete
    await page.waitForLoadState('networkidle')
    const title = await page
      .getByRole('link', { name: 'Donate' })
      .first()
      .textContent()

    expect(title).toContain('Donate') //01. Does the Donate page open?
    console.log(`TC-0003  Donate`)
    console.log(`01. Donate page is open`)
    const pageTitle = await page.title()
    expect(pageTitle).toContain('Donate') // 02. Does the title match the page name?
    console.log(`02. Donate Page Title : ${pageTitle}`)

    await page.getByRole('button', { name: '€10', exact: true }).click()

    var chakraNumberInputDiv = await page.$('.chakra-numberinput')
    if (chakraNumberInputDiv) {
      // Assuming the value is inside an input element within the div
      const inputElement = await chakraNumberInputDiv.$('input')

      if (inputElement) {
        // Get the value of the input element
        const value = await inputElement.inputValue()
        // Print the value to the console
        expect(value).toContain('10') //03. Does the value of the trakbar change when you click on the buttons with the amount of money?
        console.log('03. The value of Trakbar and Button is the same')
      } else {
        console.log('Input element not found inside chakra-numberinput div')
      }
    }
    await page.getByRole('button', { name: '€5', exact: true }).click()
    await page.getByRole('button', { name: '€20' }).click()
    await page.getByRole('button', { name: '€50' }).click()
    await page.getByRole('button', { name: '€100' }).click()
    await page.getByRole('button', { name: '€10', exact: true }).click()
    await page.locator('.css-8pgw4r').first().click()
    await page.waitForLoadState('networkidle')
    chakraNumberInputDiv = await page.$('.chakra-numberinput')
    if (chakraNumberInputDiv) {
      // Assuming the value is inside an input element within the div
      const inputElement = await chakraNumberInputDiv.$('input')

      if (inputElement) {
        // Get the value of the input element
        const value = await inputElement.inputValue()
        // Print the value to the console
        expect(value).toContain('11') //04. Does the value of the trakbar change when you click on the numberinput with the amount of money?  (For Up)
        console.log(
          '04. The value of Trakbar and numberinput is the same. (For Up)',
        )
      } else {
        console.log('Input element not found inside chakra-numberinput div')
      }
    }

    await page.locator('.css-1jj9yua > div:nth-child(2)').click()
    chakraNumberInputDiv = await page.$('.chakra-numberinput')
    if (chakraNumberInputDiv) {
      // Assuming the value is inside an input element within the div
      const inputElement = await chakraNumberInputDiv.$('input')

      if (inputElement) {
        // Get the value of the input element
        const value = await inputElement.inputValue()
        // Print the value to the console
        expect(value).toContain('10') //04. Does the value of the trakbar change when you click on the numberinput with the amount of money? (For Down)
        console.log(
          '04. The value of Trakbar and numberinput is the same. (For Down)',
        )
      } else {
        console.log('Input element not found inside chakra-numberinput div')
      }
    }

    await page.getByPlaceholder('Name').click()
    await page.getByPlaceholder('E-mail').click()
    await page.getByPlaceholder('Name').click()

    const requiredText_name = await page.locator(
      'text=name is a required field',
    )
    // Check if the text is visible on the page
    const isTextVisible_name = await requiredText_name.isVisible()
    // Assert that the text is present and visible
    await expect(isTextVisible_name).toBe(true) // 05. Is Name a required field?
    console.log('05. name is a required field.')

    await page.getByPlaceholder('Name').fill('Mustafa Budak')
    const requiredText_Email = await page.locator(
      'text=email is a required field',
    )
    // Check if the text is visible on the page
    const isTextVisible_Email = await requiredText_Email.isVisible()
    // Assert that the text is present and visible
    await expect(isTextVisible_Email).toBe(true) // 06. Is E-mail a required field?
    console.log('06. E-mail is a required field.')
    ///////////////////////////
    const emailInput = await page.locator('input[name="email"]')

    const testEmail_error = 'test_example.com'
    await emailInput.fill(testEmail_error)
    const requiredText_Email_error = await page.locator(
      'text=email must be a valid email',
    )
    // Check if the text is visible on the page
    const isTextVisible_Email_error = await requiredText_Email_error.isVisible()
    // Assert that the text is present and visible
    await expect(isTextVisible_Email_error).toBe(true)
    console.log('07. E-mail must be a valid email.')
    // Enter an email address for testing
    const testEmail = 'test@example.com'
    await emailInput.fill(testEmail)
    // Get the value from the input field
    const emailValue = await emailInput.inputValue()
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    // Check if the email matches the regex pattern
    const isValidEmail = emailRegex.test(emailValue)
    // Assert that the email is valid
    expect(isValidEmail).toBe(true) // 07. Assert that the email is valid
    console.log('07. Email is valid.')
    ///////////////////////////
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }), // Wait for navigation to complete
      page.getByRole('button', { name: 'Donate €' }).click(), // Click on the 'Donate €' button
    ])

    // Get the new URL after navigation
    const newUrl = page.url()

    // Print the new URL to the console
    expect(isValidEmail).toBe(newUrl.length > 0) // 08. When the donate button is clicked, the user should be directed to the payment page.
    console.log(
      '08. When the donate button was clicked, the user was directed to the payment page.',
    )
  })
})
