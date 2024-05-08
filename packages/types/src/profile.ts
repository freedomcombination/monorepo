import { SetRequired } from 'type-fest'

import { Activity } from './activity'
import { Applicant } from './applicant'
import { Art } from './art'
import { Blog } from './blog'
import { Collection } from './collection'
import { Expand } from './common'
import { Competition } from './competition'
import { Feedback } from './feedback'
import { UploadFile } from './file'
import { Hashtag } from './hashtag'
import { Job } from './job'
import { LangRole } from './lang-role'
import { Platform } from './platform'
import { Post } from './post'
import { RecommendedTopic } from './recommended-topic'
import { RecommendedTweet } from './recommended-tweet'
import { Permissions } from './role'
import { StrapiBase } from './strapi'
import { User } from './user'
import { UserStats } from './user-stats'
import { Vote } from './vote'
export type ProfileStatus =
  | 'left'
  | 'pending'
  | 'rejected'
  | 'in-progress'
  | 'accepted'
  | 'awaiting'

export type ProfileBase = {
  email: string
  city: string | null
  age: number | null
  availableHours: number | null
  approved: boolean | null
  bio: string | null
  comment: string | null
  country: string | null
  facebook: string | null
  heardFrom: string | null
  inMailingList: boolean | null
  instagram: string | null
  isPublic: boolean | null
  linkedin: string | null
  name: string | null
  occupation: string | null
  phone: string | null
  twitter: string | null
  isVolunteer: boolean | null
  permissions?: Permissions
  status?: ProfileStatus
}

type ProfileRelation = {
  applicant?: Applicant | null
  approvedActivities?: Array<Activity>
  approvedApplications?: Array<Applicant>
  approvedCollections?: Array<Collection>
  approvedCompetitions?: Array<Competition>
  approvedHashtags?: Array<Hashtag>
  approvedPosts?: Array<Post>
  avatar?: UploadFile | null
  comments?: Array<Comment>
  createdActivities?: Array<Activity>
  createdApplications?: Array<Applicant>
  createdBlogs?: Array<Blog>
  createdCollections?: Array<Collection>
  createdCompetitions?: Array<Competition>
  createdHashtags?: Array<Hashtag>
  createdPosts?: Array<Post>
  createdTopics?: Array<RecommendedTopic>
  createdTweets?: Array<RecommendedTweet>
  feedbacks?: Array<Feedback>
  jobs?: Array<Job>
  juryVotes?: Array<Vote>
  langRoles?: Array<LangRole>
  likedArts?: Array<Art>
  likedBlogs?: Array<Blog>
  ownedArts?: Array<Art>
  ownedBlogs?: Array<Blog>
  platforms?: Array<Platform>
  stats?: Array<UserStats>
  user?: User | null
  votes?: Array<Vote>
}

type ProfileRelationInput = {
  user?: number
  jobs?: Array<number>
  platforms?: Array<number>
  avatar?: File
  applicant?: number
  comments?: Array<number>
  votes?: Array<number>
}

export type ProfileCreateInput = Expand<
  { publishedAt?: Date | string | null } & SetRequired<
    Partial<Omit<ProfileBase, 'approved'>>,
    'name' | 'email'
  > &
    ProfileRelationInput
>

export type ProfileUpdateInput = Expand<
  { publishedAt?: Date | string | null } & Partial<ProfileBase> &
    ProfileRelationInput
>

export type Profile = StrapiBase & ProfileBase & ProfileRelation
