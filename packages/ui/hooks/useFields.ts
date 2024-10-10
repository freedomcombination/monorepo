import type {
  FormFields,
  PartialStrapiEndpointMap,
  StrapiModel,
} from '@fc/types'

import { activityFields } from './schemas/activity'
import { archiveContentFields } from './schemas/archive-contents'
import { artFields } from './schemas/art'
import { assetFields } from './schemas/assets'
import { assetsTrackingFields } from './schemas/assetsTracking'
import { blogFields } from './schemas/blog'
import { categoryFields } from './schemas/categories'
import { collectionFields } from './schemas/collection'
import { courseFields } from './schemas/course'
import { courseApplicationFields } from './schemas/courseApplication'
import { foundationFields } from './schemas/foundation'
import { hashtagFields } from './schemas/hashtag'
import { notificationFields } from './schemas/notification'
import { postFields } from './schemas/post'
import { profileFields } from './schemas/profile'
import { recommendedTweetFields } from './schemas/recommendedTweet'
import { topicFields } from './schemas/topic'
import {
  translateModelFields,
  translatePostModelFields,
} from './schemas/translate'
import { userFields } from './schemas/user'
import { userFeedbackFields } from './schemas/userFeedback'

export const useFields = <T extends StrapiModel>(): PartialStrapiEndpointMap<
  FormFields<T>
> => {
  return {
    'archive-contents': archiveContentFields as FormFields<T>,
    assets: assetFields as FormFields<T>,
    'assets-trackings': assetsTrackingFields as FormFields<T>,
    activities: activityFields as FormFields<T>,
    arts: artFields as FormFields<T>,
    blogs: blogFields as FormFields<T>,
    categories: categoryFields as FormFields<T>,
    collections: collectionFields as FormFields<T>,
    courses: courseFields as FormFields<T>,
    'course-applications': courseApplicationFields as FormFields<T>,
    foundations: foundationFields as FormFields<T>,
    hashtags: hashtagFields as FormFields<T>,
    notifications: notificationFields as FormFields<T>,
    posts: postFields as FormFields<T>,
    profiles: profileFields as FormFields<T>,
    'recommended-tweets': recommendedTweetFields as FormFields<T>,
    topic: topicFields as FormFields<T>,
    'translate-model': translateModelFields as FormFields<T>,
    'translate-post-model': translatePostModelFields as FormFields<T>,
    users: userFields as FormFields<T>,
    'user-feedbacks': userFeedbackFields as FormFields<T>,
  }
}
