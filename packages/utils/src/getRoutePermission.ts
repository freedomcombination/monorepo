import { AdminCommonRoute, adminCommonRoutes, AdminRoute } from '@fc/config'
import { RoleType } from '@fc/types'

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
    jury: ['/competitions'],
    public: [],
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
