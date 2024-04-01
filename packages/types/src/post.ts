import { ApprovalStatus, Expand, OgImageParams } from './common'
import { UploadFile } from './file'
import { Hashtag } from './hashtag'
import { Profile } from './profile'
import { StrapiBase, StrapiCreatorRelation, StrapiEntityBase } from './strapi'
import { Tag } from './tag'

export type PostBase = Omit<StrapiEntityBase, 'title' | 'slug'> & {
  title: string
  capsStatus: ApprovalStatus
  twitterMedia?: string | null
  reference?: string | null
  imageParams?: OgImageParams | null
  videoUrl?: string | null
}

export type PostRelation = {
  image?: UploadFile | null
  video?: UploadFile | null
  caps?: UploadFile | null
  hashtag?: Hashtag | null
  tags?: Array<Tag>
  translator?: Profile | null
  localizations?: Array<Post>
}

export type PostRelationInput = {
  image: File
  video: File
  caps: File
  hashtag: number
  tags?: Array<number>
  translator?: number
}

export type PostCreateInput = Expand<
  { publishedAt?: Date | string | null } & Omit<
    PostBase,
    'approvalStatus' | 'capsStatus' | 'videoUrl'
  > &
    Pick<PostRelationInput, 'image' | 'hashtag' | 'tags'>
>

export type PostUpdateInput = Expand<
  { publishedAt?: Date | string | null } & Partial<
    Omit<PostBase, 'locale'> & Omit<PostRelationInput, 'translator'>
  >
>

export type PostLocalizeInput = Pick<PostBase, 'description' | 'approvalStatus'>

export type Post = StrapiBase & PostBase & PostRelation & StrapiCreatorRelation

export type PostSentence = {
  postId: number
  value: string
  index: number
  shareCount: number
  isPublished: boolean
}
