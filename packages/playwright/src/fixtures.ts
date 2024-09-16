import { test as base } from '@playwright/test'

import {
  apiDeleteRequest,
  apiGetRequest,
  apiPostRequest,
  apiPutRequest,
} from './lib'
import {
  ArtsPage,
  DashboardArtsPage,
  LayoutPage,
  LoginPage,
  ProfilePage,
  RegisterPage,
} from './pages/index'

type ExtendProps = {
  artsPage: ArtsPage
  dashboardArtsPage: DashboardArtsPage
  layoutPage: LayoutPage
  loginPage: LoginPage
  profilePage: ProfilePage
  registerPage: RegisterPage
  api: {
    get: typeof apiGetRequest
    post: typeof apiPostRequest
    put: typeof apiPutRequest
    delete: typeof apiDeleteRequest
  }
}

// Extend basic test by providing a "todoPage" fixture.
export const test = base.extend<ExtendProps>({
  artsPage: async ({ page }, use) => {
    const artsPage = new ArtsPage(page)
    await use(artsPage)
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
      post: apiPostRequest,
      put: apiPutRequest,
      delete: apiDeleteRequest,
    })
  },
})
