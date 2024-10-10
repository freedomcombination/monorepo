import { test as base } from '@playwright/test'

import {
  apiDeleteMutation,
  apiPostMutation,
  apiPutMutation,
  apiGetRequest,
} from './lib'
import {
  ArtsPage,
  ContactPage,
  DashboardArtsPage,
  LayoutPage,
  LoginPage,
  ProfilePage,
  RegisterPage,
} from './pages'

type ExtendProps = {
  artsPage: ArtsPage
  contactPage: ContactPage
  dashboardArtsPage: DashboardArtsPage
  layoutPage: LayoutPage
  loginPage: LoginPage
  profilePage: ProfilePage
  registerPage: RegisterPage
  api: {
    get: typeof apiGetRequest
    post: typeof apiPostMutation
    put: typeof apiPutMutation
    delete: typeof apiDeleteMutation
  }
}

// Extend basic test by providing a "todoPage" fixture.
export const test = base.extend<ExtendProps>({
  artsPage: async ({ page }, use) => {
    const artsPage = new ArtsPage(page)
    await use(artsPage)
  },
  contactPage: async ({ page }, use) => {
    const contactPage = new ContactPage(page)
    await use(contactPage)
  },
  dashboardArtsPage: async ({ page }, use) => {
    const dashboardArtsPage = new DashboardArtsPage(page)
    await use(dashboardArtsPage)
  },
  layoutPage: async ({ page }, use) => {
    const layoutPage = new LayoutPage(page)
    await use(layoutPage)
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page)
    await use(loginPage)
  },
  profilePage: async ({ page }, use) => {
    const profilePage = new ProfilePage(page)
    await use(profilePage)
  },
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page)
    await use(registerPage)
  },
  api: async ({}, use) => {
    await use({
      get: apiGetRequest,
      post: (endpoint, body, token) =>
        apiPostMutation(endpoint, body, token, true),
      put: (endpoint, id, body, token) =>
        apiPutMutation(endpoint, id, body, token, true),
      delete: (endpoint, id, token) =>
        apiDeleteMutation(endpoint, id, token, true),
    })
  },
})
