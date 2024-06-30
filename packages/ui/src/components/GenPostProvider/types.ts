import { ArchiveContent, Hashtag, Post, PostCreateInput } from '@fc/types'

export type GeneratedSentences = {
  sentences: string[]
}

export type GeneratedArchiveContentPost = {
  description: string
} & GeneratedSentences

export type ArchivePostType = {
  id: number
  postInput: PostCreateInput
} & GeneratedArchiveContentPost

export type ArchiveContentPosts = Record<
  number,
  Record<number, ArchivePostType[]>
>

export type GenPostValueType = {
  addPosts: (archiveId: number, posts: ArchivePostType[]) => ArchivePostType[]
  removePosts: (archiveId: number, dontAsk?: boolean) => void
  removePost: (archiveId: number, postId: number) => void
  modifyPost: (archiveId: number, updatedPost: ArchivePostType) => void
  postCount: (archiveId: number) => number
  getPosts: (archiveId: number) => ArchivePostType[]
  getArchive: (archiveId: number) => ArchiveContent | undefined
  archives: ArchiveContent[]
  hashtag: Hashtag
  post?: Post
  askBeforeDelete: boolean
  setAskBeforeDelete: (askBeforeDelete: boolean) => void
  removeSentence: (
    archiveId: number,
    updatedPost: ArchivePostType,
    content: string,
  ) => void
}
