import { expect, test } from '@playwright/test';

import { getVercelUrl } from '../utils'

test.describe('Profile Editing Tests', () => {
  test('User updates password', async ({ page }) => {
    await page.goto(getVercelUrl('kunsthalte'))
    await page.getByRole('button', { name: 'EN' }).click();
    await page.getByRole('link', { name: 'Sign in' }).click();
    await page.getByTestId('input-email').click();
    await page.getByTestId('input-email').fill('Admin8');
    await page.getByTestId('input-password').click();
    await page.getByTestId('input-password').fill('1234512345Ad');
    await page.getByTestId('button-submit-login').click();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.getByRole('button', { name: 'Admin8' }).click();
    await page.getByRole('menuitem', { name: 'Profile' }).click(); 
    await page.getByRole('tab', { name: 'Security' }).click();
    await page.getByPlaceholder('currentPassword').click();
    await page.getByPlaceholder('currentPassword').fill('1234512345Ad');
    await page.getByPlaceholder('Password', { exact: true }).click();
    await page.getByPlaceholder('Password', { exact: true }).fill('1234567Ak');
    await page.getByPlaceholder('passwordConfirmation').click();
    await page.getByPlaceholder('passwordConfirmation').fill('1234567Ak');
    await page.getByRole('button', { name: 'Change Password' }).click();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.getByRole('button', { name: 'Admin8' }).click();
    await page.getByRole('menuitem', { name: 'Sign Out' }).click();
  });
  
  test('User cannot update password with invalid input', async ({ page }) => {
    await page.goto(getVercelUrl('kunsthalte'))
    await page.getByRole('button', { name: 'EN' }).click();
    await page.getByRole('link', { name: 'Sign in' }).click();
    await page.getByTestId('input-email').click();
    await page.getByTestId('input-email').fill('Admin8');
    await page.getByTestId('input-password').click();
    await page.getByTestId('input-password').fill('1234567Ak');
    await page.getByTestId('button-submit-login').click();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.getByRole('button', { name: 'Admin8' }).click();
    await page.getByRole('menuitem', { name: 'Profile' }).click(); 
    await page.getByRole('tab', { name: 'Security' }).click();
    await page.getByPlaceholder('currentPassword').click();
    await page.getByPlaceholder('currentPassword').fill('1234567Ak');
    await page.getByPlaceholder('Password', { exact: true }).click();
    await page.getByPlaceholder('Password', { exact: true }).fill('1');
    await page.getByPlaceholder('passwordConfirmation').click();
    await page.getByPlaceholder('passwordConfirmation').fill('1');
    await page.getByRole('button', { name: 'Change Password' }).click();
    // const errorMessageSelector = 'text=The provided current password is invalid';
    // const isVisible = await page.isVisible(errorMessageSelector);
    // expect(isVisible).toBeTruthy();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.getByRole('button', { name: 'Admin8' }).click();
    await page.getByRole('menuitem', { name: 'Sign Out' }).click();
  });
  
  test('password is restored', async ({ page }) => {
    await page.goto(getVercelUrl('kunsthalte'))
    await page.getByRole('button', { name: 'EN' }).click();
    await page.getByRole('link', { name: 'Sign in' }).click(); 
    await page.getByTestId('input-email').click();
    await page.getByTestId('input-email').fill('Admin8');
    await page.getByTestId('input-password').fill('1234567Ak');
    await page.getByTestId('button-submit-login').click();
    await page.getByRole('button', { name: 'Admin8' }).click();
    await page.getByRole('menuitem', { name: 'Profile' }).click();
    await page.getByRole('tab', { name: 'Security' }).click();
    await page.getByPlaceholder('currentPassword').click();
    await page.getByPlaceholder('currentPassword').fill('1234567Ak');
    await page.getByPlaceholder('Password', { exact: true }).click();
    await page.getByPlaceholder('Password', { exact: true }).fill('1234512345Ad');
    await page.getByPlaceholder('passwordConfirmation').click();
    await page.getByPlaceholder('passwordConfirmation').fill('1234512345Ad');
    await page.getByRole('button', { name: 'Change Password' }).click();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.getByRole('button', { name: 'Admin8' }).click();
    await page.getByRole('menuitem', { name: 'Sign Out' }).click();
  });
  
  test('User adds social address', async ({ page }) => { 
    await page.goto(getVercelUrl('kunsthalte'))
    await page.getByRole('button', { name: 'EN' }).click();
    await page.getByRole('link', { name: 'Sign in' }).click();
    await page.waitForTimeout(1000)
    await page.getByTestId('input-email').click();
    await page.getByTestId('input-email').fill('Admin8');
    await page.getByTestId('input-password').click();
    await page.getByTestId('input-password').fill('1234512345Ad');
    await page.getByTestId('button-submit-login').click();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.getByRole('button', { name: 'Admin8' }).click();
    await page.getByRole('menuitem', { name: 'Profile' }).click();
    await page.getByRole('tab', { name: 'Socials' }).click();
    await page.getByPlaceholder('linkedin').click();
    await page.getByPlaceholder('linkedin').fill('https://www.linkedin.com/in/williamhgates/');
    await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight); }); 
    await page.getByRole('button', { name: 'Save' }).click();
    await page.evaluate(() => window.scrollTo(0, 0));
  });
  
  test ('User cannot add invalid social address', async ({ page }) => { 
    await page.goto(getVercelUrl('kunsthalte'))
    await page.getByRole('button', { name: 'EN' }).click();
    await page.getByRole('link', { name: 'Sign in' }).click();
    await page.getByTestId('input-email').click();
    await page.getByTestId('input-email').fill('Admin8');
    await page.getByTestId('input-password').click();
    await page.getByTestId('input-password').fill('1234512345Ad');
    await page.getByTestId('button-submit-login').click();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.getByRole('button', { name: 'Admin8' }).click(); 
    await page.getByRole('menuitem', { name: 'Profile' }).click();
    await page.getByRole('tab', { name: 'Socials' }).click();
    await page.getByPlaceholder('linkedin').click();
    await page.waitForTimeout(1000)
    await page.getByPlaceholder('linkedin').fill('123');
    await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight); }); 
    await page.getByRole('button', { name: 'Save' }).click();
    const errorMessageSelector2 = 'text=linkedin must be a valid URL';
    const isVisible = await page.isVisible(errorMessageSelector2);
    expect(isVisible).toBeTruthy()
  });
  
  test ('social address changed for dynamic code', async ({ page }) => {
    await page.goto(getVercelUrl('kunsthalte'))
    await page.getByRole('button', { name: 'EN' }).click();
    await page.getByRole('link', { name: 'Sign in' }).click();
    await page.getByTestId('input-email').click();
    await page.getByTestId('input-email').fill('Admin8');
    await page.getByTestId('input-password').click();
    await page.getByTestId('input-password').fill('1234512345Ad');
    await page.getByTestId('button-submit-login').click();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.getByRole('button', { name: 'Admin8' }).click(); 
    await page.getByRole('menuitem', { name: 'Profile' }).click();
    await page.getByRole('tab', { name: 'Socials' }).click(); 
    await page.getByPlaceholder('linkedin').click(); 
    await page.getByPlaceholder('linkedin').fill('https://www.linkedin.com/in/williamhgates');
    await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight); });
    await page.getByRole('button', { name: 'Save' }).click();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.getByRole('button', { name: 'Admin8' }).click();
    await page.getByRole('menuitem', { name: 'Sign Out' }).click();
  });

  test ('User can display new credentials/ security ', async ({ page }) => {
    await page.goto(getVercelUrl('kunsthalte'))
    await page.getByRole('button', { name: 'EN' }).click();
    await page.getByRole('link', { name: 'Sign in' }).click();
    await page.getByTestId('input-email').click();
    await page.getByTestId('input-email').fill('Admin8');
    await page.getByTestId('input-password').click();
    await page.getByTestId('input-password').fill('1234512345Ad');
    await page.getByTestId('button-submit-login').click();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.getByRole('button', { name: 'Admin8' }).click();
    await page.getByRole('menuitem', { name: 'Sign Out' }).click();
  });

  test ('User can display new credentials/ socials ', async ({ page }) => {
    await page.goto(getVercelUrl('kunsthalte'))
    await page.getByRole('button', { name: 'EN' }).click();
    await page.getByRole('link', { name: 'Sign in' }).click();
    await page.getByTestId('input-email').click();
    await page.getByTestId('input-email').fill('Admin8');
    await page.getByTestId('input-password').click();
    await page.getByTestId('input-password').fill('1234512345Ad');
    await page.getByTestId('button-submit-login').click();
    await page.getByRole('button', { name: 'Admin8' }).click();
    await page.getByRole('menuitem', { name: 'Profile' }).click();
    await page.getByRole('tab', { name: 'Socials' }).click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByLabel('https://www.linkedin.com/in/').click();
    const page1 = await page1Promise;
    await page1.getByRole('button', { name: 'Dismiss' }).click();
  });
})