import { RoleType } from '@fc/types'

export const adminRoleRoutes = [
  '/',
  '/accounts',
  '/activities',
  '/donations',
  '/arts',
  '/blogs',
  '/collections',
  '/competitions',
  '/courses',
  '/hashtags',
  '/news/recommended',
  '/posts',
  '/timelines/recommended',
  '/translates',
  '/profiles',
  '/user-feedbacks',
  '/users',
  'all',
] as const

export const adminCommonRoutes = [
  '/donation',
  '/settings',
  '/news',
  '/news/bookmarks',
  '/timelines',
  '/timelines/bookmarks',
] as const

type AdminRoleRoute = (typeof adminRoleRoutes)[number]
type AdminCommonRoute = (typeof adminCommonRoutes)[number]
type AdminRoute = AdminRoleRoute | AdminCommonRoute

export const getRoutePermission = (roles: RoleType[], route: AdminRoute) => {
  const roleRoutes: Record<RoleType, AdminRoute[]> = {
    academyeditor: ['/courses'],
    accountmanager: ['/news/recommended', '/timelines/recommended'],
    admin: ['all'],
    arteditor: ['/arts', '/collections'],
    arteditor_translator: ['/arts', '/collections', '/translates'],
    authenticated: [],
    author: ['/blogs'],
    author_translator: ['/blogs', '/translates'],
    contentmanager: [
      '/accounts',
      '/activities',
      '/blogs',
      '/competitions',
      '/hashtags',
      '/news/recommended',
      '/posts',
    ],
    contentmanager_translator: [
      '/accounts',
      '/activities',
      '/blogs',
      '/competitions',
      '/hashtags',
      '/news/recommended',
      '/posts',
      '/translates',
    ],
    jury: ['/competitions'],
    kunsthaltecoordinator: [
      '/activities',
      '/arts',
      '/collections',
      '/user-feedbacks',
      '/users',
      '/profiles',
      '/donations',
      '/courses',
      '/competitions',
      '/posts',
      '/translates',
    ],
    public: ['/timelines', '/news'],
    platformcoordinator: [
      '/activities',
      '/user-feedbacks',
      '/users',
      '/profiles',
      '/donations',
      '/courses',
      '/competitions',
      '/posts',
      '/translates',
    ],
    translator: ['/translates'],
    all: [],
  }

  return roles?.some(role => {
    const routes = roleRoutes[role]

    if (roles?.includes('public') && route === '/') {
      return false
    }

    if (
      routes.includes('all') ||
      adminCommonRoutes.includes(route as AdminCommonRoute)
    ) {
      return true
    } else {
      return routes.includes(route?.split('?')[0] as AdminRoute)
    }
  })
}
