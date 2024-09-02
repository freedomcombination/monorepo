import { UnionToIntersection } from 'type-fest'

import { AccountStats } from './account-stats'
import {
  Activity,
  ActivityCreateInput,
  ActivityLocalizeInput,
  ActivityUpdateInput,
} from './activity'
import { Applicant } from './applicant'
import {
  Application,
  ApplicationCreateInput,
  ApplicationUpdateInput,
} from './application'
import {
  ArchiveContent,
  ArchiveContentCreateInput,
  ArchiveContentUpdateInput,
} from './archive-content'
import { ArchiveImage, ArchiveImageCreateInput } from './archive-image'
import { Art, ArtCreateInput, ArtLocalizeInput, ArtUpdateInput } from './art'
import { Asset, AssetCreateInput, AssetUpdateInput } from './asset'
import {
  AssetsTracking,
  AssetsTrackingCreateInput,
  AssetsTrackingUpdateInput,
} from './assets-tracking'
import {
  Blog,
  BlogCreateInput,
  BlogLocalizeInput,
  BlogUpdateInput,
} from './blog'
import { Category, CategoryCreateInput } from './category'
import {
  Collection,
  CollectionCreateInput,
  CollectionUpdateInput,
} from './collection'
import { Comment, CommentCreateInput } from './comment'
import { ApprovalStatus, Expand } from './common'
import {
  Competition,
  CompetitionCreateInput,
  CompetitionLocalizeInput,
  CompetitionUpdateInput,
} from './competition'
import { Course, CourseCreateInput, CourseUpdateInput } from './course'
import {
  CourseApplication,
  CourseApplicationCreateInput,
  CourseApplicationUnpaid,
} from './course-application'
import { CoursePayment } from './course-payment'
import { Donation, DonationCreateInput, DonationUpdateInput } from './donation'
import { EmailCreateInput } from './email'
import {
  Feedback,
  FeedbackApplicationCreateInput,
  FeedbackArtCreateInput,
} from './feedback'
import { UploadFile } from './file'
import {
  Foundation,
  FoundationCreateInput,
  FoundationUpdateInput,
} from './foundation'
import {
  Hashtag,
  HashtagCreateInput,
  HashtagLocalizeInput,
  HashtagUpdateInput,
} from './hashtag'
import { Job, JobCreateInput } from './job'
import { StrapiLocale } from './locale'
import { Me } from './me'
import { Mention, MentionCreateInput } from './mention'
import { Notification, NotificationCreateInput } from './notification'
import { Observation, ObservationCreateInput } from './observation'
import { Platform } from './platform'
import {
  Post,
  PostCreateInput,
  PostLocalizeInput,
  PostUpdateInput,
} from './post'
import { Presentation } from './presentation'
import { Privacy } from './privacy'
import { Profile, ProfileCreateInput, ProfileUpdateInput } from './profile'
import {
  RecommendedTopic,
  RecommendedTopicCreateInput,
} from './recommended-topic'
import {
  RecommendedTweet,
  RecommendedTweetCreateInput,
} from './recommended-tweet'
import {
  Subscriber,
  SubscriberCreateInput,
  SubscriberUpdateInput,
} from './subscriber'
import { Tag, TagCreateInput } from './tag'
import { Term } from './term'
import { Timeline, TimelineCreateInput } from './timeline'
import { Topic } from './topic'
import { Trend } from './trend'
import { User } from './user'
import {
  UserFeedback,
  UserFeedbackCreateInput,
  UserFeedbackUpdateInput,
} from './user-feedback'
import {
  UserNotification,
  UserNotificationCreateInput,
  UserNotificationUpdateInput,
} from './user-notification'
import {
  Vote,
  VoteCreateApplicationInput,
  VoteCreateApplicationJuryInput,
  VoteCreateArtInput,
  VoteCreateArtJuryInput,
} from './vote'

/**
 * MODEL TYPES
 */
export type PublicationState = 'preview' | 'live'

export type StrapiBase = {
  id: number
  createdAt: string
  updatedAt: string | null
  publishedAt?: string | null
  translates?: StrapiLocale[]
}

export type StrapiEntityBase = {
  title: string
  slug: string
  description: string | null
  content: string | null
  approvalStatus: ApprovalStatus
  locale: StrapiLocale
}

export type StrapiModel =
  | AccountStats
  | Activity
  | Applicant
  | Application
  | ArchiveContent
  | ArchiveImage
  | Art
  | Asset
  | AssetsTracking
  | Blog
  | Category
  | Collection
  | Comment
  | Competition
  | Course
  | CourseApplication
  | CoursePayment
  | Donation
  | Feedback
  | Foundation
  | Hashtag
  | Job
  | Me
  | Mention
  | Notification
  | Observation
  | Platform
  | Post
  | Presentation
  | Privacy
  | Profile
  | RecommendedTopic
  | RecommendedTweet
  | Subscriber
  | Tag
  | Term
  | Timeline
  | Topic
  | Trend
  | UploadFile
  | User
  | UserFeedback
  | UserNotification
  | Vote

export type StrapiSeoModel =
  | Activity
  | Art
  | Blog
  | Collection
  | Course
  | Hashtag
  | Post
  | RecommendedTopic
  | RecommendedTweet
  | Platform

export type StrapiMergedModels = Expand<UnionToIntersection<StrapiModel>>

export type StrapiModelKeys = keyof StrapiMergedModels

/**
 * STRAPI RESPONSE TYPES
 */
export type Pagination = {
  page: number
  pageCount: number
  pageSize: number
  total: number
}

export type PaginationArg =
  | { limit: number; start: number }
  | { page: number; pageSize: number }

export type StrapiMeta = {
  pagination?: Pagination
}

export type StrapiSingleResponseData<T extends StrapiModel> = T
export type StrapiCollectionResponseData<T extends StrapiModel[]> = T

export type StrapiSingleResponse<T extends StrapiModel> = {
  data: StrapiSingleResponseData<T>
  meta: Record<string, unknown>
}
export type StrapiMutationResponse<T extends StrapiModel> =
  StrapiSingleResponse<T>

export type StrapiCollectionResponse<T extends StrapiModel[]> = {
  data: StrapiCollectionResponseData<T>
  meta: StrapiMeta
}

export type StrapiResponse<T extends StrapiModel> =
  | StrapiSingleResponse<T>
  | StrapiCollectionResponse<T[]>

/**
 * STRAPI API URL TYPES
 */
export type StrapiProviders = 'instagram' | 'facebook' | 'google' | 'twitter'

export type StrapiEmailEndpoint = 'email'

export type StrapiCustomEndpoint =
  | 'translate-model'
  | 'translate-post-model'
  | 'contact/email'

export type StrapiSingleEndpoint =
  | 'profiles/me'
  | 'term'
  | 'privacy'
  | 'trend'
  | 'topic'
  | 'topic/sync'
  | 'users/me'

export type StrapiAuthEndpoint =
  | 'auth/local/register'
  | 'auth/local'
  | `connect/${StrapiProviders}/callback`

export type StrapiCollectionEndpoint =
  | 'account-statistics'
  | 'activities'
  | 'applicants'
  | 'applications'
  | 'archive-contents'
  | 'archive-images'
  | 'arts'
  | 'assets'
  | 'assets-trackings'
  | 'audit-logs'
  | 'authors'
  | 'blogs'
  | 'categories'
  | 'collections'
  | 'comments'
  | 'competitions'
  | 'course-applications'
  | 'payments'
  | 'courses'
  | 'donates'
  | 'donates/email'
  | 'feedbacks'
  | 'foundations'
  | 'hashtags'
  | 'jobs'
  | 'me'
  | 'mentions'
  | 'notifications'
  | 'observations'
  | 'platforms'
  | 'posts'
  | 'presentations'
  | 'profiles'
  | 'recommended-topics'
  | 'recommended-tweets'
  | 'saved-tweets'
  | 'subscribers'
  | 'tags'
  | 'timelines'
  | 'tweet-users'
  | 'tweets'
  | 'user-feedbacks'
  | 'user-statistics/get-stats'
  | 'user-statistics/get-user-stats'
  | 'users'
  | 'users-notifications'
  | 'users-permissions/roles'
  | 'votes'

export type StrapiEndpoint =
  | StrapiSingleEndpoint
  | StrapiCollectionEndpoint
  | StrapiAuthEndpoint
  | StrapiEmailEndpoint
  | StrapiCustomEndpoint

export type PartialStrapiEndpointMap<T> = { [x in StrapiEndpoint]?: T }

export type StrapiLocalizeInput =
  | ActivityLocalizeInput
  | ArtLocalizeInput
  | BlogLocalizeInput
  | CompetitionLocalizeInput
  | HashtagLocalizeInput
  | PostLocalizeInput

export type StrapiFormValue =
  | File
  | File[]
  | Date
  | JSON
  | boolean
  | null
  | number
  | number[]
  | string
  | string[]

export type StrapiCreateInput =
  | ActivityCreateInput
  | ApplicationCreateInput
  | ArchiveContentCreateInput
  | ArchiveImageCreateInput
  | ArtCreateInput
  | AssetCreateInput
  | AssetsTrackingCreateInput
  | BlogCreateInput
  | CategoryCreateInput
  | CollectionCreateInput
  | CommentCreateInput<'art'>
  | CommentCreateInput<'blog'>
  | CompetitionCreateInput
  | CourseApplicationCreateInput
  | CourseCreateInput
  | DonationCreateInput
  | EmailCreateInput
  | FeedbackApplicationCreateInput
  | FeedbackArtCreateInput
  | FoundationCreateInput
  | HashtagCreateInput
  | JobCreateInput
  | MentionCreateInput
  | NotificationCreateInput
  | ObservationCreateInput
  | PostCreateInput
  | ProfileCreateInput
  | RecommendedTopicCreateInput
  | RecommendedTweetCreateInput
  | SubscriberCreateInput
  | TagCreateInput
  | TimelineCreateInput
  | UserFeedbackCreateInput
  | UserNotificationCreateInput
  | VoteCreateApplicationInput
  | VoteCreateApplicationJuryInput
  | VoteCreateArtInput
  | VoteCreateArtJuryInput

export type StrapiUpdateInput =
  | ActivityUpdateInput
  | ApplicationUpdateInput
  | ArchiveContentCreateInput
  | ArchiveContentUpdateInput
  | ArtUpdateInput
  | AssetUpdateInput
  | AssetsTrackingUpdateInput
  | BlogUpdateInput
  | CollectionUpdateInput
  | CompetitionUpdateInput
  | CourseApplicationUnpaid
  | CourseUpdateInput
  | DonationUpdateInput
  | FoundationUpdateInput
  | HashtagUpdateInput
  | PostUpdateInput
  | ProfileUpdateInput
  | SubscriberUpdateInput
  | UserFeedbackUpdateInput
  | UserNotificationUpdateInput

type StrapiFilterOperator =
  | '$eq'
  | '$eqi'
  | '$ne'
  | '$nei'
  | '$lt'
  | '$lte'
  | '$gt'
  | '$gte'
  | '$in'
  | '$notIn'
  | '$contains'
  | '$notContains'
  | '$containsi'
  | '$notContainsi'
  | '$null'
  | '$notNull'
  | '$between'
  | '$startsWith'
  | '$startsWithi'
  | '$endsWith'
  | '$endsWithi'
  | '$or'
  | '$and'
  | '$not'

type StrapiFilterValue =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | boolean[]
  | [number, number]

export type StrapiFilter<T> = {
  [field in keyof T]?: T[field] extends infer U
    ? U extends Array<any>
      ? StrapiFilter<U[number]>
      : U extends object
        ? StrapiFilter<T[field]>
        : Partial<Record<StrapiFilterOperator, StrapiFilterValue>>
    : Partial<Record<StrapiFilterOperator, StrapiFilterValue>>
} & {
  $or?: StrapiFilter<T>[]
  $and?: StrapiFilter<T>[]
  $not?: StrapiFilter<T>[]
}
