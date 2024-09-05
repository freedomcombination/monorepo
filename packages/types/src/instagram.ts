export type InstagramPost = {
  id: string
  caption: string
  media_url: string
  permalink: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  thumbnail_url?: string
}
