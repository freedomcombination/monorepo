import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  { timeout: 30000 }
  await page.goto('https://kunsthalte.vercel.app/nl');
  await page.getByRole('button', { name: 'EN' }).click();
  await page.getByRole('link', { name: 'Sign in' }).click();
  await page.getByTestId('input-email').click();
  await page.getByTestId('input-email').fill('Admin7');
  await page.getByTestId('input-password').click();
  await page.getByTestId('input-password').fill('1234512345Ad');
  await page.getByTestId('button-submit-login').click();
  { timeout: 20000 }

  //user updates his/her password
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.getByRole('button', { name: 'Admin7' }).click();
  await page.getByRole('menuitem', { name: 'Profile' }).click();
  await page.getByRole('tab', { name: 'Security' }).click();
  await page.getByPlaceholder('currentPassword').click();
  await page.getByPlaceholder('currentPassword').fill('1234512345Ad');
  await page.getByPlaceholder('Password', { exact: true }).click();
  await page.getByPlaceholder('Password', { exact: true }).fill('1234567Ak');
  await page.getByPlaceholder('passwordConfirmation').click();
  await page.getByPlaceholder('passwordConfirmation').fill('1234567Ak');
  await page.getByRole('button', { name: 'Change Password' }).click();
  { timeout: 20000 }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.getByRole('button', { name: 'Admin7' }).click();
  await page.getByRole('menuitem', { name: 'Sign Out' }).click();
  { timeout: 20000 }

  //user CAN NOT update his/her password
  await page.getByRole('link', { name: 'Sign in' }).click();
  await page.getByTestId('input-email').click();
  await page.getByTestId('input-email').fill('Admin7');
  await page.getByTestId('input-password').click();
  await page.getByTestId('input-password').fill('1234567Ak');
  await page.getByTestId('button-submit-login').click();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.getByRole('button', { name: 'Admin7' }).click();
  await page.getByRole('menuitem', { name: 'Profile' }).click();
  await page.getByRole('tab', { name: 'Security' }).click();
  await page.getByPlaceholder('currentPassword').click();
  await page.getByPlaceholder('currentPassword').fill('1234567Ak');
  await page.getByPlaceholder('Password', { exact: true }).click();
  await page.getByPlaceholder('Password', { exact: true }).fill('1');
  await page.getByPlaceholder('passwordConfirmation').click();
  await page.getByPlaceholder('passwordConfirmation').fill('1');
  await page.getByRole('button', { name: 'Change Password' }).click();
  const errorMessageSelector = 'text=password must be at least 6';
  const isVisible = await page.isVisible(errorMessageSelector);
  { timeout: 20000 }

  //password is restored
  await page.getByPlaceholder('Password', { exact: true }).click();
  await page.getByPlaceholder('Password', { exact: true }).fill('1234567Ak');
  await page.getByPlaceholder('Password', { exact: true }).click();
  await page.getByPlaceholder('Password', { exact: true }).fill('1234512345Ad');
  await page.getByPlaceholder('passwordConfirmation').click();
  await page.getByPlaceholder('passwordConfirmation').fill('1234512345Ad');
  await page.getByRole('button', { name: 'Change Password' }).click();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.getByRole('button', { name: 'Admin7' }).click();
  await page.getByRole('menuitem', { name: 'Sign Out' }).click();

  //user adds social address
  await page.goto('https://kunsthalte.vercel.app/nl');
  await page.getByRole('button', { name: 'EN' }).click();
  await page.getByRole('link', { name: 'Sign in' }).click();
  { timeout: 20000 }
  await page.getByTestId('input-email').click();
  await page.getByTestId('input-email').fill('Admin7');
  await page.getByTestId('input-password').click();
  await page.getByTestId('input-password').fill('1234512345Ad');
  await page.getByTestId('button-submit-login').click();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.getByRole('button', { name: 'Admin7' }).click();
  await page.getByRole('menuitem', { name: 'Profile' }).click();
  await page.getByRole('tab', { name: 'Socials' }).click();
  await page.getByPlaceholder('linkedin').click();
  await page.getByPlaceholder('linkedin').fill('https://www.linkedin.com/in/williamhgates/');
  await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight); }); 
  await page.getByRole('button', { name: 'Save' }).click();
  await page.evaluate(() => window.scrollTo(0, 0));

  //user CAN NOT add social address
  await page.getByRole('button', { name: 'Admin7' }).click();
  await page.getByRole('tab', { name: 'Profile' }).click();
  await page.getByRole('tab', { name: 'Socials' }).click();
  await page.getByPlaceholder('linkedin').click();
  { timeout: 20000 }
  await page.getByPlaceholder('linkedin').fill('123');
  await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight); }); 
  await page.getByRole('button', { name: 'Save' }).click();
  const errorMessageSelector2 = 'text=linkedin must be a valid URL';
  const isVisible2 = await page.isVisible(errorMessageSelector2);

  //
  await page.getByPlaceholder('linkedin').click();
  await page.getByPlaceholder('linkedin').fill('https://www.linkedin.com/in/williamhgates');
  await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight); }); 
  await page.getByRole('button', { name: 'Save' }).click();



});