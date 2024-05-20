import { StrapiEndpoint, StrapiSingleEndpoint } from '@fc/types'

export const endpointsSingleType: StrapiSingleEndpoint[] = [
  'privacy',
  'term',
  'topic',
  'trend',
  'profiles/me',
]

export const endpointsWithLocalizedTitle: StrapiEndpoint[] = [
  'arts',
  'categories',
  'jobs',
  'platforms',
  'tags',
]

export const endpointsWithoutLocale: StrapiEndpoint[] = [
  ...endpointsWithLocalizedTitle,
  'assets',
  'assets-trackings',
  'applicants',
  'comments',
  'donates',
  'feedbacks',
  'foundations',
  'users',
  'profiles',
  'votes',
  'users-permissions/roles',
]

export const endpointsWithApprovalStatus: StrapiEndpoint[] = [
  'activities',
  'arts',
  'blogs',
  'collections',
  'competitions',
  'courses',
  'course-applications',
  'hashtags',
  'posts',
  'presentations',
]

export const endpointsWithPublicationState: StrapiEndpoint[] = [
  'account-statistics',
  'activities',
  'applicants',
  'arts',
  'blogs',
  'categories',
  'collections',
  'competitions',
  'courses',
  'course-applications',
  'feedbacks',
  'hashtags',
  'jobs',
  'mentions',
  'platforms',
  'posts',
  'privacy',
  'recommended-topics',
  'recommended-tweets',
  'tags',
  'term',
  'timelines',
  'topic',
  // 'user-feedbacks',
  // 'profiles',
  'presentations',
  'votes',
]
