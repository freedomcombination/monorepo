import type { StrapiEndpoint, StrapiSingleEndpoint } from '@fc/types'

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
  'archive-contents',
  'blogs',
  'collections',
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
  'arts',
  'blogs',
  'collections',
  'course-applications',
  'courses',
  'hashtags',
  'posts',
  'presentations',
]

export const endpointsWithPublicationState: StrapiEndpoint[] = [
  'activities',
  'archive-images',
  'arts',
  'blogs',
  'comments',
  'courses',
  'hashtags',
  'posts',
  'presentations',
  'timelines',
]
