import { StrapiEndpoint, StrapiSingleEndpoint } from '@fc/types'

export const API_URL = process.env['NEXT_PUBLIC_API_URL'] as string

export const endpointsWithoutDataField: StrapiEndpoint[] = ['users', 'users/me']

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

export const endpointsWithLocale: StrapiEndpoint[] = [
  'activities',
  'applications',
  'archive-contents',
  'blogs',
  'collections',
  'competitions',
  'hashtags',
  'mentions',
  'posts',
  'presentations',
  'privacy',
  'recommended-topics',
  'recommended-tweets',
  'term',
  'timelines',
]

export const endpointsWithApprovalStatus: StrapiEndpoint[] = [
  'activities',
  'applications',
  'arts',
  'blogs',
  'collections',
  'competitions',
  'course-applications',
  'courses',
  'hashtags',
  'posts',
  'presentations',
]

export const endpointsWithPublicationState: StrapiEndpoint[] = [
  'activities',
  'applicants',
  'archive-images',
  'arts',
  'blogs',
  'comments',
  'competitions',
  'courses',
  'hashtags',
  'posts',
  'presentations',
  'timelines',
  'votes',
]
