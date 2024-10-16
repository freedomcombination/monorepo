import { useEffect } from 'react'

import { useRouter } from 'next/router'
import { ObjectSchema, setLocale } from 'yup'
import { nl, tr } from 'yup-locales'

import type { PartialStrapiEndpointMap } from '@fc/types'

type ExtendedStrapiEndpointMap = PartialStrapiEndpointMap<ObjectSchema<any>> & {
  members?: ObjectSchema<any>
}

import { useActivitySchema } from './schemas/activity'
import { useArchiveContentsSchema } from './schemas/archive-contents'
import { useArtSchema } from './schemas/art'
import { useAssetsSchema } from './schemas/assets'
import { useAssetsTrackingSchema } from './schemas/assetsTracking'
import { useBlogSchema } from './schemas/blog'
import { useCategoriesSchema } from './schemas/categories'
import { useCollectionSchema } from './schemas/collection'
import { useCourseSchema } from './schemas/course'
import { useCourseApplicationSchema } from './schemas/courseApplication'
import { useFoundationsSchema } from './schemas/foundation'
import { useHashtagSchema } from './schemas/hashtag'
import { useMemberSchema } from './schemas/member'
import { useNotificationsSchema } from './schemas/notification'
import { usePostSchema } from './schemas/post'
import { useProfileSchema } from './schemas/profile'
import { useRecommendedTweetSchema } from './schemas/recommendedTweet'
import { useTeamSchema } from './schemas/team'
import { useTopicSchema } from './schemas/topic'
import {
  translateModelSchema,
  translatePostModelSchema,
} from './schemas/translate'
import { useUserSchema } from './schemas/user'
import { useUserFeedbackSchema } from './schemas/userFeedback'

export const useSchema = (): ExtendedStrapiEndpointMap => {
  const { locale } = useRouter()

  useEffect(() => {
    if (locale === 'tr') setLocale(tr)
    if (locale === 'nl') setLocale(nl)
  }, [locale])

  return {
    'archive-contents': useArchiveContentsSchema(),
    'assets-trackings': useAssetsTrackingSchema(),
    categories: useCategoriesSchema(),
    'course-applications': useCourseApplicationSchema(),
    'recommended-tweets': useRecommendedTweetSchema(),
    'translate-model': translateModelSchema,
    'translate-post-model': translatePostModelSchema,
    'user-feedbacks': useUserFeedbackSchema(),
    activities: useActivitySchema(),
    arts: useArtSchema(),
    assets: useAssetsSchema(),
    blogs: useBlogSchema(),
    collections: useCollectionSchema(),
    courses: useCourseSchema(),
    foundations: useFoundationsSchema(),
    hashtags: useHashtagSchema(),
    members: useMemberSchema(),
    notifications: useNotificationsSchema(),
    posts: usePostSchema(),
    profiles: useProfileSchema(),
    teams: useTeamSchema(),
    topic: useTopicSchema(),
    users: useUserSchema(),
  }
}
