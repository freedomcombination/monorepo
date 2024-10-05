export type TweetUserBase = {
  id?: string
  name: string
  username: string
  profile: string
}

export interface Tweet {
  id: string
  user: TweetUserBase
  image?: string | null
  video?: string | null
  text: string
  createdAt?: string
  likes?: number
  retweets?: number
  replies?: number
  impressions?: number
}
