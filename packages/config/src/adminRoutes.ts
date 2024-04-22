export const adminRoleRoutes = [
  '/accounts',
  '/archive-contents',
  '/activities',
  '/assets',
  '/categories',
  '/donations',
  '/arts',
  '/blogs',
  '/collections',
  '/competitions',
  '/courses',
  '/foundations',
  '/hashtags',
  '/news/recommended',
  '/posts',
  '/timelines/recommended',
  '/translates',
  '/profiles',
  '/tags',
  '/user-feedbacks',
  '/users',
  '/roles',
  'all',
  // TODO: Move these routes to adminCommonRoutes
  '/news',
  '/news/bookmarks',
  '/timelines',
  '/timelines/bookmarks',
] as const

export const adminCommonRoutes = ['/', '/donation', '/settings'] as const

export type AdminRoleRoute = (typeof adminRoleRoutes)[number]
export type AdminCommonRoute = (typeof adminCommonRoutes)[number]
export type AdminRoute =
  | AdminRoleRoute
  | AdminCommonRoute
  | `${AdminCommonRoute}?${string}`
  | `${AdminRoleRoute}?${string}`
