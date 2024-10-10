import type { StrapiCollectionEndpoint, StrapiModel } from '@fc/types'

import { useActivityColumns } from './tables/activity'
import { useArchiveContentColumns } from './tables/archive-content'
import { useArtColumns } from './tables/art'
import { useAssetsColumns } from './tables/assets'
import { useAssetsTrackingsColumns } from './tables/assets-trackings'
import { useBlogColumns } from './tables/blogs'
import { useCategoryColumns } from './tables/category'
import { useCollectionColumns } from './tables/collection'
import { useCourseApplicationColumns } from './tables/course-application'
import { useCourseColumns } from './tables/courses'
import { useDonationColumns } from './tables/donation'
import { useFoundationsColumns } from './tables/foundation'
import { useHashtagColumns } from './tables/hashtag'
import { useNotificationColumns } from './tables/notification'
import { usePaymentColumns } from './tables/payment'
import { usePostColumns } from './tables/post'
import { useProfileColumns } from './tables/profile'
import { useUserColumns } from './tables/user'
import { useUserFeedbacksColumns } from './tables/userFeedbacks'
import { WTableProps } from '../components/WTable'

export const useColumns = <T extends StrapiModel>(): {
  [x in StrapiCollectionEndpoint]?: WTableProps<T>['columns']
} => {
  return {
    'archive-contents': useArchiveContentColumns() as WTableProps<T>['columns'],
    assets: useAssetsColumns() as WTableProps<T>['columns'],
    'assets-trackings':
      useAssetsTrackingsColumns() as WTableProps<T>['columns'],
    activities: useActivityColumns() as WTableProps<T>['columns'],
    arts: useArtColumns() as WTableProps<T>['columns'],
    blogs: useBlogColumns() as WTableProps<T>['columns'],
    categories: useCategoryColumns() as WTableProps<T>['columns'],
    collections: useCollectionColumns() as WTableProps<T>['columns'],
    'course-applications':
      useCourseApplicationColumns() as WTableProps<T>['columns'],
    courses: useCourseColumns() as WTableProps<T>['columns'],
    donates: useDonationColumns() as WTableProps<T>['columns'],
    foundations: useFoundationsColumns() as WTableProps<T>['columns'],
    hashtags: useHashtagColumns() as WTableProps<T>['columns'],
    notifications: useNotificationColumns() as WTableProps<T>['columns'],
    payments: usePaymentColumns() as WTableProps<T>['columns'],
    posts: usePostColumns() as WTableProps<T>['columns'],
    profiles: useProfileColumns() as WTableProps<T>['columns'],
    'user-feedbacks': useUserFeedbacksColumns() as WTableProps<T>['columns'],
    users: useUserColumns() as WTableProps<T>['columns'],
  }
}
